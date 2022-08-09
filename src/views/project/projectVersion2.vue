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
      <DocumentView :list="documentList" v-show="showDocumentEdit"></DocumentView>
      <DesignView :list="axureList" v-show="showAxureEdit"></DesignView>
    </div>
  </div>
</template>

<script>
import DocumentView from "@/views/documentEdit/DocumentView";
import DesignView from "@/views/design/DesignView";

export default {
  name: "projectVersion2",
  components: { DocumentView, DesignView},
  data() {
    return {
      projectName:'小学期项目',
      curUsername:'',
      curUserID:0,
      projectID:0,
      showDocumentEdit:true,
      showAxureEdit: false,
      showUMLEdit: false,
      navLeftActive: true,
      navLeftNotActive: false,
      navCenterActive: false,
      navCenterNotActive: true,
      navRightActive: false,
      navRightNotActive: true,
      axureList: [{axureid: '1',
        title: '页面1',
        content: '{"pens":[{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"atlassian.x","tags":[],"visible":true,"rect":{"x":87,"y":23,"width":100,"height":100,"center":{"x":137,"y":73},"ex":187,"ey":123},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"65d339cb","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":87,"y":98,"width":100,"height":25,"center":{"x":137,"y":110.5},"ex":187,"ey":123},"fullTextRect":{"x":87,"y":23,"width":100,"height":100,"center":{"x":137,"y":73},"ex":187,"ey":123},"iconRect":{"x":87,"y":23,"width":100,"height":75,"center":{"x":137,"y":60.5},"ex":187,"ey":98},"fullIconRect":{"x":87,"y":23,"width":100,"height":100,"center":{"x":137,"y":73},"ex":187,"ey":123},"fontColor":"#222222","fontFamily":"\\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Helvetica Neue\\", Helvetica, Arial","fontSize":12,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","tmp":null,"whiteSpace":"","evs":{"x":550,"y":138}},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"atlassian.x","tags":[],"visible":true,"rect":{"x":392,"y":23,"width":100,"height":100,"center":{"x":442,"y":73},"ex":492,"ey":123},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"aa8414a","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":392,"y":98,"width":100,"height":25,"center":{"x":442,"y":110.5},"ex":492,"ey":123},"fullTextRect":{"x":392,"y":23,"width":100,"height":100,"center":{"x":442,"y":73},"ex":492,"ey":123},"iconRect":{"x":392,"y":23,"width":100,"height":75,"center":{"x":442,"y":60.5},"ex":492,"ey":98},"fullIconRect":{"x":392,"y":23,"width":100,"height":100,"center":{"x":442,"y":73},"ex":492,"ey":123},"fontColor":"#222222","fontFamily":"\\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Helvetica Neue\\", Helvetica, Arial","fontSize":12,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","tmp":null,"whiteSpace":"","evs":{"x":854,"y":157}}],"lineName":"curve","fromArrow":"","toArrow":"triangleSolid","scale":1,"locked":0,"x":0,"y":0,"websocket":"","mqttUrl":"","mqttOptions":{"clientId":"c719732"}}',
      },
        {axureid: '2',
          title: '页面2',
          content: '{"pens":[{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"atlassian.check","tags":[],"visible":true,"rect":{"x":114,"y":82,"width":100,"height":75,"center":{"x":164,"y":119.5},"ex":214,"ey":157},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"60254f6","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":114,"y":138.25,"width":100,"height":18.75,"center":{"x":164,"y":147.625},"ex":214,"ey":157},"fullTextRect":{"x":114,"y":82,"width":100,"height":75,"center":{"x":164,"y":119.5},"ex":214,"ey":157},"iconRect":{"x":114,"y":82,"width":100,"height":56.25,"center":{"x":164,"y":110.125},"ex":214,"ey":138.25},"fullIconRect":{"x":114,"y":82,"width":100,"height":75,"center":{"x":164,"y":119.5},"ex":214,"ey":157},"fontColor":"#222222","fontFamily":"\\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Helvetica Neue\\", Helvetica, Arial","fontSize":12,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","tmp":null,"whiteSpace":"","evs":{"x":624,"y":185}},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"atlassian.check","tags":[],"visible":true,"rect":{"x":343,"y":213,"width":100,"height":75,"center":{"x":393,"y":250.5},"ex":443,"ey":288},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"66a3a3","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":343,"y":269.25,"width":100,"height":18.75,"center":{"x":393,"y":278.625},"ex":443,"ey":288},"fullTextRect":{"x":343,"y":213,"width":100,"height":75,"center":{"x":393,"y":250.5},"ex":443,"ey":288},"iconRect":{"x":343,"y":213,"width":100,"height":56.25,"center":{"x":393,"y":241.125},"ex":443,"ey":269.25},"fullIconRect":{"x":343,"y":213,"width":100,"height":75,"center":{"x":393,"y":250.5},"ex":443,"ey":288},"fontColor":"#222222","fontFamily":"\\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Helvetica Neue\\", Helvetica, Arial","fontSize":12,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","tmp":null,"whiteSpace":"","evs":{"x":810,"y":336}}],"lineName":"curve","fromArrow":"","toArrow":"triangleSolid","scale":1,"locked":0,"x":0,"y":0,"websocket":"","mqttUrl":"","mqttOptions":{"clientId":"c719732"}}',
        }],
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
    this.getProjectInfo()
  },
  methods: {
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
      this.showDocumentEdit = true
      this.showAxureEdit = false
      this.showUMLEdit = false
      this.navLeftActive = true
      this.navLeftNotActive = false
      this.navCenterActive = false
      this.navCenterNotActive = true
      this.navRightActive = false
      this.navRightNotActive = true
    },
    handleNavCenter() {
      this.showDocumentEdit=false
      this.showAxureEdit = true
      this.showUMLEdit = false
      this.navLeftActive = false
      this.navLeftNotActive = true
      this.navCenterActive = true
      this.navCenterNotActive = false
      this.navRightActive = false
      this.navRightNotActive = true
    },
    handleNavRight() {
      this.showDocumentEdit=false
      this.showAxureEdit = false
      this.showUMLEdit = true
      this.navLeftActive = false
      this.navLeftNotActive = true
      this.navCenterActive = false
      this.navCenterNotActive = true
      this.navRightActive = true
      this.navRightNotActive = false
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
  z-index: 1;
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
  z-index: 1;
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
  animation: underline-moving linear 0.1s 1;
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
