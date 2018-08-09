/*计量查询- 详情*/
import React , { Component } from 'react';
import { Layout, Card, Col, Row, message, Upload} from 'antd';
import queryString from 'querystring';
import request from '../../../utils/request';
import meterStand from '../../../api/meterStand';
import assets from '../../../api/assets';
const { Content } = Layout;

class MeterQueryDetails extends Component{
  state = {
    SearchKey:'',//资产编号搜索
    assetsInfo:{},
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png',
    }]
  }
  componentDidMount() {
    const recordInfoGuid = this.props.match.params.id;
    request(meterStand.meterRecordInfoList, {
      body: queryString.stringify({ recordInfoGuid }),
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (data) => {
        let assetsInfo = data.result.rows[0];
        switch (assetsInfo.productType) {
          case "01":
            assetsInfo.productType = "通用设备";
            break;
          case "02":
            assetsInfo.productType = "电气设备";
            break;
          case "03":
            assetsInfo.productType = "电子产品及通信设备";
            break;
          case "04":
            assetsInfo.productType = "仪器仪表及其他";
            break;
          case "05":
            assetsInfo.productType = "专业设备";
            break;
          case "06":
            assetsInfo.productType = "其他";
            break;
          default:
            assetsInfo.productType = '';
        }
        this.setState({ assetsInfo });
      },
      error: (err) => console.log(err)
    })
  }
  handleChange = (fileListObj) => {
    let { fileList } = fileListObj ;
    // 1. Limit the number of uploaded files
    //    Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    for(let i = 0;i<fileList.length;i++){
      switch (fileList[i].type){
        case "application/x-rar-compressed":
          break;
        case "application/zip":
          break;
        case "application/x-zip-compressed":
          break;
        case "application/msword":
          break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          break;
        case "application/pdf":
          break;
        case "image/jpeg":
          break;
        default:
          message.warning('仅支持扩展名：.rar .zip .doc .docx .pdf .jpg！',3)
        return;
      }
    }

    // 2. read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    // 3. filter successfully uploaded files according to response from server
    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.result === "success";
      }
      return true;
    });
    this.setState({fileList})
  }
  render(){
    const { assetsInfo } = this.state;
    const props = {
      action: assets.picUploadUrl,
      fileList: assets.accessory,
      multiple: true,
    };
    return(
      <Content className='ysynet-content'>
          {/* 资产信息部分 */}
          <Card title="资产信息" bordered={false} className="min_card">
              <Row>
                <Col span={8}>
                  <div className="ant-row ant-form-item">
                    <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                      <label>资产编号</label>
                    </div>
                    <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                      <div className="ant-form-item-control">
                        {assetsInfo.assetsRecord || ''}
                      </div>
                    </div>
                  </div>

                </Col>
                <Col span={8} offset={8}>
                  <div className="ant-row ant-form-item">
                    <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                      <label>资产名称</label>
                    </div>
                    <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                      <div className="ant-form-item-control">
                        {assetsInfo.equipmentName || ''}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <div className="ant-row ant-form-item">
                    <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                      <label>型号</label>
                    </div>
                    <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                      <div className="ant-form-item-control">
                        {assetsInfo.fmodel || ''}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="ant-row ant-form-item">
                    <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                      <label>规格</label>
                    </div>
                    <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                      <div className="ant-form-item-control">
                      {assetsInfo.spec || ''}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="ant-row ant-form-item">
                    <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                      <label>资产类别</label>
                    </div>
                    <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                      <div className="ant-form-item-control">
                      {assetsInfo.productType || ''}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <div className="ant-row ant-form-item">
                    <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                      <label>使用科室</label>
                    </div>
                    <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                      <div className="ant-form-item-control">
                      {assetsInfo.useDeptName || ''}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="ant-row ant-form-item">
                    <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                      <label>保管员</label>
                    </div>
                    <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                      <div className="ant-form-item-control">
                      {assetsInfo.custodian || ''}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="ant-row ant-form-item">
                    <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                      <label>管理科室</label>
                    </div>
                    <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                      <div className="ant-form-item-control">
                      {assetsInfo.bDeptGuidName || ''}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
          </Card>
          {/* 资产信息部分 */}
          <Card title="检测信息" bordered={false} style={{marginTop: 4}} className="min_card">
              <Row>
                <Col span={8}>

                  <div className="ant-row ant-form-item">
                    <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                      <label>检定方式</label>
                    </div>
                    <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                      <div className="ant-form-item-control">
                        {assetsInfo.type === "00"? "内检" : "外检" || ''}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="ant-row ant-form-item">
                    <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                      <label>计量周期</label>
                    </div>
                    <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                      <div className="ant-form-item-control">
                        {`${assetsInfo.measureCycly}月` || '计量周期'}
                      </div>
                    </div>
                  </div>
                </Col>

                <Col span={8}>
                  <div className="ant-row ant-form-item">
                    <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                      <label>本次待检日期</label>
                    </div>
                    <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                      <div className="ant-form-item-control">
                        {assetsInfo.measureDate || ''}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <div className="ant-row ant-form-item">
                    <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                      <label>下次待检日期</label>
                    </div>
                    <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                      <div className="ant-form-item-control">
                        {assetsInfo.nextMeasureDate || ''}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="ant-row ant-form-item">
                    <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                      <label>证书编号</label>
                    </div>
                    <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                      <div className="ant-form-item-control">
                        {assetsInfo.certNo || ''}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="ant-row ant-form-item">
                    <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                      <label>检定结果</label>
                    </div>
                    <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                      <div className="ant-form-item-control">
                        {assetsInfo.results === "00"? "合格" : "不合格" || ''}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <div className="ant-row ant-form-item">
                    <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                      <label>计量费用</label>
                    </div>
                    <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                      <div className="ant-form-item-control">
                        {assetsInfo.measurePay || ''}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="ant-row ant-form-item">
                    <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                      <label>检定人</label>
                    </div>
                    <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                      <div className="ant-form-item-control">
                        {assetsInfo.verdictUserName || ''}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                  <Col span={8}>
                  <div className="ant-row ant-form-item">
                    <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                      <label>附件</label>
                    </div>
                    <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                      <div className="ant-form-item-control">
                          <Upload 
                            {...props} 
                            withCredentials={true}
                            showUploadList={{showRemoveIcon:false}}
                          >
                          </Upload>
                      </div>
                    </div>
                  </div>
                  </Col>
              </Row>
          </Card>
      </Content>
    )
  }
}

export default  MeterQueryDetails;
