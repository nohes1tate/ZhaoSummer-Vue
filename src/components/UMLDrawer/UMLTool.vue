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
  name: 'UMLTool',
  data: function () {
    return {
      data: {},
      oldContent: '',
      newContent: '',
      timer: null,
      refleshKey: false,
      content: null,
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
  deactivated() {
    //window.open('https://www.bilibili.com')
  },
  activated() {
    //window.open('https://www.bing.com')
    let data = new FormData()
    data.append('username',localStorage.getItem('username'))
    data.append('authorization',localStorage.getItem('authorization'))
    data.append('axureID',this.$route.params.axureID)
    let self = this
    this.$axios({
      method: 'post',
      url: 'ProjectManager/viewAxure/',
      data: data
    }).then(res => {
      if(res.data.error===0) {
        self.content = res.data.axureContent
        //console.log(res.data.axureContent)
        //console.log('content:',res.data.data.axureContent)
        //console.log(JSON.parse(res.data.axureContent))
        if(self.content)
          window.topology.open(res.data.axureContent)
      }
      else {
        self.$message.error(res.data.msg)
      }
    })
  },
  mounted() {
    let data = new FormData()
    data.append('username',localStorage.getItem('username'))
    data.append('authorization',localStorage.getItem('authorization'))
    data.append('axureID',this.$route.params.axureID)
    let self = this
    this.$axios({
      method: 'post',
      url: 'ProjectManager/viewAxure/',
      data: data
    }).then(res => {
      if(res.data.error===0) {
        self.content = res.data.axureContent
        //console.log(res.data.axureContent)
        //console.log('content:',res.data.data.axureContent)
        //console.log(JSON.parse(res.data.axureContent))
        if(self.content){
        window.topology.open(res.data.axureContent)
          this.oldContent=JSON.stringify(window.topology.pureData().pens)
        }
      }
      else {
        self.$message.error(res.data.msg)
      }
    })
    // 请确保 7777777(类似数字).js 和 rg.js已下载，正确加载
    this.user.username=localStorage.getItem('username')
    if (window.registerTools) {
      window.registerTools();
      if (window.topologyTools) {
        this.materials.system[0].list = window.topologyTools;
      }
      //确保从预览页面返回是时清空存储
      const json = sessionStorage.getItem('topologyData');
      if (!this.$route.query.id && json) {
        this.data = JSON.parse(json);
        setTimeout(() => {
          // 读到后清除对应 session
          sessionStorage.removeItem('topologyData');
        }, 200);
      }
    }
    //this.settimer()
    this.init()
  },
  beforeDestroy() {
    clearInterval(this.timer);
    socket.close()
    this.timer=null;
  },
  methods: {
    openSocket() {
      if(typeof(WebSocket) == 'undefined') {
        console.log('不支持Websocket')
      }
      else {
        console.log('支持Websocket')
        var socketUrl = "http://43.138.86.76:9000/axure/" + this.$route.params.axureID
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
        var that = this
        // 打开事件
        socket.onopen = function() {
          const msg = JSON.stringify({
            type: 'login',
            message: ''
          })
          socket.send(msg)
          console.log("websocket打开")
           that.settimer()
          // socket.send("客户端消息: 用户" + this.userId + location.href + new Date())
          // socket.send('用户登录')
        }
        console.log('set onopen',socket)
      }
      socket.onmessage = function(msg){
        const msg2 = JSON.parse(msg.data)
          console.log('接收数据')
          console.log(msg2)
        console.log(msg2.type==='message')
        //console.log(JSON.parse(msg2.message))
        if(msg2.type==='message')
        {
          let rec = JSON.parse(msg2.message)
          console.log('nani',rec.fromUser === localStorage.getItem('userID'))
          if (rec.fromUser !== localStorage.getItem('userID')) {
            console.log('update')
            console.log(msg2.message)
            window.topology.open(msg2.message)
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
        this.timer = setInterval(this.settime, 1000);
      }
    },
    settime(){
      //console.log(this.oldContent)
      //console.log(window.topology.pureData().pens)
      this.newContent=JSON.stringify(window.topology.pureData().pens)
      //console.log(this.oldContent === this.newContent)
      if(this.oldContent !== this.newContent && window.topology.pureData().pens.length > 0){
        //console.log('send')
        this.oldContent=JSON.stringify(window.topology.pureData().pens)
        let sendData = window.topology.pureData()
        sendData.fromUser = localStorage.getItem('userID')
        console.log('sendUser:',sendData.fromUser)
        //console.log('send:',sendData)
        const msg = JSON.stringify({
          type: 'message',
          message: JSON.stringify(sendData)
        })
        //console.log(msg)
        socket.send(msg)
      }
    },
    nani() {
    //  console.log('click!')
      this.$emit('fuck')
    },
    saveAxure() {
      let data = new FormData()

      data.append('username',localStorage.getItem('username'))
      data.append('authorization',localStorage.getItem('authorization'))
      data.append('axureID',this.$route.params.axureID)
      data.append('axureData',JSON.stringify(window.topology.data))
     // console.log(JSON.stringify(window.topology.data))

      let self = this
      this.$axios({
        method: 'post',
        url: 'ProjectManager/axureSave/',
        data: data
      }).then(res => {
       // console.log(res)
        if(res.data.error === 0) {
          self.$message.success(res.data.msg)
        }
        else {
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
            this.saveAxure()
          // window.topology.open(this.content)
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
