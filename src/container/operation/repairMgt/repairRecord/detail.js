/**
 * 维修记录详情
 */
import React, { Component } from 'react';
import { Tabs } from 'antd';
import { withRouter } from 'react-router'
import BaseInfo from './baseInfo'; //基本信息
import RecordList from './recordList'; //操作记录
const TabPane = Tabs.TabPane;

class RepairRecordDetail extends Component {
  render() {
    const  record  = this.props.location.state;
    return (
      <div>
          <Tabs defaultActiveKey="1">
            <TabPane tab="基本信息" key="1">
              <BaseInfo BaseInfoInfoData={record}/>
            </TabPane>
            <TabPane tab="操作记录" key="2">
              <RecordList />
            </TabPane>
          </Tabs>
      </div>
    )
  }
}
export default withRouter(RepairRecordDetail);