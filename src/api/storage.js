/*库房管理 */
import {_local} from './local';
const storage = {
  //测试使用的列表
  testList:`${_local}/rrpairOrderController/selectRrpairList`,
  testList2:`${_local}/transferController/selectTransferList`,
  //公共接口
  selectUseDeptList:`${_local}/dept/selectUseDeptList`,//管理部门下拉框
  selectDeliveryForgList:`${_local}/delivery/selectDeliveryForgList`,//供应商下拉框
  getAdress:`${_local}/dept/selectDeptAddress`,//科室选择后获取下拉框
  //我的送货单
  selectZCDeliveryList:`${_local}/delivery/selectZCDeliveryList`,//查询我的送货单列表
  selectZCDeliveryDetail:`${_local}/delivery/selectZCDeliveryDetail`,//查询我的送货单详情
  //验收送货单
  selectZCDeliveryAndDetail:`${_local}/delivery/selectZCDeliveryAndDetail`,//查询送货单和明细
  updateDeliveryZc:`${_local}/delivery/updateDeliveryZc`,//验收送货单
  //入库管理
  insertImport:`${_local}/import/insertImport`,//添加入库单
  selectImportList:`${_local}/import/selectImportList`,//查询设备入库单列表
  selectImportDetail:`${_local}/import/selectImportDetail`,//查询设备入库单详情
  selectImportParticularsList:`${_local}/import/selectImportParticularsList`,//查询设备入库明细
  //出库管理
  queryOutportAssetList:`${_local}/outportAsset/queryOutportAssetList`,//查询设备出库单列表
  queryOutportAssetDetailList:`${_local}/outportAsset/queryOutportAssetDetailList` ,//查询设备出库单详情
  queryOutportAssetDetails:`${_local}/outportAsset/queryOutportAssetDetails`,//查询设备明细列表
  //领用
  addOutportAsset:`${_local}/outportAsset/addOutportAsset`,//确认出库
  queryAssetListByImport: `${_local}/outportAsset/queryAssetListByImport`, //设备出库 -添加产品 查询列表
  //退库
  queryOutportAssetByAssetsRecordGuid:`${_local}/outportAsset/queryOutportAssetByAssetsRecordGuid`,//资产退库--通过资产编码查询产品
  addOutportAssetOut:`${_local}/outportAsset/addOutportAssetOut`,//资产退库 确认出库
}

export default storage;