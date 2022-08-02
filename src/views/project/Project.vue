<template>
<div class="project">
  <div class="left-side-box">
    <div class="title-line">
      <span>小学期项目</span>
    </div>
    <el-menu
        class="select-box"
        @open="handleOpen"
        @close="handleClose"
        background-color="#f3f0e1"
        text-color="#000"
        active-text-color="#6667ab">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">项目概览</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-brush"></i>
          <span>原型设计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-marketing"></i>
          <span>UML图</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>项目文档</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="5">
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
      <div class="top-right-box">

      </div>
    </div>
    <div class="create-box">
      <div class="box-card" @mouseenter="showTip1 = true" @mouseleave="showTip1 = false" @click="go('/project/testPage')">
        <div class="top-card">
          <i class="el-icon-edit"></i>
        </div>
        <div class="bottom-card"><div class="text-line">新建页面</div></div>
      </div>
      <div v-show="showTip1" class="tip1"><div class="tip-line">创建页面并进行设计</div></div>
      <div class="box-card" @mouseenter="showTip2 = true" @mouseleave="showTip2 = false" @click="go('/project/testUML')">
        <div class="top-card">
          <i class="el-icon-set-up"></i>
        </div>
        <div class="bottom-card"><div class="text-line">绘制UML图</div></div>
      </div>
      <div v-show="showTip2" class="tip2"><div class="tip-line">创建新的UML图</div></div>
      <div class="box-card" @mouseenter="showTip3 = true" @mouseleave="showTip3 = false" @click="go('/project/testDocument')">
        <div class="top-card">
          <i class="el-icon-document-add"></i>
        </div>
        <div class="bottom-card"><div class="text-line">新建文档</div></div>
      </div>
      <div v-show="showTip3" class="tip3"><div class="tip-line">为项目新建文档</div></div>
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
      showTip1: false,
      showTip2: false,
      showTip3: false,
    }
  },
  methods: {
    go(path) {
      if (path !== this.$route.fullPath) {
        this.$router.push(path);
      }
    },
  },
}
</script>

<style scoped>
.project{
  width: 100%;
  height: 100%;
  background-color: #faf4e8;
  display: flex;
  position: absolute;
}
.left-side-box{
  position: relative;
  width: 300px;
  height: 100%;
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
  height: 100%;
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
}
.create-box{
  //border: solid 3px rosybrown;
  width:80%;
  height: 60%;
  margin-top: 120px;
  display: flex;
  text-align: center;
  margin-left: 120px;
}
.box-card{
  width: 300px;
  height: 360px;
  margin-top:50px;
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  cursor: pointer;
  z-index: 1;
}
.box-card:hover{
  border: solid 2px deepskyblue;
}
.top-card{
  width: 100%;
  height: 300px;
//border: solid 1px lightpink;
  background-color: #f4f0e1;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.bottom-card{
  width: 100%;
  height: 60px;
//border: solid 1px lightpink;
  background-color: #f1ecda;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.text-line{
//border: solid 2px lightpink;
  margin-top: 20px;
  color: grey;
}
.top-card i{
  margin-top: 80px;
}
.el-icon-edit,.el-icon-set-up,.el-icon-document-add{
  font-size: 150px;
  color: deepskyblue;
}
.tip1{
  position: fixed;
  width: 200px;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  background-color: #f4f0e1;
//border: solid 2px lightpink;
  border-radius: 5px;
  z-index: 2;
  top:130px;
  left: 500px;
  box-shadow: 0px 5px 15px 2px grey;
}
.tip1::before,.tip1::after{
  content: '';
  display: block;
  border-width: 6px;
  position: absolute;
  top: 50px;
  left: 90px;
  height: 5px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 16px solid #f4f0e1;
}
.tip-line{
  color: grey;
  margin-top: 15px;
}
.tip2{
  position: fixed;
  width: 200px;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  background-color: #f4f0e1;
//border: solid 2px lightpink;
  border-radius: 5px;
  z-index: 2;
  top:130px;
  left: 830px;
  box-shadow: 0px 5px 15px 2px grey;
}
.tip2::before,.tip2::after{
  content: '';
  display: block;
  border-width: 6px;
  position: absolute;
  top: 50px;
  left: 90px;
  height: 5px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 16px solid #f4f0e1;
}
.tip3{
  position: fixed;
  width: 200px;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  background-color: #f4f0e1;
//border: solid 2px lightpink;
  border-radius: 5px;
  z-index: 2;
  top:130px;
  left: 1150px;
  box-shadow: 0px 5px 15px 2px grey;
}
.tip3::before,.tip3::after{
  content: '';
  display: block;
  border-width: 6px;
  position: absolute;
  top: 50px;
  left: 90px;
  height: 5px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 16px solid #f4f0e1;
}
</style>
