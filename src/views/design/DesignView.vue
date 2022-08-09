<template>
  <div style="display: flex">
    <div class="axure-leftnav">
      <el-menu
          mode="vertical"
          default-active="0"
          style="width: 30vh;height: 100vh"
      >
        <div v-for="(item,index1) in axureList" v-bind:key="index1+''">
          <el-menu-item :index="index1+''" @click="changeAxure(item.axureid,item.content)">
            <i class="el-icon-document"></i>
            {{ item.title }}
          </el-menu-item>
        </div>
        <el-menu-item index="newAxure" @click="newAxureDialogVisible = true"><i class="el-icon-plus"></i>新建页面</el-menu-item>
      </el-menu>
      <el-dialog title="新建页面" :visible.sync="newAxureDialogVisible">
        <el-input v-model="newAxureName" placeholder="页面名称"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="newAxureDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="newAxure">确 定</el-button>
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
  props: {
    list: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  data() {
    return {
      curAxure: '{"pens":[{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"atlassian.x","tags":[],"visible":true,"rect":{"x":87,"y":23,"width":100,"height":100,"center":{"x":137,"y":73},"ex":187,"ey":123},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"65d339cb","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":87,"y":98,"width":100,"height":25,"center":{"x":137,"y":110.5},"ex":187,"ey":123},"fullTextRect":{"x":87,"y":23,"width":100,"height":100,"center":{"x":137,"y":73},"ex":187,"ey":123},"iconRect":{"x":87,"y":23,"width":100,"height":75,"center":{"x":137,"y":60.5},"ex":187,"ey":98},"fullIconRect":{"x":87,"y":23,"width":100,"height":100,"center":{"x":137,"y":73},"ex":187,"ey":123},"fontColor":"#222222","fontFamily":"\\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Helvetica Neue\\", Helvetica, Arial","fontSize":12,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","tmp":null,"whiteSpace":"","evs":{"x":550,"y":138}},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"atlassian.x","tags":[],"visible":true,"rect":{"x":392,"y":23,"width":100,"height":100,"center":{"x":442,"y":73},"ex":492,"ey":123},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"aa8414a","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":392,"y":98,"width":100,"height":25,"center":{"x":442,"y":110.5},"ex":492,"ey":123},"fullTextRect":{"x":392,"y":23,"width":100,"height":100,"center":{"x":442,"y":73},"ex":492,"ey":123},"iconRect":{"x":392,"y":23,"width":100,"height":75,"center":{"x":442,"y":60.5},"ex":492,"ey":98},"fullIconRect":{"x":392,"y":23,"width":100,"height":100,"center":{"x":442,"y":73},"ex":492,"ey":123},"fontColor":"#222222","fontFamily":"\\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Helvetica Neue\\", Helvetica, Arial","fontSize":12,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","tmp":null,"whiteSpace":"","evs":{"x":854,"y":157}}],"lineName":"curve","fromArrow":"","toArrow":"triangleSolid","scale":1,"locked":0,"x":0,"y":0,"websocket":"","mqttUrl":"","mqttOptions":{"clientId":"c719732"}}',
      curAxureID: '1',
      axureList: this.list,
      newAxureName: '',
      newAxureWidth: {default: 0},
      newAxureHeight: {default: 0},
      newAxureDialogVisible: false,
    }
  },
  methods: {
    handleAxureChange(content,axureID){
      //console.log('gotchange')
      let index = null
     // console.log(axureID)
      for(index=0; index<this.axureList.length; index++){
        if(this.axureList[index].axureid === axureID){
          //console.log('nani')
          this.axureList[index].content=content
         // console.log('axureID ',index,' ischange')
        }
      }
    },
    changeAxure(axureID,content){
      this.curAxure=content,
          this.curAxureID=axureID
    },
    newAxure() {
      this.newAxureDialogVisible = false;
    }
  }
}
</script>

<style scoped>
.axure-leftnav {
  border-right: solid 1px #e6e6e6;
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
