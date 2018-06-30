/*
 * @Author: yuwei -资产借用
 * @Date: 2018-06-30 14:27:39 
* @Last Modified time: 2018-06-30 14:27:39 
 */
import {_local} from './local';
const ledgerBorrow = {
  selectUseDeptList:`${_local}/dept/selectUseDeptList`,//管理部门下拉框
  findBorrowRecordList:`${_local}/borrowController/findBorrowRecordList`,//借用记录查询列表
}

export default ledgerBorrow;