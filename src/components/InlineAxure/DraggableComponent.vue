<template>
  <div style="height: 500px; width: 500px; border: 1px solid red; margin: auto;">
    <vue-draggable-resizable :w="100" :h="100"
                             :x="item.x"
                             :y="item.y"
                             v-for="(item,index) in control"
                             v-bind:key="index"
                             @dragging="onDrag"
                             @resizing="onResize"
                             @activated="onActivate"
                             :common-class-name="commonClassName"
                             :custom-id="item.customId"
                             :parent="true"
                             :lock-aspect-ratio="item.lock">
        <img src="http://mmbiz.qpic.cn/mmbiz/PwIlO51l7wuFyoFwAXfqPNETWCibjNACIt6ydN7vw8LeIwT7IjyG3eeribmK4rhibecvNKiaT2qeJRIWXLuKYPiaqtQ/0"
        alt="图片"
             :width="item.width" :height="item.height"
        />
    </vue-draggable-resizable>
    <span class="iconfont icon-ambitus02" style="font-size: 200px"></span>
  </div>
</template>

<script>
import VueDraggableResizable from '@/components/vue-draggable-resizable/vue-draggable-resizable'

export default {

  components: {
    VueDraggableResizable
  },

  data: function () {
    return {
      width: 0,
      height: 0,
      x: 100,
      y: 100,
      temp: 100,
      iconName: 'el-icon-delete',
      commonClassName: 'target',
      control: [{customId: 1,x:0,y:0,width:50,height:50,lock: false}
        ,{customId: 2,x:200,y:200,width:50,height:50,lock: true}]
    }
  },
  methods: {
    onResize: function (x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      console.log()
    },
    onDrag: function (x, y) {
      this.x = x
      this.y = y
    },
    onActivate(customId) {
      console.log(customId)
    }
  },
}
</script>

<style>

</style>
