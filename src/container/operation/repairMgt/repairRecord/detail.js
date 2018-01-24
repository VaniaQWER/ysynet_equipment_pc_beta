/**
 * 维修记录详情
 */
import React, { Component } from 'react';
import { Tabs } from 'antd';
import { withRouter } from 'react-router'
import BaseInfo from './baseInfo'; //基本信息
import RecordList from './recordList'; //操作记录
import { connect } from 'react-redux';
import { ledger as ledgerService } from '../../../../service';
import assets from '../../../../api/assets';

const TabPane = Tabs.TabPane;

class RepairRecordDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BaseInfoInfoData: {},
    }
  }

  //获取id 根据id号查详情
  componentWillMount = () =>{
    const rrpairOrderGuid = this.props.match.params.id;
    const { getSelectRrpairDetailList } = this.props;
    const params = { rrpairOrderGuid: rrpairOrderGuid };
    getSelectRrpairDetailList(assets.selectRrpairDetailList , params,(data) => {
      this.setState( { BaseInfoInfoData : data.result[0] })
    })
  }

  render() {
    return (
      <div>
          <Tabs defaultActiveKey="1">
            <TabPane tab="基本信息" key="1">
              <BaseInfo BaseInfoInfoData={this.state.BaseInfoInfoData}/>
            </TabPane>
            <TabPane tab="操作记录" key="2">
              <RecordList rrpairOrderGuid={this.state.BaseInfoInfoData.rrpairOrderGuid}/>
            </TabPane>
          </Tabs>
      </div>
    )
  }
}

export default withRouter(connect(null, dispatch => ({
  getSelectRrpairDetailList : (url,values,success) => ledgerService.getInfo(url,values,success),
}))(RepairRecordDetail));