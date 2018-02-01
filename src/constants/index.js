import React from 'react';
import { Tag } from 'antd';
export const repairCommonDataSource = [
  {
    title: '维修单号',
    dataIndex: 'rrpairOrderNo',
    width: 200
  }, 
  {
    title: '单据状态',
    dataIndex: 'orderFstate',
    width: 80,
    render: text =>  <Tag color={repairData[text].color}> { repairData[text].text } </Tag>
  },
  {
    title: '资产名称',
    dataIndex: 'equipmentStandardName',
    width: 250
  },
  {
    title: '使用科室',
    dataIndex: 'deptName',
    width: 100,
  },
  {
    title: '管理员',
    dataIndex: 'custodian',
    width: 100,
  },
  {
    title: '报修人',
    dataIndex: 'rrpairUsername',
    width: 100
  },
  {
    title: '报修时间',
    dataIndex: 'createDate',
    width: 150
  }
]

export const repairData = {
  //10申请，20指派，30维修中,50待验收，80已拒绝 90已关闭 
  "10": {
    text: "申请",
    color: 'blue'
  },
  "20": {
    text: "指派",
    color: 'green'
  },
  "30": {
    text: "维修中",
    color: 'gold'
  },
  "50": {
    text: "待验收",
    color: 'orange'
  },
  "80": {
    text: "已拒绝",
    color: 'magenta'
  },
  "90": {
    text: "关闭",
    color: 'red'
  },
}