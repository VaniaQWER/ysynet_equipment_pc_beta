import React, { Component } from 'react';
import { Row,Col,Input,Icon, Layout,Upload,Button,Tag,message,Alert } from 'antd';
import TableGrid from '../../../../component/tableGrid';
import { Link } from 'react-router-dom'
import assets from '../../../../api/assets';
import styles from './style.css';
import { ledgerData } from '../../../../constants';

const { Content } = Layout;
const Search = Input.Search;
const { RemoteTable } = TableGrid;

class LedgerArchivesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      query:{},
      messageError:""
    }
  }
  queryHandler = (query) => {
    this.refs.table.fetch(query);
    this.setState({ query })
  }
  render() {
    const columns = [
      {
        title: '操作',
        dataIndex: 'RN',
        width: 80,
        render: (text, record) => 
          <span>
            <Link to={{pathname: `/ledger/archivesMgt/ledgerArchives/${record.assetsRecordGuid}`}}><Icon type="profile" />详情</Link>
          </span>  
      },
      {
        title: '资产编号',
        dataIndex: 'assetsRecord',
        width: 200,
        sorter:true
      },
      {
        title: '状态',
        dataIndex: 'useFstate',
        width: 100,
        render: text =>  <Tag color={ledgerData[text].color}> { ledgerData[text].text } </Tag>
      },
      {
        title: '资产名称',
        dataIndex: 'equipmentName',
        width: 200
      },
      {
        title: '型号',
        dataIndex: 'spec',
        width: 100
      },
      {
        title: '资产分类',
        dataIndex: 'productType',
        width: 100,
      },
      {
        title: '保管员',
        dataIndex: 'custodian',
        width: 150
      },
      {
        title: '使用科室',
        dataIndex: 'useDept',
        width: 100
      },
      {
        title: '管理科室',
        dataIndex: 'bDept',
        width: 100
      }
    ];
    const messageInfo = "添加大量的信息，建议使用导入功能。导入前请先下载Excel格式模版文件。";
    
    return (
      <Content className='ysynet-content ysynet-common-bgColor'>
         <Alert message={messageInfo} type="warning" showIcon closeText="关闭" />
         {
            this.state.messageError === "" ? null
            :
            <Alert style={{marginTop : 10}} message="错误提示"  type="error" description={<div dangerouslySetInnerHTML={{__html:this.state.messageError}}></div>} showIcon closeText="关闭" />
          }
          <Row style={{marginTop : 10}}>
            <Col span={12}>
              <Search
                placeholder="请输入资产编号/资产名称"
                onSearch={value =>  {this.queryHandler({'params':value})}}
                style={{ width: 300 }}
                enterButton="搜索"
              />
            </Col>
            <Col span={12} className={styles['text-align-right']}>
              <Upload
                // data={{"certGuid":this.state.query.certGuid}}
                action={assets.importEquipments}
                showUploadList={false}
                withCredentials={true}
                beforeUpload={()=>this.setState({loading: true})}
                onError={(error)=>{
                    this.setState({loading: false})
                    console.log(error)
                }}
                onSuccess={(result)=>{
                    this.setState({loading: false})
                    if(result.status){
                        this.refs.table.fetch();
                        this.setState({
                            messageError:""
                        })
                        message.success("导入成功")
                    }
                    else{
                        this.setState({
                            messageError:result.msg
                        })
                    }
                }}
                >
                <Button style={{ marginRight: 8 }}>
                  <Icon type='export'/> 导入
                </Button>
              </Upload>
              <a  style={{ marginLeft: 8 }} target="_self">
                <Icon type='cloud-download'/> 下载模板
              </a>
            </Col>
          </Row>
          <RemoteTable
            ref='table'
            query={this.state.query}
            url={assets.selectAssetsList}
            scroll={{x: '100%', y : document.body.clientHeight - 311}}
            columns={columns}
            showHeader={true}
            rowKey={'assetsRecordGuid'}
            style={{marginTop: 10}}
            size="small"
          /> 
        </Content>
    )
  }
}
export default LedgerArchivesList;