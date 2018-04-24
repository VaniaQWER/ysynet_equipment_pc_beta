import {_local} from './local';
const devalue = {
  getDevalueList:`${_local}/equipmentDepreciation/selectAssetsCapitalStructureList`,//获取折旧记录列表
  subWithDraw:`${_local}/equipmentDepreciation/insertEquipmentDepreciation`,//提交计提
  getDetailTable:`${_local}/equipmentDepreciation/selectEquimentDepreciationPayList`,//获取折旧记录详细列表
  selectUseDeptList:`${_local}/dept/selectUseDeptList`,//获取使用科室下拉框
   
}
export default devalue;