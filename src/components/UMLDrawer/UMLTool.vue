<template>
  <div class="design-tool" style="background: white;" @click="nani">
    <!-- 使用topology组件 -->
    <topology
        :configs="topologyConfigs"
        :materials="materials"
        :user="user"
        :data="data"
        @event="onEvent"
        :key="refleshKey"
    />
  </div>
</template>

<script>
import Vue from 'vue';
// 导入topology-vue组件
import topology from '@/assets/topology-vue';
// 需要导入topology-vue.css
import '@/assets/topology-vue/topology-vue.css';

Vue.use(topology);
import {
  defalutMenus,
  defalutUserMenus,
  defalutMaterials,
  images
} from './data';

var socket = null

export default {
  name: 'DesignTool',
  props: {
    UMLid: {
      type: String,
      default: ''
    },
    UMLcontent: {
      type: String,
      default: ''
    },
  },
  data: function () {
    return {
      curUser: '',
      data: {},
      preContent: '',
      newContent: '',
      timer: null,
      refleshKey: false,
      content: '',
      topologyConfigs: {
        license: {
          key: 'le5le',
          value: 'le5le'
        },
        logo: {
          img: require('./墨书.png'),
          target: '_blank'
        },
        menus: defalutMenus,
        loginUrl: 'https://account.le5le.com',
        signupUrl: 'https://account.le5le.com',
        userMenus: defalutUserMenus,
        dataOptionsFn: (pen, key, value) => {
          console.log(pen, key, value);
          const keys = ['aaa', 'bbb'];
          const values = [
            {
              value: 111,
              label: '111'
            },
            {
              value: 222,
              label: '222'
            }
          ];
          return {
            keys,
            // value: 80,
            values
          };
        }
      },
      user: {
        username: ''
      },
      materials: {
        system: defalutMaterials,
        user: [],
        images,
        uploadUrl: '/api/file',
        uploadHeaders: {
          Authorization: 'your token'
        },
        uploadParams: {
          mydata: 1
        }
      },
    };
  },
  beforeRouteLeave (to, from, next) {
    // 这里需要elementui的支持，如果使用其他界面组件自行替换即可
    // console.log('leaveDesignTool!')
    next()
  },
  mounted() {

    // 请确保 7777777(类似数字).js 和 rg.js已下载，正确加载
    this.user.username=localStorage.getItem('username')
    if (window.registerTools) {
      window.registerTools();
      //确保从预览页面返回是时清空存储
      const json = sessionStorage.getItem('topologyData');
      if (!this.$route.query.id && json) {
        this.data = JSON.parse(json);
        setTimeout(() => {
          // 读到后清除对应 session
          sessionStorage.removeItem('topologyData');
        }, 200);
      }
      // console.log('mounted')
      if(this.UMLcontent)
      window.topology.open(this.UMLcontent)
    }
    this.settimer()
    this.curUser=localStorage.getItem('userID')
    this.init()
  },
  beforeDestroy() {
    if (this.timer !== null)
      clearInterval(this.timer)
    socket.close()
    this.timer=null;
  },
  watch: {
    UMLcontent(newval){
      // console.log('UMLchange')
      window.topology.open(newval)
    },
  },
  methods: {
    openSocket() {
      if(typeof(WebSocket) == 'undefined') {
        console.log('不支持Websocket')
      }
      else {
        console.log('支持Websocket')
        var socketUrl = "http://43.138.86.76:9000/UML/"
        //var socketUrl = "http://localhost:9000/UML/"
        socketUrl = socketUrl.replace("https", "ws").replace("http", "ws")
        console.log(socketUrl)
        if(socket!==null){
          console.log(socket)
          socket=null
        }
        try{
          socket = new WebSocket(socketUrl)
        } catch (e) {
          console.log('error:',e)
        }
        var self = this
        // 打开事件
        socket.onopen = function() {
          const msg = JSON.stringify({
            type: 'login',
            message: ''
          })
          if(socket.readyState===1){
            socket.send(msg)}
          // console.log("websocket打开")
          // socket.send("客户端消息: 用户" + this.userId + location.href + new Date())
          // socket.send('用户登录')
        }
        console.log('set onopen',socket)
      }
      socket.onmessage = function(msg){
        const msg2 = JSON.parse(msg.data)
        //   console.log('接收数据')
        //   console.log(msg2.type==='message')
        if(msg2.type==='message')
        {
          // console.log(JSON.parse(msg2.message))
          let rcv = JSON.parse(msg2.message)
          // console.log('wtf')
          // console.log(rcv.UMLID === self.UMLid)
          self.$emit('UMLChange',rcv.content,rcv.UMLID)
          if(rcv.UMLID === self.UMLid){
            //if(rcv.fromUser !== self.curUser){
            //console.log(rcv.content)
            //console.log('rec')
            // console.log('receivemessage')
            window.topology.open(rcv.content)
            self.content=JSON.stringify(window.topology.pureData())
            self.preContent=self.content
          }
        }
      }
      // 关闭
      socket.close = function () {
        const msg = JSON.stringify({
          type: 'logout',
          message: ''
        })
        socket.send(msg)
        console.log("websocket断开")
      }
    },
    init() {
      this.openSocket()
    },
    settimer() {
      console.log('timer set')
      if(this.timer==null){
        this.timer = setInterval(this.settime, 200);
      }
    },
    settime(){
      //console.log(this.preContent)
      //console.log(window.topology.pureData().pens)
      this.newContent=JSON.stringify(window.topology.pureData())
      //console.log(this.preContent === this.newContent)
      if(this.preContent !== this.newContent && window.topology.pureData().pens.length > 0){
        // console.log('send')
        this.preContent=this.newContent
        let sendData = {content: this.newContent,fromUser: this.curUser,UMLID: this.UMLid}
        const msg = JSON.stringify({
          type: 'message',
          message: JSON.stringify(sendData)
        })
        //console.log(msg)
        if(socket.readyState===1) {
          socket.send(msg)
          this.preContent = this.newContent
          this.$emit('UMLChange',this.newContent,this.UMLid)
        }
      }
    },
    nani() {
      //  console.log('click!')
      this.$emit('fuck')
    },
    saveUML() {
      let data = new FormData()

      data.append('username',localStorage.getItem('username'))
      data.append('authorization',localStorage.getItem('authorization'))
      data.append('umlID',this.UMLid)
      data.append('umlData',JSON.stringify(window.topology.data))
      // console.log(JSON.stringify(window.topology.data))

      let self = this
      this.$axios({
        method: 'post',
        url: 'ProjectManager/saveUML/',
        data: data
      }).then(res => {
        // console.log(res)
        if(res.data.error === 0) {
          self.$message.success(res.data.msg)
        }
        else {
          console.log('here@@')
          console.log(this.UMLid)
          self.$message.error(res.data.msg)
        }
      })
    },
    onEvent(e) {
      switch (e.name) {
        case 'logout':
          // 退出登录
          this.user = null;
          // Do sth.
          break;

        case 'openMaterialGroup':
          // 展开/折叠图标工具栏分组
          console.log('openMaterialGroup', e.params);
          // Do sth.
          break;

        case 'addMaterial':
          // 添加“我的组件”
          // Do sth. For example:
          this.$router.push({
            path: '/',
            query: {component: '1'}
          });
          break;

        case 'editMaterial':
          // 编辑“我的组件”
          // Do sth. For example:
          this.$router.push({
            path: '/',
            query: {id: e.params.id, component: '1'}
          });
          break;

        case 'open':
          // 导航菜单configs.menus里面定义的action
          // 比如这里表示打开文件
          break;
        case 'Share':
          console.log('share')
          break;
        case 'save':
          // 导航菜单configs.menus里面定义的action
          //  console.log(window.topology.data)
          this.saveUML()
          // 比如这里表示保存文件
          break;
        case 'saveAs' :
          console.log('fuck')
          break
        case 'addImageUrl':
          // 在“我的图片”里面添加了一张新图片
          // this.addImageUrl(e.params);
          break;
        case 'deleteImage':
          // 在“我的图片”里面删除了一张图片
          // this.deleteImage(e.params);
          break;
        case 'preview':
          // 点击工具栏“预览”

          // 点击工具栏“预览”

          // 保存当前编辑数据到sessionStorage
          sessionStorage.setItem(
              'topologyData',
              JSON.stringify(window.topology.pureData())
          );
          this.$router.push({
            path: '/preview',
            query: {id: '114', r: '1'}
          });
          break;

          // ...
          // ...
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.design-tool {
  height: 95vh;
  width: 180vh;
}
</style>
