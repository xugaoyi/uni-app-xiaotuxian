import { http } from '@/utils/http'

/**
 * 获取微信支付参数
 * @param data orderId 订单id
 * @returns
 */
export const getPayWxPayMiniPayAPI = (data: { orderId: string }) => {
  // WechatMiniprogram 原生微信小程序的类型
  return http<WechatMiniprogram.RequestPaymentOption>({
    method: 'GET',
    url: `/pay/wxPay/miniPay`,
    data,
  })
}

/**
 * 模拟支付-内测版
 * @param data orderId 订单id
 */
export const getPayMockAPI = (data: { orderId: string }) => {
  return http({
    method: 'GET',
    url: '/pay/mock',
    data,
  })
}
