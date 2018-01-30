import React, { Component } from 'react';
import { Card, Steps, BackTop, Affix, Button } from 'antd';
import AssetsInfo from './cardInfo/assetsInfo';   
import RepairInfo from './cardInfo/repairInfo'; 
const Step = Steps.Step;
/**
 * @file 资产运维-维修管理-报修登记
 */
class RepairReg extends Component {
  render() {
    return (
      <div className='ysynet-repair ysynet-content '>
        <Card title="报修进度" extra={[
          <Affix>
            <Button type='primary'>提交</Button>
          </Affix>
        ]}>
          <Steps current={0}>
            <Step title="故障报修" />
            <Step title="接单维修" />
            <Step title="检查验收" />
            <Step title="关闭工单" />
          </Steps>
        </Card>
        <Card title="资产信息" style={{marginTop: 16}} hoverable={false}>
          <AssetsInfo/>
        </Card>
        <Card title="报修信息" style={{marginTop: 16}} hoverable={false}>
          <RepairInfo/>
        </Card>
        <BackTop />
      </div>  
    )
  }
}

export default RepairReg;