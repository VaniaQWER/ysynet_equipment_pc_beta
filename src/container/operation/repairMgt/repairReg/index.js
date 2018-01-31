import React, { Component } from 'react';
import { Card, BackTop, Affix, Button } from 'antd';
import { connect } from 'react-redux';
import StepsInfo from '../cardInfo/stepsInfo'
import AssetsInfo from '../cardInfo/assetsInfo';   
import RepairInfo from '../cardInfo/repairInfo'; 
//import AssignInfo from './cardInfo/assignInfo';
import ServiceInfo from '../cardInfo/serviceInfo';
import PartsInfo from '../cardInfo/partsInfo';
/**
 * @file 资产运维-维修管理-报修登记
 */
class RepairReg extends Component {
  onSubmit = () => {
    //console.log(this.repairInfo.postData)
    console.log(this.refs.serviceInfo.postData());
  }
  render() {
    //const type = this.props.user.type;
    return (
      <div className='ysynet-repair ysynet-content '>
        <Card title="报修进度" extra={[
          <Affix key={1}>
            <Button type='primary' onClick={this.onSubmit}>提交</Button>
          </Affix>
        ]} key={1}>
          <StepsInfo current={0}/>
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
        <Card title="配件信息" style={{marginTop: 16}} hoverable={false} key={6}>
          <PartsInfo/>
        </Card>
        <BackTop />
      </div>  
    )
  }
}

export default connect(state => state)(RepairReg);