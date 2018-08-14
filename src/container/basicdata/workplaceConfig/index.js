/*  借用管理 - 新建借出 - 表单组件  */

import React, { Component } from 'react';

import {Layout, Tabs, Tree} from 'antd';

// import queryString from 'querystring';

// import request from '../../../utils/request';

// import basicdata from '../../../api/basicdata';

const { Content } = Layout;

const {TabPane} = Tabs;

const {TreeNode} = Tree;


class WorkplaceConfig extends Component{
    state = {
        userList: [],     //用户组数据
        checkedKeys: [],
        selectedKeys: []
    }

    componentDidMount() {
        // request(basicdata.findGroupList, {
        //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        //     success: (data) => {
        //         if(data.status) {
        //             this.setState({ userList: data.result.rows })
        //         }
        //     },
        //     error: err => console.log(err)
        // })
    }

    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    }

    onCheck = (a, b) => {
        console.log(a, b)
    }

    tabsChange = (activeKey) => {
        //切换tabs获取不同数据
    }
    
    render() {
        const {userList, checkedKeys, selectedKeys} = this.state;
        const treeData = [
            {
            title: (
                <span>
                    维修统计
                    <span style={{ paddingLeft: 20 }}>解释说明</span>
                </span>
            ),
            key: '0-0',
            children: [
            {
                title: '0-0-0',
                key: '0-0-0',
            },
            {
                title: '0-0-1',
                key: '0-0-1',
            },
            {
                title: '0-0-2',
                key: '0-0-2',
            }
            ]},
            {
                title: '0-1',
                key: '0-1',
                children: [
                    {
                        title: '0-1-1',
                        key: '0-1-1',
                    },
                    {
                        title: '0-1-2',
                        key: '0-1-2',
                    },
                    {
                        title: '0-1-3',
                        key: '0-1-3',
                    },
                    {
                        title: '0-1-4',
                        key: '0-1-4',
                    },
                    {
                        title: '0-1-5',
                        key: '0-1-5',
                    },
                    {
                        title: '0-1-6',
                        key: '0-1-6',
                    },
                ]
            },
            {
                title: '0-2',
                key: '0-2',
            }
            ];

        return (
            <Content style={{padding: 24}} className="ysynet-content ysynet-common-bgColor">
                <Tabs 
                    size="large" 
                    tabPosition={`left`}
                    onChange = {this.tabsChange}
                >
                    {
                        userList.map((item) => {
                            return (
                                <TabPane 
                                    style={{paddingLeft: 80}} 
                                    tab={item.groupName} 
                                    key={item.groupId}
                                >
                                    <Tree
                                        showLine    
                                        checkable
                                        onCheck={this.onCheck}
                                        checkedKeys={checkedKeys}
                                        selectedKeys={selectedKeys} 
                                    >
                                        {this.renderTreeNodes(treeData)}
                                    </Tree>
                                </TabPane>
                            )
                        })
                    }
                    
                </Tabs>
            </Content>
        )
    }
};

export default WorkplaceConfig;