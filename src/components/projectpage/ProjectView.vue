<template>
<div class="project-overview">
  <div class="top-box">
    <div class="top-box-line">
      <span>项目统计</span>
    </div>
    <div class="top-box-under">

    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "ProjectView"
}
</script>

<style scoped>
.project-overview{
  //border: solid 2px lightgrey;
  width: 177vh;
  height: 95vh;
}
.top-box{
  border: solid 1px #d4d1bf;
  width: 170vh;
  height: 20vh;
  margin-top:20px;
  margin-left: 20px;
  border-radius: 10px;
}
.top-box-line{
  text-align: left;
  //border: solid 1px grey;
  margin-top: 20px ;
  margin-left: 15px;
}
.top-box-line span{
  font-size: 18px;
  color: dimgrey;
}
.top-box-under{
  border: solid 1px blue;
  margin-top: 20px;
  margin-left: 15px;
}
</style>

