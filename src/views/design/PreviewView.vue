<template>
  <div class="preview">
    <topology preview="true" :data="data" />
    <div class="tools" v-if="showTools">
      <button @click="onBack" class="go-back"><a-icon type="left" style="font-size: 15px;font-weight:bold;"/> 返回</button>
      <div></div>
      <button  class="to-design" @click="onDesign">编辑</button>
      <button class="fit-screen" @click="onSizeWindow"><a-icon type="border" />适合窗口大小</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Topology from '@/assets/topology-vue';
Vue.use(Topology);
export default {
  name: 'PreviewView',
  props: {
    content: {
      type: String,
      default: ''
    },
    axureID:{
      type:String,
      default: ''
    },
    isPage:{
      type:Boolean,
      default:null
    }
  },
  data() {
    return {
      data: {},
      locked: 0,
      showTools: true,
      projectID:'',
    };
  },
  created() {
    //获取存储数据
    this.data = JSON.parse(this.content);
    this.showTools = true;
    this.projectID=this.$route.params.projectID
  },
  watch: {
    content(newVal){
      this.data = JSON.parse(newVal)
    }
  },
  methods: {
    onDesign(){
      if(this.isPage)
      {
        let path ='/UML/' + this.projectID
        this.$router.push(path);
      }
      else
      {
        let path ='/design/' + this.projectID
        this.$router.push(path);
      }
    },
    onSizeWindow() {
      window.topology.fitView(16);
    },

    onSizeOri() {
      window.topology.open(this.data.data);
    },

    onBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.preview {
  position: relative;
  height: 93vh;

  margin-left: 30vh;

  margin-top: -93vh;

  .tools {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 40px;
    display: flex;
    & > div {
      flex-grow: 1;
    }
    background-color: white;
    button {
      margin: 12px 16px 12px;
    }
  }
}
.go-back{
  box-sizing: border-box;
  border: 0;
  outline: 0;
  cursor: pointer;
  border-radius: 4px;
  color: #fff;
  background-color: #a259ff;
  height: 28px;
  width: 60px;
  line-height: 10px;
  transition: 0.3s;
  font-size: 15px;
  position: relative;
  top:-7px;
}
.go-back:hover{
  background-color: #e76bec;
}
.fit-screen{
  box-sizing: border-box;
  border: 0;
  outline: 0;
  cursor: pointer;
  border-radius: 4px;
  color: #fff;
  background-color: #a259ff;
  height: 28px;
  width: 120px;
  line-height: 10px;
  transition: 0.3s;
  font-size: 15px;
  position: relative;
  top:-7px;
}
.fit-screen:hover{
  background-color: #e76bec;
}
.to-design{
  box-sizing: border-box;
  border: 0;
  outline: 0;
  cursor: pointer;
  border-radius: 4px;
  color: #fff;
  background-color: #a259ff;
  height: 28px;
  width: 60px;
  line-height: 10px;
  transition: 0.3s;
  font-size: 15px;
  position: relative;
  top:-7px;
}
.to-design:hover{
  background-color: #e76bec;
}
</style>
