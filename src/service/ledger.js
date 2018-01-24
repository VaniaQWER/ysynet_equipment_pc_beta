import request from '../utils/request';


export const  getInfo= ( url , values , success ) => {
  request(url, {
    body: values,
    success: data => success(data),
    error: err => alert(err)
  })
}