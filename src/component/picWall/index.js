import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Upload, message,Modal } from 'antd';
import UploadButton from './uploadButton'

class PicWall extends PureComponent {
  static defaultProps = {
    action: "https://192.168.0.212:3001",
    max: 3
  };
  static propTypes = {
    action: PropTypes.string,
    max: PropTypes.number
  };
   constructor(props) {
     super(props);
     this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: []
     }
   }
   beforeUpload = (file) => {
    const type = file.type === 'image/jpeg'|| file.type === 'image/png'|| file.type === 'image/bmp';
    if (!type) {
      message.error('您只能上传image/jpeg、png、bmp!');
    }
    const isLt5M = file.size / 1024 / 1024  < 5;
    if (!isLt5M) {
      message.error('图片不能大于 5MB!');
    }
    return type && isLt5M;
  }

  handleChange = ({ fileList }) => {
    console.log(fileList,'fileList')
    this.setState({ fileList })
    this.props.file(fileList)
  }
  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  render() {
    const { action, max } = this.props;
    const { fileList,previewVisible,previewImage } = this.state;
    return (
      <div>
      <Upload
        action={ action }
        listType="picture-card"
        fileList={ fileList }
        onPreview={this.handlePreview}
        onChange={this.handleChange}
        beforeUpload={this.beforeUpload}
      >
        { fileList.length >= max ? null : <UploadButton/>}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicWall;