/*
 * @Author: yuwei -资产借用
 * @Date: 2018-06-30 14:27:39 
* @Last Modified time: 2018-06-30 14:27:39 
 */
import {_local} from './local';
const ledgerBorrow = {
  selectUseDeptList:`${_local}/dept/selectUseDeptList`,//管理部门下拉框
  findBorrowRecordList:`${_local}/borrowController/findBorrowRecordList`,//借用记录查询列表
  BorrowRecordList: `${_local}/borrowController/findBorrowRecordList`,    //查询借用记录列表
  updateBorrow: `${_local}/borrowController/updateBorrow`,      //归还
  mgtDeptList: `${_local}/dept/queryManagerDeptListByUserId`,   //管理科室
  addBorrow: `${_local}/borrowController/addBorrow`,            //新增借出
  queryAssetsList: `${_local}/borrowController/queryAssetsList`, //选择资产列表
}

export default ledgerBorrow;