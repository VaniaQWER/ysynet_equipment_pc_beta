/**
 *  档案管理-资产档案-详情-附件信息
 */
import React, { Component } from 'react';
import { Row,Col,Input,Icon,Upload,Button } from 'antd';
import TableGrid from '../../../../component/tableGrid';
import assets from '../../../../api/assets';
import styles from './style.css';

const { RemoteTable } = TableGrid;
const Search = Input.Search;

class AccessoryInfo extends Component {
  render () {
    const columns = [
      {
        title: '附件类型',
        dataIndex: 'fileType',
        width: 100
      },
      {
        title: '文件名',
        dataIndex: 'fileName',
        width: 100
      },
      {
        title: '上传用户',
        dataIndex: 'userName',
        width: 100
      },
      {
        title: '上传时间',
        dataIndex: 'uploadTime',
        width: 100,
      },
      {
        title: '备注',
        dataIndex: 'remark',
        width: 100,
      }
    ];
    return (
      <div>
          <Row>
            <Col span={12}>
              <Search
                placeholder="请输入附件名称/类型"
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
                //     message.success("上传成功")
                // }
                // else{
                //     this.setState({
                //         messageError:result.msg
                //     })
                // }
            }}
            >
            <Button style={{ marginRight: 8 }}>
              <Icon type='export'/> 上传
            </Button>
          </Upload>
            </Col>
          </Row>
         <RemoteTable
            ref='remote'
            query={{ assetsRecord: this.props.assetsRecord }}
            url={assets.selectCertInfoList}
            scroll={{x: '100%', y : document.body.clientHeight - 341}}
            columns={columns}
            rowKey={'RN'}
            style={{marginTop: 10}}
            size="small"
          /> 
      </div>
    )
  }
}
export default AccessoryInfo 