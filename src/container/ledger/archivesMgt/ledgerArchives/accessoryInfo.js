/**
 *  档案管理-资产档案-详情-附件信息
 */
import React, { Component } from 'react';
import { Row,Col,Input,Icon,Upload,Button ,message,Menu,Dropdown} from 'antd';
import TableGrid from '../../../../component/tableGrid';
import assets from '../../../../api/assets';
import styles from './style.css';

const { RemoteTable } = TableGrid;
const Search = Input.Search;

class AccessoryInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileType: "",
      loading: false,
      messageError:''
    }
  }
  //附件类型改变
  handleChange = (value) => {
    this.setState( {fileType : value})
    console.log(`selected ${value}`);
  }
  //上传前判断
  beforeUpload = () => {
    console.log(this.state.fileType,'1')
    this.setState({loading: true});
    if(!this.state.fileType){
      message.warning("请选择上传文件类型");
    }
    
  }
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
    const props = {
      action: assets.IMPORTMODEL,
      showUploadList: false,
      withCredentials: true,
      beforeUpload:this.beforeUpload,
      onError:(error)=>{
        this.setState({loading: false})
        console.log(error)
      },
      onSuccess:(result)=>{
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
    }

    };

    const menu = (
      <Menu>
        <Menu.Item>
        <Upload {...props}  data={{"fileType":"资产图片"}}>
          <a><Icon type='export'/> 资产图片</a> 
        </Upload>
        </Menu.Item>
        <Menu.Item>
        <Upload {...props} data={{"fileType":"资产证件"}}>
          <a><Icon type='export'/> 资产证件</a> 
        </Upload>
        </Menu.Item>
        <Menu.Item>
        <Upload {...props} data={{"fileType":"招标文件"}}>
          <a><Icon type='export'/> 招标文件</a> 
        </Upload>
        </Menu.Item>
        <Menu.Item>
        <Upload {...props} data={{"fileType":"使用说明"}}>
          <a><Icon type='export'/> 使用说明</a> 
        </Upload>
        </Menu.Item>
        <Menu.Item>
        <Upload {...props} data={{"fileType":"其他"}}>
          <a><Icon type='export'/> 其他</a> 
        </Upload>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className='ysynet-content ysynet-common-bgColor'>
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
  

              <Dropdown overlay={menu} placement="bottomLeft">
                <Button>添加附件</Button>
              </Dropdown>
    
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