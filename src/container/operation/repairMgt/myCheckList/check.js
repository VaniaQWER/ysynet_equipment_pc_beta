/**
 * 维修验收
 */
import React, { PureComponent } from 'react';
import { Layout, Card, Affix, Button, Row, Col, Select,
  BackTop, Modal, Form, Radio, Rate, Input } from 'antd';
import { withRouter } from 'react-router-dom'  
import { selectOption } from '../../../../constants';
import StepsInfo from '../cardInfo/stepsInfo'
import AssetsInfo from '../cardInfo/assetsInfo';   
import RepairInfo from '../cardInfo/repairInfo'; 
import AssignInfo from '../cardInfo/assignInfo';
import ServiceInfo from '../cardInfo/serviceInfo'; 
import PartsInfo from '../cardInfo/partsInfo';
const Option = Select.Option;
const { TextArea } = Input;
const gridStyle = {
  label: {
    span: 6,
    style: { textAlign: 'right', height: 50, lineHeight: '50px' }
  }, 
  content: {
    span: 18,
    style: { textAlign: 'left', height: 50, lineHeight: '50px' }
  }
}
const { Content } = Layout;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class CheckInForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPassed: '65',
      rate: 0
    }
  }
  getPostData = () => ({
    ...this.props.form.getFieldsValue(),
    evaluate: this.state.rate,
    rrAcceFstate: this.state.isPassed
  })
  render() {
    const { isPassed } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Row>  
          <Col {...gridStyle.label}>验收：</Col>
          <Col {...gridStyle.content}>
            <RadioGroup defaultValue="65" onChange={e => this.setState({isPassed: e.target.value})}>
              <RadioButton value="65">通过</RadioButton>
              <RadioButton value="66">不通过</RadioButton>
            </RadioGroup>
          </Col>
          <Col {...gridStyle.label}>评价：</Col>
          <Col {...gridStyle.content}>
            <Rate allowHalf onChange={val => this.setState({rate: val})}/>
          </Col>
          {
            isPassed === '65' ? [
              <Col {...gridStyle.label} key={1}>不通过原因：</Col>,
              <Col {...gridStyle.content} key={2}>
                {
                  getFieldDecorator('notCause')(
                    <Select>
                    {
                      selectOption.notCause.map((item, index) => (
                        <Option value={item.value} key={index}> { item.text } </Option>
                      ))
                    }
                    </Select>
                )}
              </Col>
            ] : null
          }
          <Col {...gridStyle.label}>备注：</Col>
          <Col {...gridStyle.content}>
            {
              getFieldDecorator('tfRemark')(
                <TextArea rows={4} style={{width: '100%'}} />
            )}
          </Col>
        </Row>
      </Form>  
    )
  }
}
const CheckInFormWrapper = Form.create()(CheckInForm);
class MyCheckListCheckIn extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }
  
  checkIn = () => {
    this.setState({visible: true})
  }
  onSubmit = () => {
    const postData = this.checkInform.getPostData()
    this.setState({visible: false})
    console.log('验收信息', {...postData, rrpairOrderGuid: this.props.match.params.id});
  }
  onCancel = () => {
    this.setState({visible: false})
  }
  render() {
    return (
      <Content className='ysynet-content ysynet-common-bgColor'>
        <Modal
          style={{ top: 10}}
          bodyStyle={{height: 350}}
          width={600}
          title="验收"
          visible={this.state.visible}
          onOk={this.onSubmit}
          onCancel={this.onCancel}
          okText="确认"
          cancelText="取消"
        >
          <CheckInFormWrapper wrappedComponentRef={(inst) => this.checkInform = inst}/>
        </Modal>
        <Card title="报修进度" extra={[
          <Affix key={1}>
            <Button type='primary' onClick={this.checkIn}>验收</Button>
          </Affix>
        ]} key={1}>
          <StepsInfo current={2} />
        </Card>
        <Card title="资产信息" style={{marginTop: 16}} hoverable={false} key={2}>
          <AssetsInfo wrappedComponentRef={(inst) => this.assetsInfo = inst} isEdit={true}/>
        </Card>
        <Card title="报修信息" style={{marginTop: 16}} hoverable={false} key={3}>
          <RepairInfo wrappedComponentRef={(inst) => this.repairInfo = inst} isEdit={true}/>
        </Card>
        <Card title="指派信息" style={{marginTop: 16}} hoverable={false} key={5}>
          <AssignInfo ref='assignInfo' isEdit={true}/>
        </Card>
        <Card title="维修信息" style={{marginTop: 16}} hoverable={false} key={4}>
          <ServiceInfo wrappedComponentRef={(inst) => this.serviceInfo = inst} isEdit={true}/>
        </Card>
        <Card title="维修配件" style={{marginTop: 16}} hoverable={false} key={6}>
          <PartsInfo ref='partsInfo' isEdit={true}/>
        </Card>
        <BackTop />
      </Content>
    )
  }
}

export default withRouter(MyCheckListCheckIn);