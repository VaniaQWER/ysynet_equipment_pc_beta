/**
 * @file 配件信息 Card
 */
import React, { PureComponent } from 'react';
import { Table, Button, Icon, Modal } from 'antd';

const columns = [{
  title: '操作',
  dataIndex: 'rrpairFittingUseGuid',
  key: 'rrpairFittingUseGuid',
  width: 100
}, {
  title: '配件编号',
  dataIndex: 'assetsRecord',
  key: 'assetsRecord',
  width: 200
}, {
  title: '配件名称',
  dataIndex: 'acceName',
  key: 'acceName',
  width: 200
}, {
  title: '型号',
  dataIndex: 'acceFmodel',
  key: 'acceFmodel',
  width: 150
}, {
  title: '规格',
  dataIndex: 'acceSpec',
  key: 'acceSpec',
  width: 150
}, {
  title: '数量',
  dataIndex: 'acceNum',
  key: 'acceNum',
  width: 100
}, {
  title: '单位',
  dataIndex: 'acceUnit',
  key: 'acceUnit',
  width: 100
}, {
  title: '单价',
  dataIndex: 'unitPrice',
  key: 'unitPrice',
  width: 100
}, {
  title: '金额',
  dataIndex: 'money',
  key: 'money',
  width: 100
}];

/**
 * 选择配件
 */
// class SelectParts extends PureComponent {
//   render() {
//     return (

//     )
//   }
// }

class PartsInfo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      choseVisible: false,
      writeVisible: false
    }
  }
  hideModal = type => type ? this.setState({writeVisible: false}) : this.setState({choseVisible: false});
  showModal = type => type ? this.setState({writeVisible: true}) : this.setState({choseVisible: true});
  render() {
    const { dataSource, choseVisible, writeVisible } = this.state;
    return (
      <div>
        <Modal
          title="选择配件"
          visible={choseVisible}
          onOk={this.hideModal.bind(this, 0)}
          onCancel={this.hideModal.bind(this, 0)}
          okText="确认"
          cancelText="取消"
        >
          <p>选择配件</p>
        </Modal>
        <Modal
          title="填写配件"
          visible={writeVisible}
          onOk={this.hideModal.bind(this, 1)}
          onCancel={this.hideModal.bind(this, 1)}
          okText="确认"
          cancelText="取消"
        >
          <p>填写配件</p>
        </Modal>
        <Table 
          dataSource={dataSource} 
          columns={columns} 
          showHeader={true}
          title={() => <div>
            <Button 
              style={{marginRight: 5}} 
              type='primary'
              onClick={this.showModal.bind(this, 0)}
            >
              <Icon type="switcher" />
              选择配件
            </Button>
            <Button
              onClick={this.showModal.bind(this, 1)}
            >
              <Icon type="edit" />
              填写配件
            </Button>
          </div>}
        />
      </div>  
    )
  }
}

export default PartsInfo;