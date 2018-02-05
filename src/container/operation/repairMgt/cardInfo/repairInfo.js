/**
 * @file 报修信息 Card
 */
import React, { PureComponent } from 'react';
import { Row, Col, Select, Input, Form } from 'antd';
import PicWall from '../../../../component/picWall'; 
import PropTypes from 'prop-types';
import { selectOption } from '../../../../constants';
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
  static defaultProps = {
    isEdit: false,
    data: {}
  };
  static propTypes = {
    isEdit: PropTypes.bool,
    data: PropTypes.object
  };
  postData = () => {
    const { form } = this.props;
    return form.getFieldsValue();
  }
  render() {
    const { isEdit, data } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex">
        <Col {...gridStyle.label}>紧急度：</Col>
        <Col {...gridStyle.content}>
          {
            getFieldDecorator('urgentFlag')(
               isEdit ? <span> { data.urgentFlag }  </span> : 
                <Select style={{width: '100%'}} allowClear>
                  {
                    selectOption.urgentFlag.map((item, index) => (
                      <Option value={item.value} key={index}> { item.text } </Option>
                    ))
                  }
                </Select>  
          )}
        </Col>
        <Col {...gridStyle.label}>是否送修：</Col>
        <Col {...gridStyle.content}>
          { 
            getFieldDecorator('rrpairSend')(
              isEdit ? <span> { data.rrpairSend }  </span> : 
              <Select style={{width: '100%'}} allowClear>
                {
                  selectOption.rrpairSend.map((item, index) => (
                    <Option value={item.value} key={index}> { item.text } </Option>
                  ))
                }
              </Select>
          )}
        </Col>
        <Col {...gridStyle.label}>备用情况：</Col>
        <Col {...gridStyle.content}>
          { 
            getFieldDecorator('spare')(
              isEdit ? <span> { data.spare }  </span> : 
              <Select style={{width: '100%'}} allowClear>
                {
                  selectOption.spare.map((item, index) => (
                    <Option value={item.value} key={index}> { item.text } </Option>
                  ))
                }
              </Select>
          )}
        </Col>
        <Col {...gridStyle.label}>联系电话：</Col>
        <Col {...gridStyle.content}>
          { 
            getFieldDecorator('rrpairPhone')(
              isEdit ? <span> { data.rrpairPhone }  </span> : <Input style={{width: '100%'}}/>
          )}
        </Col>
        <Col {...gridStyle.label}>故障现象：</Col>
        <Col {...gridStyle.content}>
          { 
            getFieldDecorator('faultDescribe')( 
              isEdit ? <span> { data.faultDescribe }  </span> : 
              <Select style={{width: '100%'}} allowClear>
                {
                  selectOption.faultDescribe.map((item, index) => (
                    <Option value={item.value} key={index}> { item.text } </Option>
                  ))
                }
              </Select>
          )}
        </Col>
        <Col {...gridStyle.label}>是否停用：</Col>
        <Col {...gridStyle.content}>
          { 
            getFieldDecorator('useFstate')(
              isEdit ? <span> { data.useFstate }  </span> : 
              <Select style={{width: '100%'}} allowClear>
                {
                  selectOption.useFstate.map((item, index) => (
                    <Option value={item.value} key={index}> { item.text } </Option>
                  ))
                }
              </Select>
          )}
        </Col>
        <Col span={4} style={{marginTop: 20, textAlign: 'right'}}>故障描述：</Col>
        <Col span={20} style={{marginTop: 20}}>
          { 
            getFieldDecorator('failCause')(
              isEdit ? <span> { data.failCause }  </span> : 
              <TextArea rows={4} style={{width: '100%'}} />
          )}
        </Col>
        <Col span={4} style={{marginTop: 20, textAlign: 'right'}}>报修备注：</Col>
        <Col span={20} style={{marginTop: 20}}>
          { 
            getFieldDecorator('tfRemark')(
              isEdit ? <span> { data.tfRemark }  </span> : 
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