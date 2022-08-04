<template>
<div class="project-overview">
  <div class="top-box">
    <div class="top-box-line">
      <span>项目统计</span>
    </div>
    <div class="top-box-under">
      <div class="info-box-first">
        <div class="info-box-top">{{ this.pageNum }}</div>
        <div class="info-box-under">页面数</div>
      </div>
      <div class="info-box">
        <div class="info-box-top">暂无数据</div>
        <div class="info-box-under">UML图</div>
      </div>
      <div class="info-box">
        <div class="info-box-top">{{ this.docNum }}</div>
        <div class="info-box-under">文档数</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "ProjectView",
  data(){
    return{
      projectID:0,
      doc_list:[],
      page_list:[],
      docNum:0,
      pageNum:0,
    }
  },
  mounted() {
    //con
    this.projectID=this.$route.params.projectID;
    const requestForm1 = new FormData();
    requestForm1.append("projectID",this.projectID);
    this.$axios({
      method: 'post',
      url: 'DocsEdit/viewDocList/',
      data: requestForm1
    })
        .then(res=>{
          this.doc_list=JSON.parse(res.data.docID);
        })
    this.docNum=this.doc_list.length;

    this.$axios({
      method: 'post',
      url: 'ProjectManager/viewAxureList/',
      data: requestForm1
    })
        .then(res=>{
          this.page_list=res.data.axure_list;
        })
    this.pageNum=this.page_list.length;
  }
}
</script>

<style scoped>
.project-overview{
  //border: solid 2px lightgrey;
  width: 170vh;
  height: 90vh;
}
.top-box{
  border: solid 1px grey;
  width: 90vh;
  height: 20vh;
  margin-top:20px;
  margin-left: 45vh;
  border-radius: 10px;
}
.top-box-line{
  text-align: left;
  //border: solid 1px grey;
  margin-top: 20px ;
  margin-left: 15px;
}
.top-box-line span{
  font-size: 20px;
  color: black;
}
.top-box-under{
  //border: solid 1px blue;
  margin-top: 20px;
  margin-left: 15px;
  display: flex;
  text-align: center;
  align-items: center;
}
.info-box{
  display: flex;
  flex-direction: column;
//border: solid 1px rosybrown;
  text-align: left;
  margin-left: 30vh;
}
.info-box-first{
  display: flex;
  flex-direction: column;
  //border: solid 1px rosybrown;
  text-align: left;
}
.info-box-top{
  font-size: 25px;
}
.info-box-under{
  color: #8c8c8c;
}
</style>

