/**
 * @file 工作台
 */
import React, { Component } from 'react';
import { Layout, Card, Avatar } from 'antd';
// import { withRouter } from 'react-router'
// import { connect } from 'react-redux';
import assets from '../../api/assets';
import request from '../../utils/request';
import querystring from 'querystring';

const { Meta } = Card;

const { Content } = Layout;

class Workplace extends Component {

  componentWillMount = () => {
    this.getTodoInfo();
  }
  
  getTodoInfo = () => {
    let options = {
      body:querystring.stringify(),
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        console.log(data);
        if (data.status) {
          
        }
      },
      error: err => {console.log(err)}
    }
    request(assets.getSelectOrderNumber, options);
  }

  render() {
    return (
     <Content>
       <Card title={`代办事项`} extra={<a>设置</a>} style={{margin: 10}}>
        <Card style={{width: '19%' , float: 'left', border: '1px solid red', borderRadius: '2%', marginLeft: '0.5%'}}>
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title="Card title"
            description="维修派工"
          />
        </Card>
        <Card style={{width: '19%', float: 'left', border: '1px solid red', borderRadius: '2%', marginLeft: '1%'}}>
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title="Card title"
            description="维修处理"
          />
        </Card>
        <Card style={{width: '19%', float: 'left', border: '1px solid red', borderRadius: '2%', marginLeft: '1%'}}>
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title="Card title"
            description="转科审批"
          />
        </Card>
        <Card style={{width: '19%', float: 'left', border: '1px solid red', borderRadius: '2%', marginLeft: '1%'}}>
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title="Card title"
            description="保养实施"
          />
        </Card>
        <Card style={{width: '19%', float: 'left', border: '1px solid red', borderRadius: '2%', marginLeft: '1%'}}>
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title="Card title"
            description="设备计量"
          />
        </Card>
       </Card>
     </Content>
    )
  }
}
// <Card hoverable cover={<img alt="example" src={require('./index.jpg')} />} />
export default Workplace;
// export default withRouter(connect(state => state)(Workplace));