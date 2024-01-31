import { BaseEntity } from '@cool-midway/core';
import { BeforeRemove, Column, Entity,PrimaryGeneratedColumn } from 'typeorm';

/**
 * 商品模块-商品信息
 */
@Entity('pruducts_image_info')
export class ImageInfoEntity extends BaseEntity {

  @PrimaryGeneratedColumn({type: 'int', comment: '编号'})
  id: number;

  @Column({type: 'bigint', comment: '图片编号'})
  imageId: number;

  @Column({ comment: '创建时间', length: 255,nullable:true })
  createdAt: string;

  @Column({ comment: '更新时间', length: 255,nullable:true })
  updatedAt: string;

  @Column({type: 'int',  comment: '位置',nullable:true})
  position: number;

  @Column({type: 'bigint', comment: '产品编号',nullable:true})
  productId: number;

  @Column({type: 'json', comment: '变体编号',nullable:true})
  variantIds: number[];

  @Column({ type: 'text',  comment: '指定产品图像的地址',nullable:true })
  src: string;

  @Column({ comment: '宽度', type: 'int',nullable:true  })
  width: number;

  @Column({ comment: '高度',  type: 'int',nullable:true  })
  height: number;

  @Column({ comment: '可能有用的ID',  type: 'text',nullable:true  })
  adminGraphqlApiId: string;
}
