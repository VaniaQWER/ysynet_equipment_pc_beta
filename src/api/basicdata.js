import {_local} from './local';
const basicdata = {
 // getTreeData:`${_local}/maintainOrderController/selectMaintainTemplateEquipment`,//获取树结构的保养模板信息
  addMaintainTmp:`${_local}/maintainOrderController/insertMaintainTemplate`,//添加保养模版（1级）
  addEuoteTmp:`${_local}/maintainOrderController/insertMaintainTemplate`,//添加二级模板（2级）
  addEuoteTmpModal:`${_local}/maintainOrderController/insertMaintainTemplateDetail`,//添加引用模板
  queryOneModule:`${_local}/maintainOrderController/selectMaintainTemplate`,///查询一级模板以及下拉框内容
  queryTwoModule:`${_local}/maintainOrderController/selectMaintainTemplateDetail`,//查询二级项目-------------
  queryAllProject:`${_local}/maintainOrderController/searchMaintainType`,//查询引用新增-------------
  queryEquipmentTmp:`${_local}/maintainOrderController/selectEquipmentInTemplate`,//查询某级下面的transfer设备
  editEEquipmentTmp:`${_local}/maintainOrderController/insertTemplataEquipment`,//改变transfer设备方向
  deleteOne:`${_local}/maintainOrderController/deleteMaintainTemplate`,//删除一级tree-------------
  deleteTwo:`${_local}/maintainOrderController/deleteMaintainTemplateDetail`,//删除二级tree-------------
  editModuleName:`${_local}/maintainOrderController/updateMaintainTemplateName`,//编辑名称-------------

}
export default basicdata;