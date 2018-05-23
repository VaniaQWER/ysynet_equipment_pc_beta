/**
 * @file 资产档案 - 效益分析--弹出框数据
 * @author gaofengjiao
 * @since 2018-05-22 14:00:00
 * @version 1.0.0
 */
import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip,Guide } from 'bizcharts';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ledger as ledgerService } from '../../../service';
import assets from '../../../api/assets';
// import querystring from 'querystring';
const Text = Guide.Text;
// 数据源
// const data = [
//   { year:"6月1", value:  Math.random() },
//   { year: "6月2", value: Math.random() },
//   { year: "6月3", value: Math.random() },
//   { year: "6月4", value: Math.random() },
//   { year: "6月5", value: Math.random() },
//   { year: "6月6", value: Math.random() },
//   { year: "6月7", value: Math.random() },
//   { year: "6月8", value: Math.random() },
//   { year: "6月9", value: Math.random() }
// ];

// 定义度量
const cols = {
  'value': { min: 0 },
  'year': {range: [ 0 , 12] }
};

class DataAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  //获取type 获取对应数据
  componentWillMount = () =>{
    this.getDetails()
  }
  getDetails = ()=>{
    const type = this.props.type;
    const { getData } = this.props;
    alert(type)
    //获取运行数据和效益分析数据
    getData(assets.getDataAnalysis ,{} ,(data) => {
      this.setState( {  data : data.result[type] })
      
    },{
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    })

  }

  render() {
    const { data } = this.state ;
    return (
      <div>
        <Chart forceFit={true} height={400} data={data} scale={cols} style={{marginTop: 30}}>
          <Axis name="year" />
          <Axis name="value" />
          <Tooltip crosshairs={{type : "y"}}/>
          <Geom type="line" position="year*value" size={2} />
          <Geom type='point' position="year*value" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} />
          <Guide><Text content={'开机时长趋势'} top={true}/></Guide>
        </Chart>
      </div>
    )
  }
}


export default withRouter(connect(null, dispatch => ({
  getData: (url,values,success,type) => ledgerService.getInfo(url,values,success,type),
}))(DataAnalysis));