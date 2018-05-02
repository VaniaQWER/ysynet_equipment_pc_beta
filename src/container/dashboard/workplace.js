/**
 * @file 工作台
 */
import React, { Component } from 'react';
import { Layout, Card, Avatar } from 'antd';
// import { withRouter } from 'react-router'
// import { connect } from 'react-redux';
import assets from '../../api/assets';
import querystring from 'querystring';
import request from '../../utils/request';
import './workplaceStyle.css';

const { Content } = Layout;
const { Meta } = Card;

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
        <Card title={`代办事项`} extra={<a>设置</a>} style={{margin: 10}} bordered={false}>
          <Card style={{width: '16%', float: 'left', border: '2px solid #5CACEE', borderRadius: '3%', marginLeft: '0'}}>
            <Meta
              avatar={<Avatar src={require('./work01.png')} />}
              title="5"
              description="维修派工"
              style={{margin: '-16px 0'}}
            />
          </Card>
          <Card style={{width: '16%', float: 'left', border: '2px solid #F4A460', borderRadius: '3%', marginLeft: '5%'}}>
            <Meta
              avatar={<Avatar src={require('./work02.png')}/>}
              title={this.state.rrpairData}
              description="维修处理"
              style={{margin: '-16px 0'}}
            />
          </Card>
          <Card style={{width: '16%', float: 'left', border: '2px solid #BCEE68', borderRadius: '3%', marginLeft: '5%'}}>
            <Meta
              avatar={<Avatar src={require('./work03.png')} />}
              title={this.state.transferData}
              description="转科审批"
              style={{margin: '-16px 0'}}
            />
          </Card>
          <Card style={{width: '16%', float: 'left', border: '2px solid #3CB371', borderRadius: '3%', marginLeft: '5%'}}>
            <Meta
              avatar={<Avatar src={require('./work04.png')} />}
              title={this.state.maintainData}
              description="保养实施"
              style={{margin: '-16px 0'}}
            />
          </Card>
          <Card style={{width: '16%', float: 'left', border: '2px solid #00CED1', borderRadius: '3%', marginLeft: '5%'}}>
            <Meta
              avatar={<Avatar src={require('./work05.png')} />}
              title="0"
              description="设备计量"
              style={{margin: '-16px 0'}}
            />
          </Card>
        </Card>
      </Content>
    )
  }
}

//<Card hoverable cover={<img alt="example" src={require('./index.jpg')} />} />

export default Workplace;
// export default withRouter(connect(state => state)(Workplace));