/**
 * @file 报修信息 Card
 */
import React, { PureComponent } from 'react';
import { Row, Col, Select, Input, Form } from 'antd';
import PicWall from '../../../../component/picWall'; 
import PropTypes from 'prop-types';
import { selectOption,faultDescribeData } from '../../../../constants';
console.log(selectOption)
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
  constructor(props) {
    super(props);
    this.state = {
      picList: []
    }
  }

  postData = () => {
    const tfAccessory = [];
    if(this.state.picList.length > 0) {
      this.state.picList.map((item,index) => {
       return tfAccessory.push(item.thumbUrl);
      })
    }
    const data = this.props.form.getFieldsValue();
    return {...data,tfAccessory:tfAccessory};
  }
  showText = (res)=>{
    let str = '';
    if(res){
      res.map((item) => {
        return  str += faultDescribeData[item] ? faultDescribeData[item].text + "," : '' 
      }) 
    }
    return str;
  }
  render() {
    const { isEdit, data } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex">
        <Col {...gridStyle.label}>紧急度：</Col>
        <Col {...gridStyle.content}>
          {
            getFieldDecorator('urgentFlag',{
              initialValue: isEdit ? data.urgentFlag : null
            })(
               isEdit ? 
                <Select style={{width: '100%'}} allowClear>
                  {
                    selectOption.urgentFlag.map((item, index) => (
                      <Option value={item.value} key={index}> { item.text } </Option>
                    ))
                  }
                </Select>  
                :
                <span> { selectOption.urgentFlag.map((item,index)=>item.value===data.urgentFlag?item.text:'')}  </span> 
          )} 
        </Col>
        <Col {...gridStyle.label}>是否送修：</Col>
        <Col {...gridStyle.content}>
          { 
            getFieldDecorator('rrpairSend',{
              initialValue: isEdit ? data.rrpairSend : null
            })(
              isEdit ? 
              <Select style={{width: '100%'}} allowClear>
                {
                  selectOption.rrpairSend.map((item, index) => (
                    <Option value={item.value} key={index}> { item.text } </Option>
                  ))
                }
              </Select>
              :
              <span> { selectOption.rrpairSend.map((item,index)=>item.value===data.rrpairSend?item.text:'')}  </span> 
          )}
        </Col>
        <Col {...gridStyle.label}>备用情况：</Col>
        <Col {...gridStyle.content}>
          { 
            getFieldDecorator('spare',{
              initialValue: isEdit ? data.spare : null
            })(
              isEdit ?  
              <Select style={{width: '100%'}} allowClear>
                {
                  selectOption.spare.map((item, index) => (
                    <Option value={item.value} key={index}> { item.text } </Option>
                  ))
                }
              </Select>
              :
              <span> { selectOption.spare.map((item,index)=>item.value===data.spare?item.text:'')}  </span>
          )}
        </Col>
        <Col {...gridStyle.label}>联系电话：</Col>
        <Col {...gridStyle.content}>
          { 
            getFieldDecorator('rrpairPhone',{
              initialValue: isEdit ? data.rrpairPhone : null
            })(
              isEdit ? <Input style={{width: '100%'}}/> : <span> { data.rrpairPhone }  </span> 
          )}
        </Col>
        <Col {...gridStyle.label}>故障现象：</Col>
        <Col {...gridStyle.content}>
          { 
            getFieldDecorator('faultDescribe',{
              initialValue: isEdit ? data.faultDescribe : null
            })( 
              isEdit ?  
              <Select style={{width: '100%'}} allowClear mode="multiple">
                {
                  selectOption.faultDescribe.map((item, index) => (
                    <Option value={item.value} key={index}> { item.text } </Option>
                  ))
                }
              </Select>
              :
              <span> { this.showText(data.faultDescribe)}  </span>
          )}
        </Col>
        <Col {...gridStyle.label}>是否停用：</Col>
        <Col {...gridStyle.content}>
          { 
            getFieldDecorator('useFstate',{
              initialValue: isEdit ? data.useFstate : null
            })(
              isEdit ? 
              <Select style={{width: '100%'}} allowClear>
                {
                  selectOption.useFstate.map((item, index) => (
                    <Option value={item.value} key={index}> { item.text } </Option>
                  ))
                }
              </Select>
              :
              <span> { selectOption.useFstate.map((item,index)=>item.value===data.useFstate?item.text:'')}  </span>
          )}
        </Col>
        <Col span={4} style={{marginTop: 20, textAlign: 'right'}}>故障描述：</Col>
        <Col span={20} style={{marginTop: 20}}>
          { 
            getFieldDecorator('faultWords',{
              initialValue: isEdit ? data.faultWords : null
            })(
              isEdit ? 
              <TextArea rows={4} style={{width: '100%'}} />
              :
              <span> { data.faultWords}  </span>
          )}
        </Col>
        <Col span={4} style={{marginTop: 20, textAlign: 'right'}}>报修备注：</Col>
        <Col span={20} style={{marginTop: 20}}>
          { 
            getFieldDecorator('tfRemarkBx',{
              initialValue: isEdit ? data.tfRemarkBx : null
            })(
              isEdit ? 
              <TextArea rows={4} style={{width: '100%'}} />
              :
              <span> { data.tfRemarkBx }  </span>
          )}
        </Col>
        <Col span={4} style={{marginTop: 20, textAlign: 'right'}}>附件：</Col>
        <Col span={20} style={{marginTop: 20}}>
          { /*tfAccessory*/}
          <PicWall file={(file) => {
            this.setState({ picList : file})
          }}/>
        </Col>
      </Row>
    )
  }
}
const RepairInfo = Form.create()(RepairInfoForm);
export default RepairInfo;