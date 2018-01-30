import React, { Component } from 'react';
import styles from './style.css';
import LoginForm from './loginForm';
import PhoneLoginForm from './phoneLoginForm'
import { Row, Col, Tabs, Icon, Form, Button } from 'antd';
const TabPane = Tabs.TabPane;
/**
 * @file 登录页面
 */

const WrappedNormalLoginForm = Form.create()(LoginForm);
const WrappedPhoneLoginForm = Form.create()(PhoneLoginForm);
class Login extends Component {
  componentWillUnmount() {

  }
  render() {
    return (
      <Row className={`${styles.container} login`}>
        <Col span={16} push={8} style={{marginTop: 100}}>
          <Tabs defaultActiveKey="1" animated={false} style={{width: 400}}>
            <TabPane style={{padding: 8}} tab={<span style={{fontSize: 16}}><Icon type="solution" />账户密码登录</span>} key="1">
              <WrappedNormalLoginForm/>
            </TabPane>
            <TabPane style={{padding: 8}}  tab={<span style={{fontSize: 16}}><Icon type="mobile" />手机号码登录</span>} key="2">
              <WrappedPhoneLoginForm/>
            </TabPane>
          </Tabs>
        </Col>
        <Col span={16} push={8} style={{padding: 8}}>
          <Button style={{width: 384}} type='primary' size='large'>登录</Button>
        </Col>
      </Row>
    )
  }
}
        /* <div className={styles.top}>
          <a className={styles["login-logo"]}> </a>
         </div> */

export default Login;