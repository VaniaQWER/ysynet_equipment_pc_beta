import React from 'react';
import { Layout, Icon, Breadcrumb, Menu } from 'antd';
import { connect } from 'react-redux';
import { user as userService, menu as menuService  } from '../../service';
import { withRouter } from 'react-router-dom';
import RouteWithSubRoutes from '../../route/routeWithSubRoutes';
import BasicLayout from '../common/basicLayout';
const { Header, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;
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
    const { routes, menu } = this.props;
    const { bread } = this.state;
    return (
      <Layout style={{minHeight: '100vh'}}>
        <BasicLayout menuList={menu.menuList} collapsed={this.state.collapsed}/>
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
          </Header>
          <Breadcrumb className={'ysynet-breadcrumb'}>
            {
              bread.map((b, i) => (
                <Breadcrumb.Item key={i}>{ b.text } </Breadcrumb.Item>
              ))
            }
          </Breadcrumb>
          <Content style={{ padding: 8 }}>
            {
              routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route}/>
              ))
            }
          </Content>  
          <Footer style={{ textAlign: 'center', padding:'5px 0' }}>
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