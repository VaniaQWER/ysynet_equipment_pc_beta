import {_local} from './local';
export default {
 picUploadUrl: `${_local}/meqm/ftp/post`,//图片上传
 selectAssetsList: `${_local}/meqm/assetsRecordController/selectAssetsList`, //查询资产列表
 selectAssetsRecordDetail: `${_local}/meqm/assetsRecordController/selectAssetsRecordDetail`, // 根据资产档案GUID查询资产详情 
 updateAssetsRecordInfo: `${_local}/meqm/assetsRecordController/updateAssetsRecordInfo`, // 修改资产档案信息 
 selectAssetsExtendList: `${_local}/meqm/assetsRecordController/selectAssetsExtendList`, // 根据资产档案GUID查询资产配件信息 
 deleteAssetsExtend: `${_local}/meqm/assetsRecordController/deleteAssetsExtend`, //  删除附件信息
 searchCertList: `${_local}/meqm/equipmentAdd/searchCertList`, // 根据资产 证件GUID 查询证件信息
 selectCertInfoList: `${_local}/meqm/assetsRecordController/selectCertInfoList`, // 根据资产编号assetsRecord 查询资产附件列表
 selectEqOperationInfoList: `${_local}/meqm/assetsRecordController/selectEqOperationInfoList`, // 根据资产GUID 查询资产档案操作记录列表

 //报修登记
 insertOrUpdateRrpair: `${_local}/meqm/rrpairOrderController/insertOrUpdateRrpair`,
 selectRrpairFittingList: `${_local}/meqm/rrpairOrderController/selectRrpairFittingList`, //查询维修配件使用列表
 insertRrpairFitting: `${_local}/meqm/rrpairOrderController/insertRrpairFitting`, //资产列表添加维修附件信息
 insertRrpairExtend: `${_local}/meqm/rrpairOrderController/insertRrpairExtend`, //手动添加维修附件信息
 deleteRrpairFitting: `${_local}/meqm/rrpairOrderController/deleteRrpairFitting`, //删除当前维修配件
 //指派维修提交
 designateInOrOut: `${_local}/meqm/rrpairOrderController/designateInOrOut`,


 //维修记录
 selectRrpairList: `${_local}/meqm/rrpairOrderController/selectRrpairList`, //查询设备维修列表
 selectRrpairDetailList: `${_local}/meqm/rrpairOrderController/selectRrpairDetailList`, //查询设备维修详情列表
 selectEqOperationList: `${_local}/meqm/rrpairOrderController/selectEqOperationList`, //维修单详情操作记录
 updateRrpairOrderFstate: `${_local}/meqm/rrpairOrderController/updateRrpairOrderFstate`, //维修工单状态扭转

 //验收
 insertRrpairOrderAcce: `${_local}/meqm/rrpairOrderController/insertRrpairOrderAcce`, //验收维修单

};