import React,  { Component } from 'react';
import Route from '../../utils/Route';
import { Layout, Icon, Badge, Breadcrumb } from 'antd';
import { connect } from 'react-redux'
import { user as userService } from '../../service';
import { menu as menuService } from '../../service';
const { Header, Content, Footer } = Layout;

class Home extends Component {  
  componentDidMount() {
    const { getMenu, getUser } = this.props;
    getUser();
    getMenu();
  }
  render () {
    const Wrapper = this.props.wrapper;
    const { routes, menu } = this.props;
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Wrapper menuList={menu.menuList}/>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} className='ysynet-header'>
            {/* <Icon 
              onClick={() => {
                const { collapsed, recordKeys, openKeys } = this.state;
                this.setState({
                  collapsed: !collapsed, 
                  openKeys: recordKeys, 
                  recordKeys: openKeys
                })
              }}
              className='ysyenert-header-icon ysynet-collapsed'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} 
            /> */}
            <div className='ysynet-header-right'>
              <Badge count={5}>
                <Icon type='bell'/>
              </Badge>
            </div>  
          </Header>
          <Breadcrumb className={'ysynet-breadcrumb'}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
            <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{ padding: 8 }}>
            {
              routes.map((route, index) => (
                <Route key={index} route={route}/>
              ))
            }
          </Content>  
          <Footer style={{ textAlign: 'center' }}>
            医商云设备平台 ©2017 Created by 普华信联前端部
          </Footer>
        </Layout>
      </Layout>  
    )
  }
}
export default connect(state => state, dispatch => ({
  getUser: () => dispatch(userService.fetchUserInfo()),
  getMenu: () => dispatch(menuService.fetchMenu())
}))(Home);