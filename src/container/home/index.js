import React,  { Component } from 'react';
import Route from '../../utils/Route';
import { withRouter } from 'react-router-dom';
import { Layout, Icon, Badge, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import { user as userService, menu as menuService  } from '../../service';
import Switch from '../../utils/Switch';
//import HeaderSearch from '../../component/headerSearch';

const { Header, Content, Footer } = Layout;

const createBread = (routes, pathname) => {
  const routesArray = pathname.split('/');
  const pathArray = []
  routesArray.map((item, index) => {
    if (index > 0) {
      pathArray.push(`/${routesArray.slice(1, index+1).join('/')}`)
    }
    return false;
  })
  let bread = []
  //console.log(routes)
  if (pathArray.length) {
    const childRoute = routes.filter(item => item.path === pathArray[0])
    const getChildRoute = (r, i) => {
      r.map(item => {
        if (item.path === pathArray[i]) {
          return bread.push({
            text: item.name,
            path: item.path
          })
        } else if (item.children && item.children.length) {
          return getChildRoute(item.children, i)
        } 
        return null;
      })
    }
    pathArray.map((item, index) => getChildRoute(childRoute, index))
  }
  return bread;
}

class Home extends Component {  
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      bread: []
    }
  }
  componentDidMount() {
    const { getMenu, getUser, routes, routerReducer } = this.props;
    getUser();
    getMenu();
    const bread = createBread(routes, routerReducer.location.pathname);
    this.setState({
      bread
    })
  }
  
  componentWillReceiveProps(nextProps) {
    const { routes, routerReducer } = nextProps;
    const bread = createBread(routes, routerReducer.location.pathname);
    this.setState({
      bread
    })
  }
  render () {
    const Wrapper = this.props.wrapper;
    const { routes, menu } = this.props;
    const { bread } = this.state;
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Wrapper menuList={menu.menuList} collapsed={this.state.collapsed}/>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} className='ysynet-header'>
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
            <div className='ysynet-header-right'>
              <Badge count={5}>
                <Icon type='bell'/>
              </Badge>
            </div>  
          </Header>
          <Breadcrumb className={'ysynet-breadcrumb'}>
          {
            bread.map((b, i) => (
              <Breadcrumb.Item key={i}>{ b.text } </Breadcrumb.Item>
            ))
          }
            
          </Breadcrumb>
          <Content style={{ padding: 8 }}>
            <Switch>
            {
              routes.map((route, index) => (
                <Route key={index} route={route}/>
              ))
            }
            </Switch>
          </Content>  
          <Footer style={{ textAlign: 'center' }}>
            医商云设备平台 ©2017 Created by 普华信联前端部
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