/*计量台账- 检测*/
import React , { Component } from 'react';
import { Layout, Card, Button, Affix, Form, Icon ,  Col, Row, Input, Select, DatePicker, message , Upload} from 'antd';
import { Link } from 'react-router-dom';
import queryString from 'querystring';
import moment from 'moment';
import request from '../../../utils/request';
import assets from '../../../api/assets';
import meterStand from '../../../api/meterStand';
const { Content } = Layout;
const {TextArea} = Input;
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
        assetsInfo:{},    //本条数据信息
        fileList:[],      
        nextMeasureDate: '',     //下次待检日期
        measureDate: ''         //本次待检日期
      }
      componentDidMount() {
        const assetsRecordGuid = this.props.match.params.id;
        request(meterStand.meterRecordList, {
          body: queryString.stringify({ assetsRecordGuid }),
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: (data) => {
            let assetsInfo = data.result[0];
            let nextMeasureDate2 = this.nextMeasureDateValue(assetsInfo.nextMeasureDate);
            assetsInfo.nextMeasureDate2 = nextMeasureDate2;
            this.setState({ 
              assetsInfo,  
              measureDate: moment(assetsInfo.nextMeasureDate, 'YYYY-MM-DD'),
              nextMeasureDate: moment(assetsInfo.nextMeasureDate2, 'YYYY-MM-DD'),
            });
          },
          error: (err) => console.log(err)
        })
      }
      save = () => {      //完成检定提交
        this.props.form.validateFields((err,values)=>{
          if(!err){
            values.measureDate = values.measureDate.format('YYYY-MM-DD');
            values.nextMeasureDate = values.nextMeasureDate.format('YYYY-MM-DD');
            for (const key in values) {
              values[key] = values[key] === undefined? '' : values[key];
            };
            values.assetsRecordGuid = this.state.assetsInfo.assetsRecordGuid;
            let {fileList, assetsInfo} = this.state;
            fileList = fileList.map( (item) => item.thumbUrl );
            values.type = assetsInfo.type;
            values.measureCycly = assetsInfo.measureCycly;
            request(meterStand.insertMeterRecordInfo, {
              body: queryString.stringify({...values, accessoryList: fileList}),
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              success: (data) => {
                if(data.status) {
                  this.props.history.push('/meterMgt/meterStand');
                }
              },
              error: err => console.log(err)
            })
          }
        })
      }

      onStartChange = (measureDate) => {    
        this.setState({ measureDate })
      }

      onEndChange = (nextMeasureDate) => {
        this.setState({ nextMeasureDate })
      }

      disabledStartDate = (measureDate)=>{
        const {nextMeasureDate} = this.state;
        console.log(nextMeasureDate)
        if (!nextMeasureDate || !measureDate) {
          return false;
        } 
        return measureDate.valueOf() > nextMeasureDate.valueOf();
      }

      disabledEndDate = (nextMeasureDate) => {
        const {measureDate} = this.state;
        if (!nextMeasureDate || !measureDate) {
          return false;
        } 
        return nextMeasureDate.valueOf() <= measureDate.valueOf();
      }

      nextMeasureDateValue = (nextMeasureDate) => {    //计算下次待检日期
        if (!nextMeasureDate) return;
        nextMeasureDate = nextMeasureDate.split('-');
        let moment = Number(nextMeasureDate[1]) + 1,
            year = Number(nextMeasureDate[0]);
        if( moment > 12 ) {
          moment = '01';
          year += 1;
        }else if(moment < 10) {
          moment = '0' + moment;
        };
        return `${year}-${moment}-${nextMeasureDate[2]}`;
      }

      handleChange = (fileListObj) => {   //上传附件
        let { fileList } = fileListObj ; 
        // 1. Limit the number of uploaded files
        //    Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-2);
        
        for(let i = 0;i<fileList.length;i++){
          switch (fileList[i].type){
            case "application/png":
              break;
            case "application/gif":
              break;
            case "application/jpg":
              break;
            case "application/pdf":
              break;
            case "image/jpeg":
              break;
            default:
              message.warning('仅支持扩展名：.pdf .jpg .png .gif .jpeg！',3)
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
                            {assetsInfo.assetsRecord || ''}
                          </div>
                        </div>
                      </div>
        
                    </Col>
                    <Col span={8} offset={8}>
                      <div className="ant-row ant-form-item">
                        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                          <label>资产名称</label>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                          <div className="ant-form-item-control">
                            {assetsInfo.equipmentName || ''}
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
                            {assetsInfo.fmodel || ''}
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
                          {assetsInfo.spec || ''}
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
                          {assetsInfo.productType || ''}
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
                          {assetsInfo.useDeptName || ''}
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
                          {assetsInfo.custodian || ''}
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
                          {assetsInfo.bDeptName || ''}
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
              </Card>
              {/* 资产信息部分 */}
              <Card title="检测信息" bordered={false} className="min_card">     
                <Form ref='checkForm'>
                  <Row>
                    <Col span={8}>
                      <FormItem  {...formItemLayout} label='检定方式'>
                        <span>{`${assetsInfo.type === "00"? "内检" : "外检" }`}</span>
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem {...formItemLayout} label='计量周期'>
                        <span>{`${assetsInfo.measureCycly}月`}</span>
                      </FormItem>
                    </Col>
        
                    <Col span={8}>
                      <FormItem {...formItemLayout} label='本次待检日期'>
                      {getFieldDecorator('measureDate',{
                        initialValue: moment(assetsInfo.nextMeasureDate, 'YYYY-MM-DD'),
                        rules:[{
                          required:true,message:"请选择本次待检日期!"
                        }]
                      })(
                        <DatePicker
                         disabledDate={this.disabledStartDate}
                         format={'YYYY-MM-DD'} 
                         style={{width:200}}
                         onChange={ this.onStartChange }
                         />
                      )}
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <FormItem {...formItemLayout} label='下次待检日期'>
                      {getFieldDecorator('nextMeasureDate',{
                        initialValue: moment( assetsInfo.nextMeasureDate2 , 'YYYY-MM-DD'),
                        rules:[{   
                          required:true,message:"请选择下次待检日期!"
                        }]
                      })(
                        <DatePicker 
                          disabledDate={ this.disabledEndDate }
                          format={'YYYY-MM-DD'} 
                          style={{width:200}}
                          onChange={ this.onEndChange }
                          />
                      )}
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem {...formItemLayout} label='证书编号'>
                        {getFieldDecorator('certNo')(
                          <Input placeholder="请输入证书编号" style={{width:200}}/>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem {...formItemLayout} label='检定结果'>
                        {getFieldDecorator('results', {
                          rules: [{
                            required:true,message:"请选择检定结果!"
                          }]
                        })(
                          <Select placeholder="请选择检定结果" style={{width:200}}>
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
                        {getFieldDecorator('measurePay', )(
                          <Input placeholder="请输入计量费用" addonAfter='元' style={{width:200}}/>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem {...formItemLayout} label='检定人'>
                        {getFieldDecorator('verdictUserName', )(
                          <Input placeholder="请输入检定人" style={{width:200}}/>
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <FormItem {...formItemLayout} label='备注'>
                        {getFieldDecorator('remark')(
                          <TextArea
                            autosize={{
                              minRows: 4,
                              maxRows: 8
                            }}
                          />
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                      <Col span={8}>
                        <FormItem label='附件' {...formItemLayout}>
                          {getFieldDecorator('accessoryList', )(
                            <div>
                              <Upload listType="picture-card" {...props} withCredentials={true}>
                                <Button>
                                  <Icon type="upload" /> 上传文件
                                </Button>
                              </Upload>
                              <small>支持扩展名：.pdf .jpg .png .gif .jpeg</small>
                            </div>
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