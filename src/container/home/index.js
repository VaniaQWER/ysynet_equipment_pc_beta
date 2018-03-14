import React from 'react';
import { Layout, Icon, message,Spin } from 'antd'; //message
import { connect } from 'react-redux';
import { user as userService, menu as menuService  } from '../../service';
import { withRouter, Switch, Redirect } from 'react-router-dom';
import RouteWithSubRoutes from '../../route/routeWithSubRoutes';
import BasicLayout from '../common/basicLayout';
import BreadcrumbGroup from '../../component/breadcrumbGroup';
import Profile from '../../component/profile';
import Notice from '../../component/notice';
const { Header, Footer } = Layout;

const checkPath = (ownList, index) => {
  const path = window.location.hash.split('#')[1].replace(/\s/g,'').toUpperCase();
  console.log(path,'path');
  console.log(ownList,'ownList')
  for( let i = 0;i < ownList.length; i++){
    for ( let j=0; j<ownList[i].subMenus.length; j++){
      if (path.includes(ownList[i].subMenus[j].path.replace(/\s/g,'').toUpperCase()) || path.includes('WORKPLACE')) { 
          console.log(ownList[i].subMenus[j].path.replace(/\s/g,'').toUpperCase(),'subMenu PTH') 
          return true;
      }
    }
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      isLoading: true
    }
  }
  async componentWillMount() {
    const { setUser,getMenu, getUser, history } = this.props;//getUser history
      const data = await getUser();
      setUser(data.result);
      if (data.status) {
        this.setState({
          isLoading: false
        })
        const menu = await getMenu();
        console.log(menu)
        if(!checkPath(menu,1)){
          alert('路径错误')
        }
       
    } else {
      message.error('会话失效, 请重新登录！');
      history.push({pathname: '/login'})
    }
  }
  render () {
    const { routes, menu, user } = this.props;
    return (
      <Spin spinning={this.state.isLoading} size="large">
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
              <Profile userName={user.userInfo.userName || user.userName }/>
            </div>  
          </Header>
          <BreadcrumbGroup className='ysynet-breadcrumb' routes={routes}>
            {  }
          </BreadcrumbGroup>
          {
            this.state.isLoading ? '数据加载中...' : 
            <Switch>
              {
                routes.map((route, i) => (
                  <RouteWithSubRoutes key={i} {...route}/>
                ))
              }
              <Redirect from={'/'} to={'/workplace'}/>  
            </Switch>
          }
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
      </Spin>
    )
  }
}
export default withRouter(connect(state => state, dispatch => ({
  setUser: user => dispatch(userService.setUserInfo(user)),
  getUser: () => dispatch(userService.fetchUserInfo()),
  getMenu: () => dispatch(menuService.fetchMenu())
}))(Home));