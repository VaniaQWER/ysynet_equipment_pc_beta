/**
 * @file 工作台
 */
import React, { Component } from 'react';

import { Layout, Card, Select, Row, Col, message } from 'antd';

import workplace from '../../api/workplace';

import queryString from 'querystring';

import request from '../../utils/request';

import S from './style.css';

const { Content } = Layout;

const { Option } = Select;

console.log(S)

class Workplace extends Component {
  state={
    matterData: [],   //待办事项
    rrpairData: '',
    transferData: ''
  };

  componentDidMount = () => {
    request(workplace.commissionList, {
      headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (data) => {
        if(data.status) {
           let matterData = this.dataDispose(data.result[0]);
          // console.log(matterData)
          this.setState({ matterData });
        }else {
          message(data.msg);
        }
        
      },
      error: err => console.log(err)
    });
    request(workplace.documentTypeList, {
      body: queryString.stringify({
        type: "01"
      }),
      headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (data) => {
        if(data.status) {
           
        }else {
          message(data.msg);
        }
        
      },
      error: err => console.log(err)
    });
  }

  dataDispose = (data) => {
    let arr = [],
        name = '';
    for (const key in data) {
      switch (key) {
        case 'awaitCheck':
          name = '维修验收';
          break;
        case 'notTurned':
          name = '转科审批';
          break;
        case 'maintainNumber':
          name = '保养到期';
          break;
        case 'awaitDispatch':
          name = '维修派工';
          break;
        case 'meter':
          name = '计量到期';
          break;
        case 'awaitRepair':
          name = '等待维修';
          break;
        case 'scrapNumber':
          name = '报废申请';
          break;
        case 'maintenance':
          name = '维修处理';
          break;
        default:
          name = '';
          break;
      };
      arr.push({
        name,
        anotherName: key,
        num: data[key]
      });
    };
    return arr;
  }

  
  
  render() {
    let {matterData} = this.state;
    matterData = matterData.map( (item, i) => {
      return (
        <Col key={i} span={4}>
          <div className={`${S[item.anotherName]} ${S['matter-card']}`}>
            <div className={S['matter-card-img']}><img src={require(`./Icon/${item.anotherName}.png`)} alt={item.name}/></div>
            <div className={S['matter-card-text']}>
              <h1>{item.num}</h1>
              <div>
                <span>{item.name}</span>
              </div>
            </div>
          </div>
        </Col>
      )
    });
    return (
      <Content>
        <Card title={<h1 style={{fontSize: 28, margin: 0}}>您好，今日的代办事项</h1>} bordered={false}>
          <Row type="flex" justify="space-around" align="middle">
            {matterData}
          </Row>
        </Card>
        <Row style={{background: '#fff', padding: '0 20px'}}>
          <Col style={{lineHeight: '40px'}} span={8}>
            <span style={{fontSize: 16, fontWeight: 'bold'}}>最新单据</span>
          </Col>
          <Col style={{float: 'right'}} span={8}>
            <div className="ant-row ant-form-item" style={{marginBottom: 0}}>
                <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-6">
                  <label>单据类型</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className="ant-form-item-control">
                    <Select 
                      showSearch
                      placeholder={'请选择'}
                      style={{width: '100%'}}
                    >
                      <Option key="00" value="00">你猜</Option>
                      <Option key="01" value="01">我不猜</Option>
                    </Select>
                  </div>
                </div>
              </div>
          </Col>
        </Row>
        <Row style={{margin: '20px 12px'}} gutter={16}>
          <Col span={6}>
            <Card>
              <Row>
                <Col span={18}>
                  <img alt="" src={require(`./Icon/icon_maintenance_plan_blue.png`)} />
                  <span style={{paddingLeft: 10}} className={S['bill-text']}>AA180814000001</span>
                </Col>
                <Col span={6} className={S['bill-text']} style={{textAlign: 'right'}}>状态一</Col>
              </Row>
              <Row style={{margin: '20px 0 14px', fontSize: '14px', color: 'rgba(0, 0, 0, .25)'}}>
                <Col span={12}>
                  <span>维修单</span>
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>5小时前</Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
    )
  }
}

export default Workplace;
// export default withRouter(connect(state => state)(Workplace));