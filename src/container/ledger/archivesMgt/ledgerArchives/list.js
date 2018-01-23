import React, { Component } from 'react';
import { Row,Col,Input,Icon, Layout,Upload,Button } from 'antd';
import TableGrid from '../../../../component/tableGrid';
import { Link } from 'react-router-dom'
import user from '../../../../api/user';
import styles from './style.css';

const { Content } = Layout;
const Search = Input.Search;
const { RemoteTable } = TableGrid;

class LedgerArchivesList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        visible: false,
        loading: false,
      }
    }
  render() {
    const columns = [
      {
        title: '操作',
        dataIndex: 'RN',
        width: 80,
        render: (text, record) => 
          <span>
            <Link to={{pathname: `/ledger/archivesMgt/ledgerArchives/efg?abc`, state: { ...record } }}><Icon type="form" />详情</Link>
          </span>  
      },
      {
        title: '资产编号',
        dataIndex: 'assetsRecord',
        width: 200
      },
      {
        title: '资产名称',
        dataIndex: 'equipmetStandarName',
        width: 200
      },
      {
        title: '型号',
        dataIndex: 'spec',
        width: 100
      },
      {
        title: '状态',
        dataIndex: 'useFstate',
        width: 100,
      },
      {
        title: '设备分类',
        dataIndex: 'productType',
        width: 100,
      },
      {
        title: '使用科室',
        dataIndex: 'useDeptCode',
        width: 100
      },
      {
        title: '购置金额',
        dataIndex: 'buyPrice',
        width: 80
      },
      {
        title: '管理科室',
        dataIndex: 'bDept',
        width: 100
      },
      {
        title: '负责人',
        dataIndex: 'custodian',
        width: 150
      },
      {
        title: '生产商',
        dataIndex: 'product',
        width: 200
      },
    ];
    return (
        <Content>
          <Row>
            <Col span={12}>
              <Search
                placeholder="请输入资产编号/资产名称"
                onSearch={value => console.log(value)}
                style={{ width: 300 }}
                enterButton="搜索"
              />
            </Col>
            <Col span={12} className={styles['text-align-right']}>
              <Upload
                // data={{"certGuid":this.state.query.certGuid}}
                //action={productUrl.IMPORTMODEL}
                showUploadList={false}
                withCredentials={true}
                beforeUpload={()=>this.setState({loading: true})}
                onError={(error)=>{
                    this.setState({loading: false})
                    console.log(error)
                }}
                onSuccess={(result)=>{
                    this.setState({loading: false})
                    // if(result.status){
                    //     this.refs.table.fetch();
                    //     this.setState({
                    //         messageError:""
                    //     })
                    //     message.success("导入成功")
                    // }
                    // else{
                    //     this.setState({
                    //         messageError:result.msg
                    //     })
                    // }
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
            ref='remote'
            url={user.getLedgerArchivesList}
            scroll={{x: '1800px', y: 315}}
            columns={columns}
            rowKey={'assetsRecord'}
            style={{marginTop: 10}}
            size="small"
          /> 
        </Content>
    )
  }
}
export default LedgerArchivesList;