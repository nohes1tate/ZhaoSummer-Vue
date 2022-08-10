<template>
  <div>
    <div class="axure-leftnav">
      <el-menu
          mode="vertical"
          default-active="0"
          style="width: 30vh; height: 93vh"
      >
        <div v-for="(item,index1) in axureList" v-bind:key="index1+''">
          <el-menu-item :index="index1+''" @click="changeAxure(item.axureID,item.axureContent)">
            <i class="el-icon-document"></i>
            {{ item.axureName }}
          </el-menu-item>
        </div>
        <el-menu-item index="newAxure"><i class="el-icon-plus"></i>新建页面</el-menu-item>
      </el-menu>
    </div>
    <preview-view :content="curContent" :key="reloadkey"></preview-view>
  </div>
</template>

<script>

import PreviewView from "@/views/design/PreviewView";

export default {
  name: "PreviewListView",
  components: {
    PreviewView
  },
  props: {
    list: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      reloadkey:false,
      axureList: this.list,
      curContent: '',
    }
  },
  methods: {
    changeAxure(axureID,content) {
      this.curContent=content
      this.reloadkey=!this.reloadkey
    }
  }
}
</script>

<style scoped>
.axure-leftnav {
  border-right: solid 1px #e6e6e6;
}
.el-menu-item {
  text-align: left;
}
</style>
