<template>
  <div class="create-box">
    <div class="box-card" @mouseenter="showTip1 = true" @mouseleave="showTip1 = false" @click="toNewPage">
      <div class="top-card">
        <i class="el-icon-edit"></i>
      </div>
      <div class="bottom-card"><div class="text-line">新建页面</div></div>
    </div>
    <div v-show="showTip1" class="tip1"><div class="tip-line">创建页面并进行设计</div></div>
    <div class="box-card" @mouseenter="showTip2 = true" @mouseleave="showTip2 = false" @click="toDrawio()">
      <div class="top-card">
        <i class="el-icon-set-up"></i>
      </div>
      <div class="bottom-card"><div class="text-line">绘制UML图</div></div>
    </div>
    <div v-show="showTip2" class="tip2"><div class="tip-line">创建新的UML图</div></div>
    <div class="box-card" @mouseenter="showTip3 = true" @mouseleave="showTip3 = false" @click="toNewDocument">
      <div class="top-card">
        <i class="el-icon-document-add"></i>
      </div>
      <div class="bottom-card"><div class="text-line">新建文档</div></div>
    </div>
    <div v-show="showTip3" class="tip3"><div class="tip-line">为项目新建文档</div></div>
  </div>
</template>

<script>
export default {
  name: "CreateBox",
  data() {
    return{
      showTip1: false,
      showTip2: false,
      showTip3: false,
    }
  },
  methods: {
    mounted()
    {
      //console.log(this.$route.params.projectID)
    },
    toDrawio(){
      window.open('https://app.diagrams.net/');
      this.showTip1=false;
      this.showTip2=false;
      this.showTip3=false;
    },
    backToNew(){
      this.projectID=this.$route.params.projectID;
      let path ='/project/'+this.projectID;
      if (path !== this.$route.fullPath) {
        this.$router.push(path);
      }
      this.showTip1=false;
      this.showTip2=false;
      this.showTip3=false;
    },
    toNewPage(){
      this.projectID=this.$route.params.projectID;
      let path ='/project/'+this.projectID+'/axure/0';
      if (path !== this.$route.fullPath) {
        this.$router.push(path);
      }
      this.showTip1=false;
      this.showTip2=false;
      this.showTip3=false;
    },
    toNewDocument(){
      const self = this
      const data = new FormData
      data.append('userID',localStorage.getItem('userID'))
      console.log(localStorage.getItem('userID'))
      data.append('projectID',this.$route.params.projectID)
      console.log(this.$route.params.projectID)
      data.append('username',localStorage.getItem('username'))
      console.log(localStorage.getItem('username'))
      data.append('authorization',localStorage.getItem('authorization'))
      console.log(localStorage.getItem('authorization'))
      this.$prompt('文档名称','创建文档',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{3,20}$/,
        inputErrorMessage: '文档名在3~20字之间'
      }).then(({ value }) => {
        data.append('title',value)
        self.$axios({
          method: 'post',
          url: 'DocsEdit/createDocument/',
          data: data
        })
        .then(res => {
          console.log(res)
          if(res.data.error !==0) {
            this.$message.error(res.data.msg)
          }
          else {
            console.log('111')
          }
        })
      }).catch(() => {
      });


      }
  },
}
</script>

<style scoped>
.create-box{
  //border: solid 3px rosybrown;
  width:80%;
  height: 60%;
  margin-top: 17vh;
  display: flex;
  text-align: center;
  margin-left: 17vh;
}
.box-card{
  width: 43vh;
  height: 50vh;
  margin-top:5vh;
  margin-left: 8vh;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  cursor: pointer;
  z-index: 1;
}
.box-card:hover{
  border: solid 2px #00c3ee;
}
.top-card{
  width: 100%;
  height: 40vh;
  background-color: #f4f0e1;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.bottom-card{
  width: 100%;
  height: 10vh;
  background-color: #f1ecda;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.text-line{
  margin-top: 20px;
  color: dimgrey;
  font-size: 20px;
}
.top-card i{
  margin-top: 80px;
}
.el-icon-edit,.el-icon-set-up,.el-icon-document-add{
  font-size: 150px;
  color: deepskyblue;
}
.tip1{
  position: absolute;
  width: 200px;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  background-color: #f1f1f1;
//border: solid 2px lightpink;
  border-radius: 5px;
  z-index: 2;
  top:16vh;
  left: 30vh;
  box-shadow: 0 5px 15px 2px grey;
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
  border-top: 16px solid #f1f1f1;
}
.tip-line{
  color: grey;
  margin-top: 15px;
}
.tip2{
  position: absolute;
  width: 200px;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  background-color: #f1f1f1;
//border: solid 2px lightpink;
  border-radius: 5px;
  z-index: 2;
  top:16vh;
  left: 75vh;
  box-shadow: 0 5px 15px 2px grey;
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
  border-top: 16px solid #f1f1f1;
}
.tip3{
  position: absolute;
  width: 200px;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  background-color: #f1f1f1;
//border: solid 2px lightpink;
  border-radius: 5px;
  z-index: 2;
  top:16vh;
  left: 121vh;
  box-shadow: 0 5px 15px 2px grey;
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
  border-top: 16px solid #f1f1f1;
}
</style>
