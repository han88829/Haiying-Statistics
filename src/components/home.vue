<template>
  <div class="home">
      <div class='home_title'>
        <view class="section">
          <picker mode="date" @change="onChange">
            <view class="picker">
              {{obj.year+'年' +obj.month+'月'}}
            </view>
          </picker>
          <view>
            {{obj.user}}
          </view>
          <a href="/pages/home/add/main">新增</a>
        </view>
      </div>
      <div class='home_content' v-for="(item,index) in data" :key="index">
        <div class="home_content_title">
          <img src="https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erLujLByemCGhib6rqGW9fIDIvZrzYeOZc2aqHsMib4LQZzCFibJjiaD5FWqdPfIthrcE6Cj8oe6KUp1Q/132" alt="" style="height:50px;width:50px;margin-top:5px;">
          <div style='flex:1'>
          <div class="home_content_flex">
            <span style="flex:1"> 价格： {{item.price}}</span>
            <span style="flex:2">名称： {{item.typeName}}</span>
          </div>
            <div class="home_content_flex">
            <!-- <span style="flex:1"> {{item.month}}</span>
                 <span style="flex:1"> {{item.user}}</span> -->
            <span style="flex:1">数量： {{item.num}}</span>
              <span style="flex:2">总费用： {{item.fee}}</span>
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
  props: ["data", "onChange", "obj"]
};
</script>

<style scoped>
.home {
  height: 100%;
  width: 100vw;
  padding-bottom: 20px;
  overflow-y: auto;
  font-size: 14px;
}

.home_title {
  height: 50px;
  border-bottom: 1px solid #dcdcdc;
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

.section {
  padding: 10px;

  display: flex;

  display: -webkit-flex;

  flex-direction: row;

  justify-content: space-between;
}
</style>