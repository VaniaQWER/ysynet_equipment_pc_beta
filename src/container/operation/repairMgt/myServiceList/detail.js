/**
 * 我的维修单  - 详情
 */
import React, { PureComponent } from 'react';
import { Layout, Card, Affix, Button, BackTop } from 'antd';
import StepsInfo from '../cardInfo/stepsInfo'
import AssetsInfo from '../cardInfo/assetsInfo';   
import RepairInfo from '../cardInfo/repairInfo'; 
import AssignInfo from '../cardInfo/assignInfo';
const { Content } = Layout;

class MyServiceDetail extends PureComponent {
  accept = () => {
    alert('接受')
  }
  refuse = () => {
    alert('拒绝')
  }
  render() {
    return (
      <Content className='ysynet-content ysynet-common-bgColor'>
        <Card title="报修进度" extra={[
          <Affix key={1}>
            <Button type='primary' onClick={this.accept}>接单</Button>
            <Button onClick={this.refuse}>拒绝</Button>
          </Affix>
        ]} key={1}>
          <StepsInfo current={1} />
        </Card>
        <Card title="资产信息" style={{marginTop: 16}} hoverable={false} key={2}>
          <AssetsInfo wrappedComponentRef={(inst) => this.assetsInfo = inst} isEdit={true}/>
        </Card>
        <Card title="报修信息" style={{marginTop: 16}} hoverable={false} key={3}>
          <RepairInfo wrappedComponentRef={(inst) => this.repairInfo = inst} isEdit={true}/>
        </Card>
        <Card title="指派信息" style={{marginTop: 16}} hoverable={false} key={5}>
          <AssignInfo ref='assignInfo'/>
        </Card>
        <BackTop />
      </Content>
    )
  }
}

export default MyServiceDetail;
