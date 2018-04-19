/**折旧计提--列表*/
import React from 'react';
import { message , Row, Col, Layout ,Button ,DatePicker , Modal ,Spin} from 'antd';
import TableGrid from '../../../component/tableGrid';
import assets from '../../../api/assets';
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
    };
    queryHandler = (query) => {
      console.log(this.state.query)
      this.refs.table.fetch(this.state.query);
    }
    onChange = (date, dateString) => {
        console.log(date, dateString);
        let options ={
            time:dateString
        }
        this.setState({
            query:Object.assign(this.state.query,options)
        })
		}
		
		doWithDraw = (record)=>{

			Modal.confirm({
				title:'是否确认计提',
				content:'确认计提后可能需要等待一段时间，您确定要操作吗？',
				onOk:()=>{
					console.log('OK')
					this.setState({
						'loading':true
					})

					setTimeout(()=>{
						this.setState({'loading':false})
						message.success('操作成功')
				  },2000)
				
				},
				onCancel:()=>{
					console.log('onCancel')
				}
			})
		}
		onClose = ()=>{
			console.log('close')
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
          dataIndex: 'maintainGuid', 
          width:'5%',
          render: (text,record) =>
            <span>
              { (record.fstate==="00") ? 
                <span><a  onClick={()=>this.doWithDraw(record)}> 计提</a></span>
                :<span><Link to={{pathname:`/devalue/withdraw/details/${record.maintainGuid}`}}>详情</Link></span>
              }
            </span>
          },
          {
            title: '折旧月份',
            dataIndex: 'maintainNo',
            width:'10%',
            render(text, record) {
              return <span title={text}>{text}</span>
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
            dataIndex: 'maintainDate',
            sorter: (a, b) => sortTime(a,b,'maintainDate'),
            render(text, record) {
              return <span title={text}>{text}</span>
            }
          },
          {
            title: '操作员',
            dataIndex: 'modifyUserName',
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
                    折旧月份：<RangePicker onChange={this.onChange}  style={{ marginRight:15}} format='YYYY-MM-DD'/>
                    <Button type='primary' size='default' onClick={this.queryHandler}>查询</Button>
                  </Col>
              </Row>
              <RemoteTable
                  ref='table'
                  query={query}
                  url={assets.selectMaintainOrderList}
                  scroll={{x: '100%', y : document.body.clientHeight - 110 }}
                  columns={columns}
                  rowKey={'maintainGuid'}
                  showHeader={true}
                  style={{marginTop: 10}}
                  size="small"
							/> 
							<Modal
								visible={loading}
								footer={null}
								closable={false}
								style={{textAlign:'center'}}>
								<Spin tip="正在处理中...">
								
							</Spin>
							</Modal>
							
            </Content>
        )
    }
}


export default WithDraw;