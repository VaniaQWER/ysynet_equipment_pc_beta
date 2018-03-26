import {_local} from './local';
const upkeep = {
  getAssetInfo: `${_local}/assetsRecordController/selectAssetsRecordDetail`,//通过资产编号带出资产信息
  submitAssetInfo:`${_local}/maintainOrderController/insertMaintainOrder`,//提交保养登记表单
  listToDetails:`${_local}/maintainOrderController/selectMaintainOrderDetail`,//立标进入详情获取对应信息
  
}

export default upkeep;