<template>
  <div>
    <div>
      <!-- 工具栏 -->
      <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editor"
          :defaultConfig="toolbarConfig"
      />
      <!-- 编辑器 -->
      <Editor
          style="height: 80vh; overflow-y: hidden; overflow: auto; padding: 30px 30px 0 30px;background-color: rgba(234,235,235,1);"
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
  props: {
    documentid: {
      type: String,
      default: ''
    },
    showhtml: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      socketList: [],
      timer: null,
      curUser: '',
      editor: null,
      preHtml: '',
      html: this.showhtml,
      toolbarConfig: {
         toolbarKeys: [
           "headerSelect",
           "blockquote",
           "|",
           "bold",
           "underline",
           "italic",
           "through",
           "code",
           "sup",
           "sub",
           "clearStyle",
           "color",
           "bgColor",
           "|",
           "fontSize",
           "fontFamily",
           "lineHeight",
           "|",
           "bulletedList",
           "numberedList",
           "todo",
           {
             "key": "group-justify",
             "title": "对齐",
             "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z\"></path></svg>",
             "menuKeys": [
               "justifyLeft",
               "justifyRight",
               "justifyCenter",
               "justifyJustify"
             ]
           },
           {
             "key": "group-indent",
             "title": "缩进",
             "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z\"></path></svg>",
             "menuKeys": [
               "indent",
               "delIndent"
             ]
           },
           "|",
           "emotion",
           "insertLink",
           "insertImage",
           "insertVideo",
           "insertTable",
           "codeBlock",
           "divider",
           "|",
           "undo",
           "redo",
           "|",
           "fullScreen"
         ],
        //excludeKeys: [ 'group-image','group-video' ],
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
        let sendData = {content: this.editor.getHtml(),fromUser: this.curUser,docID: this.documentid}
        const msg = JSON.stringify({
          type: 'message',
          message: JSON.stringify(sendData)
        })
        //sendData.fromUser = this.curUser
        if(socket.readyState===1)
        {
         // console.log('send',this.html)
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
       // console.log('支持Websocket',this.documentid)
        //var socketUrl = "http://localhost:9000/document/"
        var socketUrl = "http://43.138.86.76:9000/document/"
        socketUrl = socketUrl.replace("https", "ws").replace("http", "ws")
        console.log(socketUrl)
        if(socket!==null){
       //   console.log(socket)
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
          if(socket.readyState===1){
          socket.send(msg)}
         // console.log("websocket打开")
          // socket.send("客户端消息: 用户" + this.userId + location.href + new Date())
          // socket.send('用户登录')
        }
     //   console.log('set onopen',socket)
      }
      socket.onmessage = function(msg){
        const msg2 = JSON.parse(msg.data)
     //   console.log('接收数据')
     //   console.log(msg2.type==='message')
        if(msg2.type==='message')
        {
        //  console.log(JSON.parse(msg2.message))
          let rcv = JSON.parse(msg2.message)
          self.$emit('htmlChange',rcv.content,rcv.docID)
          if(rcv.docID === self.documentid){
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
        if(socket.readyState===1){
        socket.send(msg)
        console.log("websocket断开")}
      }
      this.settimer()
    },
    onCreated(editor) {
      this.editor = Object.seal(editor); // 【注意】一定要用 Object.seal() 否则会报错
    },
    // eslint-disable-next-line no-unused-vars
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
  watch: {
    showhtml(newval){
      this.preHtml=newval
      this.html=newval
    }
  },
  mounted() {
    this.curUser=localStorage.getItem('userID')
   //console.log('showhtml',this.showhtml)
     //模拟 ajax 请求，异步渲染编辑器
    this.openSocket()
  },
  beforeDestroy() {
    if (this.timer !== null)
    clearInterval(this.timer)
    socket.close()
    const editor = this.editor;
    if (editor !== null)
    editor.destroy(); // 组件销毁时，及时销毁 editor ，重要！！！
  },
};
</script>

<style scoped src="@wangeditor/editor/dist/css/style.css"></style>
