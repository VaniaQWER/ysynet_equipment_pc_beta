import React from 'react';
import { Tooltip } from 'antd';//message
import { _local,FTP } from '../api/local';
import querystring from 'querystring';
export default function textTips(width,text) {
  return <Tooltip placement="topLeft" title={text}>
            <div style={{whiteSpace:"nowrap",width:width+"px",textOverflow:"ellipsis",overflow:"hidden"}}>{text}</div>
         </Tooltip>
}


export const fetchData = (
  api, body, callback, type='application/x-www-form-urlencoded', method='post'
) => {
  const query = typeof body === 'object' ? JSON.stringify(body) : body;
  fetch(api, {
    method: method,
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': type
    },
    body: query
  })
    .then(res => {
      switch (res.status) {
        // case 996:
        //   hashHistory.push({pathname: '/login'});
        //   return message.warn('会话失效，请重新登录');
        // case 997:
        //   hashHistory.push({pathname: '/login'});
        //   return message.warn('非法访问，请重新登录');
        // case 998:
        //   hashHistory.push({pathname: '/login'});
        //   return message.warn('会话失效，请重新登录');
        // case 999:
        //   hashHistory.push({pathname: '/login'});
        //   return message.warn('登录失效，请重新登录');
        default:
          return res.json();
      }
    })
    .then(data => {
      callback(data)
    })
    .catch(e => {
      console.log(e)
      // message.error('存在异常' + e.message)
    });
}

/*时间str转换为时间戳 */
export function timeToStamp(timeStr){
    if(timeStr){
      return Date.parse(new Date(timeStr)) / 1000 
    }else{
      return timeStr
    }
}
export function moneyValid( val,message="请输入非0正数,最多保留两位小数！",maxmessage="输入数值过大, 不能超过100000000",max=99999999){
  let num = Number(val)
  if (/^\d+$/.test(num) ||  /(^\d+\.\d{1}$)/.test(num) || /(^\d+\.\d{2}$)/.test(num)) {
    if (num > 99999999.99) {
      return  [false,maxmessage]
    }else{
      return [true]
    }
  } else {
      return  [false,message]
  }
}
export function cutFtpUrl(fullUrl){
		if(new RegExp( FTP ).test(fullUrl)){
      let s = fullUrl.replace(new RegExp( FTP ), "")
      return s;
		}else{
      return fullUrl;
    }
}
function compareUp(property){
  return function(a,b){
      var value1 = timeToStamp(a[property]);
      var value2 = timeToStamp(b[property]);
      return  value1  - value2 ;
  }
}
function compareDown(property){
  return function(a,b){
      var value1 = timeToStamp(a[property]);
      var value2 = timeToStamp(b[property]);
      return  value2 - value1;
  }
}
export function sortUpByKey(arr,key){
  return  arr.sort(compareUp(key))
}
export function sortDownByKey(arr,key){
  return  arr.sort(compareDown(key))
}
/*查询字典*/
export const CommonData = (type, cb, params={}, url) => {
  if(localStorage.getItem(type)) {
    cb(JSON.parse(localStorage.getItem(type)));
  } else {
    fetch(url || `${_local}/StaticDataController/selectStaticDataList?code=` + type, {
      credentials: 'include',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: querystring.stringify(params)
    })
    .then((res) => res.json())
    .then((json) => {
      cb(json.result)
      localStorage.setItem(type, JSON.stringify(json.result));
    })
    .catch((err) => cb(err))
  }
}

export const validMoney = (rule, value, callback) => {
  let num = Number(value)
  if (!num || /^\d+$/.test(num) ||  /(^\d+\.\d{1}$)/.test(num) || /(^\d+\.\d{2}$)/.test(num)) {
    if (num > 99999999.99) {
      callback(new Error('输入数值过大, 不能超过100000000'));
    }else{
      callback();
    }
  } else {
      callback(new Error('请输入非0正数,最多保留两位小数！'));
  }
}

export const validAmount = (rule, value, callback) => {
  let num = Number(value);
  if (/^\d+$/.test(num) && num !== 0) {
    if (num > 99999999) {
      callback(new Error('输入数值过大, 不能超过100000000'));
    }else{
      callback();
    }
  } else {
      callback(new Error('请输入非0正数！'));
  }
}

export const validDay = (rule, value, callback) => {
  let num = Number(value);
  if (/^\d+$/.test(num) && num !== 0) {
    if (num > 99999999) {
      callback(new Error('输入数值过大, 不能超过100000000'));
    }else{
      callback();
    }
  } else if(value === '' || value === undefined || num !== 0) {
    callback();
  } else {
    callback(new Error('请输入非0正数！'));
  }
}
export const clearNull = (values) => {
  for (let item in values){
    if(Array.isArray(values[item])){
      if(values[item].length===0){
        delete values[item]
      }
    }
  }
}