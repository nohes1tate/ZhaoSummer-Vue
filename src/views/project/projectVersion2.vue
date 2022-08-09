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
      <PreviewListView :list="axureList" v-show="showAxureEdit" :key="showAxureEdit" style="overflow: hidden"></PreviewListView>
    </div>
  </div>
</template>

<script>
import DocumentView from "@/views/documentEdit/DocumentView";
import PreviewListView from "@/views/preview/PreviewListView";

export default {
  name: "projectVersion2",
  components: { DocumentView, PreviewListView},
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
      axureList: [{axureid: '1',title: '页面1', content: '{\n' +
            '    "pens": [\n' +
            '        {\n' +
            '            "imageRatio": true,\n' +
            '            "points": [],\n' +
            '            "manualAnchors": [],\n' +
            '            "animateDuration": 0,\n' +
            '            "animateFrames": [],\n' +
            '            "animateFrame": 0,\n' +
            '            "name": "diamond",\n' +
            '            "tags": [],\n' +
            '            "visible": true,\n' +
            '            "rect": {\n' +
            '                "x": 227,\n' +
            '                "y": 198,\n' +
            '                "width": 120,\n' +
            '                "height": 50,\n' +
            '                "center": {\n' +
            '                    "x": 287,\n' +
            '                    "y": 223\n' +
            '                },\n' +
            '                "ex": 347,\n' +
            '                "ey": 248\n' +
            '            },\n' +
            '            "fontStyle": "normal",\n' +
            '            "fontWeight": "normal",\n' +
            '            "textBackground": "",\n' +
            '            "textDecoration": "",\n' +
            '            "textDecorationDash": 0,\n' +
            '            "textDecorationColor": "",\n' +
            '            "events": [],\n' +
            '            "dash": 0,\n' +
            '            "lineDashOffset": 0,\n' +
            '            "lineWidth": 1,\n' +
            '            "strokeStyle": "#222222",\n' +
            '            "fillStyle": "",\n' +
            '            "globalAlpha": 1,\n' +
            '            "rotate": 0,\n' +
            '            "offsetRotate": 0,\n' +
            '            "textMaxLine": 0,\n' +
            '            "textOffsetX": 0,\n' +
            '            "textOffsetY": 0,\n' +
            '            "animatePos": 0,\n' +
            '            "id": "36aea94b",\n' +
            '            "zRotate": 0,\n' +
            '            "borderRadius": 0,\n' +
            '            "imageAlign": "center",\n' +
            '            "gradientAngle": 0,\n' +
            '            "gradientRadius": 0.01,\n' +
            '            "paddingTop": 0,\n' +
            '            "paddingBottom": 0,\n' +
            '            "paddingLeft": 0,\n' +
            '            "paddingRight": 0,\n' +
            '            "children": [],\n' +
            '            "text": "决策/合并",\n' +
            '            "type": 0,\n' +
            '            "animateType": "",\n' +
            '            "paddingLeftNum": 0,\n' +
            '            "paddingRightNum": 0,\n' +
            '            "paddingTopNum": 0,\n' +
            '            "paddingBottomNum": 0,\n' +
            '            "textRect": {\n' +
            '                "x": 267,\n' +
            '                "y": 226.33333333333334,\n' +
            '                "width": 40,\n' +
            '                "height": 11.666666666666668,\n' +
            '                "center": {\n' +
            '                    "x": 287,\n' +
            '                    "y": 232.16666666666669\n' +
            '                },\n' +
            '                "ex": 307,\n' +
            '                "ey": 238\n' +
            '            },\n' +
            '            "fullTextRect": {\n' +
            '                "x": 257,\n' +
            '                "y": 210.5,\n' +
            '                "width": 60,\n' +
            '                "height": 25,\n' +
            '                "center": {\n' +
            '                    "x": 287,\n' +
            '                    "y": 223\n' +
            '                },\n' +
            '                "ex": 317,\n' +
            '                "ey": 235.5\n' +
            '            },\n' +
            '            "iconRect": {\n' +
            '                "x": 278.6666666666667,\n' +
            '                "y": 222,\n' +
            '                "width": 16.666666666666668,\n' +
            '                "height": 16.666666666666668,\n' +
            '                "center": {\n' +
            '                    "x": 287,\n' +
            '                    "y": 230.33333333333334\n' +
            '                },\n' +
            '                "ex": 295.33333333333337,\n' +
            '                "ey": 238.66666666666666\n' +
            '            },\n' +
            '            "fontColor": "#222222",\n' +
            '            "fontFamily": "\\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Helvetica Neue\\", Helvetica, Arial",\n' +
            '            "fontSize": 12,\n' +
            '            "lineHeight": 1.5,\n' +
            '            "textAlign": "center",\n' +
            '            "textBaseline": "middle",\n' +
            '            "whiteSpace": ""\n' +
            '        },\n' +
            '        {\n' +
            '            "imageRatio": true,\n' +
            '            "points": [],\n' +
            '            "manualAnchors": [],\n' +
            '            "animateDuration": 0,\n' +
            '            "animateFrames": [],\n' +
            '            "animateFrame": 0,\n' +
            '            "name": "forkH",\n' +
            '            "tags": [],\n' +
            '            "visible": true,\n' +
            '            "rect": {\n' +
            '                "x": 316,\n' +
            '                "y": 386,\n' +
            '                "width": 150,\n' +
            '                "height": 10,\n' +
            '                "center": {\n' +
            '                    "x": 391,\n' +
            '                    "y": 391\n' +
            '                },\n' +
            '                "ex": 466,\n' +
            '                "ey": 396\n' +
            '            },\n' +
            '            "fontStyle": "normal",\n' +
            '            "fontWeight": "normal",\n' +
            '            "textBackground": "",\n' +
            '            "textDecoration": "",\n' +
            '            "textDecorationDash": 0,\n' +
            '            "textDecorationColor": "",\n' +
            '            "events": [],\n' +
            '            "dash": 0,\n' +
            '            "lineDashOffset": 0,\n' +
            '            "lineWidth": 1,\n' +
            '            "strokeStyle": "transparent",\n' +
            '            "fillStyle": "#555",\n' +
            '            "globalAlpha": 1,\n' +
            '            "rotate": 0,\n' +
            '            "offsetRotate": 0,\n' +
            '            "textMaxLine": 0,\n' +
            '            "textOffsetX": 0,\n' +
            '            "textOffsetY": 0,\n' +
            '            "animatePos": 0,\n' +
            '            "id": "308222b7",\n' +
            '            "zRotate": 0,\n' +
            '            "borderRadius": 0,\n' +
            '            "imageAlign": "center",\n' +
            '            "gradientAngle": 0,\n' +
            '            "gradientRadius": 0.01,\n' +
            '            "paddingTop": 0,\n' +
            '            "paddingBottom": 0,\n' +
            '            "paddingLeft": 0,\n' +
            '            "paddingRight": 0,\n' +
            '            "children": [],\n' +
            '            "text": "水平分岔/汇合",\n' +
            '            "type": 0,\n' +
            '            "animateType": "",\n' +
            '            "paddingLeftNum": 0,\n' +
            '            "paddingRightNum": 0,\n' +
            '            "paddingTopNum": 0,\n' +
            '            "paddingBottomNum": 0,\n' +
            '            "textRect": {\n' +
            '                "x": 316,\n' +
            '                "y": 386,\n' +
            '                "width": 150,\n' +
            '                "height": 10,\n' +
            '                "center": {\n' +
            '                    "x": 391,\n' +
            '                    "y": 391\n' +
            '                },\n' +
            '                "ex": 466,\n' +
            '                "ey": 396\n' +
            '            },\n' +
            '            "fullTextRect": {\n' +
            '                "x": 316,\n' +
            '                "y": 386,\n' +
            '                "width": 150,\n' +
            '                "height": 10,\n' +
            '                "center": {\n' +
            '                    "x": 391,\n' +
            '                    "y": 391\n' +
            '                },\n' +
            '                "ex": 466,\n' +
            '                "ey": 396\n' +
            '            },\n' +
            '            "iconRect": {\n' +
            '                "x": 0,\n' +
            '                "y": 0,\n' +
            '                "width": 0,\n' +
            '                "height": 0,\n' +
            '                "center": {\n' +
            '                    "x": 0,\n' +
            '                    "y": 0\n' +
            '                },\n' +
            '                "ex": 0,\n' +
            '                "ey": 0\n' +
            '            },\n' +
            '            "fontColor": "#222222",\n' +
            '            "fontFamily": "\\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Helvetica Neue\\", Helvetica, Arial",\n' +
            '            "fontSize": 12,\n' +
            '            "lineHeight": 1.5,\n' +
            '            "textAlign": "center",\n' +
            '            "textBaseline": "middle",\n' +
            '            "whiteSpace": "",\n' +
            '            "evs": {\n' +
            '                "x": 881,\n' +
            '                "y": 432\n' +
            '            }\n' +
            '        },\n' +
            '        {\n' +
            '            "imageRatio": true,\n' +
            '            "points": [],\n' +
            '            "manualAnchors": [],\n' +
            '            "animateDuration": 0,\n' +
            '            "animateFrames": [],\n' +
            '            "animateFrame": 0,\n' +
            '            "name": "forkV",\n' +
            '            "tags": [],\n' +
            '            "visible": true,\n' +
            '            "rect": {\n' +
            '                "x": 188,\n' +
            '                "y": 267,\n' +
            '                "width": 10,\n' +
            '                "height": 150,\n' +
            '                "center": {\n' +
            '                    "x": 193,\n' +
            '                    "y": 342\n' +
            '                },\n' +
            '                "ex": 198,\n' +
            '                "ey": 417\n' +
            '            },\n' +
            '            "fontStyle": "normal",\n' +
            '            "fontWeight": "normal",\n' +
            '            "textBackground": "",\n' +
            '            "textDecoration": "",\n' +
            '            "textDecorationDash": 0,\n' +
            '            "textDecorationColor": "",\n' +
            '            "events": [],\n' +
            '            "dash": 0,\n' +
            '            "lineDashOffset": 0,\n' +
            '            "lineWidth": 1,\n' +
            '            "strokeStyle": "transparent",\n' +
            '            "fillStyle": "#555",\n' +
            '            "globalAlpha": 1,\n' +
            '            "rotate": 0,\n' +
            '            "offsetRotate": 0,\n' +
            '            "textMaxLine": 0,\n' +
            '            "textOffsetX": 0,\n' +
            '            "textOffsetY": 0,\n' +
            '            "animatePos": 0,\n' +
            '            "id": "2068a90f",\n' +
            '            "zRotate": 0,\n' +
            '            "borderRadius": 0,\n' +
            '            "imageAlign": "center",\n' +
            '            "gradientAngle": 0,\n' +
            '            "gradientRadius": 0.01,\n' +
            '            "paddingTop": 0,\n' +
            '            "paddingBottom": 0,\n' +
            '            "paddingLeft": 0,\n' +
            '            "paddingRight": 0,\n' +
            '            "children": [],\n' +
            '            "text": "垂直分岔/汇合",\n' +
            '            "type": 0,\n' +
            '            "animateType": "",\n' +
            '            "paddingLeftNum": 0,\n' +
            '            "paddingRightNum": 0,\n' +
            '            "paddingTopNum": 0,\n' +
            '            "paddingBottomNum": 0,\n' +
            '            "textRect": {\n' +
            '                "x": 188,\n' +
            '                "y": 267,\n' +
            '                "width": 10,\n' +
            '                "height": 150,\n' +
            '                "center": {\n' +
            '                    "x": 193,\n' +
            '                    "y": 342\n' +
            '                },\n' +
            '                "ex": 198,\n' +
            '                "ey": 417\n' +
            '            },\n' +
            '            "fullTextRect": {\n' +
            '                "x": 188,\n' +
            '                "y": 267,\n' +
            '                "width": 10,\n' +
            '                "height": 150,\n' +
            '                "center": {\n' +
            '                    "x": 193,\n' +
            '                    "y": 342\n' +
            '                },\n' +
            '                "ex": 198,\n' +
            '                "ey": 417\n' +
            '            },\n' +
            '            "iconRect": {\n' +
            '                "x": 0,\n' +
            '                "y": 0,\n' +
            '                "width": 0,\n' +
            '                "height": 0,\n' +
            '                "center": {\n' +
            '                    "x": 0,\n' +
            '                    "y": 0\n' +
            '                },\n' +
            '                "ex": 0,\n' +
            '                "ey": 0\n' +
            '            },\n' +
            '            "fontColor": "#222222",\n' +
            '            "fontFamily": "\\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Helvetica Neue\\", Helvetica, Arial",\n' +
            '            "fontSize": 12,\n' +
            '            "lineHeight": 1.5,\n' +
            '            "textAlign": "center",\n' +
            '            "textBaseline": "middle",\n' +
            '            "whiteSpace": "",\n' +
            '            "evs": {\n' +
            '                "x": 611,\n' +
            '                "y": 392\n' +
            '            }\n' +
            '        }\n' +
            '    ],\n' +
            '    "lineName": "curve",\n' +
            '    "fromArrow": "",\n' +
            '    "toArrow": "triangleSolid",\n' +
            '    "scale": 1,\n' +
            '    "locked": 0,\n' +
            '    "x": 0,\n' +
            '    "y": 0,\n' +
            '    "websocket": "",\n' +
            '    "mqttUrl": "",\n' +
            '    "mqttOptions": {\n' +
            '        "clientId": "30f95404"\n' +
            '    }\n' +
            '}'},
        {axureid: '2',title: '页面2',content: '{\n' +
              '    "pens": [\n' +
              '        {\n' +
              '            "imageRatio": true,\n' +
              '            "points": [],\n' +
              '            "manualAnchors": [],\n' +
              '            "animateDuration": 0,\n' +
              '            "animateFrames": [],\n' +
              '            "animateFrame": 0,\n' +
              '            "name": "rectangle",\n' +
              '            "tags": [],\n' +
              '            "visible": true,\n' +
              '            "rect": {\n' +
              '                "x": 144,\n' +
              '                "y": 69,\n' +
              '                "width": 120,\n' +
              '                "height": 40,\n' +
              '                "center": {\n' +
              '                    "x": 204,\n' +
              '                    "y": 89\n' +
              '                },\n' +
              '                "ex": 264,\n' +
              '                "ey": 109\n' +
              '            },\n' +
              '            "fontStyle": "normal",\n' +
              '            "fontWeight": "normal",\n' +
              '            "textBackground": "",\n' +
              '            "textDecoration": "",\n' +
              '            "textDecorationDash": 0,\n' +
              '            "textDecorationColor": "",\n' +
              '            "events": [],\n' +
              '            "dash": 0,\n' +
              '            "lineDashOffset": 0,\n' +
              '            "lineWidth": 1,\n' +
              '            "strokeStyle": "#222222",\n' +
              '            "fillStyle": "",\n' +
              '            "globalAlpha": 1,\n' +
              '            "rotate": 0,\n' +
              '            "offsetRotate": 0,\n' +
              '            "textMaxLine": 0,\n' +
              '            "textOffsetX": 0,\n' +
              '            "textOffsetY": 0,\n' +
              '            "animatePos": 0,\n' +
              '            "id": "1437a61",\n' +
              '            "zRotate": 0,\n' +
              '            "borderRadius": 0.5,\n' +
              '            "imageAlign": "center",\n' +
              '            "gradientAngle": 0,\n' +
              '            "gradientRadius": 0.01,\n' +
              '            "paddingTop": 0,\n' +
              '            "paddingBottom": 0,\n' +
              '            "paddingLeft": 0,\n' +
              '            "paddingRight": 0,\n' +
              '            "children": [],\n' +
              '            "text": "开始/结束",\n' +
              '            "type": 0,\n' +
              '            "animateType": "",\n' +
              '            "paddingLeftNum": 0,\n' +
              '            "paddingRightNum": 0,\n' +
              '            "paddingTopNum": 0,\n' +
              '            "paddingBottomNum": 0,\n' +
              '            "textRect": {\n' +
              '                "x": 184,\n' +
              '                "y": 69,\n' +
              '                "width": 80,\n' +
              '                "height": 40,\n' +
              '                "center": {\n' +
              '                    "x": 224,\n' +
              '                    "y": 89\n' +
              '                },\n' +
              '                "ex": 264,\n' +
              '                "ey": 109\n' +
              '            },\n' +
              '            "fullTextRect": {\n' +
              '                "x": 144,\n' +
              '                "y": 69,\n' +
              '                "width": 120,\n' +
              '                "height": 40,\n' +
              '                "center": {\n' +
              '                    "x": 204,\n' +
              '                    "y": 89\n' +
              '                },\n' +
              '                "ex": 264,\n' +
              '                "ey": 109\n' +
              '            },\n' +
              '            "iconRect": {\n' +
              '                "x": 144,\n' +
              '                "y": 69,\n' +
              '                "width": 40,\n' +
              '                "height": 40,\n' +
              '                "center": {\n' +
              '                    "x": 164,\n' +
              '                    "y": 89\n' +
              '                },\n' +
              '                "ex": 184,\n' +
              '                "ey": 109\n' +
              '            },\n' +
              '            "fullIconRect": {\n' +
              '                "x": 144,\n' +
              '                "y": 69,\n' +
              '                "width": 120,\n' +
              '                "height": 40,\n' +
              '                "center": {\n' +
              '                    "x": 204,\n' +
              '                    "y": 89\n' +
              '                },\n' +
              '                "ex": 264,\n' +
              '                "ey": 109\n' +
              '            },\n' +
              '            "fontColor": "#222222",\n' +
              '            "fontFamily": "\\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Helvetica Neue\\", Helvetica, Arial",\n' +
              '            "fontSize": 12,\n' +
              '            "lineHeight": 1.5,\n' +
              '            "textAlign": "center",\n' +
              '            "textBaseline": "middle",\n' +
              '            "whiteSpace": "",\n' +
              '            "evs": {\n' +
              '                "x": 569,\n' +
              '                "y": 123\n' +
              '            }\n' +
              '        },\n' +
              '        {\n' +
              '            "imageRatio": true,\n' +
              '            "points": [],\n' +
              '            "manualAnchors": [],\n' +
              '            "animateDuration": 0,\n' +
              '            "animateFrames": [],\n' +
              '            "animateFrame": 0,\n' +
              '            "name": "flowData",\n' +
              '            "tags": [],\n' +
              '            "visible": true,\n' +
              '            "rect": {\n' +
              '                "x": 299,\n' +
              '                "y": 189,\n' +
              '                "width": 120,\n' +
              '                "height": 50,\n' +
              '                "center": {\n' +
              '                    "x": 359,\n' +
              '                    "y": 214\n' +
              '                },\n' +
              '                "ex": 419,\n' +
              '                "ey": 239\n' +
              '            },\n' +
              '            "fontStyle": "normal",\n' +
              '            "fontWeight": "normal",\n' +
              '            "textBackground": "",\n' +
              '            "textDecoration": "",\n' +
              '            "textDecorationDash": 0,\n' +
              '            "textDecorationColor": "",\n' +
              '            "events": [],\n' +
              '            "dash": 0,\n' +
              '            "lineDashOffset": 0,\n' +
              '            "lineWidth": 1,\n' +
              '            "strokeStyle": "#222222",\n' +
              '            "fillStyle": "",\n' +
              '            "globalAlpha": 1,\n' +
              '            "rotate": 0,\n' +
              '            "offsetRotate": 0,\n' +
              '            "textMaxLine": 0,\n' +
              '            "textOffsetX": 0,\n' +
              '            "textOffsetY": 0,\n' +
              '            "animatePos": 0,\n' +
              '            "id": "cdf5240",\n' +
              '            "zRotate": 0,\n' +
              '            "borderRadius": 0,\n' +
              '            "imageAlign": "center",\n' +
              '            "gradientAngle": 0,\n' +
              '            "gradientRadius": 0.01,\n' +
              '            "paddingTop": 0,\n' +
              '            "paddingBottom": 0,\n' +
              '            "paddingLeft": 0,\n' +
              '            "paddingRight": 0,\n' +
              '            "children": [],\n' +
              '            "text": "数据",\n' +
              '            "type": 0,\n' +
              '            "animateType": "",\n' +
              '            "paddingLeftNum": 0,\n' +
              '            "paddingRightNum": 0,\n' +
              '            "paddingTopNum": 0,\n' +
              '            "paddingBottomNum": 0,\n' +
              '            "textRect": {\n' +
              '                "x": 316.14285714285717,\n' +
              '                "y": 189,\n' +
              '                "width": 85.71428571428571,\n' +
              '                "height": 50,\n' +
              '                "center": {\n' +
              '                    "x": 359,\n' +
              '                    "y": 214\n' +
              '                },\n' +
              '                "ex": 401.8571428571429,\n' +
              '                "ey": 239\n' +
              '            },\n' +
              '            "fullTextRect": {\n' +
              '                "x": 316.14285714285717,\n' +
              '                "y": 189,\n' +
              '                "width": 85.71428571428571,\n' +
              '                "height": 50,\n' +
              '                "center": {\n' +
              '                    "x": 359,\n' +
              '                    "y": 214\n' +
              '                },\n' +
              '                "ex": 401.8571428571429,\n' +
              '                "ey": 239\n' +
              '            },\n' +
              '            "iconRect": {\n' +
              '                "x": 0,\n' +
              '                "y": 0,\n' +
              '                "width": 0,\n' +
              '                "height": 0,\n' +
              '                "center": {\n' +
              '                    "x": 0,\n' +
              '                    "y": 0\n' +
              '                },\n' +
              '                "ex": 0,\n' +
              '                "ey": 0\n' +
              '            },\n' +
              '            "fontColor": "#222222",\n' +
              '            "fontFamily": "\\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Helvetica Neue\\", Helvetica, Arial",\n' +
              '            "fontSize": 12,\n' +
              '            "lineHeight": 1.5,\n' +
              '            "textAlign": "center",\n' +
              '            "textBaseline": "middle",\n' +
              '            "whiteSpace": "",\n' +
              '            "evs": {\n' +
              '                "x": 766,\n' +
              '                "y": 261\n' +
              '            }\n' +
              '        },\n' +
              '        {\n' +
              '            "imageRatio": true,\n' +
              '            "points": [],\n' +
              '            "manualAnchors": [],\n' +
              '            "animateDuration": 0,\n' +
              '            "animateFrames": [],\n' +
              '            "animateFrame": 0,\n' +
              '            "name": "flowManually",\n' +
              '            "tags": [],\n' +
              '            "visible": true,\n' +
              '            "rect": {\n' +
              '                "x": 91,\n' +
              '                "y": 257,\n' +
              '                "width": 120,\n' +
              '                "height": 80,\n' +
              '                "center": {\n' +
              '                    "x": 151,\n' +
              '                    "y": 297\n' +
              '                },\n' +
              '                "ex": 211,\n' +
              '                "ey": 337\n' +
              '            },\n' +
              '            "fontStyle": "normal",\n' +
              '            "fontWeight": "normal",\n' +
              '            "textBackground": "",\n' +
              '            "textDecoration": "",\n' +
              '            "textDecorationDash": 0,\n' +
              '            "textDecorationColor": "",\n' +
              '            "events": [],\n' +
              '            "dash": 0,\n' +
              '            "lineDashOffset": 0,\n' +
              '            "lineWidth": 1,\n' +
              '            "strokeStyle": "#222222",\n' +
              '            "fillStyle": "",\n' +
              '            "globalAlpha": 1,\n' +
              '            "rotate": 0,\n' +
              '            "offsetRotate": 0,\n' +
              '            "textMaxLine": 0,\n' +
              '            "textOffsetX": 0,\n' +
              '            "textOffsetY": 0,\n' +
              '            "animatePos": 0,\n' +
              '            "id": "420f7574",\n' +
              '            "zRotate": 0,\n' +
              '            "borderRadius": 0,\n' +
              '            "imageAlign": "center",\n' +
              '            "gradientAngle": 0,\n' +
              '            "gradientRadius": 0.01,\n' +
              '            "paddingTop": 0,\n' +
              '            "paddingBottom": 0,\n' +
              '            "paddingLeft": 0,\n' +
              '            "paddingRight": 0,\n' +
              '            "children": [],\n' +
              '            "text": "手动输入",\n' +
              '            "type": 0,\n' +
              '            "animateType": "",\n' +
              '            "paddingLeftNum": 0,\n' +
              '            "paddingRightNum": 0,\n' +
              '            "paddingTopNum": 0,\n' +
              '            "paddingBottomNum": 0,\n' +
              '            "textRect": {\n' +
              '                "x": 91,\n' +
              '                "y": 277,\n' +
              '                "width": 120,\n' +
              '                "height": 60,\n' +
              '                "center": {\n' +
              '                    "x": 151,\n' +
              '                    "y": 307\n' +
              '                },\n' +
              '                "ex": 211,\n' +
              '                "ey": 337\n' +
              '            },\n' +
              '            "fullTextRect": {\n' +
              '                "x": 91,\n' +
              '                "y": 277,\n' +
              '                "width": 120,\n' +
              '                "height": 60,\n' +
              '                "center": {\n' +
              '                    "x": 151,\n' +
              '                    "y": 307\n' +
              '                },\n' +
              '                "ex": 211,\n' +
              '                "ey": 337\n' +
              '            },\n' +
              '            "iconRect": {\n' +
              '                "x": 0,\n' +
              '                "y": 0,\n' +
              '                "width": 0,\n' +
              '                "height": 0,\n' +
              '                "center": {\n' +
              '                    "x": 0,\n' +
              '                    "y": 0\n' +
              '                },\n' +
              '                "ex": 0,\n' +
              '                "ey": 0\n' +
              '            },\n' +
              '            "fontColor": "#222222",\n' +
              '            "fontFamily": "\\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Helvetica Neue\\", Helvetica, Arial",\n' +
              '            "fontSize": 12,\n' +
              '            "lineHeight": 1.5,\n' +
              '            "textAlign": "center",\n' +
              '            "textBaseline": "middle",\n' +
              '            "whiteSpace": "",\n' +
              '            "evs": {\n' +
              '                "x": 567,\n' +
              '                "y": 347\n' +
              '            }\n' +
              '        },\n' +
              '        {\n' +
              '            "imageRatio": true,\n' +
              '            "points": [],\n' +
              '            "manualAnchors": [],\n' +
              '            "animateDuration": 0,\n' +
              '            "animateFrames": [],\n' +
              '            "animateFrame": 0,\n' +
              '            "name": "flowQueue",\n' +
              '            "tags": [],\n' +
              '            "visible": true,\n' +
              '            "rect": {\n' +
              '                "x": 19,\n' +
              '                "y": 134,\n' +
              '                "width": 100,\n' +
              '                "height": 100,\n' +
              '                "center": {\n' +
              '                    "x": 69,\n' +
              '                    "y": 184\n' +
              '                },\n' +
              '                "ex": 119,\n' +
              '                "ey": 234\n' +
              '            },\n' +
              '            "fontStyle": "normal",\n' +
              '            "fontWeight": "normal",\n' +
              '            "textBackground": "",\n' +
              '            "textDecoration": "",\n' +
              '            "textDecorationDash": 0,\n' +
              '            "textDecorationColor": "",\n' +
              '            "events": [],\n' +
              '            "dash": 0,\n' +
              '            "lineDashOffset": 0,\n' +
              '            "lineWidth": 1,\n' +
              '            "strokeStyle": "#222222",\n' +
              '            "fillStyle": "",\n' +
              '            "globalAlpha": 1,\n' +
              '            "rotate": 0,\n' +
              '            "offsetRotate": 0,\n' +
              '            "textMaxLine": 0,\n' +
              '            "textOffsetX": 0,\n' +
              '            "textOffsetY": 0,\n' +
              '            "animatePos": 0,\n' +
              '            "id": "6a7bd028",\n' +
              '            "zRotate": 0,\n' +
              '            "borderRadius": 0,\n' +
              '            "imageAlign": "center",\n' +
              '            "gradientAngle": 0,\n' +
              '            "gradientRadius": 0.01,\n' +
              '            "paddingTop": 0,\n' +
              '            "paddingBottom": 0,\n' +
              '            "paddingLeft": 0,\n' +
              '            "paddingRight": 0,\n' +
              '            "children": [],\n' +
              '            "text": "队列",\n' +
              '            "type": 0,\n' +
              '            "animateType": "",\n' +
              '            "paddingLeftNum": 0,\n' +
              '            "paddingRightNum": 0,\n' +
              '            "paddingTopNum": 0,\n' +
              '            "paddingBottomNum": 0,\n' +
              '            "textRect": {\n' +
              '                "x": 33.285714285714285,\n' +
              '                "y": 148.28571428571428,\n' +
              '                "width": 71.42857142857143,\n' +
              '                "height": 71.42857142857143,\n' +
              '                "center": {\n' +
              '                    "x": 69,\n' +
              '                    "y": 184\n' +
              '                },\n' +
              '                "ex": 104.71428571428572,\n' +
              '                "ey": 219.71428571428572\n' +
              '            },\n' +
              '            "fullTextRect": {\n' +
              '                "x": 33.285714285714285,\n' +
              '                "y": 148.28571428571428,\n' +
              '                "width": 71.42857142857143,\n' +
              '                "height": 71.42857142857143,\n' +
              '                "center": {\n' +
              '                    "x": 69,\n' +
              '                    "y": 184\n' +
              '                },\n' +
              '                "ex": 104.71428571428572,\n' +
              '                "ey": 219.71428571428572\n' +
              '            },\n' +
              '            "iconRect": {\n' +
              '                "x": 0,\n' +
              '                "y": 0,\n' +
              '                "width": 0,\n' +
              '                "height": 0,\n' +
              '                "center": {\n' +
              '                    "x": 0,\n' +
              '                    "y": 0\n' +
              '                },\n' +
              '                "ex": 0,\n' +
              '                "ey": 0\n' +
              '            },\n' +
              '            "fontColor": "#222222",\n' +
              '            "fontFamily": "\\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Helvetica Neue\\", Helvetica, Arial",\n' +
              '            "fontSize": 12,\n' +
              '            "lineHeight": 1.5,\n' +
              '            "textAlign": "center",\n' +
              '            "textBaseline": "middle",\n' +
              '            "whiteSpace": "",\n' +
              '            "evs": {\n' +
              '                "x": 486,\n' +
              '                "y": 233\n' +
              '            }\n' +
              '        }\n' +
              '    ],\n' +
              '    "lineName": "curve",\n' +
              '    "fromArrow": "",\n' +
              '    "toArrow": "triangleSolid",\n' +
              '    "scale": 1,\n' +
              '    "locked": 0,\n' +
              '    "x": 0,\n' +
              '    "y": 0,\n' +
              '    "websocket": "",\n' +
              '    "mqttUrl": "",\n' +
              '    "mqttOptions": {\n' +
              '        "clientId": "30f95404"\n' +
              '    }\n' +
              '}'},
        {
          axureid: '3', title: '页面3',content: '{\n' +
              '    "pens": [\n' +
              '        {\n' +
              '            "imageRatio": true,\n' +
              '            "points": [],\n' +
              '            "manualAnchors": [],\n' +
              '            "animateDuration": 0,\n' +
              '            "animateFrames": [],\n' +
              '            "animateFrame": 0,\n' +
              '            "name": "rectangle",\n' +
              '            "tags": [],\n' +
              '            "visible": true,\n' +
              '            "rect": {\n' +
              '                "x": 162,\n' +
              '                "y": 118,\n' +
              '                "width": 120,\n' +
              '                "height": 40,\n' +
              '                "center": {\n' +
              '                    "x": 222,\n' +
              '                    "y": 138\n' +
              '                },\n' +
              '                "ex": 282,\n' +
              '                "ey": 158\n' +
              '            },\n' +
              '            "fontStyle": "normal",\n' +
              '            "fontWeight": "normal",\n' +
              '            "textBackground": "",\n' +
              '            "textDecoration": "",\n' +
              '            "textDecorationDash": 0,\n' +
              '            "textDecorationColor": "",\n' +
              '            "events": [],\n' +
              '            "dash": 0,\n' +
              '            "lineDashOffset": 0,\n' +
              '            "lineWidth": 1,\n' +
              '            "strokeStyle": "#222222",\n' +
              '            "fillStyle": "",\n' +
              '            "globalAlpha": 1,\n' +
              '            "rotate": 0,\n' +
              '            "offsetRotate": 0,\n' +
              '            "textMaxLine": 0,\n' +
              '            "textOffsetX": 0,\n' +
              '            "textOffsetY": 0,\n' +
              '            "animatePos": 0,\n' +
              '            "id": "1cc5e516",\n' +
              '            "zRotate": 0,\n' +
              '            "borderRadius": 0,\n' +
              '            "imageAlign": "center",\n' +
              '            "gradientAngle": 0,\n' +
              '            "gradientRadius": 0.01,\n' +
              '            "paddingTop": 0,\n' +
              '            "paddingBottom": 0,\n' +
              '            "paddingLeft": 0,\n' +
              '            "paddingRight": 0,\n' +
              '            "children": [],\n' +
              '            "text": "流程",\n' +
              '            "type": 0,\n' +
              '            "animateType": "",\n' +
              '            "paddingLeftNum": 0,\n' +
              '            "paddingRightNum": 0,\n' +
              '            "paddingTopNum": 0,\n' +
              '            "paddingBottomNum": 0,\n' +
              '            "textRect": {\n' +
              '                "x": 202,\n' +
              '                "y": 118,\n' +
              '                "width": 80,\n' +
              '                "height": 40,\n' +
              '                "center": {\n' +
              '                    "x": 242,\n' +
              '                    "y": 138\n' +
              '                },\n' +
              '                "ex": 282,\n' +
              '                "ey": 158\n' +
              '            },\n' +
              '            "fullTextRect": {\n' +
              '                "x": 162,\n' +
              '                "y": 118,\n' +
              '                "width": 120,\n' +
              '                "height": 40,\n' +
              '                "center": {\n' +
              '                    "x": 222,\n' +
              '                    "y": 138\n' +
              '                },\n' +
              '                "ex": 282,\n' +
              '                "ey": 158\n' +
              '            },\n' +
              '            "iconRect": {\n' +
              '                "x": 162,\n' +
              '                "y": 118,\n' +
              '                "width": 40,\n' +
              '                "height": 40,\n' +
              '                "center": {\n' +
              '                    "x": 182,\n' +
              '                    "y": 138\n' +
              '                },\n' +
              '                "ex": 202,\n' +
              '                "ey": 158\n' +
              '            },\n' +
              '            "fullIconRect": {\n' +
              '                "x": 162,\n' +
              '                "y": 118,\n' +
              '                "width": 120,\n' +
              '                "height": 40,\n' +
              '                "center": {\n' +
              '                    "x": 222,\n' +
              '                    "y": 138\n' +
              '                },\n' +
              '                "ex": 282,\n' +
              '                "ey": 158\n' +
              '            },\n' +
              '            "fontColor": "#222222",\n' +
              '            "fontFamily": "\\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Helvetica Neue\\", Helvetica, Arial",\n' +
              '            "fontSize": 12,\n' +
              '            "lineHeight": 1.5,\n' +
              '            "textAlign": "center",\n' +
              '            "textBaseline": "middle",\n' +
              '            "whiteSpace": "",\n' +
              '            "evs": {\n' +
              '                "x": 596,\n' +
              '                "y": 172\n' +
              '            }\n' +
              '        },\n' +
              '        {\n' +
              '            "imageRatio": true,\n' +
              '            "points": [],\n' +
              '            "manualAnchors": [],\n' +
              '            "animateDuration": 0,\n' +
              '            "animateFrames": [],\n' +
              '            "animateFrame": 0,\n' +
              '            "name": "flowData",\n' +
              '            "tags": [],\n' +
              '            "visible": true,\n' +
              '            "rect": {\n' +
              '                "x": 389,\n' +
              '                "y": 209,\n' +
              '                "width": 120,\n' +
              '                "height": 50,\n' +
              '                "center": {\n' +
              '                    "x": 449,\n' +
              '                    "y": 234\n' +
              '                },\n' +
              '                "ex": 509,\n' +
              '                "ey": 259\n' +
              '            },\n' +
              '            "fontStyle": "normal",\n' +
              '            "fontWeight": "normal",\n' +
              '            "textBackground": "",\n' +
              '            "textDecoration": "",\n' +
              '            "textDecorationDash": 0,\n' +
              '            "textDecorationColor": "",\n' +
              '            "events": [],\n' +
              '            "dash": 0,\n' +
              '            "lineDashOffset": 0,\n' +
              '            "lineWidth": 1,\n' +
              '            "strokeStyle": "#222222",\n' +
              '            "fillStyle": "",\n' +
              '            "globalAlpha": 1,\n' +
              '            "rotate": 0,\n' +
              '            "offsetRotate": 0,\n' +
              '            "textMaxLine": 0,\n' +
              '            "textOffsetX": 0,\n' +
              '            "textOffsetY": 0,\n' +
              '            "animatePos": 0,\n' +
              '            "id": "8384135",\n' +
              '            "zRotate": 0,\n' +
              '            "borderRadius": 0,\n' +
              '            "imageAlign": "center",\n' +
              '            "gradientAngle": 0,\n' +
              '            "gradientRadius": 0.01,\n' +
              '            "paddingTop": 0,\n' +
              '            "paddingBottom": 0,\n' +
              '            "paddingLeft": 0,\n' +
              '            "paddingRight": 0,\n' +
              '            "children": [],\n' +
              '            "text": "数据",\n' +
              '            "type": 0,\n' +
              '            "animateType": "",\n' +
              '            "paddingLeftNum": 0,\n' +
              '            "paddingRightNum": 0,\n' +
              '            "paddingTopNum": 0,\n' +
              '            "paddingBottomNum": 0,\n' +
              '            "textRect": {\n' +
              '                "x": 406.14285714285717,\n' +
              '                "y": 209,\n' +
              '                "width": 85.71428571428571,\n' +
              '                "height": 50,\n' +
              '                "center": {\n' +
              '                    "x": 449,\n' +
              '                    "y": 234\n' +
              '                },\n' +
              '                "ex": 491.8571428571429,\n' +
              '                "ey": 259\n' +
              '            },\n' +
              '            "fullTextRect": {\n' +
              '                "x": 406.14285714285717,\n' +
              '                "y": 209,\n' +
              '                "width": 85.71428571428571,\n' +
              '                "height": 50,\n' +
              '                "center": {\n' +
              '                    "x": 449,\n' +
              '                    "y": 234\n' +
              '                },\n' +
              '                "ex": 491.8571428571429,\n' +
              '                "ey": 259\n' +
              '            },\n' +
              '            "iconRect": {\n' +
              '                "x": 0,\n' +
              '                "y": 0,\n' +
              '                "width": 0,\n' +
              '                "height": 0,\n' +
              '                "center": {\n' +
              '                    "x": 0,\n' +
              '                    "y": 0\n' +
              '                },\n' +
              '                "ex": 0,\n' +
              '                "ey": 0\n' +
              '            },\n' +
              '            "fontColor": "#222222",\n' +
              '            "fontFamily": "\\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Helvetica Neue\\", Helvetica, Arial",\n' +
              '            "fontSize": 12,\n' +
              '            "lineHeight": 1.5,\n' +
              '            "textAlign": "center",\n' +
              '            "textBaseline": "middle",\n' +
              '            "whiteSpace": "",\n' +
              '            "evs": {\n' +
              '                "x": 865,\n' +
              '                "y": 284\n' +
              '            }\n' +
              '        },\n' +
              '        {\n' +
              '            "imageRatio": true,\n' +
              '            "points": [],\n' +
              '            "manualAnchors": [],\n' +
              '            "animateDuration": 0,\n' +
              '            "animateFrames": [],\n' +
              '            "animateFrame": 0,\n' +
              '            "name": "flowDocument",\n' +
              '            "tags": [],\n' +
              '            "visible": true,\n' +
              '            "rect": {\n' +
              '                "x": 124,\n' +
              '                "y": 235,\n' +
              '                "width": 120,\n' +
              '                "height": 100,\n' +
              '                "center": {\n' +
              '                    "x": 184,\n' +
              '                    "y": 285\n' +
              '                },\n' +
              '                "ex": 244,\n' +
              '                "ey": 335\n' +
              '            },\n' +
              '            "fontStyle": "normal",\n' +
              '            "fontWeight": "normal",\n' +
              '            "textBackground": "",\n' +
              '            "textDecoration": "",\n' +
              '            "textDecorationDash": 0,\n' +
              '            "textDecorationColor": "",\n' +
              '            "events": [],\n' +
              '            "dash": 0,\n' +
              '            "lineDashOffset": 0,\n' +
              '            "lineWidth": 1,\n' +
              '            "strokeStyle": "#222222",\n' +
              '            "fillStyle": "",\n' +
              '            "globalAlpha": 1,\n' +
              '            "rotate": 0,\n' +
              '            "offsetRotate": 0,\n' +
              '            "textMaxLine": 0,\n' +
              '            "textOffsetX": 0,\n' +
              '            "textOffsetY": 0,\n' +
              '            "animatePos": 0,\n' +
              '            "id": "0c043ab",\n' +
              '            "zRotate": 0,\n' +
              '            "borderRadius": 0,\n' +
              '            "imageAlign": "center",\n' +
              '            "gradientAngle": 0,\n' +
              '            "gradientRadius": 0.01,\n' +
              '            "paddingTop": 0,\n' +
              '            "paddingBottom": 0,\n' +
              '            "paddingLeft": 0,\n' +
              '            "paddingRight": 0,\n' +
              '            "children": [],\n' +
              '            "text": "文档",\n' +
              '            "type": 0,\n' +
              '            "animateType": "",\n' +
              '            "paddingLeftNum": 0,\n' +
              '            "paddingRightNum": 0,\n' +
              '            "paddingTopNum": 0,\n' +
              '            "paddingBottomNum": 0,\n' +
              '            "textRect": {\n' +
              '                "x": 124,\n' +
              '                "y": 235,\n' +
              '                "width": 120,\n' +
              '                "height": 71.42857142857143,\n' +
              '                "center": {\n' +
              '                    "x": 184,\n' +
              '                    "y": 270.7142857142857\n' +
              '                },\n' +
              '                "ex": 244,\n' +
              '                "ey": 306.42857142857144\n' +
              '            },\n' +
              '            "fullTextRect": {\n' +
              '                "x": 124,\n' +
              '                "y": 235,\n' +
              '                "width": 120,\n' +
              '                "height": 71.42857142857143,\n' +
              '                "center": {\n' +
              '                    "x": 184,\n' +
              '                    "y": 270.7142857142857\n' +
              '                },\n' +
              '                "ex": 244,\n' +
              '                "ey": 306.42857142857144\n' +
              '            },\n' +
              '            "iconRect": {\n' +
              '                "x": 0,\n' +
              '                "y": 0,\n' +
              '                "width": 0,\n' +
              '                "height": 0,\n' +
              '                "center": {\n' +
              '                    "x": 0,\n' +
              '                    "y": 0\n' +
              '                },\n' +
              '                "ex": 0,\n' +
              '                "ey": 0\n' +
              '            },\n' +
              '            "fontColor": "#222222",\n' +
              '            "fontFamily": "\\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Helvetica Neue\\", Helvetica, Arial",\n' +
              '            "fontSize": 12,\n' +
              '            "lineHeight": 1.5,\n' +
              '            "textAlign": "center",\n' +
              '            "textBaseline": "middle",\n' +
              '            "whiteSpace": "",\n' +
              '            "evs": {\n' +
              '                "x": 602,\n' +
              '                "y": 333\n' +
              '            }\n' +
              '        }\n' +
              '    ],\n' +
              '    "lineName": "curve",\n' +
              '    "fromArrow": "",\n' +
              '    "toArrow": "triangleSolid",\n' +
              '    "scale": 1,\n' +
              '    "locked": 0,\n' +
              '    "x": 0,\n' +
              '    "y": -5,\n' +
              '    "websocket": "",\n' +
              '    "mqttUrl": "",\n' +
              '    "mqttOptions": {\n' +
              '        "clientId": "1a44a8ca"\n' +
              '    }\n' +
              '}'
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
