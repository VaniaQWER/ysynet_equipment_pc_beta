import React, { Component } from 'react';
import { Table, message } from 'antd';
import querystring from 'querystring';
import request from '../../utils/request'

class RemoteTable extends Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
    searchParams: {}
  };
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    const postData = Object.assign({}, this.state.searchParams, {
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    })
    this.fetch(postData);
  }
  fetch = (params = {...this.props.query}, url = this.props.url) => {
    this.setState({ loading: true, searchParams: params });
    if(url){
      const body = querystring.stringify({
        pagesize: this.props.pageSize || 10,
        ...params,
      })  
      request({
        url,
        body,
        success: data => {
          if(!data.status){
            message.error(data.msg);
          }
          let pagination = this.state.pagination;
          pagination.total = data.result.records;
          pagination.pageSize = this.props.pageSize || 10;
          if(!params.page) {
            pagination.current = 1;
          }
          this.setState({
            loading: false,
            data: data.result.rows || data.result,
            pagination
          });
        },
        error: () => (
          this.setState({
            loading: false,
            data: []
          })
        )
      })
    }
    else{
      this.setState({
        loading: false,
        data: []
      })
    }
  }
  componentDidMount() {
    this.fetch();
  }
  render () {
    const { columns, rowKey, rowClassName, 
            rowSelection, scroll, footer } = this.props;      
    return (
      <Table 
        style={this.props.style}
        columns={columns}
        rowKey={rowKey}
        size={this.props.size || 'normal'}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
        rowClassName={rowClassName}
        rowSelection={rowSelection || null}
        scroll={scroll || { x: '1300px' }}
        footer={footer || null}
      />
    )
  }
}

export default RemoteTable;