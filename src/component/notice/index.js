import React, { PureComponent } from 'react';
import { Badge, Icon, Popover, Tabs } from 'antd';
import styles from './style.css';
//import NoticeItem from './noticeItem';
const TabPane = Tabs.TabPane;
const NoticeList = () => (
  <Tabs defaultActiveKey="1" style={{width: 400}}>
    <TabPane tab="通知（5）" key="1">

    </TabPane>
    <TabPane tab="消息（3）" key="2">

    </TabPane>
    <TabPane tab="代办（4）" key="3">

    </TabPane>
  </Tabs>
)

class Notice extends PureComponent {
  render() {
    return (
      <Popover content={<NoticeList/>} trigger="click" placement="bottomRight">
        <div className={styles.noticeWrapper}>
          <Badge count={12}>
            <Icon type='bell' style={{fontSize: 18}}/>
          </Badge>
        </div>
      </Popover> 
    )
  }
}

export default Notice;