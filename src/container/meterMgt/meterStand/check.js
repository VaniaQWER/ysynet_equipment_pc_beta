/*计量台账- 检测*/
import React , { Component } from 'react';
import { Layout, Card, Button, Affix, Form, Icon ,  Col, Row, Input, Select, DatePicker, message, Radio , Upload} from 'antd';
import { Link } from 'react-router-dom';
// import querystring from 'querystring';
// import request from '../../../utils/request';
import assets from '../../../api/assets';
const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
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

class CheckMeterStand extends Component{

      state = {
        SearchKey:'',//资产编号搜索
        assetsInfo:{},
        fileList:[]
      }
      searchAsset=(e)=>{
        this.setState({SearchKey:e.target.value}) 
        //在这里发出请求获取资产信息,将回填信息给assets做操作
        // this.setState({assetsInfo:{ }})
      }
      save = () => {
        this.props.form.validateFields((err,values)=>{
          if(!err){
            values.daijianshijian = values.daijianshijian.format('YYYY-MM-DD');
            values.xiacidaijianshijian = values.xiacidaijianshijian.format('YYYY-MM-DD');
            values = Object.assign(values,{assetbianma : this.state.SearchKey})
          }
        })
      }
      handleChange = (fileListObj) => {
        let { fileList } = fileListObj ; 
        // 1. Limit the number of uploaded files
        //    Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-2);
        
        for(let i = 0;i<fileList.length;i++){
          switch (fileList[i].type){
            case "application/x-rar-compressed":
              break;
            case "application/zip":
              break;
            case "application/x-zip-compressed":
              break;
            case "application/msword":
              break;
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
              break;
            case "application/pdf":
              break;
            case "image/jpeg":
              break;
            default:
              message.warning('仅支持扩展名：.rar .zip .doc .docx .pdf .jpg！',3)
            return;
          }
        }

        // 2. read from response and show file link
        fileList = fileList.map((file) => {
          if (file.response) {
            // Component will show file.url as link
            file.url = file.response.url;
          }
          return file;
        });

        // 3. filter successfully uploaded files according to response from server
        fileList = fileList.filter((file) => {
          if (file.response) {
            return file.response.result === "success";
          }
          return true;
        });
        this.setState({fileList})
      }
      render(){
        const { getFieldDecorator } = this.props.form;
        const { assetsInfo } = this.state;
        const props = {
          action: assets.picUploadUrl,
          fileList:this.state.fileList,
          onChange: this.handleChange,
          multiple: true,
        };
        return(
          <Content className='ysynet-content'>
              {/* 保存申请信息按钮部分 */}
              <Affix>
                <div style={{background: '#fff', padding: '10px 20px', marginBottom: 4, display: 'flex', alignContent: 'center', justifyContent: 'flex-end'}}>
                <Button type="primary"><Link to={{pathname:`/meterMgt/meterStand/`}}>取消</Link></Button>
                <Button type="primary" onClick={this.save} style={{marginLeft:15}}>完成检定</Button>
                </div>
              </Affix>
              {/* 资产信息部分 */}
              <Card title="资产信息" bordered={false} className="min_card">
                  <Row>
                    <Col span={8}>
                      <div className="ant-row ant-form-item">
                        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                          <label>资产编号</label>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                          <div className="ant-form-item-control">
                           {/* <Input style={{width: 200}}  onPressEnter={this.searchAsset}
                            placeholder={`请输入资产编号`} />*/}

                            {assetsInfo.zichanmingc || '资产编号'}
                          </div>
                        </div>
                      </div>
        
                    </Col>
                    <Col span={16}>
                      <div className="ant-row ant-form-item">
                        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                          <label>资产名称</label>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                          <div className="ant-form-item-control">
                            {assetsInfo.zichanmingc || '资产名称'}
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <div className="ant-row ant-form-item">
                        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                          <label>型号</label>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                          <div className="ant-form-item-control">
                            {assetsInfo.xinghao || '型号'}
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="ant-row ant-form-item">
                        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                          <label>规格</label>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                          <div className="ant-form-item-control">
                          {assetsInfo.xinghao || '规格'}
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="ant-row ant-form-item">
                        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                          <label>资产类别</label>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                          <div className="ant-form-item-control">
                          {assetsInfo.xinghao || '资产类别'}
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <div className="ant-row ant-form-item">
                        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                          <label>使用科室</label>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                          <div className="ant-form-item-control">
                          {assetsInfo.xinghao || '使用科室'}
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="ant-row ant-form-item">
                        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                          <label>保管员</label>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                          <div className="ant-form-item-control">
                          {assetsInfo.xinghao || '保管员'}
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="ant-row ant-form-item">
                        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                          <label>管理科室</label>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                          <div className="ant-form-item-control">
                          {assetsInfo.xinghao || '管理科室'}
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <div className="ant-row ant-form-item">
                        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                          <label>原值</label>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                          <div className="ant-form-item-control">
                          {assetsInfo.xinghao || '原值'}
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
              </Card>
              {/* 资产信息部分 */}
              <Card title="检测信息" bordered={false} style={{marginTop: 4}} className="min_card">     
                <Form ref='checkForm'>
                  <Row>
                    <Col span={8}>
                      <FormItem  {...formItemLayout} label='检定方式'>
                        {getFieldDecorator('jiandingfangshi', {
                          initialValue:"01",
                          rules:[{
                            required:true,message:"请选择检定方式"
                          }]
                        })(
                          <Radio.Group>
                            <Radio value="01">内检</Radio>
                          </Radio.Group>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem {...formItemLayout} label='计量周期'>
                        {getFieldDecorator('password', {
                          rules: [{ required: true, message: '请填写计量周期!' }],
                        })(
                          <Input addonAfter='月' style={{width:200}}/>
                        )}
                      </FormItem>
                    </Col>
        
                    <Col span={8}>
                      <FormItem {...formItemLayout} label='本次待检日期'>
                      {getFieldDecorator('daijianshijian',{
                        initialValue:null,
                        rules:[{
                          required:true,message:"请选择本次待检日期!"
                        }]
                      })(
                        <DatePicker format={'YYYY-MM-DD'} style={{width:200}}/>
                      )}
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <FormItem {...formItemLayout} label='下次待检日期'>
                      {getFieldDecorator('xiacidaijianshijian',{
                        initialValue:null,
                        rules:[{
                          required:true,message:"请选择下次待检日期!"
                        }]
                      })(
                        <DatePicker format={'YYYY-MM-DD'} style={{width:200}}/>
                      )}
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem {...formItemLayout} label='证书编号'>
                        {getFieldDecorator('tiqiantixingtianshu')(
                          <Input  style={{width:200}}/>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem {...formItemLayout} label='检定结果'>
                        {getFieldDecorator('jiandingjieguo', {
                          required:true,message:"请选择检定结果!"
                        })(
                          <Select style={{width:200}}>
                            <Option value="01">合格</Option>
                            <Option value="00">不合格</Option>
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <FormItem {...formItemLayout} label='计量费用'>
                        {getFieldDecorator('jiliangfeiyong', )(
                          <Input addonAfter='元' style={{width:200}}/>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem {...formItemLayout} label='检定人'>
                        {getFieldDecorator('jiandingren', )(
                          <Select style={{width:200}}>
                            <Option value="01">renwu1</Option>
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                      <Col span={8}>
                        <FormItem label='附件' {...formItemLayout}>
                          {getFieldDecorator('fujian', )(
                            <Upload {...props} fileList={this.state.fileList} withCredentials={true}>
                              <Button>
                                <Icon type="upload" /> 上传文件
                              </Button>
                              <small>支持扩展名：.rar .zip .doc .docx .pdf .jpg</small>
                            </Upload>

                          )}
                        </FormItem>
                      </Col>
                  </Row>
                </Form>
              </Card>
          </Content>  
        )
      }
}

export default   Form.create()(CheckMeterStand) ;