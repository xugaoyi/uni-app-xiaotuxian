import type { PageParams } from '@/types/global'
import { http } from '@/utils/http'

type HotParams = PageParams & { subType?: string } // 使用交叉类型给 PageParams 拓展加入 & 后面的类型

/**
 * 通用的热门推荐接口
 * @param url 请求地址
 * @param data 请求参数
 * @returns
 */
export const getHotRecommendAPI = (url: string, data?: HotParams) => {
  return http({
    method: 'GET',
    url,
    data: data || {},
  })
}
