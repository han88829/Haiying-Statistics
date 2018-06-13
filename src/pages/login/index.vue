<template>
    <div class="login">
         <button open-type="getUserInfo" @click='getUserInfo()'>微信一键登录</button>
    </div>
</template>

<script>
import store from "../../store";
export default {
  data: {
    userInfo: {},
    code: ""
  },
  methods: {
    getUserInfo() {
      // 调用登录接口
      wx.login({
        success: res => {
          this.code = res.code || "";
          wx.getUserInfo({
            complete: res => {
              if (res.userInfo) {
                this.userInfo = res.userInfo;
                wx.request({
                  url: `${store.state.url}/api/login`, //仅为示例，并非真实的接口地址
                  data: {
                    code: this.code,
                    ...res.userInfo
                  },
                  header: {
                    "content-type": "application/json" // 默认值
                  },
                  complete: res => {
                    if (res.data.status == 1) {
                      wx.setStorageSync("user", res.data.data);
                      wx.navigateTo({
                        url: "/pages/index/main"
                      });
                    }
                  }
                });
              } else {
                wx.showToast({
                  title: "登录失败",
                  icon: "fail",
                  duration: 1000
                });
              }
            }
          });
        }
      });
    }
  },
  created() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
  }
};
</script>

<style scoped>
.login {
  margin-top: 50%;
  width: 96%;
  margin-left: 2%;
}
</style>