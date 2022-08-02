<template>
  <div id="project-cover">
    <div style="margin-left: 10px; margin-top: 15px; width: 450px">
      {{projectName}}
    </div>
    <div style="float: right; margin-top: 16px">
      <el-popover
          placement="bottom"
          width="100"
          trigger="hover">
        <ul>重命名</ul>
        <ul>删除项目</ul>
        <i class="el-icon-more" slot="reference"></i>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: "projectCover",
  data(){
    return{
    }
  },
  props:{
    projectName:{default:'项目名称'}
  },
}
</script>

<style>
#project-cover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 20px;
  width: 500px;
  height: 50px;
  display: flex;
  flex-direction: row;
  text-align: left;
  cursor: pointer;
}
#project-cover:hover {
  border: solid 2px deepskyblue;
}
</style>