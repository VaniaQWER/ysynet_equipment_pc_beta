/**
 * @file 资产转科 - 转科管理 - 转科管理操作
 * @author Vania
 * @since 2018-04-09
 */
import React, { PureComponent } from 'react';
import { Layout, Card, Form, Row, Col, Input, Upload, Icon, Modal, Affix, Button, message } from 'antd';
import tableGrid from '../../../component/tableGrid';
import request from '../../../utils/request';
import querystring from 'querystring';
import transfer from '../../../api/transfer';
import assets from '../../../api/assets';
import { cutFtpUrl } from '../../../utils/tools';


const { Content } = Layout;
const FormItem = Form.Item;
const { TextArea } = Input;
const { RemoteTable } = tableGrid

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

class TransferRecordEdit extends PureComponent {
  state = {
    data:[],
    previewVisible: false,
    previewImage: '',
    fileList: [],
    fileUploadState: true,
    spAccessoryData: {},
    transferGuid: '',
  };  
  
  componentWillMount =() =>{
    //获取id 根据id号查详情
    const transferGuid = this.props.match.params.id || this.props.id;
    this.setState({transferGuid: transferGuid})
    this.getApplyInfo({transferGuid});
  }
  //获取详情
  getApplyInfo = (transferNo) => {
    let options = {
      body:querystring.stringify({transferGuid: transferNo}),
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        const result = data.result.rows[0];
        const values = this.props.form.getFieldsValue();
        values.createUserName = result.createUserName;
        values.outDeptName = result.outDeptName;
        values.inDeptName = result.inDeptName;
        values.newAdd = result.newAdd;
        values.maintainUserName = result.maintainUserName;
        values.transferDate = result.transferDate;
        this.setState({data:values});
      }
    }
    request(transfer.getSelectTransferList, options);
  }
  
  /**--------------------图片上传内容Start-------------------------*/
  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  beforeUpload = (file) => {
    const type = file.type === 'image/jpeg'|| file.type === 'image/png'|| file.type === 'image/bmp';
    if (!type) {
      message.error('您只能上传image/jpeg、png、bmp!');
    }
    const isLt5M = file.size / 1024 / 1024  < 5;
    if (!isLt5M) {
      message.error('图片不能大于 5MB!');
    }
    this.setState({
      fileUploadState: type && isLt5M
    })
    return true;
  }
  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    if (this.state.fileUploadState) {
      let options={spAccessoryList: fileList};
      this.setState({spAccessoryData: Object.assign(this.state.spAccessoryData, options)});
    } else{
      this.setState({
        spAccessoryData: Object.assign(this.state.spAccessoryData,{spAccessoryList: fileList.slice(0, [fileList.length-1])})
      });
    }
  };
  /**--------------------图片上传内容End-------------------------*/
  //提交数据
  handleSubmit = (fstate) =>{
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
          values.fstate = fstate;
          values.transferGuid = this.state.transferGuid;
          //更改附件格式
          let thumburl = []
          let fileString ='';
          if(values.spAccessoryList){
            for(let i =0;i<values.spAccessoryList.fileList.length;i++){
              let file = values.spAccessoryList.fileList[i] ;
              if(file.thumbUrl){
                thumburl.push(file.thumbUrl)
              }else{
                fileString+= (cutFtpUrl(file.url)+';')
                thumburl.push('')
              }
            }
          }	
          values.spAccessoryList = thumburl;
          values.spAccessory = fileString;
          this.sendAjax(values)
      }
    });
  }
  //发出请求
  sendAjax = (value) =>{
    let options = {
      body:querystring.stringify(value),
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        if(data.status){
          message.success( '操作成功')
          setTimeout(()=>{
            this.props.history.push('/transfer/transferManager')
          },1000)
        }else{
          message.error(data.msg)
        }
      }
    }
    request(transfer.getUpdateTransfer, options)
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
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { previewVisible, previewImage, data, fileList } = this.state;
    const { getFieldDecorator } = this.props.form;
    return(
      <Content>
        {/* 保存申请信息按钮部分 */}
        <Affix>
          <div style={{background: '#fff', padding: '10px 20px', marginBottom: 4, display: 'flex', alignContent: 'center', justifyContent: 'flex-end'}}>
            <Button type="default" onClick={()=>this.handleSubmit('07')}>关闭</Button>
            <Button type="primary" style={{marginLeft: 22}} onClick={()=>this.handleSubmit('03')}>完成</Button>
          </div>
        </Affix>
        <Form>
          {/* 申请信息部分 */}
          <Card title="申请信息" bordered={false} className="min_card">
            <Row>
              <Col span={8}>
                <FormItem label={`申请人`} {...formItemLayout}>
                {getFieldDecorator('createUserName', {
                  initialValue:data.createUserName
                })(<Input style={{width: 200}} disabled={true} />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={`转出科室`} {...formItemLayout}>
                  {getFieldDecorator('outDeptName',{
                    initialValue:data.outDeptName
                  })(<Input style={{width: 200}} disabled={true} />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={`转入科室`} {...formItemLayout}>
                  {getFieldDecorator('inDeptName',{
                    initialValue:data.inDeptName
                  })(<Input style={{width: 200}} disabled={true} />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={`新存放地址`} {...formItemLayout}>
                  {getFieldDecorator('newAdd',{
                    initialValue:data.newAdd
                  })(<Input style={{width: 200}} disabled={true} />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={`新保管人`} {...formItemLayout}>
                  {getFieldDecorator('maintainUserName',{
                    initialValue:data.maintainUserName
                  })(<Input style={{width: 200}} disabled={true} />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={`计划转科时间`} {...formItemLayout}>
                  {getFieldDecorator('transferDate',{
                    initialValue:data.transferDate
                  })(<Input style={{width: 200}} disabled={true} />)}
                </FormItem>
              </Col>
            </Row>
          </Card>
          {/* 资产信息部分 */}
          <Card title="资产信息" bordered={false} style={{marginTop: 4}} className="min_card">
            <RemoteTable
              showHeader={true}
              columns={columns} 
              rowKey={'transferDetailGuid'}
              style={{marginTop: 10}} 
              scroll={{x: '100%', y : document.body.clientHeight - 110 }}
              size="small"
              url={transfer.getSelectTransferDetailList}
              query={{transferGuid:this.props.match.params.id||this.props.id}}
            />
          </Card>
          <Card title="转科意见" bordered={false} style={{marginTop: 4}} className="min_card">
            <Row>
              <Col span={24}>
                <FormItem label="意见" {...formStyleLayout}>
                  {getFieldDecorator('transferOpinion')(<TextArea rows={4}  />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col className="clearfix">
                <FormItem label="审批附件" {...formStyleLayout}>
                {getFieldDecorator('spAccessoryList')(
                  <Upload name="spAccessoryList"
                    action={assets.picUploadUrl}
                    listType="picture-card"
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    beforeUpload={this.beforeUpload}
                  >
                    {fileList.length >= 3 ? null : uploadButton}
                  </Upload>
                )}
                </FormItem>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </Col>
            </Row>
          </Card>
        </Form>
      </Content>
    )
  }
}
export default Form.create()(TransferRecordEdit);
