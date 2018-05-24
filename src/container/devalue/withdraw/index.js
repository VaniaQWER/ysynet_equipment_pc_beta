/**折旧计提--列表*/
import React from 'react';
import { message , Row, Col, Layout ,Button ,DatePicker , Modal ,Spin} from 'antd';
import querystring from 'querystring';
import TableGrid from '../../../component/tableGrid';
import devalue from '../../../api/devalue';
import request from '../../../utils/request';
import { depreciationState ,depreciationStateSel} from '../../../constants';
import { Link } from 'react-router-dom';
import { timeToStamp } from '../../../utils/tools';
const { Content } = Layout;
const { RemoteTable } = TableGrid;
const { RangePicker } = DatePicker;

const sortTime = (a,b,key) =>{
  if(a[key] && b[key]){
    return timeToStamp(a[key]) - timeToStamp(b[key])
  }else{
		return false
	}
}

class WithDraw extends React.Component{

    state = {
				query:{},
				loading:false
    }

    queryHandler = (query) => {
      this.refs.table.fetch(this.state.query);
    }

    onChange = (date, dateString) => {
        let options ={
          startCreateDate:dateString[0],
          endCreateDate:dateString[1],
        }
        this.setState({
            query:Object.assign(this.state.query,options)
        })
		}
    
    sendWithDraw = (record) =>{

      let json ={
        depreciationDate:record.depreciationDate,
        equipmentDepreciationGuid:record.equipmentDepreciationGuid,
      }
      let options = {
        body:querystring.stringify(json),
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: data => {
          if(data.status){
            setTimeout(()=>{
              this.setState({'loading':false})
              message.success('操作成功')
              this.refs.table.fetch(this.state.query);
            },2000)
          }else{
            message.error(data.msg)
            setTimeout(()=>{
              this.setState({'loading':false})
            },1000)
          }
        },
        error: err => {console.log(err)}
      }
      request(devalue.subWithDraw, options);
    }

		doWithDraw = (record)=>{

			Modal.confirm({
				title:'是否确认计提',
				content:'确认计提后可能需要等待一段时间，您确定要操作吗？',
				onOk:()=>{
					this.setState({
						'loading':true
					})
          this.sendWithDraw(record)
				},
				onCancel:()=>{
				}
			})
    }

    formatTime = (timeStr) =>{
      let timeArr = timeStr.split('-');
      let str = timeArr[0]+'-'+timeArr[1] ;
      return str;
    }

    render(){
      const columns=[
        {
            title: '序号', 
            dataIndex: 'index', 
            width:'1%',
            render : (text,record,index)=> index+1
        },
        { title: '操作', 
        dataIndex: 'equipmentDepreciationGuid', 
        width:'5%',
        render: (text,record) =>
          <span>
            { (record.fstate==="00") ? 
              <span><a  onClick={()=>this.doWithDraw(record)}> 计提</a></span>
              :<span><Link to={{pathname:`/devalue/withdraw/details/${record.equipmentDepreciationGuid}`}}>详情</Link></span>
            }
          </span>
        },
        {
          title: '折旧月份',
          dataIndex: 'depreciationDate',
          width:'10%',
          render:(text, record) =>{
            return <span>{ this.formatTime(text) }</span>
          }
        },
        {
          title: '状态',
          dataIndex: 'fstate',
          key: 'fstate',
          width:'5%',
          filters: depreciationStateSel,
          onFilter: (value, record) => (record && record.fstate===value),
          render: text => 
            <div>
              { depreciationState[text].text }
            </div>
        },
        {
          title: '计提时间',
          width:'8%',
          dataIndex: 'createTime',
          sorter: (a, b) => sortTime(a,b,'createTime'),
          render(text, record) {
            return <span title={text}>{text}</span>
          }
        },
        {
          title: '操作员',
          dataIndex: 'createUserName',
          width:'8%',
          render(text, record) {
            return <span title={text}>{text}</span>
          }
        }
      ]
      const { query , loading } = this.state;
      return(
          <Content className='ysynet-content ysynet-common-bgColor' style={{padding:20}}>
            <Row>
                <Col span={12}>
                  折旧月份：<RangePicker onChange={this.onChange}  style={{ marginRight:15}} format='YYYY-MM'/>
                  <Button type='primary' size='default' onClick={this.queryHandler}>查询</Button>
                </Col>
            </Row>
            <RemoteTable
                ref='table'
                query={query}
                url={devalue.getDevalueList}
                scroll={{x: '100%', y : document.body.clientHeight - 110 }}
                columns={columns}
                rowKey={'equipmentDepreciationGuid'}
                showHeader={true}
                style={{marginTop: 10}}
                size="small"
            /> 
            <Modal
              visible={loading}
              footer={null}
              closable={false}
              style={{textAlign:'center'}}>
              <Spin tip="正在处理中..."></Spin>
            </Modal>
            
          </Content>
      )
    }

}
export default WithDraw;