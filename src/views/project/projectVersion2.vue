<template>
  <div class="project-header">
    <div class="project-header-left">
      <i class="el-icon-arrow-left left-arrow" @click="toHome"></i>
      <div class="project-header-name">
        {{this.projectName}}
      </div>
    </div>
    <div class="project-header-nav">
      <a  @click="handleNavLeft">
        <div :class="{'active':navLeftActive,'not-active':navLeftNotActive }" >文档</div>
      </a>
      <a  @click="handleNavCenter">
        <div :class="{'active':navCenterActive,'not-active':navCenterNotActive }" >原型稿</div>
      </a>
      <a @click="handleNavRight">
        <div :class="{'active':navRightActive,'not-active':navRightNotActive }" >设计稿</div>
      </a>
    </div>
    <div class="show-box">
      <DocumentView :list="documentList" v-show="showDocumentEdit" :project="projectID+''" :type="'0'" :content="'请选择文档'"></DocumentView>
      <div class="prototype" v-show="showPrototype || showUMLEdit">
        <PreviewListView :list="this.previewList" :key="reloadkey" @updateAxureList="getAxureInfo"></PreviewListView>
      </div>
    </div>
  </div>
</template>

<script>
import DocumentView from "@/views/documentEdit/DocumentView";
import PreviewListView from "@/views/preview/PreviewListView";

export default {
  name: "projectVersion2",
  components: { DocumentView,PreviewListView},
  data() {
    return {
      previewList:[],
      reloadkey:false,
      axureList:[],
      umlList:[],
      projectName:'小学期项目',
      curUsername:'',
      curUserID:0,
      projectID:0,
      showPrototype:false,
      showDocumentEdit:true,
      showUMLEdit:false,
      navLeftActive: true,
      navLeftNotActive: false,
      navCenterActive: false,
      navCenterNotActive: true,
      navRightActive: false,
      navRightNotActive: true,
      documentList: [{
        isSub: false,
        title: '团队文档1',
        content: '<p>文档1的内容</p>',
        childDoc: []
      },
        {
          isSub: false,
          title: '团队文档2',
          content: '<p>content2</p>',
          childDoc: []
        },
        {
          isSub: true,
          title: '项目1',
          content: '',
          childDoc: [{title: '项目1文档', content: '<p>content3</p>'}, {title: '项目1文档', content: '<p>content4</p>'}]
        }]
    }
  },
  mounted() {
    this.projectID = this.$route.params.projectID;
    this.curUsername = localStorage.getItem('username');
    this.curUserID = localStorage.getItem('userID');
    this.showDocumentEdit=true
    this.getProjectInfo()
    this.getAxureInfo()
  },
  methods: {
    getUMLInfo(){
      let data = new FormData()

      data.append('projectID',this.projectID)
      data.append('username',localStorage.getItem('username'))
      data.append('authorization',localStorage.getItem('authorization'))

      this.$axios({
        method: 'post',
        url: 'ProjectManager/viewUMLList/',
        data: data
      })
          .then(res=>{
            if(res.data.error === 0){
              console.log(res.data.uml_list)
              this.umlList=res.data.uml_list;
              this.reloadkey=!this.reloadkey;
            }
          })
    },
    getAxureInfo(){
      let data = new FormData()

      data.append('projectID',this.projectID)
      data.append('username',localStorage.getItem('username'))
      data.append('authorization',localStorage.getItem('authorization'))

      this.$axios({
        method: 'post',
        url: 'ProjectManager/viewAxureList/',
        data: data
      })
          .then(res=>{
            if(res.data.error === 0){
              console.log(res.data.axure_list)
              this.axureList=res.data.axure_list;
              this.reloadkey=!this.reloadkey;
            }
          })
    },
    getProjectInfo(){
      const formData = new FormData();
      formData.append('projectID', this.projectID);
      formData.append('authorization', localStorage.getItem('authorization'));
      formData.append('username',localStorage.getItem('username'));
      this.$axios({
        method: 'post',
        url: 'ProjectManager/projectView/',
        data: formData,
      })
          .then(res => {
            console.log(res.data)
            this.projectName=res.data.projectName;
          })
          .catch(err => {
            console.log(err);
          })
    },
    toHome(){
      let path='/home'
      this.$router.push(path);
    },
    handleNavLeft() {
      this.showUMLEdit=false
      this.showPrototype=false
      this.showDocumentEdit=true
      this.navLeftActive = true
      this.navLeftNotActive = false
      this.navCenterActive = false
      this.navCenterNotActive = true
      this.navRightActive = false
      this.navRightNotActive = true
    },
    handleNavCenter() {
      this.showUMLEdit=false
      this.showPrototype=true
      this.showDocumentEdit=false
      this.navLeftActive = false
      this.navLeftNotActive = true
      this.navCenterActive = true
      this.navCenterNotActive = false
      this.navRightActive = false
      this.navRightNotActive = true
      this.previewList=this.axureList
      this.reloadkey=!this.reloadkey
      // console.log('111')
      // console.log(this.axureList)
      // console.log(this.previewList)
    },
    handleNavRight() {
      this.showUMLEdit=true
      this.showPrototype=false
      this.showDocumentEdit=false
      this.navLeftActive = false
      this.navLeftNotActive = true
      this.navCenterActive = false
      this.navCenterNotActive = true
      this.navRightActive = true
      this.navRightNotActive = false
      this.previewList=this.umlList
      this.reloadkey=!this.reloadkey
      // console.log('222')
      // console.log(this.umlList)
      // console.log(this.umlList)
    },
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
  height: 7vh;
  color: #eef0f4;
  background: #283142;
  line-height: 50px;
}
.project-header-left{
  display: flex;
  justify-content: center;
  background: #283142;
  flex-wrap: wrap;
  position: absolute;
  margin-left: 20px;
  height: 50px;
  transform: translateX(-50%);
  width: 55vh;
}
.project-header-nav{
  display: flex;
  justify-content: center;
  background: #283142;
  flex-wrap: wrap;
  position: absolute;
  left: 50%;
  height: 50px;
  transform: translateX(-50%);
}
.active{
  font-size: 1.4rem;
  font-weight: 520;
  color: #eef0f4;
  height: 100%;
  text-decoration: none;
  cursor: pointer;
  box-sizing: content-box;
  margin-left: 2.5vh;
  margin-right: 2.5vh;
  position: relative;
}
.active:before{
  content: "";
  width: 100%;
  border-bottom: 4px solid #a259ff;
  position: absolute;
  bottom: 0;
  animation: underline-moving linear 0.25s 1;
}
@keyframes underline-moving {
  0%{left: 50%;width: 0}
  100%{left: 0%;width: 100%}
}
.not-active{
  font-size: 1.1rem;
  height: 100%;
  text-align: center;
  text-decoration: none;
  color: rgba(234,235,235,.5);
  cursor: pointer;
  box-sizing: content-box;
  margin-left: 2.5vh;
  margin-right: 2.5vh;
}
.show-box{
  margin-top: 7vh;
  width: 100%;
  height: 100%;
}
.left-arrow{
  line-height: 50px;
  font-size: 15px;
  font-weight: 1000;
  position: relative;
  margin-left: 10vh;
  cursor: pointer;
}
.left-arrow:hover{
  color: #e76bec;
}
.project-header-name{
  position: relative;
  font-size: 14px;
  left: 2vh;
}
</style>
