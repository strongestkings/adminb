import { BaseEntity } from '@cool-midway/core';
import { BeforeRemove, Column, Entity,PrimaryGeneratedColumn } from 'typeorm';

/**
 * 商品模块-商品信息
 */
@Entity('pruducts_variant_info')
export class  VariantInfoEntity extends BaseEntity {

    @PrimaryGeneratedColumn({type: 'int', comment: '编号'})
    id: number;
  
    @Column({type: 'bigint', comment: '图片编号'})
    variantId: number;
  
    @Column({ comment: '创建时间', length: 255,nullable:true  })
    createdAt: string;
  
    @Column({ comment: '更新时间', length: 255 ,nullable:true})
    updatedAt: string;

    @Column({ comment: '产品的条形码、UPC 或 ISBN 号。', length: 255 ,nullable:true})
    barcode: string;

    @Column({ comment: '调整或销售前商品的原始价格。', length: 255 ,nullable:true})
    compareAtPrice: string;
    
    @Column({ type: 'int',comment: '产品型号的重量（以克为单位）。',nullable:true })
    grams: number;

    @Column({ type: 'bigint',comment: '图片编号',nullable:true })
    imageId: number;

    @Column({ type: 'bigint',comment: '库存商品 ID',nullable:true })
    inventoryItemId: number;

    @Column({ length: 255 ,comment: '库存政策',nullable:true })
    inventoryPolicy: string;

    @Column({ type: 'int',comment: '库存数量',nullable:true })
    inventoryQuantity: number;

    @Column({type: 'json', comment: '店主用来定义产品变型的自定义属性。您可以为产品变型定义三个选项：option1、option2、option3。默认值：Default Title。该字段是、和 字段title的串联。更新字段会更新字段',nullable:true})
    option: string[];

    @Column({type: 'json', comment: '以商店启用的每种展示货币表示的变体展示价格和比较价格列表',nullable:true})
    presentmentPrices: any[];

    @Column({ type: 'int',comment: '位置',nullable:true })
    position: number;

    @Column({ length: 255 ,comment: '价格',nullable:true })
    price: string;

    @Column({type: 'bigint', comment: '产品编号',nullable:true})
    productId: number;
    
    @Column({ length: 255 ,comment: '存货单元（货号）',nullable:true })
    sku: string;

    @Column({ type: 'tinyint',comment: '是否收税',nullable:true })
    taxable: boolean;

    @Column({ length: 255 ,comment: '标题',nullable:true })
    title: string;

    @Column({ type: 'int', comment: '重量',nullable:true })
    weight: number;

    @Column({ length: 255 ,comment: '重量单位',nullable:true })
    weightUnit: string;

    @Column({ comment: '可能有用的ID',  type: 'text',nullable:true  })
    adminGraphqlApiId: string;
}
