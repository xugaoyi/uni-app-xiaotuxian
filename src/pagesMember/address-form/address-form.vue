<script setup lang="ts">
import {
  getMemberAddressByIdAPI,
  postMemberAddressAPI,
  putMemberAddressByIdAPI,
} from '@/services/address'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 表单数据
const form = ref({
  receiver: '', // 收货人
  contact: '', // 联系方式
  fullLocation: '', // 省市区(前端展示)
  provinceCode: '', // 省份编码(后端参数)
  cityCode: '', // 城市编码(后端参数)
  countyCode: '', // 区/县编码(后端参数)
  address: '', // 详细地址
  isDefault: 0, // 默认地址，1为是，0为否
})

// 获取页面参数
const query = defineProps<{
  id?: string
}>()

// 获取收货地址详情
const getMemberAddressByIdData = async () => {
  if (query.id) {
    const res = await getMemberAddressByIdAPI(query.id)
    Object.assign(form.value, res.result) // 回显数据
  }
}

// 页面加载
onLoad(() => {
  getMemberAddressByIdData()
})

// 动态设置标题
uni.setNavigationBarTitle({ title: query.id ? '修改地址' : '新建地址' })

// 收集所在地区
// #ifdef MP-WEIXIN
const onRegionChange: UniHelper.RegionPickerOnChange = (ev) => {
  // 省市区(前端展示)
  form.value.fullLocation = ev.detail.value.join(' ')
  // 省市区(后端参数)
  const [provinceCode, cityCode, countyCode] = ev.detail.code!
  Object.assign(form.value, { provinceCode, cityCode, countyCode })
}
// #endif

// #ifdef H5 || APP-PLUS
const onCityChange: UniHelper.UniDataPickerOnChange = (ev) => {
  // 省市区(后端参数)
  const [provinceCode, cityCode, countyCode] = ev.detail.value.map((item) => item.value)
  Object.assign(form.value, { provinceCode, cityCode, countyCode })
}
// #endif

// 收集是否默认收货地址
const onSwitchChange: UniHelper.SwitchOnChange = (ev) => {
  form.value.isDefault = ev.detail.value ? 1 : 0
}

// 定义校验规则
const rules: UniHelper.UniFormsRules = {
  receiver: {
    rules: [
      {
        required: true,
        errorMessage: '请填写收货人姓名',
      },
    ],
  },
  contact: {
    rules: [
      {
        required: true,
        errorMessage: '请填写收货人手机号码',
      },
      {
        pattern: /^1[3-9]\d{9}$/,
        errorMessage: '请输入正确的手机号码',
      },
    ],
  },
  countyCode: {
    rules: [
      {
        required: true,
        errorMessage: '请选择所在地区',
      },
    ],
  },
  address: {
    rules: [
      {
        required: true,
        errorMessage: '请填写详细地址',
      },
    ],
  },
  // contact: {
  //   required: true,
  //   errorMessage: '请填写收货人手机号码',
  // },
  // fullLocation: {
  //   required: true,
  //   errorMessage: '请选择所在地区',
  // },
  // provinceCode: {
  //   required: true,
  //   errorMessage: '请选择所在地区',
  // },
}

// 表单组件实例
const formRef = ref<UniHelper.UniFormsInstance>()

// 提交表单
const onSubmit = async () => {
  try {
    // 表单校验
    await formRef.value?.validate?.()

    // 表单验证通过后
    if (query.id) {
      // 修改地址
      await putMemberAddressByIdAPI(query.id, form.value)
    } else {
      // 新增地址
      await postMemberAddressAPI(form.value)
    }

    uni.showToast({
      title: query.id ? '修改成功' : '保存成功',
      icon: 'success',
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 500)
  } catch (error: any) {
    uni.showToast({
      title: '请检查表单信息',
      icon: 'none',
    })
  }
}
</script>

<template>
  <view class="content">
    <uni-forms :rules="rules" :model="form" ref="formRef">
      <!-- 表单内容 -->
      <uni-forms-item class="form-item" name="receiver">
        <text class="label">收货人</text>
        <input class="input" placeholder="请填写收货人姓名" v-model="form.receiver" />
      </uni-forms-item>
      <uni-forms-item class="form-item" name="contact">
        <text class="label">手机号码</text>
        <input class="input" placeholder="请填写收货人手机号码" v-model="form.contact" />
      </uni-forms-item>
      <uni-forms-item class="form-item" name="countyCode">
        <text class="label">所在地区</text>
        <!-- picker省市区选择器，只在小程序端生效 -->
        <!-- #ifdef MP-WEIXIN -->
        <picker
          class="picker"
          mode="region"
          :value="form.fullLocation.split(' ')"
          @change="onRegionChange"
        >
          <view v-if="form.fullLocation">{{ form.fullLocation }}</view>
          <view v-else class="placeholder">请选择省/市/区(县)</view>
        </picker>
        <!-- #endif -->
        <!-- #ifdef H5 || APP-PLUS -->
        <uni-data-picker
          placeholder="请选择地址"
          popup-title="请选择城市"
          collection="opendb-city-china"
          field="code as value, name as text"
          orderby="value asc"
          :step-searh="true"
          self-field="code"
          parent-field="parent_code"
          :clear-icon="false"
          @change="onCityChange"
          v-model="form.countyCode"
        >
        </uni-data-picker>
        <!-- #endif -->
      </uni-forms-item>
      <uni-forms-item class="form-item" name="address">
        <text class="label">详细地址</text>
        <input class="input" placeholder="街道、楼牌号等信息" v-model="form.address" />
      </uni-forms-item>
      <view class="form-item">
        <text class="label">设为默认地址</text>
        <switch
          class="switch"
          color="#27ba9b"
          :checked="form.isDefault === 1"
          @change="onSwitchChange"
        />
      </view>
    </uni-forms>
  </view>
  <!-- 提交按钮 -->
  <button class="button" @tap="onSubmit">保存并使用</button>
</template>

<style lang="scss">
// 修复 uni-data-picker 样式
/* #ifdef H5 || APP-PLUS */
:deep(.selected-area) {
  height: auto;
  flex: 0 1 auto;
}
/* #endif */

page {
  background-color: #f4f4f4;
}

.content {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .form-item,
  .uni-forms-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx 40rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    margin-bottom: 0;

    // 调整 uni-forms 样式
    .uni-forms-item__content {
      display: flex;
    }

    .uni-forms-item__error {
      margin-left: 200rpx;
    }

    &:last-child {
      border: none;
    }

    .label {
      width: 200rpx;
      color: #333;
      font-size: 28rpx;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .switch {
      position: absolute;
      right: -20rpx;
      transform: scale(0.8);
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }
}

.button {
  height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>
