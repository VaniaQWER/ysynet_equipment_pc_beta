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

class Workplace extends Component {
  state={
    matterData: [],   //待办事项
    documentData: [],   //单据类型数据
    documentColor: {},
    billList: [],       //最新单据列表
    billsType: '',      //单据类型
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
    request(workplace.billTypeList, {
      headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (data) => {
        if(data.status) {
          this.setState({
            documentData: data.result
          });
        }else {
          message(data.msg);
        }
      },
      error: err => console.log(err)
    });
  }

  dataDispose = (data) => {
    let arr = [],
        name = '',
        color = '';
    for (const key in data) {
      switch (key) {
        case 'awaitCheck':
          name = '维修验收';
          color = 'rgb(149, 99, 234)';
          break;
        case 'notTurned':
          name = '转科审批';
          color = 'rgb(149, 99, 234)';
          break;
        case 'maintainNumber':
          name = '保养到期';
          color = 'rgb(36, 143, 252)';
          break;
        case 'awaitDispatch':
          name = '维修派工';
          color = 'rgb(36, 143, 252)';
          break;
        case 'meter':
          name = '计量到期';
          color = 'rgb(39, 184, 190)';
          break;
        case 'awaitRepair':
          name = '等待维修';
          color = 'rgb(39, 184, 190)';
          break;
        case 'scrapNumber':
          name = '报废申请';
          color = 'rgb(36, 147, 252)';
          break;
        case 'maintenance':
          name = '维修处理';
          color = 'rgb(39, 184, 190)';
          break;
        default:
          name = '';
          color = '';
          break;
      };
      arr.push({
        color,
        name,
        anotherName: key,
        num: data[key]
      });
    };
    return arr;
  }

  upDateDocu = (guid, key) => {
    request(workplace.queryBillList, {
      body: queryString.stringify({
        code: guid
      }),
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (data) => {
        if(data.status) {
          this.setState({billList: data.result.rows, billsType: key.props.children});
        }else {
          message.warn(data.msg)
        }
      },
      error: err => console.log(err)
    })
  }

  
  
  render() {
    let {matterData, billList, billsType, documentData} = this.state;
    matterData = matterData.map( (item, i) => {
      return (
        <Col key={i} span={4}>
          <div style={{borderColor: item.color}} className={`${S[item.anotherName]} ${S['matter-card']}`}>
            <div className={S['matter-card-img']}><img src={require(`./Icon/${item.anotherName}.png`)} alt={item.name}/></div>
            <div className={S['matter-card-text']}>
              <h1 style={{color: item.color}} >{item.num}</h1>
              <div>
                <span>{item.name}</span>
              </div>
            </div>
          </div>
        </Col>
      )
    });
    billList = billList.map((item, i) => {
      return (
        <Col span={6}>
            <Card>
              <Row>
                <Col span={18}>
                  <img alt="" src={require(`./Icon/001.png`)} />
                  <span style={{paddingLeft: 10}} className={S['bill-text']}>{item.billNo}</span>
                </Col>
                <Col span={6} className={S['bill-text']} style={{textAlign: 'right'}}>{item.fstate}</Col>
              </Row>
              <Row style={{margin: '20px 0 14px', fontSize: '14px', color: 'rgba(0, 0, 0, .25)'}}>
                <Col span={12}>
                  <span>{billsType}</span>
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>{item.time}</Col>
              </Row>
            </Card>
          </Col>
      )
    });
    documentData = documentData.map((item, i) => {
      return (
        <Option key={item.code} value={item.code}>{item.name}</Option>
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
                      onSelect={this.upDateDocu}
                    >
                      {documentData}
                      {/* <Option key="1" value="00">你猜</Option>
                      <Option key="01" value="01">我不猜</Option> */}
                    </Select>
                  </div>
                </div>
              </div>
          </Col>
        </Row>
        <Row style={{margin: '20px 12px'}} gutter={16}>
          {billList}
        </Row>
      </Content>
    )
  }
}

export default Workplace;
// export default withRouter(connect(state => state)(Workplace));