import promiseRequest from '../utils/promise_request';

export async function queryAssets(options) {
  return promiseRequest('/meqm/assetsRecordController/selectAssetsRecordDetail', options);
}
