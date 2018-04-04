import React from 'react';
import { Badge } from 'antd';
export const repairCommonDataSource = [
  {
    title: '维修单号',
    dataIndex: 'rrpairOrderNo',
    width: 160
  }, 
  {
    title: '单据状态',
    dataIndex: 'orderFstate',
    width: 100,
    filters: [
      { text: '待接修', value: '10' },
      { text: '已指派', value: '20' },
      { text: '维修中', value: '30' },
      { text: '已拒绝', value: '80' },
      { text: '关闭', value: '90' },
    ],
    onFilter: (value, record) => record.orderFstate.indexOf(value) === 0,
    sorter: false,
    render: text =>  <Badge status={repairData[text].color} text={ repairData[text].text} /> 

  },
  {
    title: '资产名称',
    dataIndex: 'equipmentStandardName',
    width: 180
  },
  {
    title: '使用科室',
    dataIndex: 'deptName',
    width: 100,
  },
  {
    title: '管理员',
    dataIndex: 'custodian',
    width: 80,
  },
  {
    title: '报修人',
    dataIndex: 'rrpairUsername',
    width: 80
  },
  {
    title: '报修时间',
    dataIndex: 'createDate',
    width: 130
  }
]
export const ledgerData = {
  "01": {
    text: "正常",
    color: 'green'
  },
  "02": {
    text: "故障",
    color: 'red'
  },
  "03": {
    text: "报废",
    color: 'gray'
  },
  "04": {
    text: "借出",
    color: 'gold'
  },
  "05": {
    text: "闲置",
    color: 'blue'
  },
  null :{
    text: "无",
    color: 'gold'
  }
}
export const repairData = {
  //10申请，20指派，30维修中,50待验收，80已拒绝 90已关闭 
  "10": {
    text: "待接修",
    color: 'processing'
  },
  "20": {
    text: "已指派",
    color: 'success'
  },
  "30": {
    text: "维修中",
    color: 'success'
  },
  "50": {
    text: "待验收",
    color: 'warning'
  },
  "80": {
    text: "已拒绝",
    color: 'error'
  },
  "90": {
    text: "已关闭",
    color: 'error'
  },
  null :{
    text: "default"
  }
}

export const selectOption = {
  urgentFlag: [//紧急度
    { text: "紧急", value: "10" },
    { text: "急", value: "20" },
    { text: "一般", value: "30" },
  ],
  rrpairSend: [//是否送修
    { text: "是", value: "00" },
    { text: "否", value: "01" },
  ],
  spare: [ // 有无备用
    { text: "有备用", value: "00" },
    { text: "无备用", value: "01" },
  ],
  guaranteeFlag: [//是否在保
    { text: "在保", value: "01" },
    { text: "出保", value: "02" },
  ],
  faultDescribe: [ // 故障现象
    { text: "部分功能失效", value: "00" },
    { text: "开机后死机", value: "01" },
    { text: "性能指标偏离", value: "03" },
    { text: "不规则或偶发故障", value: "04" },
    { text: "其他", value: "02" }
  ],
  useFstate: [ //是否停用
    { text: "是", value: "02" },
    { text: "否", value: "01" },
  ],
  offCause: [ //关闭原因
    // 00误报；01无法维修；02维修成本高，99其他 
    { text: "误报", value: "00" },
    { text: "无法维修", value: "01" },
    { text: "维修成本高", value: "02" },
    { text: "其他", value: "99" },
  ],
  //00正常使用；01报废；99其他
  followupTreatment: [ // 后续处理
    { text: "正常使用", value: "00" },
    { text: "报废", value: "01" },
    { text: "其他", value: "99" },
  ],
  repairResult: [ //维修结果
    //00完全修复；01部分修复；02未修复 
    { text: "完全修复", value: "00" },
    { text: "部分修复", value: "01" },
    { text: "未修复", value: "02" },
  ],
  repairContentType: [ // 故障类型
    { text: "暂时性故障", value: "00" },
    { text: "永久性故障", value: "01" },
    { text: "突发性故障", value: "02" },
    { text: "渐发性故障", value: "03" },
    { text: "破坏性故障", value: "04" },
    { text: "非破坏性故障", value: "05" },
    { text: "其他", value: "99" }
  ],
  repairContentTyp: [ // 故障原因
    { text: "设备老化", value: "00" },
    { text: "使用不当", value: "01" },
    { text: "缺乏维护", value: "02" },
    { text: "其他", value: "99" },
  ],
  notCause: [ // 验收不通过原因
    // 00故障未解决；01维修效果不满意；02维修服务质量差；99其他 
    { text: "故障未解决", value: "00" },
    { text: "维修效果不满意", value: "01" },
    { text: "维修服务质量差", value: "02" },
    { text: "其他", value: "99" },
  ]
}

export const faultDescribeData ={
  "00" : { text: "部分功能失效" },
  "01" : { text: "开机后死机" },
  "03" : { text: "性能指标偏离" },
  "04" : { text: "不规则或偶发故障" },
  "02" : { text: "其他" }
}  

//证件附件类别
export const certCodeData ={
  "15" : { text: "资产图片" },
  "12" : { text: "其他" },
  "13" : { text: "招标文件" },
  "14" : { text: "使用说明书 " },
}  

//资产类别
export const productTypeData ={
  "01" : { text: "医疗设备" }
} 

//资产经费来源
export const certSourceFunds = {
  "01": { text: '通用设备'},
  "02": { text: '自建'},
  "03": { text: '融资租入'},
  "04": { text: '接受捐赠'},
  "05": { text: '盘盈'},
  "06": { text: '其他'},
}
//资产折旧方式
export const depreciationTypeData = {
  "01": { text: '平均年限法'},
  "02": { text: '工作量法'},
  "03": { text: '双倍余额递减法'},
  "04": { text: '年数总和法'},
}

//保养登记
export const upkeepStateSel =[
  { text: '待完成', value: '00' },
  { text: '已完成', value: '01' },
  { text: '已作废', value: '02' },
] 
export const upkeepState = {
  "00": { text: '待完成',color: 'darkgray'},
  "01": { text: '已完成',color: 'limegreen'},
  "02": { text: '已作废',color: 'red'},
  null :{text: "",color: 'transparent'}
}
export const upkeepMainTainType = {
  "00": { text: '内保'},
  "01": { text: '外保'},
  null :{text: "未知"}
}
export const upkeepDetailsTable = {
  "00":{ text: '合格' },
  "01":{ text: '不合格' },
  "02":{ text: '保养后合格' },
  null:{text: '请选择结果'}
}