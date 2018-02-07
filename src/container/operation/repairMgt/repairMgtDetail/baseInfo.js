/**
 * 档案管理-资产档案-详情-基本信息-资产信息
 * assetsRecordGuid={this.BaseInfoInfoData.assetsRecordGuid}
 */
import React, { Component } from 'react';
import { Row, Col,Collapse } from 'antd';
import styles from '../../../ledger/archivesMgt/ledgerArchives/style.css';
import AssetParts from './assetParts';//资产配件

const Panel = Collapse.Panel;

class BaseInfo extends Component {
  render () {
    const { BaseInfoInfoData } = this.props;
    return (
      <Collapse defaultActiveKey={['1','2','3','4','5','6']}>
      <Panel header="维修单" key="1">
        <Row type="flex"   className={styles['table-row']}>
          <Col span={4} className={styles['table-span']}>维修单号</Col>
           <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.rrpairOrderNo }</Col> 
          <Col span={4} className={styles['table-span']}>单据状态</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.orderFstate } </Col>
          <Col span={4} className={styles['table-span']}>制单时间</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.createDate }</Col>
          <Col span={4} className={styles['table-span']}>完成时间</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.rrpairDate }</Col>
        </Row>
      </Panel>
      <Panel header="报修信息" key="2">
          <Row type="flex"  className={styles['table-row']}>
          <Col span={4} className={styles['table-span']}>资产编号</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.assetsRecord }</Col>
          <Col span={4} className={styles['table-span']}>资产名称</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.equipmetStandardName }</Col>
            <Col span={4} className={styles['table-span']}>型号</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.spec }</Col>
          <Col span={4} className={styles['table-span']}>规格</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.fmodel }</Col>
          <Col span={4} className={styles['table-span']}>资产类别</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.productType }</Col>
          <Col span={4} className={styles['table-span']}>使用科室</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.useDept }</Col>
          <Col span={4} className={styles['table-span']}>保管员</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.custodian }</Col>
          <Col span={4} className={styles['table-span']}>管理科室</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.bDept }</Col>
          <Col span={4} className={styles['table-span']}>存放地址</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.deposit }</Col>
          <Col span={4} className={styles['table-span']}>报修来源</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.orderType }</Col>
          <Col span={4} className={styles['table-span']}>紧急度</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.urgentFlag }</Col>
          <Col span={4} className={styles['table-span']}>有无备用</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.spare }</Col >
          <Col span={4} className={styles['table-span']}>是否在保</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.guaranteeFlag }</Col>
          <Col span={4} className={styles['table-span']}>是否送修</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.rrpairSend }</Col>
          <Col span={4} className={styles['table-span']}>报修部门</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.deptName }</Col>
          <Col span={4} className={styles['table-span']}>报修时间</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.createDate }</Col>
          <Col span={4} className={styles['table-span']}>报修人</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.rrpairUsername }</Col>
          <Col span={4} className={styles['table-span']}>联系电话</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.rrpairPhone }</Col>
          <Col span={4} className={styles['table-span']}>故障描述</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.failCause }</Col>
          <Col span={4} className={styles['table-span']}></Col>
          <Col span={8} className={styles['table-span']}></Col>
        </Row>
      </Panel>
      <Panel header="指派信息" key="3">
        <Row type="flex"  className={styles['table-row']}>
          <Col span={4} className={styles['table-span']}>指派人</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.outOrg }</Col>
          <Col span={4} className={styles['table-span']}>维修方式</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.rrpairType }</Col>
          <Col span={4} className={styles['table-span']}>被指派人/组/机构</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.outOrg }</Col>
          <Col span={4} className={styles['table-span']}>指派时间</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.callTime }</Col>
        </Row>
      </Panel>
      <Panel header="维修信息" key="4">
        <Row type="flex"   className={styles['table-row']}>
          <Col span={4} className={styles['table-span']}>维修人</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.inRrpairUsername }</Col>
          <Col span={4} className={styles['table-span']}>联系电话</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.repairingName }</Col>
          <Col span={4} className={styles['table-span']}>维修单位</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.outOrg }</Col>
          <Col span={4} className={styles['table-span']}>维修时间</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.createDate }</Col>  
          <Col span={4} className={styles['table-span']}>维修费用（总计）</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.actualPrice }</Col>
          <Col span={4} className={styles['table-span']}>更换配件</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.repairingName }</Col>
          <Col span={4} className={styles['table-span']}>故障原因</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.failCause }</Col>
          <Col span={4} className={styles['table-span']}></Col>
          <Col span={8} className={styles['table-span']}></Col>
        </Row>
      </Panel>
      <Panel header="验收信息" key="5">
        <Row type="flex"  className={styles['table-row']}>
          <Col span={4} className={styles['table-span']}>验收科室</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.checkDeptNam }</Col>
          <Col span={4} className={styles['table-span']}>验收人</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.rrAcceUsername }</Col>
          <Col span={4} className={styles['table-span']}>验收结果</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.rrAcceFstate }</Col>  
          <Col span={4} className={styles['table-span']}>验收时间</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.rrAcceAate }</Col>
        </Row>
      </Panel>
      <Panel header="资产配件" key="6">
        {
          BaseInfoInfoData.assetsRecordGuid?
          <AssetParts assetsRecordGuid={BaseInfoInfoData.assetsRecordGuid}/>
          :
          null
        }
      
      </Panel>
    </Collapse>
    )
  }
}

 export default BaseInfo;

