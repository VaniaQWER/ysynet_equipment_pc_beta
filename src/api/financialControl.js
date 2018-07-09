import {_local} from './local';
const financialControl = {
  selectZCInvoiceList:`${_local}/invoiceZcController/selectZCInvoiceList`,//设备发票-列表
  selectUseDeptList:`${_local}/dept/selectUseDeptList`,//管理部门下拉框
  selectFOrgList:`${_local}/StaticDataController/selectFOrgList`,//获取供应商列表
  selectInvoiceDetail:`${_local}/invoiceZcController/selectInvoiceDetail`,//设备发票详情的table
  updateZCInvoiceFstate:`${_local}/invoiceZcController/updateZCInvoiceFstate`,//审核发票
}
export default financialControl;