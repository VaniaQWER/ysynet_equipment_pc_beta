/**
 * @file 资产档案 - 效益分析
 * @author gaofengjiao
 * @since 2018-05-22 11:00:00
 * @version 1.0.0
 */
import React, { Component } from 'react';
import {  Card,Avatar,Modal,Row,Col,Select } from 'antd';
import { Chart, Geom, Axis, Coord,Guide } from 'bizcharts';
import { withRouter } from 'react-router';
import DataAnalysis from './dataAnalysis';//数据分析
import { connect } from 'react-redux';
import { DataSet } from '@antv/data-set';
import { ledger as ledgerService } from '../../../service';
import assets from '../../../api/assets';
import querystring from 'querystring';

const { Meta } = Card;
const Option = Select.Option;

//饼图1数据
const { Html } = Guide;
const { DataView } = DataSet;
const data = [
  { item:'1',count: 40 },
  { item:'2',count: 21 }
  ];
  const dv = new DataView();
  dv.source(data).transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent'
  });
  const cols = {
  percent: {
    formatter: val => {
      val = (val * 100) + '%';
      return val;
    }
  }  
}

class LedgerArchivesDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AssetInfoData: {},
      yxcsData :[],
      xyfxData: [],
      type:'',//区别模块
      visible: false
    }
  }
  //获取id 根据id号查详情
  componentWillMount = () =>{
    this.getDetails()
  }

  getDetails = ()=>{
    const assetsRecordGuid = this.props.match.params.id;
    const { getSelectAssetsRecordDetail } = this.props;
    const params = { assetsRecordGuid: assetsRecordGuid };
    getSelectAssetsRecordDetail(assets.selectAssetsRecordDetail , querystring.stringify(params),(data) => {
      this.setState( { AssetInfoData : data.result })
    },{
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    })

    //获取运行数据和效益分析数据
    getSelectAssetsRecordDetail(assets.getBenefitAnalysis ,{} ,(data) => {
      this.setState( { yxcsData : data.result.yxcsData, xyfxData: data.result.xyfxData })
    },{
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    })

  }
  //关闭弹出框
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  //显示弹出框
  handleDataAnalysis = (type) => {
    alert(type)
    this.setState({
      type: type,
      visible: true,
   
    });
  }

  render() {
    const { yxcsData ,xyfxData,type } = this.state;
    return (
      <div>
         {
          JSON.stringify(this.state.AssetInfoData) === '{}' || this.state.AssetInfoData === null ? null 
          :
          <div>
            <Card title="资产信息" 
              extra={<div >月份:
              <Select placeholder="请选择" style={{width:'200px'}}>
                <Option value="1" key="1">一月份</Option>
                <Option value="2" key="2">二月份</Option>
                <Option value="3" key="3">三月份</Option>
                <Option value="4" key="4">四月份</Option>
                <Option value="5" key="5">五月份</Option>
              </Select>
              </div>}>
              <Row type="flex" style={{marginTop: 16}}>
                <Col span={3}>资产编号</Col>
                <Col span={5}>{ this.state.AssetInfoData.assetsRecord }</Col>
                <Col span={3}>资产名称</Col>
                <Col span={5}>{ this.state.AssetInfoData.equipmentStandardName }</Col>
                <Col span={3}>型号</Col>
                <Col span={5}>{ this.state.AssetInfoData.spec }</Col>
              </Row>
              <Row type="flex" style={{marginTop: 16}}>
                <Col span={3}>规格</Col>
                <Col span={5}>{ this.state.AssetInfoData.fmodel }</Col>
              </Row>
          </Card>
          <Card title="运行数据" >
               <Row>
                 {
                   yxcsData.map((item,index) => { 
                    return  <Col span={6} key={index}>
                              <Meta
                                avatar={<Avatar  style={{width:62,height:55,backgroundColor:'#fff',borderRadius:0}} src={require('../../../assets/icon/'+item.img)} />}
                                title={item.title}
                                description={item.description}
                                onClick={this.handleDataAnalysis.bind(this,item.type)}
                              />
                            </Col>
                   })
                 }
              </Row>
            </Card> 
            <Card title="效益分析">
              <Row>
                <Col span={16} style={{borderRight:'2px dashed #eee'}}>
                  <Row>
                    {
                    xyfxData.map((item,index) => { 
                      return  <Col span={12} key={index}>
                                <Card bordered={false}>
                                  <Meta
                                  avatar={<Avatar  style={{width:62,height:55,backgroundColor:'#fff',borderRadius:0}} src={require('../../../assets/icon/'+item.img)} />}
                                  title={item.title}
                                  description={item.description}
                                  onClick={this.handleDataAnalysis}
                                  />
                                </Card>
                              </Col>
                            })
                    }
                  </Row>
                </Col>
                <Col span={8}>
                  <Col span={24}>
                    <Chart height={300} off data={dv} scale={cols} >
                      <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                      <Axis name="percent" />
                      <Guide >
                        <Html position ={[ '50%', '50%' ]} html='<div style="color:#8c8c8c;font-size:1.5em;text-align: center;width: 10em;">28%<br><span style="color:#262626;font-size:12px">投资收益率</span></div>' alignX='middle' alignY='middle'/>
                      </Guide>
                      <Geom
                      type="intervalStack"
                      position="percent"
                      color='item'
                      
                      style={{lineWidth: 1,stroke: '#fff'}}
                      >
                      </Geom>
                    </Chart>
                  </Col>
                  <Col span={24}>
                     <Chart height={300}  data={dv} scale={cols} >
                      <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                      <Axis name="percent" />
                      <Guide >
                        <Html position ={[ '50%', '50%' ]} html='<div style="color:#8c8c8c;font-size:1.5em;text-align: center;width: 10em;">22%<br><span style="color:#262626;font-size:12px">利润率</span></div>' alignX='middle' alignY='middle'/>
                      </Guide>
                      <Geom
                      type="intervalStack"
                      position="percent"
                      color='item'
                      
                      style={{lineWidth: 1,stroke: '#fff'}}
                      >
                      </Geom>
                    </Chart>
                  </Col>
                </Col>
              </Row>
               </Card>
            </div>
          
         }
          <Modal
              visible={this.state.visible}
              width='640px'
              footer={null}
              onCancel={ this.handleCancel}
            >
              <DataAnalysis type={type}/>
            </Modal>
      </div>
    )
  }
}

export default withRouter(connect(null, dispatch => ({
  getSelectAssetsRecordDetail: (url,values,success,type) => ledgerService.getInfo(url,values,success,type),
}))(LedgerArchivesDetail));