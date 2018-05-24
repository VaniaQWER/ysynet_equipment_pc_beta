/**
 * @file 资产档案 - 效益分析--弹出框数据
 * @author gaofengjiao
 * @since 2018-05-22 14:00:00
 * @version 1.0.0
 */
import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip,Guide,Coord,Legend,Label } from 'bizcharts';
import { DataSet } from '@antv/data-set';
const Text = Guide.Text;

const { DataView } = DataSet;

class DataAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { year: "6月1日", value: Math.floor(Math.random()*(Number(this.props.item.title)-0+1)+0)},
        { year: "6月2日", value: Math.floor(Math.random()*(Number(this.props.item.title)-0+1)+0)},
        { year: "6月3日", value: Math.floor(Math.random()*(Number(this.props.item.title)-0+1)+0) },
        { year: "6月4日", value: Math.floor(Math.random()*(Number(this.props.item.title)-0+1)+0) },
        { year: "6月5日", value: Math.floor(Math.random()*(Number(this.props.item.title)-0+1)+0) },
        { year: "6月6日", value: Math.floor(Math.random()*(Number(this.props.item.title)-0+1)+0) },
        { year: "6月7日", value: Math.floor(Math.random()*(Number(this.props.item.title)-0+1)+0) },
        { year: "6月8日", value: Math.floor(Math.random()*(Number(this.props.item.title)-0+1)+0)},
        { year: "6月9日", value: Math.floor(Math.random()*(Number(this.props.item.title)-0+1)+0) }
      ],// 数据源
      cols : {
        value: {
          min: 0 ,
          alias: '值' // 为属性定义别名
        },
      } ,//定义度量,
      type: this.props.item.type
    }

   
  }

  render() {
    const { data,cols,type } = this.state ;
    const data2 =type==="zsrData" ? [
      { item: '医疗收入', count: Math.random()} ,
      { item: '其他收入', count: Math.random()} 
    ]:
    [
      { item: '人工成本', count: Math.random()} ,
      { item: '维修费用', count: Math.random()} ,
      { item: '材料费', count: Math.random()} ,
      { item: '其他', count: Math.random()} 
    ];
    const dv = new DataView();
    dv.source(data2).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent'
    });
    const cols2 = {
      percent: {
        formatter: val => {
          val = (val * 100).toFixed(2) + '%';
          return val;
        }
      }
    } 
    
    return (
      <div>
        {
        type === "zsrData" || type === "zzcData" ?
          <Chart height={400} data={dv} scale={cols2}  forceFit>
            <Coord type='theta' radius={0.75} />
            <Axis name="percent" />
            <Legend position='bottom'  />
            <Tooltip 
              showTitle={false} 
              itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
              />
            <Geom
              type="intervalStack"
              position="percent"
              color='item'
              tooltip={['item*percent',(item, percent) => {
                percent =  (percent * 100).toFixed(2) + '%';
                return {
                  name: item,
                  value: percent
                };
              }]}
              style={{lineWidth: 1,stroke: '#fff'}}
              >
              <Label content='percent' formatter={(val, item) => {
                  return item.point.item + ': ' + val;}} />
            </Geom>
          </Chart>
          :
          <Chart forceFit={true} height={400} data={data} scale={cols}  style={{marginTop: 30}}>
            <Axis name="year" />
            <Axis name="value" />
            <Tooltip crosshairs={{type : "y"}}/>
            <Geom type="line" position="year*value" size={2} />
            <Geom type='point' position="year*value" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} />
            <Guide><Text content={'开机时长趋势'} top={true}/></Guide>
          </Chart>
        }
       

       

      </div>
    )
  }
}


export default DataAnalysis;