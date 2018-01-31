/**
 * @file 用户sevice 
 */
import request from '../utils/request'
import user from '../api/user';
// 状态值
const SET_USER_MAPPER = 'SET_USER_MAPPER';
const CLEAR_USER_MAPPER = 'CLEAR_USER_MAPPER';
const FETCH_FAILURE = 'FETCH_FAILURE';

// 设置user
const setUserMapper = user => ({
  type: SET_USER_MAPPER,
  user
})
// 异常
export const fetchFailure = err => ({
  type: FETCH_FAILURE,
  err
})
// 清空user
export const clearUserMapper = () => ({
  type: CLEAR_USER_MAPPER
})

export const setUserInfo = user => (
  dispatch => dispatch(setUserMapper(user))
)

export const fetchUserInfo = () => (
  dispatch => (
    request(user.fetchUser, {
      success: data => {
        if (data.status) {
          dispatch(setUserMapper(data.result));
        } else {
          dispatch(fetchFailure(data.result))
        }
      },
      error: err => dispatch(fetchFailure(err))
    })
  )
)