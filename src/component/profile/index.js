import React, { PureComponent } from 'react';
import { Avatar, Popover, List, Icon } from 'antd';
import { Link } from 'react-router-dom';
import styles from './style.css';
const data = [
 { text: '个人中心', path: '/profile', icon: 'user' },
 { text: '设置', path: '/profile/setting', icon: 'setting' },
 { text: '退出登录', path: '/login', icon: 'logout'},
];
const ProfileList = () => (
  <List
    style={{padding: 0}}
    dataSource={data}
    renderItem={item => (
      <List.Item className={styles.profileItem}>
        <Link className={styles.profileItemLink} to={item.path}>
          <Icon type={item.icon} className={styles.profileIcon}/>{item.text}
        </Link>
      </List.Item>)
    }
  />
)

class Profile extends PureComponent {
  render() {
    return (
      <Popover content={<ProfileList/>} trigger="hover" placement="bottomLeft">
        <div>
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <span className={`${styles.username}`}>Vania</span>
        </div> 
      </Popover> 
    )
  }
}

export default Profile;