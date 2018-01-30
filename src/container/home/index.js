import React from 'react';
import { Layout, Icon, Menu } from 'antd';
import { connect } from 'react-redux';
import { user as userService, menu as menuService  } from '../../service';
import { withRouter, Switch, Redirect } from 'react-router-dom';
import RouteWithSubRoutes from '../../route/routeWithSubRoutes';
import BasicLayout from '../common/basicLayout';
import BreadcrumbGroup from '../../component/breadcrumbGroup';
import Profile from '../../component/profile';
import Notice from '../../component/notice';
const { Header, Footer } = Layout;
const SubMenu = Menu.SubMenu;
// 使用递归创建菜单
const createMenu = menuList => (
  Array.isArray(menuList) ? menuList.map((menu, index) => (
    menu.children ? (
      <SubMenu
        key={menu.key} 
        title={<span><Icon type={menu.icon} /><span>{menu.text}</span></span>}
      >
        { createMenu(menu.children) }
      </SubMenu>
    ) : (
      <Menu.Item key={menu.key}>
        <Icon type={menu.icon} />
        <span> { menu.text } </span>
      </Menu.Item>
    )
  )) : (
    <Menu.Item key={menuList.key}>
      <Icon type={menuList.icon} />
      <span> { menuList.text } </span>
    </Menu.Item>
  )
)
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }
  componentWillMount() {
    const { getMenu, getUser } = this.props;
    getUser();
    getMenu();
  }
  render () {
    const { routes, menu } = this.props;
    return (
      <Layout style={{minHeight: '100vh'}}>
        <BasicLayout menuList={menu.menuList} collapsed={this.state.collapsed}/>
        <Layout>
          <Header style={{ background: '#fff', padding: '0 20px 0 0' }} className='ysynet-header'>
            <Icon 
              onClick={() => {
                const { collapsed } = this.state;
                this.setState({
                  collapsed: !collapsed
                })
              }}
              className='ysyenert-header-icon ysynet-collapsed'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} 
            />
            <div style={{display: 'flex'}}>
              <Notice/>
              <Profile/>
            </div>  
          </Header>
          <BreadcrumbGroup className='ysynet-breadcrumb' routes={routes}>
            {  }
          </BreadcrumbGroup>
          <Switch>
            {
              routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route}/>
              ))
            }
            <Redirect from={'/'} to={'/workplace'}/>  
          </Switch>
          <Footer style={{ textAlign: 'center', padding:'5px 0' }}>
            <div className={'ysynet-footer-link'}>
              <ul>
                <li><a>医商云官网</a></li>
                <li><a>医商云供应链平台</a></li>
                <li><a>医商云质控平台</a></li>
              </ul>
            </div>
            <div className={'ysynet-footer-copyright'}>医商云设备平台 ©2017 Created by 普华信联前端部</div>
          </Footer>
        </Layout>  
      </Layout>
    )
  }
}
export default withRouter(connect(state => state, dispatch => ({
  getUser: () => dispatch(userService.fetchUserInfo()),
  getMenu: () => dispatch(menuService.fetchMenu())
}))(Home));