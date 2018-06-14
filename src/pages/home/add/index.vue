<template>
    <div class="type_add">
<view class="section">
   <picker mode="selector"  style="width:80%" @change="ontypeChange" range-key="name"  :value="typeIndex" :range="typeList">
    <view class="picker">
      当前选择：{{typeList[typeIndex]?typeList[typeIndex].name:"请选择类型"}}
    </view>
  </picker>
</view>
<view class="section">
  <span class="section__title" style="margin-right:40px;">单价:</span>
  <input type="digit"  @change="onChangeNum" data-key="price" placeholder="请输入类型单价"/>
</view>
<view class="section">
  <span class="section__title" style="margin-right:40px;">数量:</span>
  <input type="digit"  @change="onChangeNum" data-key="num"  placeholder="请输入类型单价"/>
</view>
<view class="section" style="border-bottom:1px solid #dcdcdc;">
 <picker mode="date" style="width:80%"    @change="onChangedate">
    <view class="picker">
   <span class="section__title" style="margin-right:40px;">时间:</span>{{data.year?(data.year+'年' +data.month+'月'):"请选择时间"}}
    </view>
  </picker>
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
      typeName: "",
      typeId: "",
      price: "",
      year: "",
      month: "",
      num: "",
      user: "",
      fee: "",
      img: ""
    },
    typeList: [],
    typeIndex: "",
    loading: false
  },
  methods: {
    gettype: function() {
      wx.request({
        url: `${store.state.url}/api/type/list`, //仅为示例，并非真实的接口地址
        data: {
          session_key: store.state.user.session_key
        },
        header: {
          "content-type": "application/json" // 默认值
        },
        complete: res => {
          this.typeList = res.data.data || [];
          console.log(this.typeList);
        }
      });
    },
    ontypeChange: function(e) {
      this.typeIndex = e.target.value;
      this.data.typeName = this.typeList[e.target.value].name;
      this.data.typeId = this.typeList[e.target.value]._id;
      this.data.img = this.typeList[e.target.value].img || "";
    },
    onChangedate: function(e) {
      this.data.year = moment(e.target.value).format("YYYY");
      this.data.month = moment(e.target.value).format("MM");
    },
    onChangeNum: function(e) {
      this.data[e.target.dataset.key] = e.target.value;
      this.data.fee = (
        Number(this.data.price || "0") * Number(this.data.num || "1")
      ).toFixed(2);
    },
    submit: function() {
      this.loading = true;
      console.log(this.data);
      let data = this.data;
      data.user = store.state.user.nickName;
      data.session_key = store.state.user.session_key;
      if (!data.year || !data.price || !data.num || !data.typeName) {
        wx.showToast({
          title: "请输入数据",
          icon: "none",
          duration: 1000
        });
        this.loading = false;
        return;
      }

      wx.request({
        url: `${store.state.url}/api/list/add`, //仅为示例，并非真实的接口地址
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
  },
  onShow() {
    this.gettype();
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