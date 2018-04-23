/**
 * @file 档案管理 - 资产档案
 * @since 2018/04/20
 */
import promiseRequest from '../utils/promise_request';
import {_local} from './local';
const ledger = {
  getSelectEquipmentList: `${_local}/assetsRecordController/selectEquipmentList`,// 选择设弹框-设备列表查询
  getSelectFOrgList: `${_local}/StaticDataController/selectFOrgList`,// 查询供应商列表
  getSelectCertList: `${_local}/assetsRecordController/selectCertList`,// 查询注册证列表
  /**
   * 在添加设备提交之后的数据给选择设备弹框列表查询,然后设备列表查询的添加按钮带出一条信息,将设备id和品牌id点击保存按钮的时候传给后台
   */
  getInsertEquipment: `${_local}/assetsRecordController/insertEquipment`,// 添加设备 - 新增字典弹框
  getInsertAssetsRecord: `${_local}/assetsRecordController/insertAssetsRecord`, //新增/编辑资产档案 - 保存按钮
  selectStaticDataListTfBrand: `${_local}/StaticDataController/selectStaticDataList`
}
export default ledger;
// 品牌
// export async function selectStaticDataListTfBrand(options) {
//   return promiseRequest(`${_local}/StaticDataController/selectStaticDataList?code=TF_BRAND&name=''`, options);
// }
// 计量单位
export async function selectStaticDataListMeteringUnit(options) {
  return promiseRequest(`${_local}/StaticDataController/selectStaticDataList?code=UNIT`, options);
}