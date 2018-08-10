import React, { Component } from 'react';

import inspectionMgt from '../../../api/inspectionMgt';

import queryString from 'querystring';

import request from '../../../utils/request';

import {Layout, Card, Row, Col,Upload} from 'antd';

const {Content} = Layout;



class Detail extends Component {
    state = {
        inspectionInfo: {},
        fileList: []
    }
    componentDidMount() {
        let checkGuid = this.props.match.params.id;
        request(inspectionMgt.queryCheckInfoList, {
            body: queryString.stringify({ checkGuid }),
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: (data) => {
                if(data.status) {
                    let fileList = data.result.rows.map( (item, index) => ({
                        uid: index,
                        name: '陈文君.png',
                        status: 'done',
                        url: item.tfAccessory,
                        thumbUrl: item.tfAccessory,
                    }) )
                    this.setState({inspectionInfo: data.result.rows[0], fileList});
                }
            },
            error: err => console.log(err)
        })
    }
    render() {
        let {inspectionInfo, fileList} = this.state;
        console.log(fileList)
        return (
            <Content>
                <Card style={{ margin: '16px 16px 0' }}>
                    <h3 style={{ fontWeight: 'bold' }}>巡检信息</h3>
                    <Row>
                        <Col span={24}>
                            <div className="ant-row ant-form-item">
                                <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-2">
                                    <label>巡检日期</label>
                                </div>
                                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-22">
                                    <div className="ant-form-item-control">
                                        {inspectionInfo.checkDate || '' }
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className="ant-row ant-form-item">
                                <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-2">
                                    <label>巡检科室</label>
                                </div>
                                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-22">
                                    <div className="ant-form-item-control">
                                        {inspectionInfo.deptNames || '' }
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className="ant-row ant-form-item">
                                <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-2">
                                    <label>巡检结果</label>
                                </div>
                                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-22">
                                    <div style={{ wordBreak: 'break-word' }} className="ant-form-item-control">
                                        {inspectionInfo.checkResult || '' }
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className="ant-row ant-form-item">
                                <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-2">
                                    <label>巡检人</label>
                                </div>
                                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-22">
                                    <div className="ant-form-item-control">
                                        {inspectionInfo.userNames || '' }
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <div className="ant-row ant-form-item">
                                <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-6">
                                    <label>附件</label>
                                </div>
                                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                    <div className="ant-form-item-control">
                                        <Upload listType="text" fileList={[...fileList]}  withCredentials={true}/>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Content>
        )
    }
}

export default Detail;