import {_local} from './local';
const inventory = {
    submitInventoryOrders:`${_local}/stockCount/createStockCount`,//提交清查记录新增
    selectUseDeptList:`${_local}/dept/selectUseDeptList`,//获取使用科室下拉框
    queryStockCountList:`${_local}/stockCount/queryStockCountList`,//获取清查列表
    getAssetInfo: `${_local}/assetsRecordController/selectAssetsRecordDetail`,//获取回显数据详情
}

export default inventory;