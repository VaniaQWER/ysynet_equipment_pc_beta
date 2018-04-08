import {_local} from './local';
const upkeep = {
  getAssetInfo: `${_local}/assetsRecordController/selectAssetsRecordDetail`,//通过资产编号带出资产信息
  submitAssetInfo:`${_local}/maintainOrderController/insertMaintainOrder`,//提交保养登记表单
  listToDetails:`${_local}/maintainOrderController/selectMaintainOrderDetail`,//立标进入详情获取对应信息
  getTreeData:`${_local}/maintainOrderController/selectTemplateAndTypeList`,//获取保养模板树状结构
  queryAllProject:`${_local}/maintainOrderController/searchMaintainType`,//查询引用新增-------------
  //保养计划列表
  planList:`${_local}/maintainOrderController/selectMaintainPlanList`,//保养计划列表

  //新建计划添加
  insertMaintainPlan:`${_local}/maintainOrderController/insertMaintainPlan`,//新建计划添加
  selectUseDeptList:`${_local}/dept/selectUseDeptList`,//资产弹窗选择科室
  getAssetsListInfo:`${_local}/maintainOrderController/selectAssetsListGetMainType`,//根据资产的GUID获取资产表格给的内容
}

export default upkeep;