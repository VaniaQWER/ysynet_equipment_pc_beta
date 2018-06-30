/*
 * @Author: yuwei - 效益分析API
 * @Date: 2018-06-26 11:50:34 
* @Last Modified time: 2018-06-26 11:50:34 
 */
import {_local ,FTP} from './local';
const benefitAnalysis = {
  selectUseDeptList:`${_local}/dept/selectUseDeptList`,//管理部门下拉框
  selectBenefitRunList: `${_local}/benefitController/selectBenefitRunList`,//查询效益分析运行数据
  importBenefitRunList:`${_local}/benefitController/importBenefitRunList`,//导入效益分析运行数据
  selectBenefitIncomeList:`${_local}/benefitController/selectBenefitIncomeList`,//查询效益分析收入数据
  importBenefitIncomeList:`${_local}/benefitController/importBenefitIncomeList`,//导入效益分析收入数据
  selectBenefitPayList:`${_local}/benefitController/selectBenefitPayList`,//查询效益分析支出数据
  importBenefitPayList:`${_local}/benefitController/importBenefitPayList`,//导入效益分析支出数据

  operationFile:`${FTP}/meqmFile/operation.xlsx`,//运行数据导入模板
  expensesFile:`${FTP}/meqmFile/expenses.xlsx`,//支出数据导入模板
  incomeFile:`${FTP}/meqmFile/income.xlsx`,//收入数据导入模板
}

export default benefitAnalysis;