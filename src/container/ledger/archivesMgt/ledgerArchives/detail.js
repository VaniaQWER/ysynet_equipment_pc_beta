/**
 * 资产档案详情
 */
import React, { Component } from 'react';
import { Tabs } from 'antd';
import { withRouter } from 'react-router'
import BaseInfo from './baseInfo'; //基本信息
import CertInfo from './certInfo';
const TabPane = Tabs.TabPane;

class LedgerArchivesDetail extends Component {
  render() {
    const  record  = this.props.location.state;
    return (
      <div>
          <Tabs defaultActiveKey="1">
            <TabPane tab="基本信息" key="1">
              <BaseInfo baseInfo={record}/>
            </TabPane>
            <TabPane tab="证件信息" key="2">
              <CertInfo />
            </TabPane>
            <TabPane tab="附件信息" key="3">
              
            </TabPane>
            <TabPane tab="操作记录" key="4">
              
            </TabPane>
          </Tabs>
      </div>
    )
  }
}
export default withRouter(LedgerArchivesDetail);