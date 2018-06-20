/*
 * @Author: yuwei  - 出库纪录
 * @Date: 2018-06-12 18:05:02 
* @Last Modified time: 2018-06-12 18:05:02 outRecord
 */
import React , { Component }from 'react';
import { Link } from 'react-router-dom';
import request from '../../../utils/request';
import { Form, Row, Col, Input, DatePicker,Button,Select,message} from 'antd';
import TableGrid from '../../../component/tableGrid';
import storage from '../../../api/storage';
import queryString from 'querystring';
const { RemoteTable } = TableGrid;

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
  };
class SearchForm extends Component{
    state={
        manageSelect:[],
        outDeptOptions: []
    }
    componentDidMount = () => {
        this.getManageSelect();
        this.outDeptSelect();
    }
    getManageSelect = () => {
        request(storage.selectUseDeptList,{
                body:queryString.stringify({deptType:"01"}),
                headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: data => {
                        if(data.status){
                                this.setState({manageSelect:data.result})
                        }else{
                                message.error(data.msg)
                        }
                },
                error: err => {console.log(err)}
        })
    }
    outDeptSelect = () => {
        request(storage.selectUseDeptList,{
            body:queryString.stringify({deptType:"00"}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: data => {
                    if(data.status){
                            this.setState({outDeptOptions:data.result})
                    }else{
                            message.error(data.msg)
                    }
            },
            error: err => {console.log(err)}
        })
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const Time = values.Time === undefined ? "":values.Time;
            if(Time.length>0) {
                values.startTime = Time[0].format('YYYY-MM-DD');
                values.endTime = Time[1].format('YYYY-MM-DD');
                delete values.Time
            }
            console.log(values,"搜索数据")
            this.props.query(values); 
       });
    }
    //重置
    handleReset = () => {
        this.props.form.resetFields();
        this.props.query({});
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSearch}>
              <Row>
                 <Col span={8} key={1}>
                    <FormItem {...formItemLayout} label={'出库时间'}>
                        {getFieldDecorator('Time')(
                            <RangePicker format="YYYY-MM-DD" style={{width:"100%"}}/>
                        )}
                    </FormItem>
                </Col>
                <Col span={8} key={2}>
                    <FormItem {...formItemLayout} label={'管理部门'}>
                        {getFieldDecorator('manageDeptGuid',{
                            initialValue: ""
                        })(
                            <Select  
                                showSearch
                                placeholder={'请选择'}
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="" key={-1}>全部</Option>
                                {
                                    this.state.manageSelect.map((item,index) => {
                                    return <Option key={index} value={item.value}>{item.text}</Option>
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                </Col>
                 <Col span={8} key={3}>
                    <FormItem {...formItemLayout} label={'出库方式'}>
                        {getFieldDecorator('outMode',{
                            initialValue:""
                        })(
                            <Select>
                                <Option value="" key={-1}>全部</Option>
                                <Option value="02">科室领用出库</Option>
                                <Option value="05">退库出库</Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col span={8} key={5}>
                  <FormItem {...formItemLayout} label={'领用科室'}>
                      {getFieldDecorator('outDeptGuid',{
                          initialValue: ""
                      })(
                            <Select 
                                showSearch
                                placeholder={'请选择'}
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                              <Option value="" key={-1}>全部</Option>
                              {
                                  this.state.outDeptOptions.map((item,index) => {
                                  return <Option key={index} value={item.value}>{item.text}</Option>
                                  })
                              }
                          </Select>
                      )}
                  </FormItem>
                </Col>
                 <Col span={8} key={4}>
                    <FormItem {...formItemLayout} label={'单号'}>
                        {getFieldDecorator('outNo')(
                            <Input placeholder="请输入出库单号"/>
                        )}
                    </FormItem>
                </Col>
                <Col span={7} key={6} >
                    <Button type="primary" htmlType="submit" style={{marginTop:3}}>搜索</Button>
                </Col>
              </Row>
            </Form>
        )
    
    }
}
const SearchBox = Form.create()(SearchForm);

class OutRecord extends Component{
    state = {
        query:{}
    }
    queryHandler = (query) => {
        this.refs.table.fetch(query);
        this.setState({ query })
    }
    render(){
        const columns = [
            {
                title : '操作',
                dataIndex : 'action',
                width: 80 ,
                render : (text,record)=>{
                        return <Link to={{pathname:`/storage/outMgt/details/${record.outId}`,state:record}}>详情</Link>
                }
            },{
                title : '出库单',
                dataIndex : 'outNo',
                width: 120,
                
            },{
                title : '库房',
                dataIndex : 'manageDeptName',
                width: 150,
            },{
                title : '操作员',
                dataIndex : 'createUsername',
                width: 100
            },{
                title : '领用科室',
                dataIndex : 'outDeptName',
                width: 100
            },{
                title : '领用人',
                dataIndex : 'receiver',
                width: 100
            },{
                title : '科室地址',
                dataIndex : 'tfAddress',
                width: 100
            },{
                title : '出库时间',
                dataIndex : 'outDate',
                width: 140
            },{
                title : '备注',
                dataIndex : 'remark',
                width: 150  
            }
        ];
        return(
            <div>
                <SearchBox query={this.queryHandler}/>
                <Row>
                        <Button type="primary" style={{marginLeft:16,marginRight:16}}>
                        <Link to={{pathname:`/storage/outMgt/receive`}}>领用</Link></Button>

                        <Button type="primary">
                        <Link to={{pathname:`/storage/outMgt/refund`}}>退库</Link></Button>
                </Row>
                
                <RemoteTable
                    url={storage.queryOutportAssetList}
                    ref='table'
                    query={this.state.query}
                    scroll={{x: '150%', y : document.body.clientHeight - 110 }}
                    columns={columns}
                    rowKey={'outId'}
                    showHeader={true}
                    style={{marginTop: 10}}
                    size="small">
                </RemoteTable>
            </div>
        )
    }
}
export default OutRecord;