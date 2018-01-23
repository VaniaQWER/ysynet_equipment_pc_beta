/**
 * 档案管理-资产档案-详情-基本信息-资产信息
 */
import React, { Component } from 'react';
import { Row, Col,Collapse } from 'antd';
import styles from '../../../ledger/archivesMgt/ledgerArchives/style.css';

const Panel = Collapse.Panel;

class BaseInfo extends Component {
  render () {
    const { BaseInfoInfoData } = this.props;
  
    return (
      <Collapse defaultActiveKey={['1','2','3','4','5']}>
      <Panel header="资产信息" key="1">
        <Row type="flex"   className={styles['table-row']}>
          <Col span={4} className={styles['table-span']}>资产编号</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.repariNo }</Col>
          <Col span={4} className={styles['table-span']}>资产名称</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.equipmetStandarName } </Col>
          <Col span={4} className={styles['table-span']}>型号</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.useDeptCode }</Col>
          <Col span={4} className={styles['table-span']}>规格</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.useDeptCode }</Col>
          <Col span={4} className={styles['table-span']}>资产分类</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.useDeptCode }</Col>
          <Col span={4} className={styles['table-span']}>使用科室</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.useDeptCode }</Col>
          <Col span={4} className={styles['table-span']}>保管员</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.useDeptCode }</Col>
          <Col span={4} className={styles['table-span']}>管理科室</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.useDeptCode }</Col>
          <Col span={4} className={styles['table-span']}>存放地址</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.useDeptCode }</Col>
          <Col span={4} className={styles['table-span']}>是否在保</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.useDeptCode }</Col>
        </Row>
      </Panel>
      <Panel header="报修信息" key="2">
        <Row type="flex"  className={styles['table-row']}>
          <Col span={4} className={styles['table-span']}>报修来源</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.useDeptCode }</Col>
          <Col span={4} className={styles['table-span']}>当前状态</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.repairFstate }</Col>
          <Col span={4} className={styles['table-span']}>紧急度</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.useDeptCode }</Col>
          <Col span={4} className={styles['table-span']}>备用情况</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.useDeptCode }</Col>
          <Col span={4} className={styles['table-span']}>报修部门</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.useDeptCode }</Col>
          <Col span={4} className={styles['table-span']}>报修时间</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.repairdTime }</Col>
          <Col span={4} className={styles['table-span']}>报修人</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.repairdName }</Col>
          <Col span={4} className={styles['table-span']}>联系电话</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.adminUserName }</Col>
          <Col span={4} className={styles['table-span']}>是否送修</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.adminUserName }</Col>
          <Col span={4} className={styles['table-span']}>故障描述</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.adminUserName }</Col>
        </Row>
      </Panel>
      <Panel header="指派信息" key="3">
        <Row type="flex"  className={styles['table-row']}>
          <Col span={4} className={styles['table-span']}>指派人</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.adminUserName }</Col>
          <Col span={4} className={styles['table-span']}>维修方式</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.adminUserName }</Col>
          <Col span={4} className={styles['table-span']}>被指派人/组/机构</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.adminUserName }</Col>
          <Col span={4} className={styles['table-span']}></Col>
          <Col span={8} className={styles['table-span']}></Col>
        </Row>
      </Panel>
      <Panel header="维修信息" key="4">
        <Row type="flex"   className={styles['table-row']}>
          <Col span={4} className={styles['table-span']}>维修人</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.repairingName }</Col>
          <Col span={4} className={styles['table-span']}>联系电话</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.repairingName }</Col>
          <Col span={4} className={styles['table-span']}>维修单位</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.repairingName }</Col>
          <Col span={4} className={styles['table-span']}>维修时间</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.repairimgTime }</Col>  
          <Col span={4} className={styles['table-span']}>故障原因</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.repairingName }</Col>
          <Col span={4} className={styles['table-span']}>更换配件</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.repairingName }</Col>
        </Row>
      </Panel>
      <Panel header="验收信息" key="5">
        <Row type="flex"  className={styles['table-row']}>
          <Col span={4} className={styles['table-span']}>一次验收</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.repairingName }</Col>
          <Col span={4} className={styles['table-span']}>验收科室</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.useDeptCode }</Col>
          <Col span={4} className={styles['table-span']}>验收人</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.repairingName }</Col>
          <Col span={4} className={styles['table-span']}>联系电话</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.repairingName }</Col>  
          <Col span={4} className={styles['table-span']}>验收备注</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.repairingName }</Col>
          <Col span={4} className={styles['table-span']}>二次验收</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.repairingName }</Col>
          <Col span={4} className={styles['table-span']}>验收科室</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.useDeptCode }</Col>
          <Col span={4} className={styles['table-span']}>验收人</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.repairingName }</Col>
          <Col span={4} className={styles['table-span']}>联系电话</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.repairingName }</Col>
          <Col span={4} className={styles['table-span']}></Col>
          <Col span={8} className={styles['table-span']}></Col>
        </Row>
      </Panel>
    </Collapse>
    )
  }
}

 export default BaseInfo;

