<template>
    <div class="type_add">
<view class="section">
  <span class="section__title">分类名称:</span>
  <input  bindinput="bindKeyInput" placeholder="请输入类型名称"/>
</view>
<view class="section">
  <span class="section__title" style="margin-right:40px;">单价:</span>
  <input  bindinput="bindKeyInput" placeholder="请输入类型单价"/>
</view>
    </div>
</template>

<script>
export default {
  data: {
    data: {
      name: "",
      price: ""
    }
  },
  method: {}
};
</script>

<style scoped>
.type_add {
  padding: 10px;
}
.section {
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  border-top: 1px solid #dcdcdc;
}
.section__title {
  margin-right: 5px;
}
</style>