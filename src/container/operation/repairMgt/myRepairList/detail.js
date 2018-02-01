import React, { Component } from 'react';
import { Card, BackTop, Affix, Button } from 'antd';
import StepsInfo from '../cardInfo/stepsInfo'
import AssetsInfo from '../cardInfo/assetsInfo';   
import RepairInfo from '../cardInfo/repairInfo'; 
import ServiceInfo from '../cardInfo/serviceInfo';
/**
 * @file 指派详情
 */
class RepairListDetail extends Component {
  onSubmit = () => {

  }
  render() {
    return (
      <div className='ysynet-repair ysynet-content '>
        <Card title="报修进度" extra={[
          <Affix key={1}>
            <Button type='primary' onClick={this.onSubmit}>提交</Button>
          </Affix>
        ]} key={1}>
          <StepsInfo current={1}/>
        </Card>
        <Card title="资产信息" style={{marginTop: 16}} hoverable={false} key={2}>
          <AssetsInfo wrappedComponentRef={(inst) => this.assetsInfo = inst}/>
        </Card>
        <Card title="报修信息" style={{marginTop: 16}} hoverable={false} key={3}>
          <RepairInfo wrappedComponentRef={(inst) => this.repairInfo = inst}/>
        </Card>
        <Card title="维修信息" style={{marginTop: 16}} hoverable={false} key={5}>
          <ServiceInfo ref='serviceInfo'/>
        </Card>
        <BackTop />
      </div> 
    )
  }
}

export default RepairListDetail;