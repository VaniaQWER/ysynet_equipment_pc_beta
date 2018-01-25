//import {_local} from './local';
export default {
 // selectAssetsList: `${_local}/meqm/assetsRecordController/selectAssetsList`,//查询采购汇总列
 selectAssetsList: `/meqm/assetsRecordController/selectAssetsList`, //查询资产列表
 selectAssetsRecordDetail: `/meqm/assetsRecordController/selectAssetsRecordDetail`, // 根据资产档案GUID查询资产详情 
 updateAssetsRecordInfo: `/meqm/assetsRecordController/updateAssetsRecordInfo`, // 修改资产档案信息 
 selectAssetsExtendList: `/meqm/assetsRecordController/selectAssetsExtendList`, // 根据资产档案GUID查询资产配件信息 
 deleteAssetsExtend: `/meqm/assetsRecordController/deleteAssetsExtend`, //  删除附件信息
 searchCertList: `/meqm/equipmentAdd/searchCertList`, // 根据资产 证件GUID 查询证件信息
 selectCertInfoList: `/meqm/assetsRecordController/selectCertInfoList`, // 根据资产编号assetsRecord 查询资产附件列表
 selectEqOperationInfoList: `/meqm/assetsRecordController/selectEqOperationInfoList`, // 根据资产GUID 查询资产档案操作记录列表

 //维修
 selectRrpairList: `/meqm/rrpairOrderController/selectRrpairList`, //查询设备维修列表
 selectRrpairDetailList: `/meqm/rrpairOrderController/selectRrpairDetailList`, //查询设备维修详情列表
 selectEqOperationList: `/meqm/rrpairOrderController/selectEqOperationList`, //维修单详情操作记录



};