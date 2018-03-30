/**
 * 资产档案详情
 */
import React, { Component } from 'react';
import { Tabs } from 'antd';
import { withRouter } from 'react-router'
import BaseInfo from './baseInfo'; //基本信息
import CertInfo from './certInfo'; //证件信息
import AccessoryInfo from './accessoryInfo'; //证件信息
import RecordList from './recordList'; //操作记录
import { connect } from 'react-redux';
import { ledger as ledgerService } from '../../../service';
import assets from '../../../api/assets';
import querystring from 'querystring';

const TabPane = Tabs.TabPane;

class LedgerArchivesDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AssetInfoData: {},
    }
  }
  //获取id 根据id号查详情
  componentWillMount = () =>{
    debugger
    const assetsRecordGuid = this.props.match.params.id;
    const { getSelectAssetsRecordDetail } = this.props;
    const params = { assetsRecordGuid: assetsRecordGuid };
    getSelectAssetsRecordDetail(assets.selectAssetsRecordDetail , querystring.stringify(params),(data) => {
      this.setState( { AssetInfoData : data.result })
    },{
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    })
  }

  render() {
    console.log(this.state.AssetInfoData,'this.state.AssetInfoData')
    return (
      <div>
         {
          JSON.stringify(this.state.AssetInfoData) === '{}' || this.state.AssetInfoData === null ? null 
          :
          <Tabs defaultActiveKey="1">
            <TabPane tab="基本信息" key="1">
              <BaseInfo AssetInfoData={this.state.AssetInfoData}/> 
            </TabPane>
            <TabPane tab="证件信息" key="2">
             
               <CertInfo certGuid={this.state.AssetInfoData.certGuid}/> 
            </TabPane>
            <TabPane tab="附件信息" key="3">
              <AccessoryInfo assetsRecord={this.state.AssetInfoData.assetsRecord} assetsRecordGuid={this.state.AssetInfoData.assetsRecordGuid}/>
            </TabPane>
            <TabPane tab="操作记录" key="4">
              <RecordList assetsRecord={this.state.AssetInfoData.assetsRecord}/>
            </TabPane>
          </Tabs>
         }
      </div>
    )
  }
}

export default withRouter(connect(null, dispatch => ({
  getSelectAssetsRecordDetail: (url,values,success,type) => ledgerService.getInfo(url,values,success,type),
}))(LedgerArchivesDetail));