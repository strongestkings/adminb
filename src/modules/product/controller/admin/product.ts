import { CoolController, BaseController } from '@cool-midway/core';
import { Inject, Provide } from "@midwayjs/decorator";
import { ProductInfoEntity } from '../../entity/product';
import { ProductService } from '../../service/product';
import { ImageInfoEntity } from '../../entity/image';
import { VariantInfoEntity } from '../../entity/variant';
import { BaseSysUserEntity } from '../../../base/entity/sys/user';

@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ProductInfoEntity,
  pageQueryOp:{
    select: ['a.*','b.name AS userName'],
    join: [
      {
        entity: BaseSysUserEntity,
        alias: 'b',
        condition: 'a.operatorId = b.id',
        type: 'innerJoin',
      },
    
    ],
  },
  service: ProductService
})

export class AdminDemoGoodsController extends BaseController {
    @Inject()
	ProductService: ProductService;

}
