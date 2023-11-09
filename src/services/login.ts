import { http } from '@/utils/http'

type LoginParams = {
  code: string
  encryptedData: string
  iv: string
}

/**
 * 小程序登录
 * @param data 请求参数
 * @returns
 */
export const postLoginWxMinAPI = (data: LoginParams) => {
  return http({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })
}

/**
 * 小程序登录-内测版
 * @param phoneNumber 模拟手机号
 * @returns
 */
export const postLoginWxMinSimpleAPI = (phoneNumber: string) => {
  return http({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber,
    },
  })
}
