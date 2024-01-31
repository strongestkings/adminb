import { BaseEntity } from '@cool-midway/core';
import { BeforeRemove, Column, Entity,PrimaryGeneratedColumn } from 'typeorm';

/**
 * 商品模块-商品信息
 */
@Entity('product_info')
export class ProductInfoEntity extends BaseEntity {

  @Column({ comment: '描述', length: 50 ,nullable:true})
  bodyHtml: string;

  @PrimaryGeneratedColumn({type: 'int', comment: '编号'})
  id: number;
  

  @Column({type: 'bigint', comment: '图片编号'})
  productId: number;


//   @Column({
//     comment: '价格',
//     type: 'decimal',
//     precision: 5,
//     scale: 2,
//   })
//   price: number;

  @Column({type: 'text',  comment: '人性化字符串，更具title自动生成',nullable:true })
  handle: string;

  @Column({ length: 255 ,comment: '创建时间',nullable:true })
  createdAt: string;

  @Column({ length: 255 ,comment: '更新时间',nullable:true})
  updatedAt: string;

  @Column({ type: 'text',  comment: '产品类型',nullable:true })
  productType: string;

  @Column({  length: 255 ,comment: '发布状态',nullable:true })
  status: string;

  @Column({  type: 'json',comment: '标签',nullable:true })
  tags: string[];

  @Column({   type: 'text',comment: '标题',nullable:true  })
  title: string;

  @Column({   type: 'text', comment: '产品供应商名字',nullable:true })
  vendor: string;
  
  @Column({   type: 'json', comment: '自定义产品属性',nullable:true })
  options: any[];

  @Column({   type: 'json', comment: '图片相关',nullable:true })
  images: any[];
  
  @Column({   type: 'json', comment: '变体相关',nullable:true })
  variants: any[];

  @Column({ type: 'tinyint',comment: '是否多属性',nullable:true })
  multipleAttributes:boolean;
  
  @Column({ comment: '可能有用的ID',  type: 'text',nullable:true  })
  adminGraphqlApiId: string;

  @Column({ type: 'int', comment: '操作人ID'})
  operatorId: number;
  

}
