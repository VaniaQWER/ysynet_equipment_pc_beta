/**
 * @file 资产报废 - 报废记录
 * @author Vania
 * @since 2018-04-08
 */
import React, { PureComponent } from 'react';
import { scrapColumns } from '../common';
import { Link } from 'react-router-dom';
import ScrapForm from '../common/scrapForm'
import querystring from 'querystring';
const newColums = [
  { title: '操作', width: 100, dataIndex: 'scrapGuid', render: text => <Link to={`/scrap/scrapRecord/${text}`}>详情</Link>  }, 
  ...scrapColumns
]
class ScrapRecord extends PureComponent {
  render() {
    return (
      <ScrapForm columns={newColums} defaultParams={querystring.stringify({findType: 'JL'})}/>
    )
  }
}

export default ScrapRecord;