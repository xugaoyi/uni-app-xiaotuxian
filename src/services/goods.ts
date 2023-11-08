import { http } from '@/utils/http'

/**
 * 商品详情
 * @param id
 * @returns
 */
export const getGoodsByIdAPI = (id: string) => {
  return http({
    method: 'GET',
    url: '/goods',
    data: {
      id,
    },
  })
}
