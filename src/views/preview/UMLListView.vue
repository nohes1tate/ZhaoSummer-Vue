<template>
  <div>
    <div class="axure-leftnav">
      <el-menu
          mode="vertical"
          default-active="0"
          style="width: 30vh; height: 93vh"
      >
        <div v-for="(item,index1) in axureList" v-bind:key="index1+''">
          <el-menu-item :index="index1+''" @click="changeAxure(item.axureid,item.content)">
            <i class="el-icon-document"></i>
            {{ item.title }}
          </el-menu-item>
        </div>
        <el-menu-item index="newAxure"><i class="el-icon-plus"></i>新建页面</el-menu-item>
      </el-menu>
    </div>
    <preview-view :content="curContent"></preview-view>
  </div>
</template>

<script>

import PreviewView from "@/views/design/PreviewView";

export default {
  name: "UMLListView",
  components: {
    PreviewView
  },
  props: {
    list: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      axureList: this.list,
      curContent: '{\n' +
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
    }
  },
  methods: {
    changeAxure(axureID,content) {
      this.curContent=content
    }
  }
}
</script>

<style scoped>
.axure-leftnav {
  border-right: solid 1px #e6e6e6;
}
.el-menu-item {
  text-align: left;
}
</style>
