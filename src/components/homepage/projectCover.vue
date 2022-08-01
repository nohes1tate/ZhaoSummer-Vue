<template>
  <div id="project-cover">
    <div style="margin-left: 10px;text-align: center">
      {{projectName}}
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