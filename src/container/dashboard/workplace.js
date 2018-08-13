/**
 * @file 工作台
 */
import React, { Component } from 'react';
import { Layout, Card, Select, Row, Col } from 'antd';
import assets from '../../api/assets';
import querystring from 'querystring';
import request from '../../utils/request';
import S from './style.css';
const { Content } = Layout;
const { Option } = Select;
class Workplace extends Component {
  state={
    maintainData: '',
    rrpairData: '',
    transferData: ''
  };

  componentDidMount = () => {
    this.getTodoInfo();
  }

  // 待办事项
  getTodoInfo = () => {
    let options = {
      body:querystring.stringify(),
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        if (data.status) {
          data.result.maintainFstateNum.forEach(item => {
            if (item.fstate === "00") {
              this.setState({maintainData: item.num});
            }
          });
          data.result.rrpairFstateNum.forEach(item => {
            if (item.fstate === "30") {
              this.setState({rrpairData: item.num});
            }
          });
          data.result.transferFstateNum.forEach(item => {
            if (item.fstate === "00") {
              this.setState({transferData: item.num});
            }
          });
        }
      },
      error: err => {console.log(err)}
    }
    request(assets.getSelectOrderNumber, options);
  }
  
  render() {
    return (
      <Content>
        <Card title={`您好，今日的代办事项`} bordered={false}>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={4}>
              <div className={S['matter-card']}>
                <div className={S['matter-card-img']}><img src={require('./work01.png')} alt="维修派工"/></div>
                <div className={S['matter-card-text']}>
                  <h1>5</h1>
                  <span>维修派工</span>
                </div>
              </div>
            </Col>
            <Col span={4}>
              <div className={S['matter-card']}>
                <div className={S['matter-card-img']}><img src={require('./work01.png')} alt="维修派工"/></div>
                <div className={S['matter-card-text']}>
                  <h1>5</h1>
                  <span>维修派工</span>
                </div>
              </div>
            </Col>
            <Col span={4}>
              <div className={S['matter-card']}>
                <div className={S['matter-card-img']}><img src={require('./work01.png')} alt="维修派工"/></div>
                <div className={S['matter-card-text']}>
                  <h1>5</h1>
                  <span>维修派工</span>
                </div>
              </div>
            </Col>
            <Col span={4}>
              <div className={S['matter-card']}>
                <div className={S['matter-card-img']}><img src={require('./work01.png')} alt="维修派工"/></div>
                <div className={S['matter-card-text']}>
                  <h1>5</h1>
                  <span>维修派工</span>
                </div>
              </div>
            </Col>
            <Col span={4}>
              <div className={S['matter-card']}>
                <div className={S['matter-card-img']}><img src={require('./work01.png')} alt="维修派工"/></div>
                <div className={S['matter-card-text']}>
                  <h1>5</h1>
                  <span>维修派工</span>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
        <Row style={{background: '#fff', padding: '0 32px'}}>
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
      </Content>
    )
  }
}

export default Workplace;
// export default withRouter(connect(state => state)(Workplace));