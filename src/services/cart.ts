import type { CartItem } from '@/types/cart'
import { http } from '@/utils/http'

/**
 *  加入购物车
 * @param data { skuId: string; count: number }
 * @returns
 */
export const postMemberCartAPI = (data: { skuId: string; count: number }) => {
  return http({
    method: 'POST',
    url: '/member/cart',
    data,
  })
}

/**
 * 获取购物车列表
 * @returns
 */
export const getMemberCartAPI = () => {
  return http<CartItem[]>({
    method: 'GET',
    url: '/member/cart',
  })
}
