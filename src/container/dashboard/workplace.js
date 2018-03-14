/**
 * @file 工作台
 */
import React, { Component } from 'react';
import { Row, Col, Card, Avatar } from 'antd';

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

class Workplace extends Component {
  
  render() {
    return (
     <div className='ysynet-content ysynet-common-bgColor'>
        <Row>
          <Col span={2}>
            <Avatar 
            style={{width:72,height:72,borderRadius: 72}}
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
          </Col>
          <Col span={10}>
              <h2 style={{lineHeight:'36px',color:"#666"}}>普华信联，祝你新年快乐!</h2>
              专业的医用设备管理服务平台,提供一站式物资解决方案
          </Col>
          <Col span={12}>
          </Col>
        </Row>
        <Row style={{marginTop:16}}>
          <Col span={24}>
            <Card title="平台模块">
              <Card.Grid style={gridStyle}>资产登记</Card.Grid>
              <Card.Grid style={gridStyle}>资产档案</Card.Grid>
              <Card.Grid style={gridStyle}>报修登记</Card.Grid>
              <Card.Grid style={gridStyle}>报修记录</Card.Grid>
              <Card.Grid style={gridStyle}>我的指派</Card.Grid>
              <Card.Grid style={gridStyle}>我的维修单</Card.Grid>
              <Card.Grid style={gridStyle}>我的验收单</Card.Grid>
              <Card.Grid style={gridStyle}>维修记录</Card.Grid>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Workplace;