/**
 * 添加拦截器：
 *  拦截 request 请求
 *  拦截 uploadFile 文件上传
 *
 * 给拦截器设置如下功能：
 *  1. 非 http 开头需拼接基础地址
 *  2. 设置请求超时
 *  3. 添加小程序端请求头标识 （接口端要求添加的标识）
 *  4. 添加 token 请求头标识 （接口端要求添加的标识）
 */
import { useMemberStore } from '@/stores'

// 请求基础地址
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 添加拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 1. 非 http 开通需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 2. 设置请求超时, 默认 60s
    options.timeout = 10000
    // 3.添加小程序端请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp', // 接口要求添加的 source-client 字段
    }
    // 4.添加 token 请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token // 接口要求添加的 Authorization 字段
    }
    // 接口文档：https://apifox.com/apidoc/shared-0e6ee326-d646-41bd-9214-29dbf47648fa/doc-1521513
    console.log(options)
  },
}

uni.addInterceptor('request', httpInterceptor) // 拦截 request 请求
uni.addInterceptor('uploadFile', httpInterceptor) //  拦截 uploadFile 文件上传
