<template>
  <div class="project-header">
    <div class="project-header-nav">
      <a :class="{'active':navActive,'not-active':navNotActive }">

      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "projectVersion2",
  data(){
    return{
      navActive:false,
      navNotActive:true
    }
  }
}
</script>

<style scoped>
.project-header{
  position: relative;
  z-index: 101;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  height: 50px;
  color: #eef0f4;
  background: #283142;
  line-height: 50px;
}
.project-header-nav{
  z-index: 1;
  display: flex;
  justify-content: center;
  background: #283142;
  flex-wrap: wrap;
}
</style>
