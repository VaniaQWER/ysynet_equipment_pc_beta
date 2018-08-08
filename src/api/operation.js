import promiseRequest from '../utils/promise_request';
import {_local} from './local';
export async function queryAssets(options) {
  return promiseRequest('/meqm/assetsRecordController/selectAssetsRecordDetail', options);
}

const operation={
  queryManagerDeptListByUserId:`${_local}/dept/queryManagerDeptListByUserId`,//查询当前用户关联管理科室
  queryApprovalList:`${_local}/applyZcController/queryApprovalList`,//审批管理-列表
}

export default operation;