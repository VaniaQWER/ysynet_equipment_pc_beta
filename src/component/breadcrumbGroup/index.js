import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

function getBreadcrumbNameWithParams(breadcrumbNameMap, url) {
  let name = '';
  Object.keys(breadcrumbNameMap).map((item) => {
    const itemRegExpStr = `^${item.replace(/:[\w-]+/g, '[\\w-]+')}$`;
    const itemRegExp = new RegExp(itemRegExpStr);
    if (itemRegExp.test(url)) {
      name = breadcrumbNameMap[item];
    }
    return null;
  });
  return name;
}
class BreadcrumbGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.breadcrumbNameMap = {};
    this.state = {
      bread: []
    }
  }
  createBreadcrumbNameMap = (routes) => {
    routes.map((route, index) => {
      this.breadcrumbNameMap[route.path] = route.name;
      if (route.routes) {
        this.createBreadcrumbNameMap(route.routes);
      }
      return null;
    })
  }
  createBreadcrumb = () => {
    const { routes, location } = this.props;
    this.createBreadcrumbNameMap(routes);
    const pathArr = location.pathname.split('/');
    const breadArr = pathArr.map((item, i) => {
      const url = pathArr.slice(0, i+1).join('/');
      return { url, title: getBreadcrumbNameWithParams(this.breadcrumbNameMap, url) }
    })
    return breadArr;
  }
  render() {
    const bread = this.createBreadcrumb();
    return (
      <Breadcrumb className={this.props.className}>
        <Breadcrumb.Item><Link to={'/'}>首页</Link></Breadcrumb.Item>
        {
          bread.map((item, index) => (
            item.title ?
            <Breadcrumb.Item key={index}> 
            {
              (index === bread.length - 1)
               ? item.title : <Link to={item.url}> { item.title } </Link>
            }
            </Breadcrumb.Item>
            : null
          ))
        }
      </Breadcrumb>
    )
  }
}
export default withRouter(BreadcrumbGroup);