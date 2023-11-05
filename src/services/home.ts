import type { BannerItem } from '@/types/home'
import { http } from '@/utils/http'

/**
 * 首页广告区域（轮播图）
 * @param distributionSite 广告区域展示位置: 首页1（默认值）, 商品分类页2
 * @returns Promise<Data<BannerItem[]>>
 */
export const getHomeBannerAPI = (distributionSite = 1) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}
