<template>
  <div class="preview">
    <topology preview="true" :data="data" />
    <div class="tools" v-if="showTools">
      <a-button type="primary" @click="onBack">
        <a-icon type="left" /> 返回
      </a-button>
      <div></div>
      <a-button type="primary" style="margin-right: 0" @click="onSizeWindow">
        <a-icon type="border" />
        适合窗口大小
      </a-button>
      <a-button type="primary" @click="onSizeOri">
        <a-icon type="fullscreen-exit" />
        实际大小
      </a-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Topology from 'topology-vue';
Vue.use(Topology);
export default {
  name: 'TempPreview',
  data() {
    return {
      data: {},
      locked: 0,
      showTools: true,
    };
  },
  created() {
    //获取存储数据
    const data = sessionStorage.getItem('topologyData');
    if(data){
      this.data = JSON.parse(data);
    }else{
      //
    }
    this.showTools = !!this.$route.query.r;
  },
  methods: {
    onSizeWindow() {
      window.topology.fitView(16);
    },
    onSizeOri() {
      window.topology.open(this.data.data);
    },
    onBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.preview {
  position: relative;
  height: 100vh;
  .tools {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    display: flex;
    & > div {
      flex-grow: 1;
    }
    button {
      margin: 12px 16px;
    }
  }
}
</style>
