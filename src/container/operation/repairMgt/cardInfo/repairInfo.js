/**
 * @file 报修信息 Card
 */
import React, { PureComponent } from 'react';
import { Row, Col, Select, Input, Form } from 'antd';
import PicWall from '../../../../component/picWall'; 
const { Option } = Select;
const { TextArea } = Input;
const gridStyle = {
  label: {
    span: 4,
    style: { textAlign: 'right', height: 50, lineHeight: '50px' }
  }, 
  content: {
    span: 4,
    style: { textAlign: 'left', height: 50, lineHeight: '50px' }
  }
}


class RepairInfoForm extends PureComponent {
  postData = () => {
    const { form } = this.props;
    return form.getFieldsValue();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex">
        <Col {...gridStyle.label}>紧急度：</Col>
        <Col {...gridStyle.content}>
          {
            getFieldDecorator('urgentFlag')(
              <Select style={{width: '100%'}} allowClear>
                <Option value='10'>紧急</Option>
                <Option value='20'>急</Option>
                <Option value='30'>一般</Option>
              </Select>
          )}
        </Col>
        <Col {...gridStyle.label}>是否送修：</Col>
        <Col {...gridStyle.content}>
          { 
            getFieldDecorator('rrpairSend')(
              <Select style={{width: '100%'}} allowClear>
                <Option value='00'>是</Option>
                <Option value='01'>否</Option>
              </Select>
          )}
        </Col>
        <Col {...gridStyle.label}>备用情况：</Col>
        <Col {...gridStyle.content}>
          { 
            getFieldDecorator('spare')(
              <Select style={{width: '100%'}} allowClear>
                <Option value='00'>有备用</Option>
                <Option value='01'>无备用</Option>
              </Select>
          )}
        </Col>
        <Col {...gridStyle.label}>联系电话：</Col>
        <Col {...gridStyle.content}>
          { 
            getFieldDecorator('rrpairPhone')(
              <Input style={{width: '100%'}}/>
          )}
        </Col>
        <Col {...gridStyle.label}>故障现象：</Col>
        <Col {...gridStyle.content}>
          { 
            getFieldDecorator('faultDescribe')( 
              <Select style={{width: '100%'}} allowClear>
                <Option value='00'>部分功能失效</Option>
                <Option value='01'>开机后死机</Option>
                <Option value='02'>其他</Option>
                <Option value='03'>性能指标偏离</Option>
                <Option value='04'>不规则或偶发故障</Option>
              </Select>
          )}
        </Col>
        <Col {...gridStyle.label}>是否停用：</Col>
        <Col {...gridStyle.content}>
          { 
            getFieldDecorator('useFstate')(
              <Select style={{width: '100%'}} allowClear>
                <Option value='00'>是</Option>
                <Option value='01'>否</Option>
              </Select>
          )}
        </Col>
        <Col span={4} style={{marginTop: 20, textAlign: 'right'}}>故障描述：</Col>
        <Col span={20} style={{marginTop: 20}}>
          { 
            getFieldDecorator('failCause')(
              <TextArea rows={4} style={{width: '100%'}} />
          )}
        </Col>
        <Col span={4} style={{marginTop: 20, textAlign: 'right'}}>报修备注：</Col>
        <Col span={20} style={{marginTop: 20}}>
          { 
            getFieldDecorator('tfRemark')(
              <TextArea rows={4} style={{width: '100%'}} />
          )}
        </Col>
        <Col span={4} style={{marginTop: 20, textAlign: 'right'}}>附件：</Col>
        <Col span={20} style={{marginTop: 20}}>
          { /*tfAccessory*/}
          <PicWall/>
        </Col>
      </Row>
    )
  }
}
const RepairInfo = Form.create()(RepairInfoForm);
export default RepairInfo;