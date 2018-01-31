import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Upload, message } from 'antd';
import UploadButton from './uploadButton'

class PicWall extends PureComponent {
  static defaultProps = {
    action: 'http://192.168.0.200:5656/ysy/ftp/post',
    max: 3,
    defaultFileList: []
  };
  static propTypes = {
    action: PropTypes.string,
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

  handleChange = (file) => {
    console.log(file)
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