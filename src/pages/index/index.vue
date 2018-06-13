<template>
<div class="root">
  <div class="content"> 
    <home :data="list" :onChange='this.onChangeDate' v-if="type"></home>
    <type :data="getType" :onChange='this.onChangeDate' v-if="!type"></type>
  </div>
  <div class="footer" > 
     <div v-bind:class="{select:type}" v-on:click="onChangetype(true)">列表</div>
     <div v-bind:class="{select:!type}" v-on:click="onChangetype(false)">分类</div>
  </div>
</div>
</template>

<script>
import home from "@/components/home";
import type from "@/components/type";
import store from "../../store";

export default {
  data() {
    return {
      motto: "Hello World",
      userInfo: {},
      code: "",
      type: true,
      list: [],
      typeData: [],
      homeFilter: {
        year: "",
        month: "",
        user: ""
      }
    };
  },

  components: {
    home,
    type
  },

  methods: {
    onChangetype(type) {
      this.type = type;
    },
    getList: (date = {}) => {
      wx.request({
        url: `${store.state.url}/api/list/list`, //仅为示例，并非真实的接口地址
        data: {
          session_key: store.state.user.session_key,
          ...date
        },
        header: {
          "content-type": "application/json" // 默认值
        },
        complete: res => {
          this.list = res.data.data || [];
        }
      });
    },
    getType: () => {
      wx.request({
        url: `${store.state.url}/api/type/list`, //仅为示例，并非真实的接口地址
        data: {
          ...store.state.user
        },
        header: {
          "content-type": "application/json" // 默认值
        },
        complete: res => {
          this.typeData = res.data.data || [];
        }
      });
    },
    onChangeDate: function(e) {
      this.homeFilter.year = store.state.moment(e.target.value).format("YYYY");
      this.homeFilter.month = store.state.moment(e.target.value).format("MM");
      this.getList(this.homeFilter);
    }
  },

  onShow() {
    this.getList();
    this.getType();
  }
};
</script>

<style scoped>
.root {
  height: 100vh;
  width: 100vw;
  background: #fff;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  border-top: 1px solid #dcdcdc;
}
* {
  margin: 0;
  padding: 0;
}
.content {
  flex: 1;
  width: 100vw;
}
.footer {
  height: 45px;
  width: 100vw;
  background: #fff;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid #dcdcdc;
}
.footer > div {
  flex: 1;
  height: 45px;
  line-height: 45px;
  text-align: center;
}
.select {
  color: #108ee9;
}
</style>
