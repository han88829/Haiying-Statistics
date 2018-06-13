<template>
    <div class="home">
        <div class='home_title'>
<view class="section">
  <view class="section__title">时间选择器</view>
  <picker mode="date"   @change="onChange">
    <view class="picker">
      当前选择: 
    </view>
  </picker>
</view>
        </div>
        <div class='home_content'>   
<div class="home_content_title">  
    <img src="https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erLujLByemCGhib6rqGW9fIDIvZrzYeOZc2aqHsMib4LQZzCFibJjiaD5FWqdPfIthrcE6Cj8oe6KUp1Q/132" alt="" style="height:50px;width:50px;margin-top:5px;">
     <div style='flex:1'>
         <div class="home_content_flex">
             <span style="flex:1"> 产品名称</span>
               <span style="flex:1"> 单价</span>
                 <span style="flex:1"> 数量</span>
         </div>
           <div class="home_content_flex">
             <span style="flex:1"> 月份</span>
               <span style="flex:1"> 所属人</span>
                 <span style="flex:1"> 总价</span>
         </div>
     </div>
     
     </div>
<div class="home_content_footer">
    <div class="home_footer_btn">修改</div>
    <div class="home_footer_btn" style="color:red;background:#dcdcdc">删除</div>
</div>

        </div>
    </div>
</template>

<script>
export default {
  props: ["data",'onChange'],
  method: {
    bindTimeChange: date => {
      console.log(date);
    }
  },
  onShow() {
    this.bindTimeChange();;
  }
};
</script>

<style scoped>
.home {
  height: 100%;
  width: 100vw;
  overflow-y: auto;
}
.home_title {
  height: 50px;
  width: 100vw;
}
.home_content {
  height: 100px;
  border-bottom: 5px solid #dcdcdc;
}
.home_content_title {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  height: 60px;
  width: 100vw;
  padding: 0 10px;
}
.home_content_flex {
  height: 30px;
  line-height: 30px;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
  text-align: left;
}
.home_footer_btn {
  padding: 3px 7px;
  background: #108ee9;
  color: #fff;
  float: right;
  margin-right: 10px;
  border-radius: 4px;
  margin-top: 5px;
}
.home_content_footer {
  border-top: 1px solid #dcdcdc;
}
</style>