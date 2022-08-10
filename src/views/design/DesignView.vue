<template>
  <div style="display: flex">
    <div class="axure-leftnav">
      <el-menu
          mode="vertical"
          default-active="0"
          style="width: 30vh;height: 100vh"
      >
        <div v-for="(item,index1) in axureList" v-bind:key="index1+''">
          <el-menu-item :index="index1+''" @click="changeAxure(item.id,item.content)">
            <i class="el-icon-document"></i>
            {{ item.name }}
          </el-menu-item>
        </div>
        <el-menu-item index="newAxure" @click="newAxureDialogVisible = true"><i class="el-icon-plus"></i>新建页面</el-menu-item>
      </el-menu>
      <el-dialog title="新建页面" :visible.sync="newAxureDialogVisible">
        <div style="width: 100%; text-align: left">
          <el-input v-model="newAxureName" placeholder="页面名称" style="width: 30vh;margin-left: 5vh"></el-input>
        </div>

        <div class="axure-dialog-title">请选择画板尺寸</div>
        <div class="create-app-select-content">
          <div class="rp-type">
            <div :class="{'type-icon': true, 'color-active': newAxureType===1}" @click="chooseType(1)">
              <div :class="{'img-phone':newAxureType!==1, 'img-phone-active':newAxureType===1, 'sprite-img':true, 'background-image':true}"></div>
            </div>
            <div class="type-name">{{ phoneType }}</div>
            <el-dropdown style="margin-top: 10px" @command="selectPhone" placement="bottom">
              <span class="el-dropdown-link">
                {{ phoneWidth }}x{{ phoneHeight }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">iPhone 13 Pro Max (428 x 926)</el-dropdown-item>
                <el-dropdown-item command="2">iPhone 13 / 13 Pro (390 x 844)</el-dropdown-item>
                <el-dropdown-item command="3">Huawei P40 (360 x 780)</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="rp-type">
            <div :class="{'type-icon': true, 'color-active': newAxureType===2}" @click="chooseType(2)">
              <div :class="{'img-pad':newAxureType!==2, 'img-pad-active':newAxureType===2, 'sprite-img':true, 'background-image':true}"></div>
            </div>
            <div class="type-name">{{ padType }}</div>
            <el-dropdown style="margin-top: 10px" @command="selectPad" placement="bottom">
              <span class="el-dropdown-link">
                {{ padWidth }}x{{ padHeight }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">iPad Pro 12.9'' (1024 x 1366)</el-dropdown-item>
                <el-dropdown-item command="2">iPad (768 x 1024)</el-dropdown-item>
                <el-dropdown-item command="3">iPad Pro 11'' (834 x 1194)</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="rp-type">
            <div :class="{'type-icon': true, 'color-active': newAxureType===3}" @click="chooseType(3)">
              <div :class="{'img-web':newAxureType!==3, 'img-web-active':newAxureType===3, 'sprite-img':true, 'background-image':true}"></div>
            </div>
            <div class="type-name">{{ webType }}</div>
            <el-dropdown style="margin-top: 10px" @command="selectWeb" placement="bottom">
              <span class="el-dropdown-link">
                {{ webWidth }}x{{ webHeight }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">Web 1920 (1920 x 1080)</el-dropdown-item>
                <el-dropdown-item command="2">Web 1440 (1440 x 900)</el-dropdown-item>
                <el-dropdown-item command="3">Web 1024 (1024 x 768)</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="rp-type">
            <div :class="{'type-icon': true, 'color-active': newAxureType===4}" @click="chooseType(4)">
              <div :class="{'img-custom':newAxureType!==4, 'img-custom-active':newAxureType===4, 'sprite-img':true, 'background-image':true}"></div>
            </div>
            <div class="type-name">自定义页面大小</div>
            <div style="margin-top: 10px">
              <span style="color: #969798;">宽</span>
              <input class="input" type="number">
              <span style="color: #969798;">高</span>
              <input class="input">
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="newAxureDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="newAxure" style="margin-left: 5vh;">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div style="width: auto">
      <DesignTool :axurecontent="curAxure" :axureid="curAxureID" @axureChange="handleAxureChange"></DesignTool>
    </div>
  </div>
</template>

<script>
import DesignTool from "@/components/InlineAxure/DesignTool";
export default {
  name: "DesignView",
  components: {
    DesignTool
  },
  // props: {
  //   list: {
  //     type: Array,
  //     // eslint-disable-next-line vue/require-valid-default-prop
  //     default: []
  //   }
  // },
  data() {
    return {
      projectID:'',
      curAxure: '{"pens":[{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"atlassian.x","tags":[],"visible":true,"rect":{"x":87,"y":23,"width":100,"height":100,"center":{"x":137,"y":73},"ex":187,"ey":123},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"65d339cb","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":87,"y":98,"width":100,"height":25,"center":{"x":137,"y":110.5},"ex":187,"ey":123},"fullTextRect":{"x":87,"y":23,"width":100,"height":100,"center":{"x":137,"y":73},"ex":187,"ey":123},"iconRect":{"x":87,"y":23,"width":100,"height":75,"center":{"x":137,"y":60.5},"ex":187,"ey":98},"fullIconRect":{"x":87,"y":23,"width":100,"height":100,"center":{"x":137,"y":73},"ex":187,"ey":123},"fontColor":"#222222","fontFamily":"\\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Helvetica Neue\\", Helvetica, Arial","fontSize":12,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","tmp":null,"whiteSpace":"","evs":{"x":550,"y":138}},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"atlassian.x","tags":[],"visible":true,"rect":{"x":392,"y":23,"width":100,"height":100,"center":{"x":442,"y":73},"ex":492,"ey":123},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"aa8414a","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":392,"y":98,"width":100,"height":25,"center":{"x":442,"y":110.5},"ex":492,"ey":123},"fullTextRect":{"x":392,"y":23,"width":100,"height":100,"center":{"x":442,"y":73},"ex":492,"ey":123},"iconRect":{"x":392,"y":23,"width":100,"height":75,"center":{"x":442,"y":60.5},"ex":492,"ey":98},"fullIconRect":{"x":392,"y":23,"width":100,"height":100,"center":{"x":442,"y":73},"ex":492,"ey":123},"fontColor":"#222222","fontFamily":"\\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Helvetica Neue\\", Helvetica, Arial","fontSize":12,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","tmp":null,"whiteSpace":"","evs":{"x":854,"y":157}}],"lineName":"curve","fromArrow":"","toArrow":"triangleSolid","scale":1,"locked":0,"x":0,"y":0,"websocket":"","mqttUrl":"","mqttOptions":{"clientId":"c719732"}}',
      curAxureID: '1',
      axureList: [],
      newAxureName: '',
      phoneWidth: 428,
      phoneHeight: 926,
      padWidth: 1024,
      padHeight: 1366,
      webWidth: 1920,
      webHeight: 1080,
      phoneType: 'iPhone 13 Pro Max',
      padType: "iPad Pro 12.9''",
      webType: 'Web 1920',
      newAxureDialogVisible: false,
      newAxureType: {default: 0},
      customWidth: 0,
      customHeight: 0,
    }
  },
  mounted() {
    this.projectID=this.$route.params.projectID
    this.getAxureInfo();
    let tmp =
      {
        "pens": [
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "square",
            "tags": [],
            "visible": true,
            "rect": {
              "x": 100,
              "y": 100,
              "width": 640.0000000000001,
              "height": 480.00000000000006,
              "center": {
                "x": 340.00000000000006,
                "y": 260
              },
              "ex": 580.0000000000001,
              "ey": 420.00000000000006
            },
            "fontStyle": "normal",
            "fontWeight": "normal",
            "textBackground": "",
            "textDecoration": "",
            "textDecorationDash": 0,
            "textDecorationColor": "",
            "events": [],
            "dash": 0,
            "lineDashOffset": 0,
            "lineWidth": 0.40000000000000036,
            "strokeStyle": "#FFFFFFFF",
            "fillStyle": "#FFFFFFFF",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "400c6ac7",
            "zRotate": 0,
            "borderRadius": 0,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 4.000000000000003,
            "paddingBottom": 4.000000000000003,
            "paddingLeft": 4.000000000000003,
            "paddingRight": 4.000000000000003,
            "children": [],
            "text": "",
            "iconColor": "#2f54eb",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 4.000000000000003,
            "paddingRightNum": 4.000000000000003,
            "paddingTopNum": 4.000000000000003,
            "paddingBottomNum": 4.000000000000003,
            "textRect": {
              "x": 104,
              "y": 338.00000000000006,
              "width": 472.0000000000001,
              "height": 78.00000000000001,
              "center": {
                "x": 340.00000000000006,
                "y": 377.00000000000006
              },
              "ex": 576.0000000000001,
              "ey": 416.00000000000006
            },
            "fullTextRect": {
              "x": 104,
              "y": 104,
              "width": 472.0000000000001,
              "height": 312.00000000000006,
              "center": {
                "x": 340.00000000000006,
                "y": 260
              },
              "ex": 576.0000000000001,
              "ey": 416.00000000000006
            },
            "iconRect": {
              "x": 104,
              "y": 104,
              "width": 472.0000000000001,
              "height": 232.00000000000006,
              "center": {
                "x": 340.00000000000006,
                "y": 220.00000000000003
              },
              "ex": 576.0000000000001,
              "ey": 336.00000000000006
            },
            "fullIconRect": {
              "x": 104,
              "y": 104,
              "width": 472.0000000000001,
              "height": 312.00000000000006,
              "center": {
                "x": 340.00000000000006,
                "y": 260
              },
              "ex": 576.0000000000001,
              "ey": 416.00000000000006
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 4.800000000000006,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "whiteSpace": "",
            "evs": {
              "x": 862,
              "y": 271
            },
            "oldRect": {
              "x": 250.45555284288184,
              "y": 72.44444444444444,
              "width": 600.0000000000001,
              "height": 400.00000000000006,
              "center": {
                "x": 550.4555528428818,
                "y": 272.44444444444446
              },
              "ex": 850.455552842882,
              "ey": 472.4444444444445
            },
            "z": 0,
            "iconSize": 0,
            "locked": true
          }
        ],
        "lineName": "curve",
        "fromArrow": "",
        "toArrow": "triangleSolid",
        "scale": 0.4,
        "locked": 0,
        "x": 0,
        "y": 0,
        "websocket": "",
        "mqttUrl": "",
        "mqttOptions": {
          "clientId": "c719732"
        },
        "grid": true,
        "gridColor": "#00000033",
        "rule": true,
        "dbIndex": 60
      }
    tmp.pens[0].rect.width=1800*0.4
    tmp.pens[0].rect.height=1080*0.4
    window.topology.open(tmp)
  },

  methods: {
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
              this.axureList=res.data.axure_list;
              this.reloadkey=!this.reloadkey;
            }
          })
    },
    handleAxureChange(content,axureID){
      //console.log('gotchange')
      let index = null
     // console.log(axureID)
      for(index=0; index<this.axureList.length; index++){
        if(this.axureList[index].id === axureID){
          //console.log('nani')
          this.axureList[index].content=content
         // console.log('axureID ',index,' ischange')
        }
      }
    },
    selectPhone(index) {
      switch (index) {
        case '1':
          this.phoneType = 'iPhone 13 Pro Max';
          this.phoneWidth = 428;
          this.phoneHeight = 926;
          break;
        case '2':
          this.phoneType = 'iPhone 13 / 13 Pro';
          this.phoneWidth = 390;
          this.phoneHeight = 844;
          break;
        case '3':
          this.phoneType = 'Huawei P40';
          this.phoneWidth = 360;
          this.phoneHeight = 780;
          break;
      }
    },
    selectPad(index) {
      switch (index) {
        case '1':
          this.padType = "iPad Pro 12.9''";
          this.padWidth = 1024;
          this.padHeight = 1366;
          break;
        case '2':
          this.padType = 'iPad';
          this.padWidth = 768;
          this.padHeight = 1024;
          break;
        case '3':
          this.padType = "iPad Pro 11''";
          this.padWidth = 834;
          this.padHeight = 1194;
          break;
      }
    },
    selectWeb(index) {
      switch (index) {
        case '1':
          this.webType = "Web 1920";
          this.webWidth = 1920;
          this.webHeight = 1080;
          break;
        case '2':
          this.webType = 'Web 1440';
          this.webWidth = 1440;
          this.webHeight = 900;
          break;
        case '3':
          this.webType = "Web1024";
          this.webWidth = 1024;
          this.webHeight = 768;
          break;
      }
    },
    changeAxure(axureID,content){
      this.curAxure=content,
          this.curAxureID=axureID
    },
    newAxure() {
      this.newAxureDialogVisible = false;
      const projectForm = new FormData();
      projectForm.append("userID", this.curGroupID);
      projectForm.append("projectID", this.curUsername);
      projectForm.append("authorization", localStorage.getItem('authorization'));
      this.$axios({
        method: 'post',
        url: 'ProjectManager/axureCreate/',
        data: projectForm,
      })
          .then(res => {
            console.log(res)
            switch (res.data.error) {
              case 0:
                this.curProjectList = res.data.project_list;
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    chooseType(index) {
      this.newAxureType = index;
    }
  }
}
</script>

<style scoped>
.axure-leftnav {
  border-right: solid 1px #e6e6e6;
}

.input {
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  border-bottom-color: #969798;
  width: 40px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #969798;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.type-name {
  margin-top: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
}

.axure-dialog-title {
  color: #2e2f30;
  width: 100%;
  margin-top: 40px;
  text-align: center;
  font-size: 14px;
}

.create-app-select-content {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  height: 214px;
}

.rp-type {
  min-width: 152px;
  flex: 1;
}

.type-icon :hover {
  background-color: #ebedee;
}

.color-active {
  background-color: #ebedee;
}

.type-icon {
  position: relative;
  margin: 0 auto;
  width: 112px;
  height: 112px;
  border-radius: 4px;
  cursor: pointer;
}

.img-phone {
  background-position: -3px 112px;
}

.img-phone-active {
  background-position: 342px 112px;
}

.img-pad {
  background-position: 572px 115px;
}

.img-pad-active {
  background-position: 227px 115px;
}

.img-web-active {
  background-position: -2px 0;
}

.img-web {
  background-position: 343px 0;
}

.img-custom {
  background-position: 231px 4px;
}

.img-custom-active {
  background-position: 116px 4px;
}

.sprite-img {
  background-size: 460px 230px;
  width: 112px;
  height: 112px;
  transition: transform;
  transition-duration: 0.25s;
  transition-timing-function: ease-in;
}

.background-image {
  background-image: url("/src/assets/images/rp-icon.png");
}
.axure-butbar {
  display: flex;
}

.el-menu-item {
  text-align: left;
}

.baricon {
  width: 30px;
  height: 25px;
  text-align: center;
}
.baricon:hover {
  background-color: #ccc;
}
</style>
