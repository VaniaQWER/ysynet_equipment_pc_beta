/**
 * @file 资产转科 - 转科记录 - 转科记录详情
 * @author Vania
 * @since 2018-04-09
 */

import React, { PureComponent } from 'react';
import { Layout, Card, Form, Row, Col, Input, Upload, Modal } from 'antd';
import './style.css';
import tableGrid from '../../../component/tableGrid';
import request from '../../../utils/request';
import transfer from '../../../api/transfer';
import { FTP } from '../../../api/local';
import assets from '../../../api/assets';
import querystring from 'querystring';

const { Content } = Layout;
const FormItem = Form.Item;
const { TextArea } = Input;
const { RemoteTable } = tableGrid;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const formStyleLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

class TransferRecordDetails extends PureComponent {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: '',
    }],
    data: []
  };
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList });
  componentWillMount = () => {
    const transferGuid = this.props.match.params.id || this.props.id;
    this.setState({transferGuid: transferGuid});
    this.getApplyInfo(transferGuid);
  }
  getApplyInfo = (transferNo) => {
    let options = {
      body:querystring.stringify({transferGuid: transferNo}),
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        if (data.status) {
          const result = data.result.rows[0];
          const values = this.props.form.getFieldsValue();
          values.createUserName = result.createUserName;
          values.outDeptName = result.outDeptName;
          values.inDeptName = result.inDeptName;
          values.newAdd = result.newAdd;
          values.maintainUserName = result.maintainUserName;
          values.transferDate = result.transferDate;
          values.transferOpinion = result.transferOpinion;
          //处理附件格式
          if(result.spAccessory){
            let urls = result.spAccessory.split(';');
            let u = urls.splice(0, urls.length-1);
            let files = [];
            u.map((item, index) => {
              return files.push({
                url: FTP + item,
                uid: index
              })
            });
            result.spAccessory=files;
          }
          // values.spAccessory = result.spAccessory;
          this.setState({data: values})
        }
      }
    }
    request(transfer.getSelectTransferList, options);
  }
  render() {
    // 资产列表渲染
    const columns = [
      {
        title: '资产编号',
        dataIndex: 'assetsRecord',
        width: 100,
        sorter: true
      },
      {
        title: '资产名称',
        dataIndex: 'equipmentStandardName',
        width: 100
      },
      {
        title: '型号',
        dataIndex: 'fmodel',
        width: 100
      },
      {
        title: '规格',
        dataIndex: 'spec',
        width: 100
      },
      {
        title: '使用科室',
        dataIndex: 'useDeptName',
        width: 100
      }
    ]
    const { previewVisible, previewImage, data } = this.state;
    const { getFieldDecorator } = this.props.form;
    return(
      <Content>
        {/* 申请信息部分 */}
        <Card title="申请信息" bordered={false} className="min_card">
          <Form>
            <Row>
              <Col span={8}>
                <FormItem label={`申请人`} {...formItemLayout}>
                {getFieldDecorator('createUserName', {
                  initialValue: data.createUserName
                })(
                  <Input style={{width: 200}} disabled={true} />
                )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={`转出科室`} {...formItemLayout}>
                {getFieldDecorator('outDeptName', {
                  initialValue: data.outDeptName
                })(
                  <Input style={{width: 200}} disabled={true} />
                )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={`转入科室`} {...formItemLayout}>
                {getFieldDecorator('inDeptName', {
                  initialValue: data.inDeptName
                })(
                  <Input style={{width: 200}} disabled={true} />
                )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={`新存放地址`} {...formItemLayout}>
                {getFieldDecorator('newAdd', {
                  initialValue: data.newAdd
                })(
                  <Input style={{width: 200}} disabled={true} />
                )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={`新保管人`} {...formItemLayout}>
                {getFieldDecorator('maintainUserName', {
                  initialValue: data.maintainUserName
                })(
                  <Input style={{width: 200}} disabled={true} />
                )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={`计划转科时间`} {...formItemLayout}>
                {getFieldDecorator('transferDate', {
                  initialValue: data.transferDate
                })(
                  <Input style={{width: 200}} disabled={true} />
                )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>

        {/* 资产信息部分 */}
        <Card title="资产信息" bordered={false} style={{marginTop: 4}} className="min_card">
          <RemoteTable
            showHeader={true}
            columns={columns} 
            rowKey={'transferDetailGuid'}
            scroll={{x: '100%', y : document.body.clientHeight - 110 }}
            style={{marginTop: 10}} 
            size="small"
            url={transfer.getSelectTransferDetailList}
            query={{transferGuid:this.props.match.params.id||this.props.id}}
          />
        </Card>
        <Card title="转科意见" bordered={false} style={{marginTop: 4}} className="min_card">
          <Form>
            <Row>
              <Col span={24}>
                <FormItem label="意见" {...formStyleLayout}>
                {getFieldDecorator('transferOpinion',{
                  initialValue: data.transferOpinion
                })(<TextArea rows={4} disabled={true}/>)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col className="clearfix">
                <FormItem label="审批附件" {...formStyleLayout}>
                  {getFieldDecorator('spAccessory',{
                    initialValue: data.spAccessory
                  })(
                    <Upload
                      action={assets.picUploadUrl}
                      listType="picture-card"
                      fileList={data.spAccessory}
                      onPreview={this.handlePreview}
                      onChange={this.handleChange}
                    >
                    </Upload>
                  )}
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
      </Content>
    )
  }
}
export default Form.create()(TransferRecordDetails);