/**
 * @file 档案管理 - 资产档案
 * @since 2018/04/20
 */
import {_local} from './local';
const ledger = {
  getSelectEquipmentList: `${_local}/assetsRecordController/selectEquipmentList`,// 选择设弹框-设备列表查询
  getSelectFOrgList: `${_local}/StaticDataController/selectFOrgList`,// 查询供应商列表
  getSelectCertList: `${_local}/assetsRecordController/selectCertList`,// 查询注册证列表
  getInsertEquipment: `${_local}/assetsRecordController/insertEquipment`,// 添加设备 - 新增字典弹框
  getInsertAssetsRecord: `${_local}/assetsRecordController/insertAssetsRecord` //新增/编辑资产档案 - 保存按钮
}
export default ledger;