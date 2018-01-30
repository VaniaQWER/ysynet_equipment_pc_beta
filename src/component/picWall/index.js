import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Upload, message } from 'antd';
import UploadButton from './uploadButton'

class PicWall extends PureComponent {
  static defaultProps = {
    action: '',
    max: 3,
    defaultFileList: []
  };
  static propTypes = {
    action: PropTypes.func,
    max: PropTypes.number,
    defaultFileList: PropTypes.array
  };
   constructor(props) {
     super(props);
     this.state = {
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
    this.setState({ fileList })
  }
  render() {
    const { action, defaultFileList, max } = this.props;
    const { fileList } = this.state;
    return (
      <Upload
        action={ action }
        listType="picture-card"
        fileList={ fileList }
        defaultFileList={ defaultFileList }
        onChange={this.handleChange}
        beforeUpload={this.beforeUpload}
      >
        { fileList.length >= max ? null : <UploadButton/>}
      </Upload>
    );
  }
}

export default PicWall;