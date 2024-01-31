
import { Inject,Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from "lodash";
import { ProductInfoEntity } from './../entity/product';
import { ImageInfoEntity } from './../entity/image';
import { VariantInfoEntity } from './../entity/variant';
import '@shopify/shopify-api/adapters/node'
import {shopifyApi, LATEST_API_VERSION,Session} from '@shopify/shopify-api';
import { restResources } from "@shopify/shopify-api/rest/admin/2024-01";
/**
 * 商品示例
 */
@Provide()
export class ProductService extends BaseService {
    @Inject()
    ctx;
  @InjectEntityModel(ProductInfoEntity)
  ProductInfoEntity: Repository<ProductInfoEntity>;

  @InjectEntityModel(ImageInfoEntity)
  ImageInfoEntity: Repository<ImageInfoEntity>;

  @InjectEntityModel(VariantInfoEntity)
  VariantInfoEntity: Repository<VariantInfoEntity>;
  

  async update(param){
    const shopify = shopifyApi({
      apiKey: '6b6c46e00bf65965da735832eb641db8',
      apiSecretKey: 'c0e5ca5f3e7167e5e3adca30aefabf17',
      adminApiAccessToken:'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',
      scopes: ['read_products','write_products','read_product_listings','read_inventory','write_inventory'],
      hostName: '9d847d-2.myshopify.com',
      hostScheme: 'https',
      apiVersion: LATEST_API_VERSION,
      isEmbeddedApp: false,
      isCustomStoreApp:true,
      restResources
    });
    const sessionId = shopify.session.getOfflineId('9d847d-2.myshopify.com')
    const session = new Session({
      id: sessionId,
      shop: '9d847d-2.myshopify.com',
      state: 'state',
      isOnline: false,
    })
    const product:any = await  new shopify.rest.Product({session: session});
    let variantsInfo=[
      {
        "option1": "Default Title",
      }
    ];
    product.id = Number(param.productId);
    product.title =param.title;
    if(param.bodyHtml){
      product.body_html = param.bodyHtml;
    }
    if(param.vendor){
      product.vendor = param.vendor;
    }
    if(param.productType){
      product.product_type = param.productType[ param.productType.length-1];
    }
    let imagesLists:any = [];
    if(param.images){
      for(let i=0,m=param.images.length;i<m;i++){
        imagesLists.push({
          src:param.images[i]
        })
        if(param.images.length-1==i){
          if(imagesLists.length){
            product.images =imagesLists;
          }  
        }
      }
    }

    if(param.tags.length){
      product.tags=param.tags
    }
    if(param.price){
      variantsInfo[0]['price']=param.price
    }
    if(param.compareAtPrice){
      variantsInfo[0]['compare_at_price']=param.compareAtPrice
    }
    if(param.taxable){
      variantsInfo[0]['taxable']=param.taxable?true:false;
    }
    if(param.sku){
      variantsInfo[0]['sku']=param.sku;
    }
    if(param.barcode){
      variantsInfo[0]['barcode']=param.barcode;

    }
    if(param.weightUnit){
      variantsInfo[0]['weight_unit']=param.weightUnit;
    }
    if(param.weight){
      variantsInfo[0]['weight']=param.weight;
    }
    product.variants = variantsInfo;
    await product.save({
      update: true,
    });
    let list =await this.ProductInfoEntity.find({
      where:{
        productId:Number(param.productId)
      }
    })

    list[0].operatorId=param.operatorId;
    list[0].title=product.title;
    list[0].bodyHtml=product.body_html;
    list[0].vendor=product.vendor;
    list[0].productId=product.id;
    list[0].handle=product.handle;
    list[0].createdAt=product.created_at;
    list[0].updatedAt=product.updated_at;
    list[0].productType=product.product_type;
    list[0].status=product.status;
    list[0].tags=product.tags;
    list[0].options=product.options;
    list[0].multipleAttributes=param.multipleAttributes;
    list[0].adminGraphqlApiId=product.admin_graphql_api_id;
    list[0].images=product.images;
    list[0].variants=product.variants;
    this.ProductInfoEntity.save(list[0]);
  }
  async delete(ids){
    const shopify = shopifyApi({
      apiKey: '6b6c46e00bf65965da735832eb641db8',
      apiSecretKey: 'c0e5ca5f3e7167e5e3adca30aefabf17',
      adminApiAccessToken:'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',
      scopes: ['read_products','write_products','read_product_listings','read_inventory','write_inventory'],
      hostName: '9d847d-2.myshopify.com',
      hostScheme: 'https',
      apiVersion: LATEST_API_VERSION,
      isEmbeddedApp: false,
      isCustomStoreApp:true,
      restResources
    });
    const sessionId = shopify.session.getOfflineId('9d847d-2.myshopify.com')
    const session = new Session({
      id: sessionId,
      shop: '9d847d-2.myshopify.com',
      state: 'state',
      isOnline: false,
    })
    
    let idArr;
      if (ids instanceof Array) {
      idArr = ids;
      } else {
      idArr = ids.split(',');
      }
      for (const id of idArr) {
        let list =await this.ProductInfoEntity.find({
          where:{
            id:Number(id)
          }
        })
        await shopify.rest.Product.delete({session: session,id: Number(list[0].productId)});
        await this.ProductInfoEntity.delete({id:id});
      }
    
    
  }
  /**
   * 执行entity分页
   */
  async add(param) {
    const shopify = shopifyApi({
      apiKey: '6b6c46e00bf65965da735832eb641db8',
      apiSecretKey: 'c0e5ca5f3e7167e5e3adca30aefabf17',
      adminApiAccessToken:'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',
      scopes: ['read_products','write_products','read_product_listings','read_inventory','write_inventory'],
      hostName: '9d847d-2.myshopify.com',
      hostScheme: 'https',
      apiVersion: LATEST_API_VERSION,
      isEmbeddedApp: false,
      isCustomStoreApp:true,
      restResources
    });
    const sessionId = shopify.session.getOfflineId('9d847d-2.myshopify.com')
    const session = new Session({
      id: sessionId,
      shop: '9d847d-2.myshopify.com',
      state: 'state',
      isOnline: false,
    })
    // const session = await shopify.session.customAppSession("9d847d-2.myshopify.com");
    // const client = await new shopify.clients.Rest({ session: session })
    const product:any = await  new shopify.rest.Product({session: session});
    let variantsInfo=[
      {
        "option1": "Default Title",
      }
    ];
    product.title =param.title;
    if(param.bodyHtml){
      product.body_html = param.bodyHtml;
    }
    if(param.vendor){
      product.vendor = param.vendor;
    }
    if(param.productType){
      product.product_type = param.productType[ param.productType.length-1];
    }
    let imagesLists:any = [];
    if(param.images){
      for(let i=0,m=param.images.length;i<m;i++){
        imagesLists.push({
          attachment:param.images[i]
        })
        if(param.images.length-1==i){
          if(imagesLists.length){
            product.images =imagesLists;
          }  
        }
      }
    }

    if(param.tags.length){
      product.tags=param.tags
    }
    if(param.price){
      variantsInfo[0]['price']=param.price
    }
    if(param.compareAtPrice){
      variantsInfo[0]['compare_at_price']=param.compareAtPrice
    }
    if(param.taxable){
      variantsInfo[0]['taxable']=param.taxable?true:false;
    }
    if(param.sku){
      variantsInfo[0]['sku']=param.sku;
    }
    if(param.barcode){
      variantsInfo[0]['barcode']=param.barcode;

    }
    if(param.weightUnit){
      variantsInfo[0]['weight_unit']=param.weightUnit;
    }
    if(param.weight){
      variantsInfo[0]['weight']=param.weight;
    }
    product.variants = variantsInfo;
    await product.save({
      update: true,
    });
    if(product.errors){
      return {
        code:500,
        message:JSON.stringify(product.errors)
      }
    }

    const product_listing = new shopify.rest.ProductListing({session: session});
    product_listing.product_id = product.id;
    await product_listing.save({
      update: true,
    });
    let ProductInfo=new ProductInfoEntity();
    ProductInfo.operatorId=param.operatorid;
    ProductInfo.title=product.title;
    ProductInfo.bodyHtml=product.body_html;
    ProductInfo.vendor=product.vendor;
    ProductInfo.productId=product.id;
    ProductInfo.handle=product.handle;
    ProductInfo.createdAt=product.created_at;
    ProductInfo.updatedAt=product.updated_at;
    ProductInfo.productType=product.product_type;
    ProductInfo.status=product.status;
    ProductInfo.tags=product.tags;
    ProductInfo.options=product.options;
    ProductInfo.multipleAttributes=param.multipleAttributes;
    ProductInfo.adminGraphqlApiId=product.admin_graphql_api_id;
    // let imagesList:any=product.images||[];
    // for(let i = 0,m=imagesList.length;i<m;i++ ){
    //   let ImageInfo=new ImageInfoEntity();
    //   ImageInfo.imageId =  imagesList[i].id;
    //   ImageInfo.position = imagesList[i].position;
    //   ImageInfo.productId = imagesList[i].product_id;
    //   ImageInfo.createdAt = imagesList[i].created_at;
    //   ImageInfo.updatedAt = imagesList[i].updated_at;
    //   ImageInfo.width = imagesList[i].width;
    //   ImageInfo.height = imagesList[i].height;
    //   ImageInfo.src = imagesList[i].src;
    //   ImageInfo.adminGraphqlApiId = imagesList[i].admin_graphql_api_id;
    //   ImageInfo.variantIds = imagesList[i].variant_ids;
    //   this.ImageInfoEntity.save(ImageInfo)
    // }
    // let variantsList:any = product.variants||[];
    ProductInfo.images=product.images;
    ProductInfo.variants=product.variants;
    // for(let i = 0,m=variantsList.length;i<m;i++ ){
      
    //   let  VariantInfo=new VariantInfoEntity();
    //   VariantInfo.variantId =  variantsList[i].id;
    //   VariantInfo.position = variantsList[i].position;
    //   VariantInfo.productId = variantsList[i].product_id;
    //   VariantInfo.createdAt = variantsList[i].created_at;
    //   VariantInfo.updatedAt = variantsList[i].updated_at;
    //   VariantInfo.title =variantsList[i].title;
    //   VariantInfo.price = variantsList[i].price;
    //   VariantInfo.sku =variantsList[i].sku;
    //   VariantInfo.inventoryPolicy = variantsList[i].inventory_policy;
    //   VariantInfo.compareAtPrice =variantsList[i].compare_at_price;
    //   VariantInfo.option =[variantsList[i].option1,variantsList[i].option2,variantsList[i].option3];
    //   VariantInfo.taxable =variantsList[i].taxable;
    //   VariantInfo.barcode = variantsList[i].barcode;
    //   VariantInfo.grams =variantsList[i].grams;
    //   VariantInfo.imageId =variantsList[i].image_id;
    //   if(variantsList[i].presentment_prices){
    //     VariantInfo.presentmentPrices = variantsList[i].presentment_prices
    //   }
    //   VariantInfo.weight =variantsList[i].weight;
    //   VariantInfo.weightUnit =variantsList[i].weight_unit;
    //   VariantInfo.inventoryItemId =variantsList[i].inventory_item_id;
    //   VariantInfo.inventoryQuantity =variantsList[i].inventory_quantity;
    //   VariantInfo.adminGraphqlApiId =variantsList[i].admin_graphql_api_id;
    //   this.VariantInfoEntity.save(VariantInfo)
    // }
    this.ProductInfoEntity.save(ProductInfo);
    return {
      code:200,
      message:'成功'
    }
  }

}
