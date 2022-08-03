<template>
<div class="project">
  <div class="left-side-box">
    <div class="title-line" @mouseenter="showTip = true" @mouseleave="showTip = false" @click="go('/home')">
      <span>小学期项目</span>
    </div>
    <div v-show="showTip" class="tip"><div class="tip-line">切换项目、设置团队/成员/权限</div></div>
    <el-menu
        class="select-box"
        @open="handleOpen"
        @close="handleClose"
        background-color="#f3f0e1"
        text-color="#000"
        active-text-color="#6667ab">
      <el-menu-item index="1" @click="go('/project/overview')">
        <i class="el-icon-menu"></i>
        <span slot="title">项目概览</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-brush"></i>
          <span>原型设计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="3" @click="go('/project/testUML')">
        <i class="el-icon-s-marketing"></i>
        <span slot="title">UML图</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>项目文档</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">选项1</el-menu-item>
          <el-menu-item index="4-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="5" @click="go('/project')">
        <i class="el-icon-folder-add"></i>
        <span slot="title">新建</span>
      </el-menu-item>
    </el-menu>
  </div>
  <div class="right-side-box">
    <div class="top-line">
      <div class="top-left-box">
        <page-tabs :keep-alive-component-instance="keepAliveComponentInstance" />
        <div ref="keepAliveContainer">
          <keep-alive>
            <router-view :key="$route.fullPath" />
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import PageTabs from "@/components/projectpage/PageTabs";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "project",
  components: {
    PageTabs
  },
  mounted() {
    if (this.$refs.keepAliveContainer) {
      this.keepAliveComponentInstance = this.$refs.keepAliveContainer.childNodes[0].__vue__;
    }
  },
  data() {
    return {
      keepAliveComponentInstance: null,
      showTip: false,
    }
  },
  methods: {
    go(path) {
      if (path !== this.$route.fullPath) {
        this.$router.push(path);
      }
    },
    handleClose() {
      console.log('close')
    },
    handleOpen() {
      console.log('open')
    }
  },
  created() {
    if (this.$vnode) {
      this.$vnode.parent.componentInstance.cache = {}
    }
  }
}
</script>

<style scoped>
.project{
  width: 100%;
  height: 105vh;
  background-color: #faf4e8;
  display: flex;
  position: absolute;
}
.left-side-box{
  position: relative;
  width: 35vh;
  height: 105vh;
  //border: solid 5px lightcoral;
  background-color: #f3f0e1;
  text-align: left;
  border-right: solid 1px lightgrey;
}
.title-line{
  //border: solid 1px lightskyblue;
  width: 300px;
  height: 50px;
  display: flex;
  position: relative;
  top:15px;
}
.title-line span{
  margin-top: 10px;
  margin-left: 20px;
  font-weight: 800;
  font-size: 25px;
  transition: background-color .2s,color .2s;
}
.title-line span:hover{
  color: deepskyblue;
  cursor: pointer;
}
.select-box{
  position: relative;
  top:20px;
}
.project-view-line span{
  margin-top: 3px;
  margin-left: 3px;
  //font-weight: 550;
}
.project-view-line img{
  width: 22px;
  height: 22px;
  margin-left: 5px;
  margin-top: 2px;
}
.right-side-box{
  //border:solid 5px blueviolet;
  height: 105vh;
  width: 100%;
  text-align: center;
}
.top-line{
  position: relative;
  //border:solid 5px blue;
  width: 100%;
  height: 5%;
  display: flex;
  //top: 10px;
  margin-bottom: 5px;
  background-color: #f3f0e1;
}
.top-card i{
  margin-top: 80px;
}
.tip{
  position: fixed;
  width: 230px;
  height: 30px;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  background-color: #faf4e8;
//border: solid 2px lightpink;
  border-radius: 5px;
  z-index: 2;
  top:70px;
  left: 5px;
  box-shadow: 0px 5px 15px 2px grey;
}
.tip::before,.tip::after{
  content: '';
  display: block;
  border-width: 6px;
  position: absolute;
  top: -10px;
  left: 70px;
  height: 5px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 10px solid #faf4e8;
}
.tip-line{
  color: grey;
  margin-top: 5px;
}
</style>
