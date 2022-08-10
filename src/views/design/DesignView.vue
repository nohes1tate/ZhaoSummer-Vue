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
        <el-dialog
            width="30%"
            title="选择页面模板"
            :visible.sync="showFormDialogVisible"
            append-to-body>
          <el-input v-model="newAxureName" placeholder="页面名称" style="width: 30vh; margin-bottom: 20px"></el-input>
          <div style="margin-bottom: 20px">
            <el-radio v-model="axureFormIndex" label="1">电商</el-radio>
            <el-radio v-model="axureFormIndex" label="2">学术成果分享平台</el-radio>
          </div>
          <el-button @click="showFormDialogVisible = false" style="margin-left: 200px">取 消</el-button>
          <el-button type="primary" @click="newFormAxure" style="margin-left: 5vh;">确 定</el-button>
        </el-dialog>
        <div slot="footer" class="dialog-footer">
          <span style="cursor: pointer; margin-right: 400px; font-size: 20px" @click="showFormDialogVisible = true"><i class="el-icon-picture-outline-round">选择模板</i></span>
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
      axureFormIndex: '0',
      showFormDialogVisible: false,
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
      xueShuForm: {
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
              "x": -20.266666666668016,
              "y": -60.53333333333367,
              "width": 720.0000000000013,
              "height": 432.0000000000007,
              "center": {
                "x": 339.7333333333326,
                "y": 155.46666666666667
              },
              "ex": 699.7333333333332,
              "ey": 371.46666666666704
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
            "lineWidth": 0.40000000000000097,
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
            "paddingTop": 4.0000000000000115,
            "paddingBottom": 4.0000000000000115,
            "paddingLeft": 4.0000000000000115,
            "paddingRight": 4.0000000000000115,
            "children": [],
            "text": "",
            "iconColor": "#2f54eb",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 4.0000000000000115,
            "paddingRightNum": 4.0000000000000115,
            "paddingTopNum": 4.0000000000000115,
            "paddingBottomNum": 4.0000000000000115,
            "textRect": {
              "x": -16.266666666668005,
              "y": 261.46666666666687,
              "width": 712.0000000000013,
              "height": 106.00000000000017,
              "center": {
                "x": 339.7333333333326,
                "y": 314.4666666666669
              },
              "ex": 695.7333333333332,
              "ey": 367.46666666666704
            },
            "fullTextRect": {
              "x": -16.266666666668005,
              "y": -56.53333333333366,
              "width": 712.0000000000013,
              "height": 424.0000000000007,
              "center": {
                "x": 339.7333333333326,
                "y": 155.4666666666667
              },
              "ex": 695.7333333333332,
              "ey": 367.46666666666704
            },
            "iconRect": {
              "x": -16.266666666668005,
              "y": -56.53333333333366,
              "width": 712.0000000000013,
              "height": 316.0000000000005,
              "center": {
                "x": 339.7333333333326,
                "y": 101.4666666666666
              },
              "ex": 695.7333333333332,
              "ey": 259.46666666666687
            },
            "fullIconRect": {
              "x": -16.266666666668005,
              "y": -56.53333333333366,
              "width": 712.0000000000013,
              "height": 424.0000000000007,
              "center": {
                "x": 339.7333333333326,
                "y": 155.4666666666667
              },
              "ex": 695.7333333333332,
              "ey": 367.46666666666704
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 4.800000000000014,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "whiteSpace": "",
            "evs": {
              "x": 976,
              "y": 510
            },
            "oldRect": {
              "x": 191.93124847412014,
              "y": -80.40000000000026,
              "width": 540.0000000000009,
              "height": 324.00000000000045,
              "center": {
                "x": 461.9312484741206,
                "y": 81.59999999999997
              },
              "ex": 731.931248474121,
              "ey": 243.6000000000002
            },
            "z": 0,
            "iconSize": 0,
            "locked": true
          },
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "rectangle",
            "tags": [],
            "visible": true,
            "rect": {
              "x": -20.266666666668016,
              "y": -60.53333333333367,
              "width": 720.0000000000008,
              "height": 219.00000000000028,
              "center": {
                "x": 339.7333333333324,
                "y": 48.96666666666647
              },
              "ex": 699.7333333333328,
              "ey": 158.4666666666666
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
            "lineWidth": 0.4000000000000004,
            "strokeStyle": "#00000000",
            "fillStyle": "#2D3CC847",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "22c51ec4",
            "zRotate": 0,
            "borderRadius": 0,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 4.000000000000004,
            "paddingBottom": 4.000000000000004,
            "paddingLeft": 4.000000000000004,
            "paddingRight": 4.000000000000004,
            "children": [],
            "text": "",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 4.000000000000004,
            "paddingRightNum": 4.000000000000004,
            "paddingTopNum": 4.000000000000004,
            "paddingBottomNum": 4.000000000000004,
            "textRect": {
              "x": 194.73333333333227,
              "y": -56.533333333333665,
              "width": 501.0000000000005,
              "height": 211.00000000000028,
              "center": {
                "x": 445.23333333333255,
                "y": 48.96666666666648
              },
              "ex": 695.7333333333328,
              "ey": 154.4666666666666
            },
            "fullTextRect": {
              "x": -16.266666666668012,
              "y": -56.533333333333665,
              "width": 712.0000000000008,
              "height": 211.00000000000028,
              "center": {
                "x": 339.7333333333324,
                "y": 48.96666666666648
              },
              "ex": 695.7333333333328,
              "ey": 154.4666666666666
            },
            "iconRect": {
              "x": -16.266666666668012,
              "y": -56.533333333333665,
              "width": 211.00000000000028,
              "height": 211.00000000000028,
              "center": {
                "x": 89.23333333333213,
                "y": 48.96666666666648
              },
              "ex": 194.73333333333227,
              "ey": 154.4666666666666
            },
            "fullIconRect": {
              "x": -16.266666666668012,
              "y": -56.533333333333665,
              "width": 712.0000000000008,
              "height": 211.00000000000028,
              "center": {
                "x": 339.7333333333324,
                "y": 48.96666666666648
              },
              "ex": 695.7333333333328,
              "ey": 154.4666666666666
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 4.800000000000005,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 191.93124847412014,
              "y": -80.40000000000026,
              "width": 540.0000000000006,
              "height": 164.2500000000002,
              "center": {
                "x": 461.9312484741204,
                "y": 1.724999999999838
              },
              "ex": 731.9312484741207,
              "ey": 83.84999999999994
            },
            "z": 0,
            "iconSize": 0,
            "whiteSpace": "",
            "evs": {
              "x": 509,
              "y": 181
            },
            "locked": true
          },
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "circle",
            "tags": [],
            "visible": true,
            "rect": {
              "x": 30.558335367837458,
              "y": -52.866666666667,
              "width": 40.000000000000064,
              "height": 40.000000000000064,
              "center": {
                "x": 50.558335367837486,
                "y": -32.86666666666697
              },
              "ex": 70.55833536783751,
              "ey": -12.866666666666937
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
            "lineWidth": 0.4000000000000005,
            "strokeStyle": "#222222",
            "fillStyle": "",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 1,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "571b2fc8",
            "zRotate": 0,
            "borderRadius": 0,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 0,
            "paddingBottom": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "children": [],
            "text": "LOGO",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 0,
            "paddingRightNum": 0,
            "paddingTopNum": 0,
            "paddingBottomNum": 0,
            "textRect": {
              "x": 40.55833536783747,
              "y": -26.20000000000029,
              "width": 20.000000000000032,
              "height": 8.333333333333355,
              "center": {
                "x": 50.558335367837486,
                "y": -22.033333333333612
              },
              "ex": 60.5583353678375,
              "ey": -17.866666666666937
            },
            "fullTextRect": {
              "x": 36.27262108212318,
              "y": -47.15238095238128,
              "width": 28.571428571428616,
              "height": 28.571428571428616,
              "center": {
                "x": 50.558335367837486,
                "y": -32.86666666666697
              },
              "ex": 64.84404965355179,
              "ey": -18.580952380952663
            },
            "iconRect": {
              "x": 40.55833536783747,
              "y": -42.866666666667,
              "width": 20.000000000000032,
              "height": 20.000000000000032,
              "center": {
                "x": 50.558335367837486,
                "y": -32.86666666666699
              },
              "ex": 60.5583353678375,
              "ey": -22.86666666666697
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 8.000000000000005,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 230.04999999999922,
              "y": -74.65000000000026,
              "width": 30.000000000000043,
              "height": 30.000000000000043,
              "center": {
                "x": 245.04999999999924,
                "y": -59.65000000000024
              },
              "ex": 260.0499999999993,
              "ey": -44.65000000000022
            },
            "z": 0,
            "iconSize": 0,
            "whiteSpace": "",
            "evs": {
              "x": 558,
              "y": 191
            }
          },
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "rectangle",
            "tags": [],
            "visible": true,
            "rect": {
              "x": 177.22500203450443,
              "y": -21.53333333333363,
              "width": 297.3612419508153,
              "height": 19.50000000000006,
              "center": {
                "x": 325.9056230099121,
                "y": -11.7833333333336
              },
              "ex": 474.58624398531975,
              "ey": -2.0333333333335695
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
            "lineWidth": 0.4000000000000005,
            "strokeStyle": "#222222",
            "fillStyle": "",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "17202b20",
            "zRotate": 0,
            "borderRadius": 0.1,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 4.000000000000006,
            "paddingBottom": 4.000000000000006,
            "paddingLeft": 4.000000000000006,
            "paddingRight": 4.000000000000006,
            "children": [],
            "text": "搜索框",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 4.000000000000006,
            "paddingRightNum": 4.000000000000006,
            "paddingTopNum": 4.000000000000006,
            "paddingBottomNum": 4.000000000000006,
            "textRect": {
              "x": 192.72500203450448,
              "y": -17.533333333333623,
              "width": 277.86124195081527,
              "height": 11.500000000000046,
              "center": {
                "x": 331.6556230099121,
                "y": -11.7833333333336
              },
              "ex": 470.58624398531975,
              "ey": -6.033333333333577
            },
            "fullTextRect": {
              "x": 181.22500203450443,
              "y": -17.533333333333623,
              "width": 289.3612419508153,
              "height": 11.500000000000046,
              "center": {
                "x": 325.9056230099121,
                "y": -11.7833333333336
              },
              "ex": 470.58624398531975,
              "ey": -6.033333333333577
            },
            "iconRect": {
              "x": 181.22500203450443,
              "y": -17.533333333333623,
              "width": 11.500000000000046,
              "height": 11.500000000000046,
              "center": {
                "x": 186.97500203450446,
                "y": -11.7833333333336
              },
              "ex": 192.72500203450448,
              "ey": -6.033333333333577
            },
            "fullIconRect": {
              "x": 181.22500203450443,
              "y": -17.533333333333623,
              "width": 289.3612419508153,
              "height": 11.500000000000046,
              "center": {
                "x": 325.9056230099121,
                "y": -11.7833333333336
              },
              "ex": 470.58624398531975,
              "ey": -6.033333333333577
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 16.000000000000018,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 340.0499999999995,
              "y": -51.15000000000023,
              "width": 223.02093146311145,
              "height": 14.625000000000043,
              "center": {
                "x": 451.5604657315552,
                "y": -43.83750000000021
              },
              "ex": 563.0709314631109,
              "ey": -36.52500000000019
            },
            "z": 0,
            "iconSize": 0,
            "whiteSpace": "",
            "evs": {
              "x": 741,
              "y": 210
            }
          },
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "text",
            "tags": [],
            "visible": true,
            "rect": {
              "x": 479.66666666666663,
              "y": -54.53333333333363,
              "width": 101.33333333333339,
              "height": 27.6666666666667,
              "center": {
                "x": 530.3333333333334,
                "y": -40.70000000000028
              },
              "ex": 581,
              "ey": -26.86666666666693
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
            "lineWidth": 0.4000000000000002,
            "strokeStyle": "#222222",
            "fillStyle": "",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "21c88465",
            "zRotate": 0,
            "borderRadius": 0,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 0,
            "paddingBottom": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "children": [],
            "text": "个人/机构馆",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 0,
            "paddingRightNum": 0,
            "paddingTopNum": 0,
            "paddingBottomNum": 0,
            "textRect": {
              "x": 479.66666666666663,
              "y": -33.7833333333336,
              "width": 101.33333333333339,
              "height": 6.916666666666675,
              "center": {
                "x": 530.3333333333334,
                "y": -30.325000000000266
              },
              "ex": 581,
              "ey": -26.866666666666926
            },
            "fullTextRect": {
              "x": 479.66666666666663,
              "y": -54.53333333333363,
              "width": 101.33333333333339,
              "height": 27.6666666666667,
              "center": {
                "x": 530.3333333333334,
                "y": -40.70000000000028
              },
              "ex": 581,
              "ey": -26.86666666666693
            },
            "iconRect": {
              "x": 0,
              "y": 0,
              "width": 0,
              "height": 0,
              "center": {
                "x": 0,
                "y": 0
              },
              "ex": 0,
              "ey": 0
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 16.00000000000001,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 566.8812484741211,
              "y": -75.90000000000023,
              "width": 76.00000000000003,
              "height": 20.75000000000002,
              "center": {
                "x": 604.8812484741211,
                "y": -65.52500000000022
              },
              "ex": 642.8812484741211,
              "ey": -55.15000000000021
            },
            "z": 0,
            "iconSize": 0,
            "whiteSpace": "",
            "evs": {
              "x": 918,
              "y": 172
            }
          },
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
              "x": 607.3083312988281,
              "y": -52.866666666667,
              "width": 70.00000000000004,
              "height": 24.333333333333368,
              "center": {
                "x": 642.3083312988281,
                "y": -40.700000000000315
              },
              "ex": 677.3083312988281,
              "ey": -28.533333333333633
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
            "lineWidth": 0.4000000000000002,
            "strokeStyle": "#222222",
            "fillStyle": "",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "6bbed85",
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
            "text": "登录",
            "iconColor": "#2f54eb",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 4.000000000000003,
            "paddingRightNum": 4.000000000000003,
            "paddingTopNum": 4.000000000000003,
            "paddingBottomNum": 4.000000000000003,
            "textRect": {
              "x": 611.3083312988281,
              "y": -36.61666666666698,
              "width": 62.00000000000004,
              "height": 4.08333333333334,
              "center": {
                "x": 642.3083312988281,
                "y": -34.57500000000031
              },
              "ex": 673.3083312988281,
              "ey": -32.53333333333364
            },
            "fullTextRect": {
              "x": 611.3083312988281,
              "y": -48.866666666667,
              "width": 62.00000000000004,
              "height": 16.33333333333336,
              "center": {
                "x": 642.3083312988281,
                "y": -40.70000000000032
              },
              "ex": 673.3083312988281,
              "ey": -32.533333333333644
            },
            "iconRect": {
              "x": 611.3083312988281,
              "y": -48.866666666667,
              "width": 62.00000000000004,
              "height": 10.250000000000018,
              "center": {
                "x": 642.3083312988281,
                "y": -43.741666666666994
              },
              "ex": 673.3083312988281,
              "ey": -38.61666666666699
            },
            "fullIconRect": {
              "x": 611.3083312988281,
              "y": -48.866666666667,
              "width": 62.00000000000004,
              "height": 16.33333333333336,
              "center": {
                "x": 642.3083312988281,
                "y": -40.70000000000032
              },
              "ex": 673.3083312988281,
              "ey": -32.533333333333644
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 16.00000000000001,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 662.6124969482422,
              "y": -74.65000000000026,
              "width": 52.50000000000002,
              "height": 18.250000000000025,
              "center": {
                "x": 688.8624969482422,
                "y": -65.52500000000025
              },
              "ex": 715.1124969482422,
              "ey": -56.40000000000023
            },
            "z": 0,
            "iconSize": 0,
            "whiteSpace": "",
            "evs": {
              "x": 1136,
              "y": 208
            }
          },
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "div",
            "tags": [],
            "visible": true,
            "rect": {
              "x": 14.310547326265123,
              "y": 91.33333333333329,
              "width": 172.9144547082395,
              "height": 265.00000000000017,
              "center": {
                "x": 100.76777468038487,
                "y": 223.83333333333337
              },
              "ex": 187.22500203450463,
              "ey": 356.3333333333335
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
            "lineWidth": 0.4000000000000002,
            "strokeStyle": "#222222",
            "fillStyle": "#FFFFFFFF",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "69b107b",
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
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 4.000000000000003,
            "paddingRightNum": 4.000000000000003,
            "paddingTopNum": 4.000000000000003,
            "paddingBottomNum": 4.000000000000003,
            "textRect": {
              "x": 18.310547326265127,
              "y": 288.08333333333337,
              "width": 164.9144547082395,
              "height": 64.25000000000004,
              "center": {
                "x": 100.76777468038487,
                "y": 320.20833333333337
              },
              "ex": 183.22500203450463,
              "ey": 352.3333333333334
            },
            "fullTextRect": {
              "x": 18.310547326265127,
              "y": 95.33333333333329,
              "width": 164.9144547082395,
              "height": 257.00000000000017,
              "center": {
                "x": 100.76777468038487,
                "y": 223.83333333333337
              },
              "ex": 183.22500203450463,
              "ey": 352.3333333333335
            },
            "iconRect": {
              "x": 18.310547326265127,
              "y": 95.33333333333329,
              "width": 164.9144547082395,
              "height": 190.7500000000001,
              "center": {
                "x": 100.76777468038487,
                "y": 190.70833333333334
              },
              "ex": 183.22500203450463,
              "ey": 286.08333333333337
            },
            "fullIconRect": {
              "x": 18.310547326265127,
              "y": 95.33333333333329,
              "width": 164.9144547082395,
              "height": 257.00000000000017,
              "center": {
                "x": 100.76777468038487,
                "y": 223.83333333333337
              },
              "ex": 183.22500203450463,
              "ey": 352.3333333333335
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 4.800000000000003,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 217.86415896882,
              "y": 33.49999999999994,
              "width": 129.68584103117962,
              "height": 198.75000000000009,
              "center": {
                "x": 282.7070794844098,
                "y": 132.875
              },
              "ex": 347.5499999999996,
              "ey": 232.25000000000003
            },
            "z": 0,
            "iconSize": 0,
            "whiteSpace": "",
            "evs": {
              "x": 667,
              "y": 492
            },
            "parentId": null
          },
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "div",
            "tags": [],
            "visible": true,
            "rect": {
              "x": 223.02277546341134,
              "y": 91.33333333333329,
              "width": 239.42111573984226,
              "height": 265.00000000000017,
              "center": {
                "x": 342.73333333333244,
                "y": 223.83333333333337
              },
              "ex": 462.4438912032536,
              "ey": 356.3333333333335
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
            "lineWidth": 0.4000000000000002,
            "strokeStyle": "#222222",
            "fillStyle": "#FFFFFFFF",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "138fac60",
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
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 4.000000000000003,
            "paddingRightNum": 4.000000000000003,
            "paddingTopNum": 4.000000000000003,
            "paddingBottomNum": 4.000000000000003,
            "textRect": {
              "x": 227.02277546341134,
              "y": 288.08333333333337,
              "width": 231.42111573984226,
              "height": 64.25000000000004,
              "center": {
                "x": 342.73333333333244,
                "y": 320.20833333333337
              },
              "ex": 458.4438912032536,
              "ey": 352.3333333333334
            },
            "fullTextRect": {
              "x": 227.02277546341134,
              "y": 95.33333333333329,
              "width": 231.42111573984226,
              "height": 257.00000000000017,
              "center": {
                "x": 342.73333333333244,
                "y": 223.83333333333337
              },
              "ex": 458.4438912032536,
              "ey": 352.3333333333335
            },
            "iconRect": {
              "x": 227.02277546341134,
              "y": 95.33333333333329,
              "width": 231.42111573984226,
              "height": 190.7500000000001,
              "center": {
                "x": 342.73333333333244,
                "y": 190.70833333333334
              },
              "ex": 458.4438912032536,
              "ey": 286.08333333333337
            },
            "fullIconRect": {
              "x": 227.02277546341134,
              "y": 95.33333333333329,
              "width": 231.42111573984226,
              "height": 257.00000000000017,
              "center": {
                "x": 342.73333333333244,
                "y": 223.83333333333337
              },
              "ex": 458.4438912032536,
              "ey": 352.3333333333335
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 4.800000000000003,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 374.39833007167965,
              "y": 33.49999999999994,
              "width": 179.56583680488168,
              "height": 198.75000000000009,
              "center": {
                "x": 464.1812484741205,
                "y": 132.875
              },
              "ex": 553.9641668765613,
              "ey": 232.25000000000003
            },
            "z": 0,
            "iconSize": 0,
            "whiteSpace": "",
            "evs": {
              "x": 940,
              "y": 522
            },
            "parentId": null
          },
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "div",
            "tags": [],
            "visible": true,
            "rect": {
              "x": 504.3938765905885,
              "y": 91.33333333333329,
              "width": 172.9144547082395,
              "height": 265.00000000000017,
              "center": {
                "x": 590.8511039447083,
                "y": 223.83333333333337
              },
              "ex": 677.308331298828,
              "ey": 356.3333333333335
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
            "lineWidth": 0.4000000000000002,
            "strokeStyle": "#222222",
            "fillStyle": "#FFFFFFFF",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "9f586b2",
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
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 4.000000000000003,
            "paddingRightNum": 4.000000000000003,
            "paddingTopNum": 4.000000000000003,
            "paddingBottomNum": 4.000000000000003,
            "textRect": {
              "x": 508.3938765905885,
              "y": 288.08333333333337,
              "width": 164.9144547082395,
              "height": 64.25000000000004,
              "center": {
                "x": 590.8511039447083,
                "y": 320.20833333333337
              },
              "ex": 673.308331298828,
              "ey": 352.3333333333334
            },
            "fullTextRect": {
              "x": 508.3938765905885,
              "y": 95.33333333333329,
              "width": 164.9144547082395,
              "height": 257.00000000000017,
              "center": {
                "x": 590.8511039447083,
                "y": 223.83333333333337
              },
              "ex": 673.308331298828,
              "ey": 352.3333333333335
            },
            "iconRect": {
              "x": 508.3938765905885,
              "y": 95.33333333333329,
              "width": 164.9144547082395,
              "height": 190.7500000000001,
              "center": {
                "x": 590.8511039447083,
                "y": 190.70833333333334
              },
              "ex": 673.308331298828,
              "ey": 286.08333333333337
            },
            "fullIconRect": {
              "x": 508.3938765905885,
              "y": 95.33333333333329,
              "width": 164.9144547082395,
              "height": 257.00000000000017,
              "center": {
                "x": 590.8511039447083,
                "y": 223.83333333333337
              },
              "ex": 673.308331298828,
              "ey": 352.3333333333335
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 4.800000000000003,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 585.4266559170625,
              "y": 33.49999999999994,
              "width": 129.68584103117962,
              "height": 198.75000000000009,
              "center": {
                "x": 650.2695764326522,
                "y": 132.875
              },
              "ex": 715.1124969482421,
              "ey": 232.25000000000003
            },
            "z": 0,
            "iconSize": 0,
            "whiteSpace": "",
            "evs": {
              "x": 1167,
              "y": 469
            },
            "parentId": null
          },
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "text",
            "tags": [],
            "visible": true,
            "rect": {
              "x": 187.8663832429046,
              "y": 25.333333333333343,
              "width": 64.00000000000004,
              "height": 12.000000000000005,
              "center": {
                "x": 219.86638324290462,
                "y": 31.333333333333346
              },
              "ex": 251.86638324290465,
              "ey": 37.33333333333335
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
            "lineWidth": 0.4000000000000002,
            "strokeStyle": "#222222",
            "fillStyle": "",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "1052c382",
            "zRotate": 0,
            "borderRadius": 0,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 0,
            "paddingBottom": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "children": [],
            "text": "学术期刊",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 0,
            "paddingRightNum": 0,
            "paddingTopNum": 0,
            "paddingBottomNum": 0,
            "textRect": {
              "x": 187.8663832429046,
              "y": 34.33333333333334,
              "width": 64.00000000000004,
              "height": 3.0000000000000013,
              "center": {
                "x": 219.86638324290462,
                "y": 35.83333333333334
              },
              "ex": 251.86638324290465,
              "ey": 37.33333333333334
            },
            "fullTextRect": {
              "x": 187.8663832429046,
              "y": 25.333333333333343,
              "width": 64.00000000000004,
              "height": 12.000000000000005,
              "center": {
                "x": 219.86638324290462,
                "y": 31.333333333333346
              },
              "ex": 251.86638324290465,
              "ey": 37.33333333333335
            },
            "iconRect": {
              "x": 0,
              "y": 0,
              "width": 0,
              "height": 0,
              "center": {
                "x": 0,
                "y": 0
              },
              "ex": 0,
              "ey": 0
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 14.000000000000007,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 348.0310359062996,
              "y": -16,
              "width": 48.00000000000002,
              "height": 9.000000000000004,
              "center": {
                "x": 372.0310359062996,
                "y": -11.499999999999998
              },
              "ex": 396.0310359062996,
              "ey": -6.9999999999999964
            },
            "z": 0,
            "iconSize": 0,
            "whiteSpace": "",
            "evs": {
              "x": 676,
              "y": 307
            },
            "parentId": null
          },
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "text",
            "tags": [],
            "visible": true,
            "rect": {
              "x": 257.8916687011713,
              "y": 26.133333333333127,
              "width": 64.00000000000004,
              "height": 12.000000000000005,
              "center": {
                "x": 289.8916687011713,
                "y": 32.13333333333313
              },
              "ex": 321.89166870117134,
              "ey": 38.133333333333134
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
            "lineWidth": 0.4000000000000002,
            "strokeStyle": "#222222",
            "fillStyle": "",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "7ce54622",
            "zRotate": 0,
            "borderRadius": 0,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 0,
            "paddingBottom": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "children": [],
            "text": "学位论文",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 0,
            "paddingRightNum": 0,
            "paddingTopNum": 0,
            "paddingBottomNum": 0,
            "textRect": {
              "x": 257.8916687011713,
              "y": 35.13333333333313,
              "width": 64.00000000000004,
              "height": 3.0000000000000013,
              "center": {
                "x": 289.8916687011713,
                "y": 36.63333333333313
              },
              "ex": 321.89166870117134,
              "ey": 38.13333333333313
            },
            "fullTextRect": {
              "x": 257.8916687011713,
              "y": 26.133333333333127,
              "width": 64.00000000000004,
              "height": 12.000000000000005,
              "center": {
                "x": 289.8916687011713,
                "y": 32.13333333333313
              },
              "ex": 321.89166870117134,
              "ey": 38.133333333333134
            },
            "iconRect": {
              "x": 0,
              "y": 0,
              "width": 0,
              "height": 0,
              "center": {
                "x": 0,
                "y": 0
              },
              "ex": 0,
              "ey": 0
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 14.000000000000007,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 400.5499999999996,
              "y": -15.400000000000176,
              "width": 48.00000000000002,
              "height": 9.000000000000004,
              "center": {
                "x": 424.5499999999996,
                "y": -10.900000000000174
              },
              "ex": 448.5499999999996,
              "ey": -6.400000000000173
            },
            "z": 0,
            "iconSize": 0,
            "whiteSpace": "",
            "evs": {
              "x": 724,
              "y": 296
            },
            "parentId": null
          },
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "text",
            "tags": [],
            "visible": true,
            "rect": {
              "x": 339.73333333333255,
              "y": 26.133333333333127,
              "width": 64.00000000000004,
              "height": 12.000000000000005,
              "center": {
                "x": 371.73333333333255,
                "y": 32.13333333333313
              },
              "ex": 403.7333333333326,
              "ey": 38.133333333333134
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
            "lineWidth": 0.4000000000000002,
            "strokeStyle": "#222222",
            "fillStyle": "",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "145b94f",
            "zRotate": 0,
            "borderRadius": 0,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 0,
            "paddingBottom": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "children": [],
            "text": "会议",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 0,
            "paddingRightNum": 0,
            "paddingTopNum": 0,
            "paddingBottomNum": 0,
            "textRect": {
              "x": 339.73333333333255,
              "y": 35.13333333333313,
              "width": 64.00000000000004,
              "height": 3.0000000000000013,
              "center": {
                "x": 371.73333333333255,
                "y": 36.63333333333313
              },
              "ex": 403.7333333333326,
              "ey": 38.13333333333313
            },
            "fullTextRect": {
              "x": 339.73333333333255,
              "y": 26.133333333333127,
              "width": 64.00000000000004,
              "height": 12.000000000000005,
              "center": {
                "x": 371.73333333333255,
                "y": 32.13333333333313
              },
              "ex": 403.7333333333326,
              "ey": 38.133333333333134
            },
            "iconRect": {
              "x": 0,
              "y": 0,
              "width": 0,
              "height": 0,
              "center": {
                "x": 0,
                "y": 0
              },
              "ex": 0,
              "ey": 0
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 14.000000000000007,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 461.93124847412054,
              "y": -15.400000000000176,
              "width": 48.00000000000002,
              "height": 9.000000000000004,
              "center": {
                "x": 485.93124847412054,
                "y": -10.900000000000174
              },
              "ex": 509.93124847412054,
              "ey": -6.400000000000173
            },
            "z": 0,
            "iconSize": 0,
            "whiteSpace": "",
            "evs": {
              "x": 875,
              "y": 241
            },
            "parentId": null
          },
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "text",
            "tags": [],
            "visible": true,
            "rect": {
              "x": 409.2874989827472,
              "y": 48.9666666666665,
              "width": 64.00000000000004,
              "height": 12.000000000000005,
              "center": {
                "x": 441.2874989827472,
                "y": 54.9666666666665
              },
              "ex": 473.28749898274725,
              "ey": 60.966666666666505
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
            "lineWidth": 0.4000000000000002,
            "strokeStyle": "#222222",
            "fillStyle": "",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "52e95ec",
            "zRotate": 0,
            "borderRadius": 0,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 0,
            "paddingBottom": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "children": [],
            "text": "成果",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 0,
            "paddingRightNum": 0,
            "paddingTopNum": 0,
            "paddingBottomNum": 0,
            "textRect": {
              "x": 409.2874989827472,
              "y": 57.9666666666665,
              "width": 64.00000000000004,
              "height": 3.0000000000000013,
              "center": {
                "x": 441.2874989827472,
                "y": 59.4666666666665
              },
              "ex": 473.28749898274725,
              "ey": 60.9666666666665
            },
            "fullTextRect": {
              "x": 409.2874989827472,
              "y": 48.9666666666665,
              "width": 64.00000000000004,
              "height": 12.000000000000005,
              "center": {
                "x": 441.2874989827472,
                "y": 54.9666666666665
              },
              "ex": 473.28749898274725,
              "ey": 60.966666666666505
            },
            "iconRect": {
              "x": 0,
              "y": 0,
              "width": 0,
              "height": 0,
              "center": {
                "x": 0,
                "y": 0
              },
              "ex": 0,
              "ey": 0
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 14.000000000000007,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 514.0968727111815,
              "y": 1.7249999999998522,
              "width": 48.00000000000002,
              "height": 9.000000000000004,
              "center": {
                "x": 538.0968727111815,
                "y": 6.224999999999854
              },
              "ex": 562.0968727111815,
              "ey": 10.724999999999856
            },
            "z": 0,
            "iconSize": 0,
            "whiteSpace": "",
            "evs": {
              "x": 903,
              "y": 329
            },
            "parentId": null
          },
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "text",
            "tags": [],
            "visible": true,
            "rect": {
              "x": 187.8663832429046,
              "y": 48.9666666666665,
              "width": 64.00000000000004,
              "height": 12.000000000000005,
              "center": {
                "x": 219.86638324290462,
                "y": 54.9666666666665
              },
              "ex": 251.86638324290465,
              "ey": 60.966666666666505
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
            "lineWidth": 0.4000000000000002,
            "strokeStyle": "#222222",
            "fillStyle": "",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "04376a6",
            "zRotate": 0,
            "borderRadius": 0,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 0,
            "paddingBottom": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "children": [],
            "text": "年鉴",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 0,
            "paddingRightNum": 0,
            "paddingTopNum": 0,
            "paddingBottomNum": 0,
            "textRect": {
              "x": 187.8663832429046,
              "y": 57.9666666666665,
              "width": 64.00000000000004,
              "height": 3.0000000000000013,
              "center": {
                "x": 219.86638324290462,
                "y": 59.4666666666665
              },
              "ex": 251.86638324290465,
              "ey": 60.9666666666665
            },
            "fullTextRect": {
              "x": 187.8663832429046,
              "y": 48.9666666666665,
              "width": 64.00000000000004,
              "height": 12.000000000000005,
              "center": {
                "x": 219.86638324290462,
                "y": 54.9666666666665
              },
              "ex": 251.86638324290465,
              "ey": 60.966666666666505
            },
            "iconRect": {
              "x": 0,
              "y": 0,
              "width": 0,
              "height": 0,
              "center": {
                "x": 0,
                "y": 0
              },
              "ex": 0,
              "ey": 0
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 14.000000000000007,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 348.0310359062996,
              "y": 1.7249999999998522,
              "width": 48.00000000000002,
              "height": 9.000000000000004,
              "center": {
                "x": 372.0310359062996,
                "y": 6.224999999999854
              },
              "ex": 396.0310359062996,
              "ey": 10.724999999999856
            },
            "z": 0,
            "iconSize": 0,
            "whiteSpace": "",
            "evs": {
              "x": 678,
              "y": 312
            },
            "parentId": null
          },
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "text",
            "tags": [],
            "visible": true,
            "rect": {
              "x": 261.9056230099121,
              "y": 48.9666666666665,
              "width": 64.00000000000004,
              "height": 12.000000000000005,
              "center": {
                "x": 293.9056230099121,
                "y": 54.9666666666665
              },
              "ex": 325.9056230099122,
              "ey": 60.966666666666505
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
            "lineWidth": 0.4000000000000002,
            "strokeStyle": "#222222",
            "fillStyle": "",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "232d3cbf",
            "zRotate": 0,
            "borderRadius": 0,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 0,
            "paddingBottom": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "children": [],
            "text": "专利",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 0,
            "paddingRightNum": 0,
            "paddingTopNum": 0,
            "paddingBottomNum": 0,
            "textRect": {
              "x": 261.9056230099121,
              "y": 57.9666666666665,
              "width": 64.00000000000004,
              "height": 3.0000000000000013,
              "center": {
                "x": 293.9056230099121,
                "y": 59.4666666666665
              },
              "ex": 325.9056230099122,
              "ey": 60.9666666666665
            },
            "fullTextRect": {
              "x": 261.9056230099121,
              "y": 48.9666666666665,
              "width": 64.00000000000004,
              "height": 12.000000000000005,
              "center": {
                "x": 293.9056230099121,
                "y": 54.9666666666665
              },
              "ex": 325.9056230099122,
              "ey": 60.966666666666505
            },
            "iconRect": {
              "x": 0,
              "y": 0,
              "width": 0,
              "height": 0,
              "center": {
                "x": 0,
                "y": 0
              },
              "ex": 0,
              "ey": 0
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 14.000000000000007,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 403.56046573155527,
              "y": 1.7249999999998522,
              "width": 48.00000000000002,
              "height": 9.000000000000004,
              "center": {
                "x": 427.56046573155527,
                "y": 6.224999999999854
              },
              "ex": 451.56046573155527,
              "ey": 10.724999999999856
            },
            "z": 0,
            "iconSize": 0,
            "whiteSpace": "",
            "evs": {
              "x": 732,
              "y": 317
            },
            "parentId": null
          },
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "text",
            "tags": [],
            "visible": true,
            "rect": {
              "x": 339.73333333333255,
              "y": 48.9666666666665,
              "width": 64.00000000000004,
              "height": 12.000000000000005,
              "center": {
                "x": 371.73333333333255,
                "y": 54.9666666666665
              },
              "ex": 403.7333333333326,
              "ey": 60.966666666666505
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
            "lineWidth": 0.4000000000000002,
            "strokeStyle": "#222222",
            "fillStyle": "",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "c3753e4",
            "zRotate": 0,
            "borderRadius": 0,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 0,
            "paddingBottom": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "children": [],
            "text": "标准",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 0,
            "paddingRightNum": 0,
            "paddingTopNum": 0,
            "paddingBottomNum": 0,
            "textRect": {
              "x": 339.73333333333255,
              "y": 57.9666666666665,
              "width": 64.00000000000004,
              "height": 3.0000000000000013,
              "center": {
                "x": 371.73333333333255,
                "y": 59.4666666666665
              },
              "ex": 403.7333333333326,
              "ey": 60.9666666666665
            },
            "fullTextRect": {
              "x": 339.73333333333255,
              "y": 48.9666666666665,
              "width": 64.00000000000004,
              "height": 12.000000000000005,
              "center": {
                "x": 371.73333333333255,
                "y": 54.9666666666665
              },
              "ex": 403.7333333333326,
              "ey": 60.966666666666505
            },
            "iconRect": {
              "x": 0,
              "y": 0,
              "width": 0,
              "height": 0,
              "center": {
                "x": 0,
                "y": 0
              },
              "ex": 0,
              "ey": 0
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 14.000000000000007,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 461.93124847412054,
              "y": 1.7249999999998522,
              "width": 48.00000000000002,
              "height": 9.000000000000004,
              "center": {
                "x": 485.93124847412054,
                "y": 6.224999999999854
              },
              "ex": 509.93124847412054,
              "ey": 10.724999999999856
            },
            "z": 0,
            "iconSize": 0,
            "whiteSpace": "",
            "evs": {
              "x": 858,
              "y": 319
            },
            "parentId": null
          },
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "text",
            "tags": [],
            "visible": true,
            "rect": {
              "x": 409.2874989827472,
              "y": 24.333333333333258,
              "width": 57.55221195842708,
              "height": 17.96666666666648,
              "center": {
                "x": 438.0636049619607,
                "y": 33.3166666666665
              },
              "ex": 466.8397109411743,
              "ey": 42.29999999999974
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
            "lineWidth": 0.4000000000000002,
            "strokeStyle": "#222222",
            "fillStyle": "",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "36fba69c",
            "zRotate": 0,
            "borderRadius": 0,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 0,
            "paddingBottom": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "children": [],
            "text": "报纸",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 0,
            "paddingRightNum": 0,
            "paddingTopNum": 0,
            "paddingBottomNum": 0,
            "textRect": {
              "x": 409.2874989827472,
              "y": 37.80833333333312,
              "width": 57.55221195842708,
              "height": 4.49166666666662,
              "center": {
                "x": 438.0636049619607,
                "y": 40.054166666666426
              },
              "ex": 466.8397109411743,
              "ey": 42.299999999999734
            },
            "fullTextRect": {
              "x": 409.2874989827472,
              "y": 24.333333333333258,
              "width": 57.55221195842708,
              "height": 17.96666666666648,
              "center": {
                "x": 438.0636049619607,
                "y": 33.3166666666665
              },
              "ex": 466.8397109411743,
              "ey": 42.29999999999974
            },
            "iconRect": {
              "x": 0,
              "y": 0,
              "width": 0,
              "height": 0,
              "center": {
                "x": 0,
                "y": 0
              },
              "ex": 0,
              "ey": 0
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 14.000000000000007,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 514.0968727111815,
              "y": -16.75000000000007,
              "width": 43.1641589688203,
              "height": 13.474999999999858,
              "center": {
                "x": 535.6789521955917,
                "y": -10.012500000000141
              },
              "ex": 557.2610316800018,
              "ey": -3.2750000000002135
            },
            "z": 0,
            "iconSize": 0,
            "whiteSpace": "",
            "evs": {
              "x": 896,
              "y": 251
            },
            "parentId": null
          },
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "line",
            "tags": [],
            "visible": true,
            "rect": {
              "x": 23.953742810779772,
              "y": 116.21666666666675,
              "width": 153.62806373920998,
              "height": 78.49999999999993,
              "center": {
                "x": 100.76777468038476,
                "y": 155.46666666666673
              },
              "ex": 177.58180654998975,
              "ey": 194.7166666666667
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
            "lineWidth": 0.4000000000000002,
            "strokeStyle": "#2222225C",
            "fillStyle": "",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "3cb2e0f1",
            "zRotate": 0,
            "borderRadius": 0,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 0,
            "paddingBottom": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "children": [],
            "text": "",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 0,
            "paddingRightNum": 0,
            "paddingTopNum": 0,
            "paddingBottomNum": 0,
            "fullTextRect": {
              "x": 33.95374281077977,
              "y": 135.46666666666673,
              "width": 133.62806373920998,
              "height": 20,
              "center": {
                "x": 100.76777468038476,
                "y": 145.46666666666673
              },
              "ex": 167.58180654998975,
              "ey": 155.46666666666673
            },
            "textRect": {
              "x": 33.95374281077977,
              "y": 135.46666666666673,
              "width": 133.62806373920998,
              "height": 20,
              "center": {
                "x": 100.76777468038476,
                "y": 145.46666666666673
              },
              "ex": 167.58180654998975,
              "ey": 155.46666666666673
            },
            "iconRect": {
              "x": 0,
              "y": 0,
              "width": 0,
              "height": 0,
              "center": {
                "x": 0,
                "y": 0
              },
              "ex": 0,
              "ey": 0
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 4.800000000000003,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 225.09655558220595,
              "y": 52.16250000000002,
              "width": 115.22104780440746,
              "height": 58.874999999999936,
              "center": {
                "x": 282.7070794844097,
                "y": 81.6
              },
              "ex": 340.3176033866134,
              "ey": 111.03749999999997
            },
            "z": 0,
            "iconSize": 0,
            "whiteSpace": "",
            "evs": {
              "x": 636,
              "y": 451
            },
            "parentId": null
          },
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "line",
            "tags": [],
            "visible": true,
            "rect": {
              "x": 237.9537428107799,
              "y": 116.21666666666675,
              "width": 209.62806373920992,
              "height": 78.49999999999993,
              "center": {
                "x": 342.76777468038483,
                "y": 155.46666666666673
              },
              "ex": 447.5818065499898,
              "ey": 194.7166666666667
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
            "lineWidth": 0.4000000000000002,
            "strokeStyle": "#2222225C",
            "fillStyle": "",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "134b0a15",
            "zRotate": 0,
            "borderRadius": 0,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 0,
            "paddingBottom": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "children": [],
            "text": "",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 0,
            "paddingRightNum": 0,
            "paddingTopNum": 0,
            "paddingBottomNum": 0,
            "fullTextRect": {
              "x": 247.9537428107799,
              "y": 135.46666666666673,
              "width": 189.62806373920992,
              "height": 20,
              "center": {
                "x": 342.76777468038483,
                "y": 145.46666666666673
              },
              "ex": 437.5818065499898,
              "ey": 155.46666666666673
            },
            "textRect": {
              "x": 247.9537428107799,
              "y": 135.46666666666673,
              "width": 189.62806373920992,
              "height": 20,
              "center": {
                "x": 342.76777468038483,
                "y": 145.46666666666673
              },
              "ex": 437.5818065499898,
              "ey": 155.46666666666673
            },
            "iconRect": {
              "x": 0,
              "y": 0,
              "width": 0,
              "height": 0,
              "center": {
                "x": 0,
                "y": 0
              },
              "ex": 0,
              "ey": 0
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 4.800000000000003,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 385.59655558220607,
              "y": 52.16250000000002,
              "width": 157.22104780440742,
              "height": 58.874999999999936,
              "center": {
                "x": 464.20707948440975,
                "y": 81.6
              },
              "ex": 542.8176033866134,
              "ey": 111.03749999999997
            },
            "z": 0,
            "iconSize": 0,
            "whiteSpace": "",
            "evs": {
              "x": 842,
              "y": 408
            }
          },
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "line",
            "tags": [],
            "visible": true,
            "rect": {
              "x": 514.0370720751032,
              "y": 116.21666666666675,
              "width": 153.62806373920998,
              "height": 78.49999999999993,
              "center": {
                "x": 590.8511039447081,
                "y": 155.46666666666673
              },
              "ex": 667.6651358143132,
              "ey": 194.7166666666667
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
            "lineWidth": 0.4000000000000002,
            "strokeStyle": "#2222225C",
            "fillStyle": "",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "4dc84fd",
            "zRotate": 0,
            "borderRadius": 0,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 0,
            "paddingBottom": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "children": [],
            "text": "",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 0,
            "paddingRightNum": 0,
            "paddingTopNum": 0,
            "paddingBottomNum": 0,
            "fullTextRect": {
              "x": 524.0370720751032,
              "y": 135.46666666666673,
              "width": 133.62806373920998,
              "height": 20,
              "center": {
                "x": 590.8511039447081,
                "y": 145.46666666666673
              },
              "ex": 657.6651358143132,
              "ey": 155.46666666666673
            },
            "textRect": {
              "x": 524.0370720751032,
              "y": 135.46666666666673,
              "width": 133.62806373920998,
              "height": 20,
              "center": {
                "x": 590.8511039447081,
                "y": 145.46666666666673
              },
              "ex": 657.6651358143132,
              "ey": 155.46666666666673
            },
            "iconRect": {
              "x": 0,
              "y": 0,
              "width": 0,
              "height": 0,
              "center": {
                "x": 0,
                "y": 0
              },
              "ex": 0,
              "ey": 0
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 4.800000000000003,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 592.6590525304485,
              "y": 52.16250000000002,
              "width": 115.22104780440746,
              "height": 58.874999999999936,
              "center": {
                "x": 650.2695764326522,
                "y": 81.6
              },
              "ex": 707.880100334856,
              "ey": 111.03749999999997
            },
            "z": 0,
            "iconSize": 0,
            "whiteSpace": "",
            "evs": {
              "x": 1092,
              "y": 381
            }
          },
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "text",
            "tags": [],
            "visible": true,
            "rect": {
              "x": 14.310547326265123,
              "y": 92.09166666666673,
              "width": 151.31415896882115,
              "height": 48.249999999999964,
              "center": {
                "x": 89.9676268106757,
                "y": 116.21666666666671
              },
              "ex": 165.62470629508627,
              "ey": 140.3416666666667
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
            "lineWidth": 0.4000000000000002,
            "strokeStyle": "#222222",
            "fillStyle": "",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "17dee6ad",
            "zRotate": 0,
            "borderRadius": 0,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 0,
            "paddingBottom": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "children": [],
            "text": "行业知识服务平台",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 0,
            "paddingRightNum": 0,
            "paddingTopNum": 0,
            "paddingBottomNum": 0,
            "textRect": {
              "x": 14.310547326265123,
              "y": 128.2791666666667,
              "width": 151.31415896882115,
              "height": 12.062499999999991,
              "center": {
                "x": 89.9676268106757,
                "y": 134.3104166666667
              },
              "ex": 165.62470629508627,
              "ey": 140.3416666666667
            },
            "fullTextRect": {
              "x": 14.310547326265123,
              "y": 92.09166666666673,
              "width": 151.31415896882115,
              "height": 48.249999999999964,
              "center": {
                "x": 89.9676268106757,
                "y": 116.21666666666671
              },
              "ex": 165.62470629508627,
              "ey": 140.3416666666667
            },
            "iconRect": {
              "x": 0,
              "y": 0,
              "width": 0,
              "height": 0,
              "center": {
                "x": 0,
                "y": 0
              },
              "ex": 0,
              "ey": 0
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 18.00000000000001,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 217.86415896882,
              "y": 34.06875000000002,
              "width": 113.48561922661584,
              "height": 36.18749999999997,
              "center": {
                "x": 274.60696858212793,
                "y": 52.16250000000001
              },
              "ex": 331.3497781954358,
              "ey": 70.25625
            },
            "z": 0,
            "iconSize": 0,
            "whiteSpace": "",
            "evs": {
              "x": 480,
              "y": 405
            },
            "parentId": null
          },
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "text",
            "tags": [],
            "visible": true,
            "rect": {
              "x": 223.02277546341134,
              "y": 92.09166666666673,
              "width": 151.31415896882115,
              "height": 48.249999999999964,
              "center": {
                "x": 298.6798549478219,
                "y": 116.21666666666671
              },
              "ex": 374.3369344322325,
              "ey": 140.3416666666667
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
            "lineWidth": 0.4000000000000002,
            "strokeStyle": "#222222",
            "fillStyle": "",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "1eb548ba",
            "zRotate": 0,
            "borderRadius": 0,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 0,
            "paddingBottom": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "children": [],
            "text": "研究学习平台",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 0,
            "paddingRightNum": 0,
            "paddingTopNum": 0,
            "paddingBottomNum": 0,
            "textRect": {
              "x": 223.02277546341134,
              "y": 128.2791666666667,
              "width": 151.31415896882115,
              "height": 12.062499999999991,
              "center": {
                "x": 298.6798549478219,
                "y": 134.3104166666667
              },
              "ex": 374.3369344322325,
              "ey": 140.3416666666667
            },
            "fullTextRect": {
              "x": 223.02277546341134,
              "y": 92.09166666666673,
              "width": 151.31415896882115,
              "height": 48.249999999999964,
              "center": {
                "x": 298.6798549478219,
                "y": 116.21666666666671
              },
              "ex": 374.3369344322325,
              "ey": 140.3416666666667
            },
            "iconRect": {
              "x": 0,
              "y": 0,
              "width": 0,
              "height": 0,
              "center": {
                "x": 0,
                "y": 0
              },
              "ex": 0,
              "ey": 0
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 18.00000000000001,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 374.39833007167965,
              "y": 34.06875000000002,
              "width": 113.48561922661584,
              "height": 36.18749999999997,
              "center": {
                "x": 431.1411396849876,
                "y": 52.16250000000001
              },
              "ex": 487.8839492982955,
              "ey": 70.25625
            },
            "z": 0,
            "iconSize": 0,
            "whiteSpace": "",
            "evs": {
              "x": 711,
              "y": 374
            },
            "parentId": null
          },
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "text",
            "tags": [],
            "visible": true,
            "rect": {
              "x": 504.3938765905885,
              "y": 92.09166666666673,
              "width": 151.31415896882115,
              "height": 48.249999999999964,
              "center": {
                "x": 580.050956074999,
                "y": 116.21666666666671
              },
              "ex": 655.7080355594096,
              "ey": 140.3416666666667
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
            "lineWidth": 0.4000000000000002,
            "strokeStyle": "#222222",
            "fillStyle": "",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "a273ea",
            "zRotate": 0,
            "borderRadius": 0,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 0,
            "paddingBottom": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "children": [],
            "text": "专题知识库",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 0,
            "paddingRightNum": 0,
            "paddingTopNum": 0,
            "paddingBottomNum": 0,
            "textRect": {
              "x": 504.3938765905885,
              "y": 128.2791666666667,
              "width": 151.31415896882115,
              "height": 12.062499999999991,
              "center": {
                "x": 580.050956074999,
                "y": 134.3104166666667
              },
              "ex": 655.7080355594096,
              "ey": 140.3416666666667
            },
            "fullTextRect": {
              "x": 504.3938765905885,
              "y": 92.09166666666673,
              "width": 151.31415896882115,
              "height": 48.249999999999964,
              "center": {
                "x": 580.050956074999,
                "y": 116.21666666666671
              },
              "ex": 655.7080355594096,
              "ey": 140.3416666666667
            },
            "iconRect": {
              "x": 0,
              "y": 0,
              "width": 0,
              "height": 0,
              "center": {
                "x": 0,
                "y": 0
              },
              "ex": 0,
              "ey": 0
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 18.00000000000001,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 585.4266559170625,
              "y": 34.06875000000002,
              "width": 113.48561922661584,
              "height": 36.18749999999997,
              "center": {
                "x": 642.1694655303704,
                "y": 52.16250000000001
              },
              "ex": 698.9122751436784,
              "ey": 70.25625
            },
            "z": 0,
            "iconSize": 0,
            "whiteSpace": "",
            "evs": {
              "x": 1049,
              "y": 347
            },
            "parentId": null
          },
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
              "x": 24.4065951306726,
              "y": 175.66666666666669,
              "width": 149.35700983128882,
              "height": 162.46666666666673,
              "center": {
                "x": 99.08510004631701,
                "y": 256.90000000000003
              },
              "ex": 173.76360496196142,
              "ey": 338.13333333333344
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
            "lineWidth": 0.4000000000000001,
            "strokeStyle": "#222222",
            "fillStyle": "#00000047",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "47231bee",
            "zRotate": 0,
            "borderRadius": 0,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 4.000000000000001,
            "paddingBottom": 4.000000000000001,
            "paddingLeft": 4.000000000000001,
            "paddingRight": 4.000000000000001,
            "children": [],
            "text": "行业知识内容",
            "iconColor": "#2f54eb",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 4.000000000000001,
            "paddingRightNum": 4.000000000000001,
            "paddingTopNum": 4.000000000000001,
            "paddingBottomNum": 4.000000000000001,
            "textRect": {
              "x": 28.4065951306726,
              "y": 295.51666666666677,
              "width": 141.35700983128882,
              "height": 38.61666666666668,
              "center": {
                "x": 99.08510004631701,
                "y": 314.8250000000001
              },
              "ex": 169.76360496196142,
              "ey": 334.13333333333344
            },
            "fullTextRect": {
              "x": 28.4065951306726,
              "y": 179.66666666666669,
              "width": 141.35700983128882,
              "height": 154.46666666666673,
              "center": {
                "x": 99.08510004631701,
                "y": 256.90000000000003
              },
              "ex": 169.76360496196142,
              "ey": 334.13333333333344
            },
            "iconRect": {
              "x": 28.4065951306726,
              "y": 179.66666666666669,
              "width": 141.35700983128882,
              "height": 113.85000000000005,
              "center": {
                "x": 99.08510004631701,
                "y": 236.5916666666667
              },
              "ex": 169.76360496196142,
              "ey": 293.51666666666677
            },
            "fullIconRect": {
              "x": 28.4065951306726,
              "y": 179.66666666666669,
              "width": 141.35700983128882,
              "height": 154.46666666666673,
              "center": {
                "x": 99.08510004631701,
                "y": 256.90000000000003
              },
              "ex": 169.76360496196142,
              "ey": 334.13333333333344
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 30.000000000000007,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 225.43619482212557,
              "y": 96.74999999999997,
              "width": 112.0177573734666,
              "height": 121.85000000000002,
              "center": {
                "x": 281.44507350885885,
                "y": 157.67499999999998
              },
              "ex": 337.45395219559214,
              "ey": 218.6
            },
            "z": null,
            "iconSize": null,
            "whiteSpace": "",
            "evs": {
              "x": 558,
              "y": 552
            },
            "parentId": null
          },
          {
            "name": "lines",
            "tags": [],
            "visible": true,
            "rect": {
              "width": 0,
              "height": 0,
              "center": {
                "x": null,
                "y": null
              },
              "ex": null,
              "ey": null
            },
            "fontStyle": "normal",
            "fontWeight": "normal",
            "textBackground": "#ffffff",
            "textDecoration": "",
            "textDecorationDash": 0,
            "textDecorationColor": "",
            "events": [],
            "dash": 0,
            "lineDashOffset": 0,
            "lineWidth": 1,
            "strokeStyle": "",
            "fillStyle": "",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "5fe459fb",
            "fromArrow": "",
            "toArrow": "",
            "controlPoints": [],
            "fromArrowSize": 5,
            "toArrowSize": 5,
            "borderWidth": 0,
            "borderColor": "#000000",
            "animateColor": "",
            "animateSpan": 1,
            "animateFromSize": 0,
            "animateToSize": 0,
            "animateDotSize": 3,
            "type": 1,
            "doing": true,
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 4.800000000000001,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "children": []
          },
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
              "x": 516.1725990290639,
              "y": 175.66666666666669,
              "width": 149.35700983128882,
              "height": 162.46666666666673,
              "center": {
                "x": 590.8511039447084,
                "y": 256.90000000000003
              },
              "ex": 665.5296088603527,
              "ey": 338.13333333333344
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
            "lineWidth": 0.4000000000000001,
            "strokeStyle": "#222222",
            "fillStyle": "#00000047",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "5ca129d9",
            "zRotate": 0,
            "borderRadius": 0,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 4.000000000000001,
            "paddingBottom": 4.000000000000001,
            "paddingLeft": 4.000000000000001,
            "paddingRight": 4.000000000000001,
            "children": [],
            "text": "专题知识分类",
            "iconColor": "#2f54eb",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 4.000000000000001,
            "paddingRightNum": 4.000000000000001,
            "paddingTopNum": 4.000000000000001,
            "paddingBottomNum": 4.000000000000001,
            "textRect": {
              "x": 520.1725990290639,
              "y": 295.51666666666677,
              "width": 141.35700983128882,
              "height": 38.61666666666668,
              "center": {
                "x": 590.8511039447084,
                "y": 314.8250000000001
              },
              "ex": 661.5296088603527,
              "ey": 334.13333333333344
            },
            "fullTextRect": {
              "x": 520.1725990290639,
              "y": 179.66666666666669,
              "width": 141.35700983128882,
              "height": 154.46666666666673,
              "center": {
                "x": 590.8511039447084,
                "y": 256.90000000000003
              },
              "ex": 661.5296088603527,
              "ey": 334.13333333333344
            },
            "iconRect": {
              "x": 520.1725990290639,
              "y": 179.66666666666669,
              "width": 141.35700983128882,
              "height": 113.85000000000005,
              "center": {
                "x": 590.8511039447084,
                "y": 236.5916666666667
              },
              "ex": 661.5296088603527,
              "ey": 293.51666666666677
            },
            "fullIconRect": {
              "x": 520.1725990290639,
              "y": 179.66666666666669,
              "width": 141.35700983128882,
              "height": 154.46666666666673,
              "center": {
                "x": 590.8511039447084,
                "y": 256.90000000000003
              },
              "ex": 661.5296088603527,
              "ey": 334.13333333333344
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 30.000000000000007,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 594.2606977459191,
              "y": 96.74999999999997,
              "width": 112.0177573734666,
              "height": 121.85000000000002,
              "center": {
                "x": 650.2695764326523,
                "y": 157.67499999999998
              },
              "ex": 706.2784551193856,
              "ey": 218.6
            },
            "z": null,
            "iconSize": null,
            "whiteSpace": "",
            "evs": {
              "x": 1029,
              "y": 495
            },
            "parentId": null
          },
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
              "x": 237.9537428107799,
              "y": 175.66666666666669,
              "width": 209.6280637392098,
              "height": 162.46666666666673,
              "center": {
                "x": 342.7677746803848,
                "y": 256.90000000000003
              },
              "ex": 447.58180654998966,
              "ey": 338.13333333333344
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
            "lineWidth": 0.4000000000000001,
            "strokeStyle": "#222222",
            "fillStyle": "#00000047",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "6f45f40c",
            "zRotate": 0,
            "borderRadius": 0,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 4.000000000000001,
            "paddingBottom": 4.000000000000001,
            "paddingLeft": 4.000000000000001,
            "paddingRight": 4.000000000000001,
            "children": [],
            "text": "科研、论文、研究报告内容",
            "iconColor": "#2f54eb",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 4.000000000000001,
            "paddingRightNum": 4.000000000000001,
            "paddingTopNum": 4.000000000000001,
            "paddingBottomNum": 4.000000000000001,
            "textRect": {
              "x": 241.9537428107799,
              "y": 295.51666666666677,
              "width": 201.6280637392098,
              "height": 38.61666666666668,
              "center": {
                "x": 342.7677746803848,
                "y": 314.8250000000001
              },
              "ex": 443.58180654998966,
              "ey": 334.13333333333344
            },
            "fullTextRect": {
              "x": 241.9537428107799,
              "y": 179.66666666666669,
              "width": 201.6280637392098,
              "height": 154.46666666666673,
              "center": {
                "x": 342.7677746803848,
                "y": 256.90000000000003
              },
              "ex": 443.58180654998966,
              "ey": 334.13333333333344
            },
            "iconRect": {
              "x": 241.9537428107799,
              "y": 179.66666666666669,
              "width": 201.6280637392098,
              "height": 113.85000000000005,
              "center": {
                "x": 342.7677746803848,
                "y": 236.5916666666667
              },
              "ex": 443.58180654998966,
              "ey": 293.51666666666677
            },
            "fullIconRect": {
              "x": 241.9537428107799,
              "y": 179.66666666666669,
              "width": 201.6280637392098,
              "height": 154.46666666666673,
              "center": {
                "x": 342.7677746803848,
                "y": 256.90000000000003
              },
              "ex": 443.58180654998966,
              "ey": 334.13333333333344
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 30.000000000000007,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "oldRect": {
              "x": 385.59655558220607,
              "y": 96.74999999999997,
              "width": 157.22104780440733,
              "height": 121.85000000000002,
              "center": {
                "x": 464.20707948440975,
                "y": 157.67499999999998
              },
              "ex": 542.8176033866134,
              "ey": 218.6
            },
            "z": null,
            "iconSize": null,
            "whiteSpace": "",
            "evs": {
              "x": 864,
              "y": 551
            },
            "parentId": null
          }
        ],
        "lineName": "curve",
        "fromArrow": "",
        "toArrow": "triangleSolid",
        "scale": 0.4,
        "locked": 0,
        "x": 73,
        "y": 164,
        "websocket": "",
        "mqttUrl": "",
        "mqttOptions": {
          "clientId": "1f02fcb1"
        },
        "grid": true,
        "gridColor": "#00000033",
        "rule": true,
        "dbIndex": 442
      },
      dianShangForm: {"pens":[{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"square","tags":[],"visible":true,"rect":{"x":98.67073673356947,"y":128.54376562275064,"width":660.7057892628212,"height":491.51666666666756,"center":{"x":429.0236313649801,"y":374.3020989560844},"ex":759.3765259963907,"ey":620.0604322894183},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000028,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"6bb3e7f2","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":11.000000000000025,"paddingBottom":11.000000000000025,"paddingLeft":11.000000000000025,"paddingRight":11.000000000000025,"children":[],"text":"","iconColor":"#F6F6F8FF","type":0,"animateType":"","paddingLeftNum":11.000000000000025,"paddingRightNum":11.000000000000025,"paddingTopNum":11.000000000000025,"paddingBottomNum":11.000000000000025,"textRect":{"x":109.6707367335695,"y":491.6812656227513,"width":638.7057892628212,"height":117.37916666666689,"center":{"x":429.02363136498013,"y":550.3708489560847},"ex":748.3765259963907,"ey":609.0604322894183},"fullTextRect":{"x":109.6707367335695,"y":139.54376562275067,"width":638.7057892628212,"height":469.51666666666756,"center":{"x":429.02363136498013,"y":374.3020989560845},"ex":748.3765259963907,"ey":609.0604322894183},"iconRect":{"x":109.6707367335695,"y":139.54376562275067,"width":638.7057892628212,"height":346.63750000000067,"center":{"x":429.02363136498013,"y":312.862515622751},"ex":748.3765259963907,"ey":486.1812656227513},"fullIconRect":{"x":109.6707367335695,"y":139.54376562275067,"width":638.7057892628212,"height":469.51666666666756,"center":{"x":429.02363136498013,"y":374.3020989560845},"ex":748.3765259963907,"ey":609.0604322894183},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":159.65407773896948,"y":143.29433196816998,"width":600.6416266025647,"height":446.8333333333341,"center":{"x":459.9748910402518,"y":366.71099863483704},"ex":760.2957043415341,"ey":590.1276653015041},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":522,"y":328}},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"rectangle","tags":[],"visible":true,"rect":{"x":303.54573673357015,"y":263.84376562275116,"width":409.20000000000044,"height":160.23333333333383,"center":{"x":508.1457367335704,"y":343.96043228941807},"ex":712.7457367335705,"ey":424.077098956085},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000028,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"76932f9","zRotate":0,"borderRadius":0.1,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":11.000000000000025,"paddingBottom":11.000000000000025,"paddingLeft":11.000000000000025,"paddingRight":11.000000000000025,"children":[],"text":"首页滚动广告区","type":0,"animateType":"","paddingLeftNum":11.000000000000025,"paddingRightNum":11.000000000000025,"paddingTopNum":11.000000000000025,"paddingBottomNum":11.000000000000025,"textRect":{"x":452.77907006690396,"y":274.84376562275116,"width":248.96666666666667,"height":138.23333333333377,"center":{"x":577.2624034002373,"y":343.96043228941807},"ex":701.7457367335707,"ey":413.0770989560849},"fullTextRect":{"x":314.54573673357015,"y":274.84376562275116,"width":387.20000000000044,"height":138.23333333333377,"center":{"x":508.1457367335704,"y":343.96043228941807},"ex":701.7457367335705,"ey":413.0770989560849},"iconRect":{"x":314.54573673357015,"y":274.84376562275116,"width":138.23333333333377,"height":138.23333333333377,"center":{"x":383.66240340023705,"y":343.96043228941807},"ex":452.77907006690396,"ey":413.0770989560849},"fullIconRect":{"x":314.54573673357015,"y":274.84376562275116,"width":387.20000000000044,"height":138.23333333333377,"center":{"x":508.1457367335704,"y":343.96043228941807},"ex":701.7457367335705,"ey":413.0770989560849},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":345.90407773897005,"y":266.29433196817047,"width":372.0000000000004,"height":145.6666666666671,"center":{"x":531.9040777389703,"y":339.127665301504},"ex":717.9040777389705,"ey":411.96099863483755},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":752,"y":364}},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"square","tags":[],"visible":true,"rect":{"x":98.67073673356947,"y":128.54376562275084,"width":658.533333333335,"height":19.18125000000003,"center":{"x":427.937403400237,"y":138.13439062275086},"ex":757.2040700669045,"ey":147.72501562275087},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000028,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"351fb83","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":11.000000000000025,"paddingBottom":11.000000000000025,"paddingLeft":11.000000000000025,"paddingRight":11.000000000000025,"children":[],"text":"登录注册区","iconColor":"#2f54eb","type":0,"animateType":"","paddingLeftNum":11.000000000000025,"paddingRightNum":11.000000000000025,"paddingTopNum":11.000000000000025,"paddingBottomNum":11.000000000000025,"textRect":{"x":109.6707367335695,"y":137.42970312275085,"width":636.533333333335,"height":-0.7046875000000048,"center":{"x":427.93740340023703,"y":137.07735937275086},"ex":746.2040700669045,"ey":136.72501562275085},"fullTextRect":{"x":109.6707367335695,"y":139.54376562275087,"width":636.533333333335,"height":-2.818750000000019,"center":{"x":427.93740340023703,"y":138.13439062275086},"ex":746.2040700669045,"ey":136.72501562275085},"iconRect":{"x":109.6707367335695,"y":139.54376562275087,"width":636.533333333335,"height":-7.614062500000028,"center":{"x":427.93740340023703,"y":135.73673437275085},"ex":746.2040700669045,"ey":131.92970312275085},"fullIconRect":{"x":109.6707367335695,"y":139.54376562275087,"width":636.533333333335,"height":-2.818750000000019,"center":{"x":427.93740340023703,"y":138.13439062275086},"ex":746.2040700669045,"ey":136.72501562275085},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":159.65407773896948,"y":143.29433196817016,"width":598.6666666666681,"height":17.437500000000025,"center":{"x":458.98741107230353,"y":152.01308196817016},"ex":758.3207444056376,"ey":160.73183196817018},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":823,"y":192}},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"image","tags":[],"visible":true,"rect":{"x":144.22907006690366,"y":177.4307447894172,"width":99.91666666666688,"height":72.62291666666708,"center":{"x":194.1874034002371,"y":213.74220312275074},"ex":244.14573673357054,"ey":250.05366145608428},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000028,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"a1505fa","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"iconFamily":"iconfont","icon":"","type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":144.22907006690366,"y":230.25366145608425,"width":99.91666666666688,"height":19.800000000000047,"center":{"x":194.1874034002371,"y":240.15366145608428},"ex":244.14573673357054,"ey":250.05366145608428},"fullTextRect":{"x":144.22907006690366,"y":177.4307447894172,"width":99.91666666666688,"height":72.62291666666708,"center":{"x":194.1874034002371,"y":213.74220312275074},"ex":244.14573673357054,"ey":250.05366145608428},"iconRect":{"x":144.22907006690366,"y":177.4307447894172,"width":99.91666666666688,"height":52.822916666667034,"center":{"x":194.1874034002371,"y":203.8422031227507},"ex":244.14573673357054,"ey":230.25366145608422},"fullIconRect":{"x":144.22907006690366,"y":177.4307447894172,"width":99.91666666666688,"height":72.62291666666708,"center":{"x":194.1874034002371,"y":213.74220312275074},"ex":244.14573673357054,"ey":250.05366145608428},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":201.0707444056369,"y":187.7370403015032,"width":90.83333333333353,"height":66.0208333333337,"center":{"x":246.48741107230367,"y":220.74745696817007},"ex":291.90407773897044,"ey":253.75787363483693},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":666,"y":256},"text":"平台logo"},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"rectangle","tags":[],"visible":true,"rect":{"x":288.87907006690347,"y":194.18855728941753,"width":371.0666666666675,"height":19.553645833333494,"center":{"x":474.4124034002372,"y":203.9653802060843},"ex":659.945736733571,"ey":213.74220312275102},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000028,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"46a4960","zRotate":0,"borderRadius":0.1,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":11.000000000000025,"paddingBottom":11.000000000000025,"paddingLeft":11.000000000000025,"paddingRight":11.000000000000025,"children":[],"text":"搜索内容...","type":0,"animateType":"","paddingLeftNum":11.000000000000025,"paddingRightNum":11.000000000000025,"paddingTopNum":11.000000000000025,"paddingBottomNum":11.000000000000025,"textRect":{"x":297.43271590023693,"y":205.18855728941756,"width":351.51302083333405,"height":-2.4463541666665556,"center":{"x":473.18922631690396,"y":203.9653802060843},"ex":648.945736733571,"ey":202.742203122751},"fullTextRect":{"x":299.87907006690347,"y":205.18855728941756,"width":349.0666666666675,"height":-2.4463541666665556,"center":{"x":474.4124034002372,"y":203.9653802060843},"ex":648.945736733571,"ey":202.742203122751},"iconRect":{"x":299.87907006690347,"y":205.18855728941756,"width":-2.4463541666665556,"height":-2.4463541666665556,"center":{"x":298.6558929835702,"y":203.9653802060843},"ex":297.43271590023693,"ey":202.742203122751},"fullIconRect":{"x":299.87907006690347,"y":205.18855728941756,"width":349.0666666666675,"height":-2.4463541666665556,"center":{"x":474.4124034002372,"y":203.9653802060843},"ex":648.945736733571,"ey":202.742203122751},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"left","textBaseline":"middle","oldRect":{"x":332.57074440563673,"y":202.97141530150353,"width":337.33333333333405,"height":17.77604166666681,"center":{"x":501.23741107230376,"y":211.85943613483693},"ex":669.9040777389707,"ey":220.74745696817033},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":616,"y":242}},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"rectangle","tags":[],"visible":true,"rect":{"x":605.3124034002385,"y":192.44116145608376,"width":54.633333333333454,"height":23.048437500000112,"center":{"x":632.6290700669052,"y":203.9653802060838},"ex":659.945736733572,"ey":215.48959895608388},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000028,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"79df693","zRotate":0,"borderRadius":0.1,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":11.000000000000025,"paddingBottom":11.000000000000025,"paddingLeft":11.000000000000025,"paddingRight":11.000000000000025,"children":[],"text":"搜索","type":0,"animateType":"","paddingLeftNum":11.000000000000025,"paddingRightNum":11.000000000000025,"paddingTopNum":11.000000000000025,"paddingBottomNum":11.000000000000025,"textRect":{"x":617.3608409002386,"y":203.4411614560838,"width":31.584895833333334,"height":1.0484375000000625,"center":{"x":633.1532888169053,"y":203.9653802060838},"ex":648.945736733572,"ey":204.48959895608385},"fullTextRect":{"x":616.3124034002385,"y":203.4411614560838,"width":32.6333333333334,"height":1.0484375000000625,"center":{"x":632.6290700669052,"y":203.9653802060838},"ex":648.945736733572,"ey":204.48959895608385},"iconRect":{"x":616.3124034002385,"y":203.4411614560838,"width":1.0484375000000625,"height":1.0484375000000625,"center":{"x":616.8366221502386,"y":203.9653802060838},"ex":617.3608409002386,"ey":204.48959895608385},"fullIconRect":{"x":616.3124034002385,"y":203.4411614560838,"width":32.6333333333334,"height":1.0484375000000625,"center":{"x":632.6290700669052,"y":203.9653802060838},"ex":648.945736733572,"ey":204.48959895608385},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":620.2374110723049,"y":201.38287363483647,"width":49.66666666666677,"height":20.9531250000001,"center":{"x":645.0707444056383,"y":211.85943613483653},"ex":669.9040777389716,"ey":222.33599863483659},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":1111,"y":208}},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"rectangle","tags":[],"visible":true,"rect":{"x":105.82073673357024,"y":263.84376562275116,"width":176.73333333333386,"height":339.1666666666673,"center":{"x":194.18740340023717,"y":433.4270989560848},"ex":282.5540700669041,"ey":603.0104322894185},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000028,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"345ae8b","zRotate":0,"borderRadius":0.1,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":11.000000000000025,"paddingBottom":11.000000000000025,"paddingLeft":11.000000000000025,"paddingRight":11.000000000000025,"children":[],"text":"分区栏","type":0,"animateType":"","paddingLeftNum":11.000000000000025,"paddingRightNum":11.000000000000025,"paddingTopNum":11.000000000000025,"paddingBottomNum":11.000000000000025,"textRect":{"x":433.98740340023755,"y":274.84376562275116,"width":-162.4333333333335,"height":317.1666666666673,"center":{"x":352.7707367335708,"y":433.4270989560848},"ex":271.55407006690405,"ey":592.0104322894185},"fullTextRect":{"x":116.82073673357027,"y":274.84376562275116,"width":154.7333333333338,"height":317.1666666666673,"center":{"x":194.18740340023717,"y":433.4270989560848},"ex":271.55407006690405,"ey":592.0104322894185},"iconRect":{"x":116.82073673357027,"y":274.84376562275116,"width":317.1666666666673,"height":317.1666666666673,"center":{"x":275.40407006690396,"y":433.4270989560848},"ex":433.98740340023755,"ey":592.0104322894185},"fullIconRect":{"x":116.82073673357027,"y":274.84376562275116,"width":154.7333333333338,"height":317.1666666666673,"center":{"x":194.18740340023717,"y":433.4270989560848},"ex":271.55407006690405,"ey":592.0104322894185},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":166.15407773897016,"y":266.29433196817047,"width":160.66666666666714,"height":308.3333333333339,"center":{"x":246.48741107230373,"y":420.46099863483744},"ex":326.8207444056373,"ey":574.6276653015043},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":664,"y":353}},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"image","tags":[],"visible":true,"rect":{"x":118.64261173356999,"y":302.43543228941735,"width":51.172916666666765,"height":52.33307291666692,"center":{"x":144.22907006690338,"y":328.6019687477508},"ex":169.81552840023676,"ey":354.7685052060843},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000028,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"91e14d7","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"iconFamily":"iconfont","icon":"","type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":118.64261173356999,"y":334.9685052060842,"width":51.172916666666765,"height":19.800000000000047,"center":{"x":144.22907006690338,"y":344.86850520608425},"ex":169.81552840023676,"ey":354.7685052060843},"fullTextRect":{"x":118.64261173356999,"y":302.43543228941735,"width":51.172916666666765,"height":52.33307291666692,"center":{"x":144.22907006690338,"y":328.6019687477508},"ex":169.81552840023676,"ey":354.7685052060843},"iconRect":{"x":118.64261173356999,"y":302.43543228941735,"width":51.172916666666765,"height":32.533072916666875,"center":{"x":144.22907006690338,"y":318.7019687477508},"ex":169.81552840023676,"ey":334.9685052060842},"fullIconRect":{"x":118.64261173356999,"y":302.43543228941735,"width":51.172916666666765,"height":52.33307291666692,"center":{"x":144.22907006690338,"y":328.6019687477508},"ex":169.81552840023676,"ey":354.7685052060843},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":177.81032773896993,"y":301.3776653015033,"width":46.52083333333342,"height":47.57552083333356,"center":{"x":201.07074440563665,"y":325.1654257181701},"ex":224.33116107230336,"ey":348.95318613483687},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":535,"y":378},"text":"美食"},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"image","tags":[],"visible":true,"rect":{"x":116.43115340023633,"y":410.77827083108417,"width":55.5958333333334,"height":45.29765625000041,"center":{"x":144.22907006690303,"y":433.42709895608436},"ex":172.02698673356974,"ey":456.07592708108456},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000028,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"6304614e","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"iconFamily":"iconfont","icon":"","type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":116.43115340023633,"y":436.2759270810845,"width":55.5958333333334,"height":19.800000000000047,"center":{"x":144.22907006690303,"y":446.1759270810845},"ex":172.02698673356974,"ey":456.07592708108456},"fullTextRect":{"x":116.43115340023633,"y":410.77827083108417,"width":55.5958333333334,"height":45.29765625000041,"center":{"x":144.22907006690303,"y":433.42709895608436},"ex":172.02698673356974,"ey":456.07592708108456},"iconRect":{"x":116.43115340023633,"y":410.77827083108417,"width":55.5958333333334,"height":25.49765625000036,"center":{"x":144.22907006690303,"y":423.52709895608433},"ex":172.02698673356974,"ey":436.27592708108455},"fullIconRect":{"x":116.43115340023633,"y":410.77827083108417,"width":55.5958333333334,"height":45.29765625000041,"center":{"x":144.22907006690303,"y":433.42709895608436},"ex":172.02698673356974,"ey":456.07592708108456},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":175.79991107230296,"y":399.8711548848368,"width":50.54166666666673,"height":41.17968750000037,"center":{"x":201.07074440563633,"y":420.460998634837},"ex":226.3415777389697,"ey":441.0508423848372},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":440,"y":580},"text":"生活"},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"image","tags":[],"visible":true,"rect":{"x":123.45511173356999,"y":507.6770989560836,"width":41.54791666666681,"height":51.17005208333337,"center":{"x":144.2290700669034,"y":533.2621249977503},"ex":165.00302840023681,"ey":558.847151039417},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000028,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"f930eab","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"iconFamily":"iconfont","icon":"","type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":123.45511173356999,"y":539.0471510394169,"width":41.54791666666681,"height":19.800000000000047,"center":{"x":144.2290700669034,"y":548.9471510394169},"ex":165.00302840023681,"ey":558.847151039417},"fullTextRect":{"x":123.45511173356999,"y":507.6770989560836,"width":41.54791666666681,"height":51.17005208333337,"center":{"x":144.2290700669034,"y":533.2621249977503},"ex":165.00302840023681,"ey":558.847151039417},"iconRect":{"x":123.45511173356999,"y":507.6770989560836,"width":41.54791666666681,"height":31.37005208333332,"center":{"x":144.2290700669034,"y":523.3621249977502},"ex":165.00302840023681,"ey":539.0471510394169},"fullIconRect":{"x":123.45511173356999,"y":507.6770989560836,"width":41.54791666666681,"height":51.17005208333337,"center":{"x":144.2290700669034,"y":533.2621249977503},"ex":165.00302840023681,"ey":558.847151039417},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":182.18532773896993,"y":487.9609986348363,"width":37.77083333333346,"height":46.51822916666669,"center":{"x":201.07074440563667,"y":511.2201132181697},"ex":219.9561610723034,"ey":534.479227801503},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":768,"y":614},"text":"母婴"},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"image","tags":[],"visible":true,"rect":{"x":592.9488729233497,"y":150.68413230416758,"width":49.946863810221444,"height":33.93957913716644,"center":{"x":617.9223048284604,"y":167.6539218727508},"ex":642.8957367335711,"ey":184.62371144133402},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000028,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"f7f7f18","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"iconFamily":"iconfont","icon":"","type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":592.9488729233497,"y":164.82371144133398,"width":49.946863810221444,"height":19.800000000000047,"center":{"x":617.9223048284604,"y":174.72371144133402},"ex":642.8957367335711,"ey":184.62371144133402},"fullTextRect":{"x":592.9488729233497,"y":150.68413230416758,"width":49.946863810221444,"height":33.93957913716644,"center":{"x":617.9223048284604,"y":167.6539218727508},"ex":642.8957367335711,"ey":184.62371144133402},"iconRect":{"x":592.9488729233497,"y":150.68413230416758,"width":49.946863810221444,"height":33.93957913716644,"center":{"x":617.9223048284604,"y":167.6539218727508},"ex":642.8957367335711,"ey":184.62371144133402},"fullIconRect":{"x":592.9488729233497,"y":150.68413230416758,"width":49.946863810221444,"height":33.93957913716644,"center":{"x":617.9223048284604,"y":167.6539218727508},"ex":642.8957367335711,"ey":184.62371144133402},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":608.9978379114968,"y":163.4219380421854,"width":45.40623982747404,"height":30.85416285196949,"center":{"x":631.7009578252339,"y":178.84901946817013},"ex":654.4040777389708,"ey":194.27610089415487},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":792,"y":217}},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"square","tags":[],"visible":true,"rect":{"x":642.8957367335705,"y":157.52475520608408,"width":96.0666666666668,"height":20.258333333333457,"center":{"x":690.9290700669039,"y":167.6539218727508},"ex":738.9624034002373,"ey":177.78308853941755},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000028,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"76d8cfa9","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":11.000000000000025,"paddingBottom":11.000000000000025,"paddingLeft":11.000000000000025,"paddingRight":11.000000000000025,"children":[],"text":"购物车","iconColor":"#2f54eb","type":0,"animateType":"","paddingLeftNum":11.000000000000025,"paddingRightNum":11.000000000000025,"paddingTopNum":11.000000000000025,"paddingBottomNum":11.000000000000025,"textRect":{"x":653.8957367335705,"y":167.21850520608416,"width":74.06666666666675,"height":-0.43541666666664813,"center":{"x":690.9290700669039,"y":167.00079687275084},"ex":727.9624034002372,"ey":166.78308853941752},"fullTextRect":{"x":653.8957367335705,"y":168.5247552060841,"width":74.06666666666675,"height":-1.7416666666665925,"center":{"x":690.9290700669039,"y":167.6539218727508},"ex":727.9624034002372,"ey":166.78308853941752},"iconRect":{"x":653.8957367335705,"y":168.5247552060841,"width":74.06666666666675,"height":-6.806249999999956,"center":{"x":690.9290700669039,"y":165.12163020608412},"ex":727.9624034002372,"ey":161.71850520608416},"fullIconRect":{"x":653.8957367335705,"y":168.5247552060841,"width":74.06666666666675,"height":-1.7416666666665925,"center":{"x":690.9290700669039,"y":167.6539218727508},"ex":727.9624034002372,"ey":166.78308853941752},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":654.4040777389704,"y":169.64068613483676,"width":87.33333333333346,"height":18.416666666666778,"center":{"x":698.0707444056371,"y":178.84901946817016},"ex":741.7374110723039,"ey":188.05735280150353},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":884,"y":209}},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"rectangle","tags":[],"visible":true,"rect":{"x":118.64261173356999,"y":155.00678645608383,"width":443.31145833333403,"height":25.294270833333414,"center":{"x":340.298340900237,"y":167.65392187275054},"ex":561.954070066904,"ey":180.30105728941726},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000028,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"68ff789","zRotate":0,"borderRadius":0.1,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":11.000000000000025,"paddingBottom":11.000000000000025,"paddingLeft":11.000000000000025,"paddingRight":11.000000000000025,"children":[],"text":"顶端广告区","type":0,"animateType":"","paddingLeftNum":11.000000000000025,"paddingRightNum":11.000000000000025,"paddingTopNum":11.000000000000025,"paddingBottomNum":11.000000000000025,"textRect":{"x":132.9368825669034,"y":166.00678645608386,"width":418.01718750000066,"height":3.294270833333364,"center":{"x":341.94547631690375,"y":167.65392187275054},"ex":550.954070066904,"ey":169.30105728941723},"fullTextRect":{"x":129.64261173357002,"y":166.00678645608386,"width":421.31145833333403,"height":3.294270833333364,"center":{"x":340.298340900237,"y":167.65392187275054},"ex":550.954070066904,"ey":169.30105728941723},"iconRect":{"x":129.64261173357002,"y":166.00678645608386,"width":3.294270833333364,"height":3.294270833333364,"center":{"x":131.2897471502367,"y":167.65392187275054},"ex":132.9368825669034,"ey":169.30105728941723},"fullIconRect":{"x":129.64261173357002,"y":166.00678645608386,"width":421.31145833333403,"height":3.294270833333364,"center":{"x":340.298340900237,"y":167.65392187275054},"ex":550.954070066904,"ey":169.30105728941723},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":177.81032773896993,"y":167.35162363483653,"width":403.01041666666725,"height":22.99479166666674,"center":{"x":379.31553607230353,"y":178.8490194681699},"ex":580.8207444056372,"ey":190.34641530150327},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":540,"y":220}},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"text","tags":[],"visible":true,"rect":{"x":252.29834090023712,"y":439.5759270810844,"width":176.00000000000026,"height":33.000000000000064,"center":{"x":340.29834090023724,"y":456.07592708108444},"ex":428.29834090023735,"ey":472.57592708108444},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000028,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"159626e1","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"text":"猜你喜欢","type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":252.29834090023712,"y":464.32592708108444,"width":176.00000000000026,"height":8.250000000000016,"center":{"x":340.29834090023724,"y":468.45092708108444},"ex":428.29834090023735,"ey":472.57592708108444},"fullTextRect":{"x":252.29834090023712,"y":439.5759270810844,"width":176.00000000000026,"height":33.000000000000064,"center":{"x":340.29834090023724,"y":456.07592708108444},"ex":428.29834090023735,"ey":472.57592708108444},"iconRect":{"x":0,"y":0,"width":0,"height":0,"center":{"x":0,"y":0},"ex":0,"ey":0},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":299.31553607230364,"y":426.050842384837,"width":160.00000000000023,"height":30.000000000000057,"center":{"x":379.31553607230376,"y":441.050842384837},"ex":459.31553607230387,"ey":456.05084238483704},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":502,"y":518}},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"square","tags":[],"visible":true,"rect":{"x":314.7290700669037,"y":484.0007668246737,"width":82.07692307692326,"height":74.846384214744,"center":{"x":355.7675316053653,"y":521.4239589320457},"ex":396.805993143827,"ey":558.8471510394177},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000028,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"36e0dd55","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":11.000000000000016,"paddingBottom":11.000000000000016,"paddingLeft":11.000000000000016,"paddingRight":11.000000000000016,"children":[],"text":"","iconColor":"#2f54eb","type":0,"animateType":"","paddingLeftNum":11.000000000000016,"paddingRightNum":11.000000000000016,"paddingTopNum":11.000000000000016,"paddingBottomNum":11.000000000000016,"textRect":{"x":325.7290700669037,"y":534.6355549857317,"width":60.07692307692324,"height":13.211596053685994,"center":{"x":355.7675316053653,"y":541.2413530125747},"ex":385.805993143827,"ey":547.8471510394177},"fullTextRect":{"x":325.7290700669037,"y":495.0007668246737,"width":60.07692307692324,"height":52.84638421474398,"center":{"x":355.7675316053653,"y":521.4239589320457},"ex":385.805993143827,"ey":547.8471510394177},"iconRect":{"x":325.7290700669037,"y":495.0007668246737,"width":60.07692307692324,"height":34.134788161057976,"center":{"x":355.7675316053653,"y":512.0681609052027},"ex":385.805993143827,"ey":529.1355549857317},"fullIconRect":{"x":325.7290700669037,"y":495.0007668246737,"width":60.07692307692324,"height":52.84638421474398,"center":{"x":355.7675316053653,"y":521.4239589320457},"ex":385.805993143827,"ey":547.8471510394177},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":356.07074440563696,"y":466.43706033355454,"width":74.61538461538478,"height":68.04216746794908,"center":{"x":393.37843671332934,"y":500.4581440675291},"ex":430.68612902102177,"ey":534.4792278015036},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":720,"y":639}},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"image","tags":[],"visible":true,"rect":{"x":309.13674234254484,"y":486.5932147413408,"width":93.26157852564114,"height":69.66148838140978,"center":{"x":355.76753160536543,"y":521.4239589320457},"ex":402.398320868186,"ey":556.2547031227506},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000028,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"38c8d07","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"iconFamily":"iconfont","icon":"","type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":309.13674234254484,"y":536.4547031227505,"width":93.26157852564114,"height":19.800000000000047,"center":{"x":355.76753160536543,"y":546.3547031227505},"ex":402.398320868186,"ey":556.2547031227506},"fullTextRect":{"x":309.13674234254484,"y":486.5932147413408,"width":93.26157852564114,"height":69.66148838140978,"center":{"x":355.76753160536543,"y":521.4239589320457},"ex":402.398320868186,"ey":556.2547031227506},"iconRect":{"x":309.13674234254484,"y":486.5932147413408,"width":93.26157852564114,"height":69.66148838140978,"center":{"x":355.76753160536543,"y":521.4239589320457},"ex":402.398320868186,"ey":556.2547031227506},"fullIconRect":{"x":309.13674234254484,"y":486.5932147413408,"width":93.26157852564114,"height":69.66148838140978,"center":{"x":355.76753160536543,"y":521.4239589320457},"ex":402.398320868186,"ey":556.2547031227506},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":350.98681011076525,"y":468.79383116688825,"width":84.7832532051283,"height":63.32862580128162,"center":{"x":393.3784367133294,"y":500.4581440675291},"ex":435.77006331589354,"ey":532.1224569681699},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":535,"y":603},"parentId":null},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"text","tags":[],"visible":true,"rect":{"x":275.5021269579293,"y":558.8471510394179,"width":160.53080929487209,"height":33.000000000000064,"center":{"x":355.7675316053653,"y":575.3471510394179},"ex":436.0329362528014,"ey":591.847151039418},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000028,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"bc07ac7","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"text":"XXX笔记本电脑","type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":275.5021269579293,"y":583.5971510394179,"width":160.53080929487209,"height":8.250000000000016,"center":{"x":355.7675316053653,"y":587.7221510394179},"ex":436.0329362528014,"ey":591.8471510394179},"fullTextRect":{"x":275.5021269579293,"y":558.8471510394179,"width":160.53080929487209,"height":33.000000000000064,"center":{"x":355.7675316053653,"y":575.3471510394179},"ex":436.0329362528014,"ey":591.847151039418},"iconRect":{"x":0,"y":0,"width":0,"height":0,"center":{"x":0,"y":0},"ex":0,"ey":0},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":320.40988703384204,"y":534.4792278015038,"width":145.93709935897462,"height":30.000000000000057,"center":{"x":393.37843671332934,"y":549.4792278015038},"ex":466.3469863928167,"ey":564.4792278015038},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":544,"y":626},"parentId":null},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"text","tags":[],"visible":true,"rect":{"x":244.1457367335703,"y":586.5104322894186,"width":176.0000000000004,"height":33.000000000000064,"center":{"x":332.1457367335705,"y":603.0104322894186},"ex":420.1457367335707,"ey":619.5104322894188},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000019,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"6a0edc2","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"text":"¥6999","type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":244.1457367335703,"y":611.2604322894186,"width":176.0000000000004,"height":8.250000000000016,"center":{"x":332.1457367335705,"y":615.3854322894186},"ex":420.1457367335707,"ey":619.5104322894186},"fullTextRect":{"x":244.1457367335703,"y":586.5104322894186,"width":176.0000000000004,"height":33.000000000000064,"center":{"x":332.1457367335705,"y":603.0104322894186},"ex":420.1457367335707,"ey":619.5104322894188},"iconRect":{"x":0,"y":0,"width":0,"height":0,"center":{"x":0,"y":0},"ex":0,"ey":0},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":291.90407773897016,"y":559.6276653015045,"width":160.00000000000034,"height":30.000000000000057,"center":{"x":371.90407773897033,"y":574.6276653015045},"ex":451.9040777389705,"ey":589.6276653015045},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":586,"y":659},"parentId":null},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"image","tags":[],"visible":true,"rect":{"x":461.5149474707498,"y":486.5932147413408,"width":93.26157852564114,"height":69.66148838140978,"center":{"x":508.1457367335704,"y":521.4239589320457},"ex":554.776525996391,"ey":556.2547031227506},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000028,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"58f99902","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"iconFamily":"iconfont","icon":"","type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":461.5149474707498,"y":536.4547031227505,"width":93.26157852564114,"height":19.800000000000047,"center":{"x":508.1457367335704,"y":546.3547031227505},"ex":554.776525996391,"ey":556.2547031227506},"fullTextRect":{"x":461.5149474707498,"y":486.5932147413408,"width":93.26157852564114,"height":69.66148838140978,"center":{"x":508.1457367335704,"y":521.4239589320457},"ex":554.776525996391,"ey":556.2547031227506},"iconRect":{"x":461.5149474707498,"y":486.5932147413408,"width":93.26157852564114,"height":69.66148838140978,"center":{"x":508.1457367335704,"y":521.4239589320457},"ex":554.776525996391,"ey":556.2547031227506},"fullIconRect":{"x":461.5149474707498,"y":486.5932147413408,"width":93.26157852564114,"height":69.66148838140978,"center":{"x":508.1457367335704,"y":521.4239589320457},"ex":554.776525996391,"ey":556.2547031227506},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":489.51245113640607,"y":468.79383116688825,"width":84.7832532051283,"height":63.32862580128162,"center":{"x":531.9040777389703,"y":500.4581440675291},"ex":574.2957043415344,"ey":532.1224569681699},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":666,"y":597},"parentId":null,"text":""},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"image","tags":[],"visible":true,"rect":{"x":613.314947470751,"y":486.5932147413408,"width":93.26157852564114,"height":69.66148838140978,"center":{"x":659.9457367335716,"y":521.4239589320457},"ex":706.5765259963921,"ey":556.2547031227506},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000028,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"367b4f45","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"iconFamily":"iconfont","icon":"","type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":613.314947470751,"y":536.4547031227505,"width":93.26157852564114,"height":19.800000000000047,"center":{"x":659.9457367335716,"y":546.3547031227505},"ex":706.5765259963921,"ey":556.2547031227506},"fullTextRect":{"x":613.314947470751,"y":486.5932147413408,"width":93.26157852564114,"height":69.66148838140978,"center":{"x":659.9457367335716,"y":521.4239589320457},"ex":706.5765259963921,"ey":556.2547031227506},"iconRect":{"x":613.314947470751,"y":486.5932147413408,"width":93.26157852564114,"height":69.66148838140978,"center":{"x":659.9457367335716,"y":521.4239589320457},"ex":706.5765259963921,"ey":556.2547031227506},"fullIconRect":{"x":613.314947470751,"y":486.5932147413408,"width":93.26157852564114,"height":69.66148838140978,"center":{"x":659.9457367335716,"y":521.4239589320457},"ex":706.5765259963921,"ey":556.2547031227506},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":627.5124511364072,"y":468.79383116688825,"width":84.7832532051283,"height":63.32862580128162,"center":{"x":669.9040777389714,"y":500.4581440675291},"ex":712.2957043415355,"ey":532.1224569681699},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":1010,"y":571},"parentId":null},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"text","tags":[],"visible":true,"rect":{"x":427.88033208613456,"y":558.8471510394179,"width":160.53080929487209,"height":33.000000000000064,"center":{"x":508.14573673357063,"y":575.3471510394179},"ex":588.4111413810067,"ey":591.847151039418},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000028,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"8b69cf4","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"text":"XXX笔记本电脑","type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":427.88033208613456,"y":583.5971510394179,"width":160.53080929487209,"height":8.250000000000016,"center":{"x":508.14573673357063,"y":587.7221510394179},"ex":588.4111413810067,"ey":591.8471510394179},"fullTextRect":{"x":427.88033208613456,"y":558.8471510394179,"width":160.53080929487209,"height":33.000000000000064,"center":{"x":508.14573673357063,"y":575.3471510394179},"ex":588.4111413810067,"ey":591.847151039418},"iconRect":{"x":0,"y":0,"width":0,"height":0,"center":{"x":0,"y":0},"ex":0,"ey":0},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":458.93552805948315,"y":534.4792278015038,"width":145.93709935897462,"height":30.000000000000057,"center":{"x":531.9040777389705,"y":549.4792278015038},"ex":604.8726274184578,"ey":564.4792278015038},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":725,"y":628},"parentId":null},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"text","tags":[],"visible":true,"rect":{"x":579.6803320861354,"y":558.8471510394179,"width":160.53080929487209,"height":33.000000000000064,"center":{"x":659.9457367335715,"y":575.3471510394179},"ex":740.2111413810076,"ey":591.847151039418},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000028,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"679b6545","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"text":"XXX笔记本电脑","type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":579.6803320861354,"y":583.5971510394179,"width":160.53080929487209,"height":8.250000000000016,"center":{"x":659.9457367335715,"y":587.7221510394179},"ex":740.2111413810076,"ey":591.8471510394179},"fullTextRect":{"x":579.6803320861354,"y":558.8471510394179,"width":160.53080929487209,"height":33.000000000000064,"center":{"x":659.9457367335715,"y":575.3471510394179},"ex":740.2111413810076,"ey":591.847151039418},"iconRect":{"x":0,"y":0,"width":0,"height":0,"center":{"x":0,"y":0},"ex":0,"ey":0},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":596.9355280594839,"y":534.4792278015038,"width":145.93709935897462,"height":30.000000000000057,"center":{"x":669.9040777389712,"y":549.4792278015038},"ex":742.8726274184585,"ey":564.4792278015038},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":837,"y":633},"parentId":null},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"text","tags":[],"visible":true,"rect":{"x":396.805993143827,"y":586.5104322894186,"width":176.0000000000004,"height":33.000000000000064,"center":{"x":484.8059931438272,"y":603.0104322894186},"ex":572.8059931438274,"ey":619.5104322894188},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000019,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"445a9704","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"text":"¥6999","type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":396.805993143827,"y":611.2604322894186,"width":176.0000000000004,"height":8.250000000000016,"center":{"x":484.8059931438272,"y":615.3854322894186},"ex":572.8059931438274,"ey":619.5104322894186},"fullTextRect":{"x":396.805993143827,"y":586.5104322894186,"width":176.0000000000004,"height":33.000000000000064,"center":{"x":484.8059931438272,"y":603.0104322894186},"ex":572.8059931438274,"ey":619.5104322894188},"iconRect":{"x":0,"y":0,"width":0,"height":0,"center":{"x":0,"y":0},"ex":0,"ey":0},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":430.6861290210217,"y":559.6276653015045,"width":160.00000000000034,"height":30.000000000000057,"center":{"x":510.6861290210219,"y":574.6276653015045},"ex":590.686129021022,"ey":589.6276653015045},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":599,"y":655},"parentId":null},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"text","tags":[],"visible":true,"rect":{"x":554.8957367335706,"y":586.5104322894186,"width":176.0000000000004,"height":33.000000000000064,"center":{"x":642.8957367335709,"y":603.0104322894186},"ex":730.8957367335711,"ey":619.5104322894188},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000019,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"5ec182b2","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"text":"¥6999","type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":554.8957367335706,"y":611.2604322894186,"width":176.0000000000004,"height":8.250000000000016,"center":{"x":642.8957367335709,"y":615.3854322894186},"ex":730.8957367335711,"ey":619.5104322894186},"fullTextRect":{"x":554.8957367335706,"y":586.5104322894186,"width":176.0000000000004,"height":33.000000000000064,"center":{"x":642.8957367335709,"y":603.0104322894186},"ex":730.8957367335711,"ey":619.5104322894188},"iconRect":{"x":0,"y":0,"width":0,"height":0,"center":{"x":0,"y":0},"ex":0,"ey":0},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":574.4040777389705,"y":559.6276653015045,"width":160.00000000000034,"height":30.000000000000057,"center":{"x":654.4040777389707,"y":574.6276653015045},"ex":734.4040777389708,"ey":589.6276653015045},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":872,"y":638},"parentId":null},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"square","tags":[],"visible":true,"rect":{"x":467.5832367335702,"y":482.1760134693056,"width":81.1250000000002,"height":78.49589092548085,"center":{"x":508.1457367335703,"y":521.423958932046},"ex":548.7082367335704,"ey":560.6719043947865},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000019,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"14bbb1f4","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":11.000000000000025,"paddingBottom":11.000000000000025,"paddingLeft":11.000000000000025,"paddingRight":11.000000000000025,"children":[],"text":"","iconColor":"#2f54eb","type":0,"animateType":"","paddingLeftNum":11.000000000000025,"paddingRightNum":11.000000000000025,"paddingTopNum":11.000000000000025,"paddingBottomNum":11.000000000000025,"textRect":{"x":478.5832367335702,"y":535.5479316634162,"width":59.12500000000014,"height":14.123972731370198,"center":{"x":508.14573673357023,"y":542.6099180291013},"ex":537.7082367335703,"ey":549.6719043947863},"fullTextRect":{"x":478.5832367335702,"y":493.1760134693056,"width":59.12500000000014,"height":56.49589092548079,"center":{"x":508.14573673357023,"y":521.4239589320459},"ex":537.7082367335703,"ey":549.6719043947863},"iconRect":{"x":478.5832367335702,"y":493.1760134693056,"width":59.12500000000014,"height":36.87191819411058,"center":{"x":508.14573673357023,"y":511.61197256636086},"ex":537.7082367335703,"ey":530.0479316634162},"fullIconRect":{"x":478.5832367335702,"y":493.1760134693056,"width":59.12500000000014,"height":56.49589092548079,"center":{"x":508.14573673357023,"y":521.4239589320459},"ex":537.7082367335703,"ey":549.6719043947863},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":495.02907773897005,"y":464.77819364685627,"width":73.75000000000017,"height":71.35990084134622,"center":{"x":531.9040777389702,"y":500.45814406752936},"ex":568.7790777389703,"ey":536.1380944882025},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":686,"y":580},"parentId":null},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"square","tags":[],"visible":true,"rect":{"x":619.3832367335708,"y":482.1760134693052,"width":81.1250000000002,"height":78.49589092548085,"center":{"x":659.9457367335709,"y":521.4239589320456},"ex":700.508236733571,"ey":560.671904394786},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1.1000000000000019,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"5e980b","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":11.000000000000025,"paddingBottom":11.000000000000025,"paddingLeft":11.000000000000025,"paddingRight":11.000000000000025,"children":[],"text":"","iconColor":"#2f54eb","type":0,"animateType":"","paddingLeftNum":11.000000000000025,"paddingRightNum":11.000000000000025,"paddingTopNum":11.000000000000025,"paddingBottomNum":11.000000000000025,"textRect":{"x":630.3832367335708,"y":535.5479316634157,"width":59.12500000000014,"height":14.123972731370198,"center":{"x":659.9457367335709,"y":542.6099180291009},"ex":689.5082367335709,"ey":549.6719043947859},"fullTextRect":{"x":630.3832367335708,"y":493.1760134693052,"width":59.12500000000014,"height":56.49589092548079,"center":{"x":659.9457367335709,"y":521.4239589320456},"ex":689.5082367335709,"ey":549.671904394786},"iconRect":{"x":630.3832367335708,"y":493.1760134693052,"width":59.12500000000014,"height":36.87191819411058,"center":{"x":659.9457367335709,"y":511.61197256636046},"ex":689.5082367335709,"ey":530.0479316634157},"fullIconRect":{"x":630.3832367335708,"y":493.1760134693052,"width":59.12500000000014,"height":56.49589092548079,"center":{"x":659.9457367335709,"y":521.4239589320456},"ex":689.5082367335709,"ey":549.671904394786},"fontColor":"#222222","fontFamily":"\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial","fontSize":13.200000000000031,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","oldRect":{"x":633.0290777389706,"y":464.7781936468559,"width":73.75000000000017,"height":71.35990084134622,"center":{"x":669.9040777389707,"y":500.458144067529},"ex":706.7790777389707,"ey":536.1380944882021},"z":0,"iconSize":0,"whiteSpace":"","evs":{"x":954,"y":600},"parentId":null}],"lineName":"curve","fromArrow":"","toArrow":"triangleSolid","scale":1.1,"locked":0,"x":1,"y":-39,"websocket":"","mqttUrl":"","mqttOptions":{"clientId":"c3db0e3"},"grid":true,"rule":true,"dbIndex":367}
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
              this.curAxure=this.axureList[0].content
              this.curAxureID=this.axureList[0].id
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
    newFormAxure() {
      const projectForm = new FormData();
      switch (this.axureFormIndex) {
        case '1':
          projectForm.append("axureData", JSON.stringify(this.dianShangForm));
          break;
        case '2':
          projectForm.append("axureData", JSON.stringify(this.xueShuForm));
          break;
        default:
          this.$message.error('请选择模板');
          return;
      }
      if(this.newAxureName === '') {
        this.$message.error('页面名称不能为空!')
        return;
      }
      projectForm.append("userID", localStorage.getItem('userID'));
      projectForm.append("projectID", this.$route.params.projectID);
      projectForm.append("axureName", this.newAxureName);
      projectForm.append("username", localStorage.getItem('username'));
      projectForm.append("authorization", localStorage.getItem('authorization'));
      this.$axios({
        method: 'post',
        url: 'ProjectManager/axureCreate/',
        data: projectForm,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                this.$message.success('页面创建成功');
                this.$emit('updateAxureList')
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    newAxure() {
      switch (this.newAxureType) {
        case 1:
          this.newAxureWidth = this.phoneWidth;
          this.newAxureHeight = this.phoneHeight;
          break;
        case 2:
          this.newAxureWidth = this.padWidth;
          this.newAxureHeight = this.padHeight;
          break;
        case 3:
          this.newAxureWidth = this.webWidth;
          this.newAxureHeight = this.webHeight;
          break;
        case 4:
          this.newAxureWidth = this.customWidth;
          this.newAxureHeight = this.customHeight;
          break;
        default:
          this.$message.error('请选择页面尺寸类型！');
          return;
      }
      if(this.newAxureName === '') {
        this.$message.error('页面名称不能为空!')
      }
      this.newAxureDialogVisible = false;
      let tmp = {
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
      tmp.pens[0].rect.width=this.newAxureWidth*0.4
      tmp.pens[0].rect.height=this.newAxureHeight*0.4
      const projectForm = new FormData();
      projectForm.append("userID", localStorage.getItem('userID'));
      projectForm.append("projectID", this.$route.params.projectID);
      projectForm.append("axureName", this.newAxureName);
      projectForm.append("axureData", JSON.stringify(tmp));
      projectForm.append("username", localStorage.getItem('username'));
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
                this.$message.success('页面创建成功!');
                this.updateAxure()
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    updateAxure() {
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
              this.previewList=res.data.axure_list;
            }
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
