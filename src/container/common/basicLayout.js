import React, { Component } from 'react';
import { Layout, Menu, Icon, Spin } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { menu as menuService } from '../../service';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

// 使用递归创建菜单
const createMenu = (menuList, num) => {
  let menuArray = [];
  if (Array.isArray(menuList)) {
    for (let i=0; i<menuList.length; i++) {
      if (menuList[i].children) {
        //console.log(menuList[i].children)
        menuArray.push(
          <SubMenu
            key={menuList[i].key} 
            title={<span><Icon type={menuList[i].icon} /><span>{menuList[i].text}</span></span>}
          >
            { createMenu(menuList[i].children) }
          </SubMenu>
        )
      } else {
        // console.log(menuList[i])
        menuArray.push(
          <Menu.Item key={menuList[i].key}>
            <Icon type={menuList[i].icon} />
            <span> { menuList[i].text } </span>
          </Menu.Item>
        )
      }
    }
  } else {
    menuArray.push(
      <Menu.Item key={menuList.key}>
        <Icon type={menuList.icon} />
        <span> { menuList.text } </span>
      </Menu.Item>
    )
  }
  return menuArray;
}

class BasicLayout extends Component {
  state = {
    collapsed: false,
    selectedKeys: [],
    openKeys: [],
    recordKeys: []//修复官方hover bug
  };
  changeActiveKeys = () => {
    const { history } = this.props;
    const { pathname } = history.location;
    const { openKeys } = this.state;
    console.log(openKeys)
    const keys = pathname.split('/');
    let selectedKeys = '', newOpenKeys = [];
    if (keys.length > 3) {
      selectedKeys = keys.slice(0, 4).join('/');
      newOpenKeys = [ keys.slice(0, 2).join('/'), keys.slice(0, 3).join('/') ]; 
    } else { 
      selectedKeys = pathname;
      newOpenKeys = openKeys.length ? openKeys : [ keys.slice(0, 2).join('/') ];  
    };
    this.setState({selectedKeys, openKeys: newOpenKeys});
  }
  componentWillMount = () => {
    this.changeActiveKeys();
  }
  onOpenChange = openKeys => {
    this.setState({ openKeys: openKeys })
  }
  componentWillReceiveProps = (nextProps) => {
    this.changeActiveKeys()
  }
  render() {
    const { history, menuList } = this.props;
    const { selectedKeys, openKeys } = this.state;
    return (
      <Sider
        width={'256'}      
        collapsed={this.state.collapsed}
      >
        <div className='logoWrapper'>
          <img src={require('../../assets/logo.png')} alt='logo' className='logo'/>
          <h1 className='logoDesc'>P H X L</h1>
        </div>
        {
          menuList && menuList.length ?
          <Menu 
            theme="dark" 
            mode="inline"
            selectedKeys={[selectedKeys]}
            onOpenChange={this.onOpenChange}
            openKeys={openKeys}
            onSelect={item => {
              history.push({pathname: `${item.key}`})
            }}
          >
           {
             createMenu(menuList)
           }
           </Menu> :
           <Spin tip="数据加载中" style={{width: '100%', height: 200, marginTop: 200}}/>
        } 
      </Sider>
    )
  }
}
export default withRouter(connect(null, dispatch => ({
  setBread: bread => dispatch(menuService.setBreadMapper(bread))
}))(BasicLayout));