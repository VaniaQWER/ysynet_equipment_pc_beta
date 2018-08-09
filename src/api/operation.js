import promiseRequest from '../utils/promise_request';
import {_local} from './local';
export async function queryAssets(options) {
  return promiseRequest('/meqm/assetsRecordController/selectAssetsRecordDetail', options);
}

const operation={
  queryManagerDeptListByUserId:`${_local}/dept/queryManagerDeptListByUserId`,//查询当前用户关联管理科室
  queryApprovalList:`${_local}/applyZcController/queryApprovalList`,//审批管理-列表
  /*工程师统计 */
  selectEngineerCountChart:`${_local}/rrpairOrderController/selectEngineerCountChart`,//工程师统计图表数据
  selectEngineerCount:`${_local}/rrpairOrderController/selectEngineerCount`,//工程师统计列表
}

export default operation;