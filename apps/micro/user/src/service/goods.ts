import { Provide } from '@midwayjs/core';
import {
  BaseRpcService,
  CoolRpcService,
  CoolRpcTransaction,
} from '@cool-midway/rpc';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Brackets, Repository, QueryRunner } from 'typeorm';
import { TestGoodsEntity } from '../entity/goods';
import { CoolCommException } from '@cool-midway/core';

/**
 * 描述
 */
@Provide()
@CoolRpcService({
  entity: TestGoodsEntity,
  method: ['add', 'delete', 'update', 'info', 'list', 'page'],
  pageQueryOp: {
    fieldEq: ['status'],
    keyWordLikeFields: ['title', 'pic'],
  }
})
export class TestGoodsService extends BaseRpcService {
  @InjectEntityModel(TestGoodsEntity)
  testGoodsEntity: Repository<TestGoodsEntity>;


  async page(query: any): Promise<{ list: any; pagination: { page: number; size: number; total: number; }; }> {
    const { fieldEq = [], keyWordLikeFields = [] } = this.curdOption.pageQueryOp
    query = Object.assign({ page: 1, size: 15 }, query)

    const qb = this.testGoodsEntity.createQueryBuilder();

    // 字段查询
    fieldEq.forEach((key: string) => {
      if (query[key]) {
        qb.where(`${key} = :${key}`, { [key]: query[key] });
      }
    });

    // 构建 OR 条件
    if (query.keyWord) {
      qb.andWhere(
        new Brackets(subQb => {
          keyWordLikeFields.forEach((key: string) => {
            subQb.orWhere(`${key} LIKE :${key}`, { [key]: `%${query.keyWord}%` });
          });
        })
      );
    }


    // 分页查询
    const [list, total] = await qb
      .skip((query.page - 1) * query.size)
      .take(query.size)
      .getManyAndCount();

    return {
      list,
      pagination: {
        page: query.page,
        size: query.size,
        total,
      },
    };
  }

  /**
   * 分布式事务测试
   * @param rpcTransactionId 事务ID
   * @param queryRunner 事务执行器
   */
  @CoolRpcTransaction()
  async transaction(params, rpcTransactionId?, queryRunner?: QueryRunner) {
    const data = {
      title: '商品标题',
      pic: 'https://xxx',
      price: 99.0,
      type: 1,
    };
    await queryRunner.manager.save(TestGoodsEntity, data);
    throw new CoolCommException('测试抛出异常回滚事务');
  }
}
