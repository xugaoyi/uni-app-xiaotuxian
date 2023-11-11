import { http } from '@/utils/http'

/**
 *  加入购物车
 * @param data { skuId: string; count: number }
 * @returns
 */
export const postMemberCartAPI = (data: { skuId: string; count: number }) => {
  return http<any>({
    method: 'POST',
    url: '/member/cart',
    data,
  })
}
