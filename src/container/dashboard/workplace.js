/**
 * @file 工作台
 */
import React, { Component } from 'react';
import { Layout, Card, Button, Select } from 'antd';
// import { withRouter } from 'react-router'
// import { connect } from 'react-redux';
import assets from '../../api/assets';
import querystring from 'querystring';
import request from '../../utils/request';
import './workplaceStyle.css';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';
import { DataSet } from '@antv/data-set';
const { Content } = Layout;
const ButtonGroup = Button.Group;
const { Option } = Select;
class Workplace extends Component {
  state={
    maintainData: '',
    rrpairData: '',
    transferData: ''
  };

  componentDidMount = () => {
    this.getTodoInfo();
  }

  // 待办事项
  getTodoInfo = () => {
    let options = {
      body:querystring.stringify(),
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        if (data.status) {
          data.result.maintainFstateNum.forEach(item => {
            if (item.fstate === "00") {
              this.setState({maintainData: item.num});
            }
          });
          data.result.rrpairFstateNum.forEach(item => {
            if (item.fstate === "30") {
              this.setState({rrpairData: item.num});
            }
          });
          data.result.transferFstateNum.forEach(item => {
            if (item.fstate === "00") {
              this.setState({transferData: item.num});
            }
          });
        }
      },
      error: err => {console.log(err)}
    }
    request(assets.getSelectOrderNumber, options);
  }
  
  render() {
      const data = [
        { month: '02-22至03-01', '总修次数': 0, '内修次数': 0, '外修次数': 0 },
        { month: '03-01至03-08', '总修次数': 0, '内修次数': 0, '外修次数': 0 },
        { month: '03-08至03-15', '总修次数': 0, '内修次数': 5, '外修次数': 0 },
        { month: '03-15至03-22', '总修次数': 0, '内修次数': 4, '外修次数': 0 },
      ];
      const ds = new DataSet();
      const dv = ds.createView().source(data);
      dv.transform({
        type: 'fold',
        fields: [ '总修次数', '内修次数', '外修次数' ], // 展开字段集
        key: 'city', // key字段
        value: 'temperature', // value字段
      });
      console.log(dv);
      const cols = {
        month: {
          range: [ 0, 1 ]
        }
      }
      const datas = [
        { month: '02-22至03-01', value: 4 },
        { month: '03-01至03-08', value: 2 },
        { month: '03-08至03-15', value: 3 },
        { month: '03-15至03-22', value: 1 },
      ];
      const colss = {
        'value': { alias: '保养次数' },
        'month': {range: [ 0 , 1] }
      };
    return (
      <Content>
        <Card title={`代办事项`} extra={<a>设置</a>} style={{margin: 10}} bordered={false}>
          <div style={{width: '15%', borderRadius: '3%', height: 70, border: '1px solid #5CACEE', float: 'left', marginLeft: '3%'}}>
            <div style={{width: 70, background: '#5CACEE', height: 69, margin: 0, padding: 0, float: 'left'}}><img src={require('./work01.png')} alt="维修派工" style={{margin: 10}} /></div>
            <div style={{width: 88, height: 69, float: 'right'}}>
              <h1 style={{height: 30, color: '#5CACEE', marginLeft: 20}}>5</h1>
              <span>维修派工</span>
            </div>
          </div>
          <div style={{width: '15%', borderRadius: '3%', height: 70, border: '1px solid #F4A460', float: 'left', marginLeft: '4%'}}>
            <div style={{width: 70, background: '#F4A460', height: 69, margin: 0, padding: 0, float: 'left'}}><img src={require('./work02.png')} alt="维修处理" style={{margin: 10}} /></div>
            <div style={{width: 88, height: 69, float: 'right'}}>
              <h1 style={{height: 30, color: '#F4A460', marginLeft: 20}}>{this.state.rrpairData}</h1>
              <span>维修处理</span>
            </div>
          </div>
          <div style={{width: '15%', borderRadius: '3%', height: 70, border: '1px solid #BCEE68', float: 'left', marginLeft: '4%'}}>
            <div style={{width: 70, background: '#BCEE68', height: 69, margin: 0, padding: 0, float: 'left'}}><img src={require('./work03.png')} alt="转科审批" style={{margin: 10}} /></div>
            <div style={{width: 88, height: 69, float: 'right'}}>
              <h1 style={{height: 30, color: '#BCEE68', marginLeft: 20}}>{this.state.transferData}</h1>
              <span>转科审批</span>
            </div>
          </div>
          <div style={{width: '15%', borderRadius: '3%', height: 70, border: '1px solid #3CB371', float: 'left', marginLeft: '4%'}}>
            <div style={{width: 70, background: '#3CB371', height: 69, margin: 0, padding: 0, float: 'left'}}><img src={require('./work04.png')} alt="保养实施" style={{margin: 10}} /></div>
            <div style={{width: 88, height: 69, float: 'right'}}>
              <h1 style={{height: 30, color: '#3CB371', marginLeft: 20}}>{this.state.maintainData}</h1>
              <span>保养实施</span>
            </div>
          </div>
          <div style={{width: '15%', borderRadius: '3%', height: 70, border: '1px solid #00CED1', float: 'left', marginLeft: '4%'}}>
            <div style={{width: 70, background: '#00CED1', height: 69, margin: 0, padding: 0, float: 'left'}}><img src={require('./work05.png')} alt="设备计量" style={{margin: 10}} /></div>
            <div style={{width: 88, height: 69, float: 'right'}}>
              <h1 style={{height: 30, color: '#00CED1', marginLeft: 20}}>0</h1>
              <span>设备计量</span>
            </div>
          </div>
          <div style={{clear: 'both'}}></div>
        </Card>
        <Card title={`设备维修情况`} extra={<a>设置</a>} style={{margin: 10, width: '48%', float: 'left'}} bordered={false}>
          <ButtonGroup>
            <Button type="primary">最近一月</Button>
            <Button>最近三月</Button>
            <Button>最近半年</Button>
            <Button>最近一年</Button>
          </ButtonGroup>
          <Select defaultValue="1" style={{marginLeft: 126, width: 110}}>
            <Option value="1">总修次数</Option>
            <Option value="2">内修次数</Option>
            <Option value="3">外修次数</Option>
          </Select>
          <Chart height={350} width={540} data={dv} scale={cols}>
            <Legend />
            <Axis name="month" />
            <Axis name="temperature" label={{formatter: val => `${val}`}}/>
            <Tooltip crosshairs={{type : "y"}}/>
            <Geom type="line" position="month*temperature" size={2} color={'city'} />
            <Geom type='point' position="month*temperature" size={4} shape={'circle'} color={'city'} style={{ stroke: '#fff', lineWidth: 1}} />
          </Chart>
        </Card>
        <Card title={`设备保养情况`} style={{margin: 10, width: '48%', float: 'right'}} bordered={false}>
          <ButtonGroup>
            <Button type="primary">最近一月</Button>
            <Button>最近三月</Button>
            <Button>最近半年</Button>
            <Button>最近一年</Button>
          </ButtonGroup>
          <Select defaultValue="1" style={{marginLeft: 126, width: 110}}>
            <Option value="1">保养次数</Option>
          </Select>
          <Chart height={350} width={540} data={datas} scale={colss}>
            <Axis name="month" />
            <Axis name="value" />
            <Tooltip crosshairs={{type : "y"}}/>
            <Geom type="line" position="month*value" size={2} />
            <Geom type='point' position="month*value" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} />
          </Chart>
        </Card>
      </Content>
    )
  }
}

export default Workplace;
// export default withRouter(connect(state => state)(Workplace));