/**
 * 维修验收
 */
import React, { PureComponent } from 'react';
import { Layout, Card, Affix, Button, BackTop } from 'antd';
import StepsInfo from '../cardInfo/stepsInfo'
import AssetsInfo from '../cardInfo/assetsInfo';   
import RepairInfo from '../cardInfo/repairInfo'; 
import AssignInfo from '../cardInfo/assignInfo';
import ServiceInfo from '../cardInfo/serviceInfo'; 
import PartsInfo from '../cardInfo/partsInfo';
const { Content } = Layout;
class MyCheckListCheckIn extends PureComponent {
  checkIn = () => {
    alert('验收')
  }
  render() {
    return (
      <Content className='ysynet-content ysynet-common-bgColor'>
        <Card title="报修进度" extra={[
          <Affix key={1}>
            <Button type='primary' onClick={this.checkIn}>验收</Button>
          </Affix>
        ]} key={1}>
          <StepsInfo current={2} />
        </Card>
        <Card title="资产信息" style={{marginTop: 16}} hoverable={false} key={2}>
          <AssetsInfo wrappedComponentRef={(inst) => this.assetsInfo = inst} isEdit={true}/>
        </Card>
        <Card title="报修信息" style={{marginTop: 16}} hoverable={false} key={3}>
          <RepairInfo wrappedComponentRef={(inst) => this.repairInfo = inst} isEdit={true}/>
        </Card>
        <Card title="指派信息" style={{marginTop: 16}} hoverable={false} key={5}>
          <AssignInfo ref='assignInfo' isEdit={true}/>
        </Card>
        <Card title="维修信息" style={{marginTop: 16}} hoverable={false} key={4}>
          <ServiceInfo wrappedComponentRef={(inst) => this.serviceInfo = inst} isEdit={true}/>
        </Card>
        <Card title="维修配件" style={{marginTop: 16}} hoverable={false} key={6}>
          <PartsInfo ref='partsInfo' isEdit={true}/>
        </Card>
        <BackTop />
      </Content>
    )
  }
}

export default MyCheckListCheckIn;