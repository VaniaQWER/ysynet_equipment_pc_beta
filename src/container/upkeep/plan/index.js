/**保养登记--列表*/
import React from 'react';
import { Modal ,message , Row, Col, Input, Layout , Popover} from 'antd';
import TableGrid from '../../../component/tableGrid';
import upkeep from '../../../api/upkeep';
import querystring from 'querystring';
import request from '../../../utils/request';
import './styles.css';  
import { upkeepPlanLoopFlag , upkeepPlanStateSel ,upkeepPlanState , upkeepMainTainType } from '../../../constants';
import { Link } from 'react-router-dom';
import { timeToStamp } from '../../../utils/tools';
const confirm = Modal.confirm;
const Search = Input.Search;
const { Content } = Layout;
const { RemoteTable } = TableGrid;


class MaintainPlan extends React.Component{

    state = {
      query:'',
      visible: false ,
      modalContent:'',
      record:{},
      isDelete:false
    };
    sortTime = (a,b,key) =>{
      if(a[key] && b[key]){
        return timeToStamp(a[key]) - timeToStamp(b[key])
      }
    }
    queryHandler = (query) => {
      this.refs.table.fetch(query);
      this.setState({ query })
    }
    deletePlanDetails = (record)=>{//删除
      confirm({
        title: '是否确认删除？',
        content: `删除后不可恢复是否继续删除？`,
        onOk: async () => {
          console.log(record.maintainPlanDetailId);
          let options = {
            body:querystring.stringify({maintainPlanDetailId:record.maintainPlanDetailId}),
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: data => {
              if(data.status){
                message.success( '删除成功')
                this.refs.table.fetch();
              }else{
                message.error(data.msg)
              }
            },
            error: err => {console.log(err)}
          }
          request(upkeep.deletePlanDetails, options)

        },
        onCancel: () => this.setState({visible: false})
      })
      
    }
    doPlanDetails = (record)=>{//执行
      confirm({
        title: '是否确认执行？',
        content: `确定执行此操作？`,
        onOk: async () => {
          let options = {
            body:querystring.stringify({maintainPlanDetailId:record.maintainPlanDetailId}),
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: data => {
              if(data.status){
                message.success( '执行计划成功，已生成保养工单。')
                this.refs.table.fetch();
                this.setState({visible: false,});
              }else{
                message.error(data.msg)
              }
            },
            error: err => {console.log(err)}
          }
          request(upkeep.doPlanDetails, options)
        },
        onCancel: () => this.setState({visible: false})
      })
      
    }

    render(){
      const { modalContent }= this.state;
      const columns=[
        { title: '操作', 
        dataIndex: 'maintainPlanDetailId', 
        className:'col-1',
        key: 'x', 
        render: (text,record) =>
          <span>
            { (record.fstate==="20") ? 
              <span title='编辑'><Link to={{pathname:`/upkeep/planEdit/${record.maintainPlanDetailId}`}}>编辑</Link>&nbsp;&nbsp;
              <a  title='删除' onClick={()=> this.deletePlanDetails(record)}>删除</a>&nbsp;&nbsp;
              <a title='执行' onClick={()=>this.doPlanDetails(record)}>执行</a></span>
              :<span><Link to={{pathname:`/upkeep/planDetail/${record.maintainPlanDetailId}`}}>详情</Link></span>
            }
          </span>
        },
        {
          title: '保养计划单号',
          className:'col-1',
          dataIndex: 'maintainPlanNo',
          render(text, record) {
            return <span title={text}>{text}</span>
          }
        },
        {
          title: '计划状态',
          dataIndex: 'fstate',
          className:'col08',
          key: 'fstate',
          filters:upkeepPlanStateSel,
          onFilter: (value, record) => (record && record.fstate===value),
          render: text => 
            <div>
            { upkeepPlanState[text].text }
            </div>
        },
        {
          title: '资产名称',
          className:'col-1',
          dataIndex: 'equipmentStandardName',
          render:(text,record) =>
            <Popover  content={
              <div style={{padding:20}}>
                <p>资产名称：{record.equipmentStandardName}</p>
              </div>
            }>
              {text}
            </Popover>
        },
        {
          title: '使用科室',
          className:'col05',
          dataIndex: 'useDept',
          render: text => <span title={text}>{text}</span>
        },
        {
          title: '保养类型',
          className:'col05',
          dataIndex: 'maintainType',
          render: text => <span>{upkeepMainTainType[text].text}</span>
        },
        {
          title: '上次保养时间',
          className:'col08',
          dataIndex: 'lastMaintainDate',
          sorter: (a, b) => this.sortTime(a,b,'maintainDate'),
          render: text => <span title={text}>{text}</span>
        },
        {
          title: '计划保养时间',
          className:'col08',
          dataIndex: 'maintainDate',
          sorter: (a, b) => this.sortTime(a,b,'endMaintainDate'),
          render: text => <span title={text}>{text}</span>
        },
        {
          title: '循环方式',
          className:'col08',
          dataIndex: 'loopFlag',
          render: text => <span title={text}>{upkeepPlanLoopFlag[text].text}</span>
        },
        {
          title: '循环周期',
          className:'col08',
          dataIndex: 'tfCycle',
          render: text => <span title={text}>{text}</span>
        },
        {
          title: '操作员',
          className:'col-1',
          dataIndex: 'executeUsername',
          render: text => <span title={text}>{text}</span>
        },
        {
          title: '创建时间',
          className:'col-1',
          dataIndex: 'createTime',
          render: text => <span title={text}>{text}</span>
        }
      ]
      return(
          <Content className='ysynet-content ysynet-common-bgColor' style={{padding:20,backgroundColor:'none'}}>
            <Row>
                <Col span={12}>
                <Search
                    placeholder="请输入计划单号/资产名称/资产编码"
                    onSearch={value =>  {this.queryHandler({'maintainPlanNo':value})}}
                    style={{ width: 400 }}
                    enterButton="搜索"
                />
                </Col>
            </Row>
            <RemoteTable
                ref='table'
                query={this.state.query}
                url={upkeep.planList}
                scroll={{x: '140%', y : document.body.clientHeight - 110 }}
                columns={columns}
                rowKey={'maintainPlanDetailId'}
                showHeader={true}
                style={{marginTop: 10}}
                size="small"
            /> 
            <Modal
              title="警告"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <p>{modalContent}</p>
            </Modal>
          </Content>
      )
    }
}

export default MaintainPlan;