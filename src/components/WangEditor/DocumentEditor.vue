<template>
  <div>
    <div style="border: 1px solid #ccc; margin-top: 10px">
      <!-- 工具栏 -->
      <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editor"
          :defaultConfig="toolbarConfig"
      />
      <!-- 编辑器 -->
      <Editor
          style="height: 400px; overflow-y: hidden"
          :defaultConfig="editorConfig"
          v-model="html"
          @onChange="onChange"
          @onCreated="onCreated"
      />
    </div>
  </div>
</template>

<script>
let socket = null

import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default {
  name: "DocumentEditor",
  components: { Editor, Toolbar },
  data() {
    return {
      timer: null,
      curUser: '',
      editor: null,
      preHtml: '',
      html: "<p>hello&nbsp;world</p>",
      toolbarConfig: {
        // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
        excludeKeys: [ 'group-image','group-video' ],
      },
      editorConfig: {
        placeholder: "请输入内容...",
        // autoFocus: false,

        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {},
      },
    };
  },
  methods: {
    settimer() {
      console.log('timer set')
      if(this.timer==null){
        this.timer = setInterval(this.settime, 200);
      }
    },
    settime() {
      if(this.preHtml !== this.html) {
        let sendData = {content: this.editor.getHtml(),fromUser: this.curUser}
        const msg = JSON.stringify({
          type: 'message',
          message: JSON.stringify(sendData)
        })
        //sendData.fromUser = this.curUser
        if(socket.readyState===1)
        {
          console.log('send',this.html)
          socket.send(msg)
          this.preHtml = this.html
        }
      }
    },
    openSocket() {
      if(typeof(WebSocket) == 'undefined') {
        console.log('不支持Websocket')
      }
      else {
        var self = this
        console.log('支持Websocket')
        var socketUrl = "http://localhost:9000/document/" + this.$route.params.documentID
        //var socketUrl = "http://43.138.86.76/document/" + this.$route.params.documentID
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
        //var that = this
        // 打开事件
        socket.onopen = function() {
          const msg = JSON.stringify({
            type: 'login',
            message: ''
          })
          socket.send(msg)
          console.log("websocket打开")
          // socket.send("客户端消息: 用户" + this.userId + location.href + new Date())
          // socket.send('用户登录')
        }
        console.log('set onopen',socket)
      }
      socket.onmessage = function(msg){
        const msg2 = JSON.parse(msg.data)
        console.log('接收数据')
        console.log(msg2.type==='message')
        if(msg2.type==='message')
        {
          console.log(JSON.parse(msg2.message))
          let rcv = JSON.parse(msg2.message)
          if(true){
          //if(rcv.fromUser !== self.curUser){
          //console.log(rcv.content)
          //console.log(self.html)
            self.html = rcv.content
          self.preHtml=self.html}
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
      this.settimer()
    },
    onCreated(editor) {
      this.editor = Object.seal(editor); // 【注意】一定要用 Object.seal() 否则会报错
    },
    onChange(editor) {

    },
    getEditorText() {
      const editor = this.editor;
      if (editor == null) return;

      console.log(editor.getText()); // 执行 editor API
    },
    printEditorHtml() {
      const editor = this.editor;
      if (editor == null) return;

      console.log(editor.getHtml()); // 执行 editor API
    },
  },
  mounted() {
    this.curUser=localStorage.getItem('userID')
     //模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.html = "<p>默认的文档内容</p>";
      this.preHtml=this.html
    }, 1500);
    this.openSocket()
  },
  watch: {
      '$route' (to, from) {
        // 在mounted函数执行的方法，放到该处
        socket.close()
        this.openSocket()
      }
  },
  beforeDestroy() {
    socket.close()
    const editor = this.editor;
    if (editor !== null)
    editor.destroy(); // 组件销毁时，及时销毁 editor ，重要！！！
    if (this.timer !== null)
    clearInterval(this.timer)
  },
};
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
