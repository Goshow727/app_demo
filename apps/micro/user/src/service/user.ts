import { Inject, Provide } from '@midwayjs/core';
import {
    BaseRpcService,
    CoolRpcService,
} from '@cool-midway/rpc';
// import axios from 'axios';

import { UserInfoEntity } from '../entity/user_info';
// import { CoolCommException } from '@cool-midway/core';
import { TestGoodsEntity } from '../entity/goods';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';

import { Utils } from '../utils/utils';



/**
 * 描述
 */
@Provide()
@CoolRpcService({
    entity: TestGoodsEntity,
    method: ['add', 'delete', 'update', 'info', 'list', 'page']
})


export class UserService extends BaseRpcService {
    @InjectEntityModel(UserInfoEntity)
    userInfoEntity: Repository<UserInfoEntity>;

    @Inject()
    utils: Utils;


}
