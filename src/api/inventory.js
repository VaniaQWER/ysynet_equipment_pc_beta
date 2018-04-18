import {_local} from './local';
const inventory = {
    submitInventoryOrders:`${_local}/login/getUserInfo`,//提交盘点记录新增
    getAssetInfo: `${_local}/assetsRecordController/selectAssetsRecordDetail`,//获取回显数据详情
}

export default inventory;