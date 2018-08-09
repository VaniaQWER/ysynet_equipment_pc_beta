

import {_local} from './local';

const borrowMgt = {
  BorrowRecordList: `${_local}/borrowController/findBorrowRecordList`,    //查询借用记录列表
  updateBorrow: `${_local}/borrowController/updateBorrow`,      //归还
}

export default borrowMgt;