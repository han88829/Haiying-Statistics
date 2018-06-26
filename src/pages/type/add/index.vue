<template>
    <div class="type_add">
<view class="section">
  <span class="section__title" style="margin-right:40px;">名称:</span>
  <input  @change="onChangeNum" data-key="name" placeholder="请输入类型名称"/>
</view>
<view class="section">
  <span class="section__title" style="margin-right:40px;">单价:</span>
  <input type="digit"  @change="onChangeNum" data-key="price"  placeholder="请输入类型单价"/>
</view>

 <button style="margin-top:30px" type="primary"  :loading="loading" 
       @click="submit"> 提交 </button>
    </div>
</template>

<script>
import store from "../../../store";

const moment = store.state.moment;

export default {
  data: {
    data: {
      name: "",
      price: ""
    },
    typeList: [],
    typeIndex: "",
    loading: false
  },
  methods: {
    onChangeNum: function(e) {
      this.data[e.target.dataset.key] = e.target.value;
    },
    submit: function() {
      this.loading = true;
      console.log(this.data);
      let data = this.data;
      data.user = store.state.user.nickName;
      data.session_key = store.state.user.session_key;
      if (!data.name || !data.price) {
        wx.showToast({
          title: "请输入数据",
          icon: "none",
          duration: 1000
        });
        this.loading = false;
        return;
      }

      wx.request({
        url: `${store.state.url}/api/type/add`, //仅为示例，并非真实的接口地址
        data: {
          ...data
        },
        header: {
          "content-type": "application/json" // 默认值
        },
        complete: res => {
          this.loading = false;
          if (res.data.status == 1) {
            wx.showToast({
              title: "添加成功",
              duration: 1000
            });
            wx.navigateTo({
              url: "/pages/index/main"
            });
          } else {
            wx.showToast({
              title: "添加失败",
              icon: "none",
              duration: 1000
            });
          }
        }
      });
    }
  }
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