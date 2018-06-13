<template>
<div class="root">
  <div class="content"> 
      {{code}}
  </div>
  <div class="footer" > 
     <div v-bind:class="{select:type}" v-on:click="onChangetype(true)">列表</div>
     <div v-bind:class="{select:!type}" v-on:click="onChangetype(false)">分类</div>
  </div>
</div>
</template>

<script>
import card from "@/components/card";

export default {
  data() {
    return {
      motto: "Hello World",
      userInfo: {},
      code: "",
      type: true
    };
  },

  components: {
    card
  },

  methods: {
    onChangetype(type) {
      this.type = type;
    },
  },

  created() {
    
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
}
* {
  margin: 0;
  padding: 0;
}
.content {
  flex: 1;
  width: 100vw;
  background: yellow;
}
.footer {
  height: 45px;
  width: 100vw;
  background: #fff;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  align-items: center;
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
