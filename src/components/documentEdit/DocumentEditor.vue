<template>
  <div style="border: solid 2px black;border-radius: 8px;min-height: 70vh;width: 150vh;align-content: center;margin-left: 5vh;margin-top: 2vh">
    <div class="editor">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar" >

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.bold() }"
              @click="commands.bold"
          >
            <span class="iconfont icon-01jiacu" style="font-size: 30px;"></span>
          </button>

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.italic() }"
              @click="commands.italic"
          >
            <span class="iconfont icon-02xieti" style="font-size: 30px;"></span>
          </button>

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.strike() }"
              @click="commands.strike"
          >
            <span class="iconfont icon-04shanchuxian" style="font-size: 30px;"></span>
          </button>

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.underline() }"
              @click="commands.underline"
          >
            <span class="iconfont icon-03xiahuaxian" style="font-size: 30px;"></span>
          </button>

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 1 }) }"
              @click="commands.heading({ level: 1 })"
          >
            <span class="iconfont icon-13biaoti1" style="font-size: 30px;"></span>
          </button>

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 2 }) }"
              @click="commands.heading({ level: 2 })"
          >
            <span class="iconfont icon-14biaoti2" style="font-size: 30px;"></span>
          </button>

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 3 }) }"
              @click="commands.heading({ level: 3 })"
          >
            <span class="iconfont icon-15biaoti3" style="font-size: 30px;"></span>
          </button>

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.bullet_list() }"
              @click="commands.bullet_list"
          >
            <span class="iconfont icon-20xiangmufuhao" style="font-size: 30px;"></span>
          </button>

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.ordered_list() }"
              @click="commands.ordered_list"
          >
            <span class="iconfont icon-21bianhaogeshi" style="font-size: 30px;"></span>
          </button>

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.blockquote() }"
              @click="commands.blockquote"
          >
            <span class="iconfont icon-quote" style="font-size: 30px;"></span>
          </button>

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.code_block() }"
              @click="commands.code_block"
          >
            <span class="iconfont icon-yuandaimaxiayoudaima" style="font-size: 30px;"></span>
          </button>

          <button
              class="menubar__button"
              @click="commands.horizontal_rule"
          >
            <span class="iconfont icon-hr" style="font-size: 30px;"></span>
          </button>

          <button
              class="menubar__button"
              @click="commands.undo"
          >
            <span class="iconfont icon-25chehui" style="font-size: 30px;"></span>
          </button>

          <button
              class="menubar__button"
              @click="commands.redo"
          >
            <span class="iconfont icon-26quxiaochehui" style="font-size: 30px;"></span>
          </button>
          <button
              class="menubar__button"
              @click="test()"
          >
            <span class="iconfont icon-shanchu" style="font-size: 30px;"></span>
          </button>
          <hr style="height: 4px;color: black;background: black"/>
        </div>
      </editor-menu-bar>

      <editor-content class="editor__content" :editor="editor" style="text-align: left;width: 140vh;border: solid 2px black;min-height: 60vh"/>
    </div>
  </div>
</template>

<style lang="scss" src="./main.scss" scoped>

</style>

<script>
import {Editor, EditorContent, EditorMenuBar} from 'tiptap'
import {
  Blockquote,
  Bold,
  BulletList,
  Code,
  CodeBlock,
  HardBreak,
  Heading,
  History,
  HorizontalRule,
  Italic,
  Link,
  ListItem,
  OrderedList,
  Strike,
  TodoItem,
  TodoList,
  Underline
} from 'tiptap-extensions'

import { keymap } from 'prosemirror-keymap'
import { Extension } from 'tiptap'
import { redo, undo, yCursorPlugin, ySyncPlugin, yUndoPlugin } from 'y-prosemirror'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

const ydoc = new Y.Doc()
let roomName = null
let provider = null
let type = ydoc.getXmlFragment('prosemirror')
let awareness = null


function getColor() {
  const str = "0123456789abcdef";
  let color = "#";
  for (let i = 1; i <= 6; i++) {
    color += str[parseInt(Math.random() * 16)]
  }
  return color
}

class RealtimeExtension extends Extension {
  get name () {
    return 'realtime'
  }

  get plugins () {
    console.log('plugins')

    console.log(provider.awareness)
    return [
      ySyncPlugin(type),
      yCursorPlugin(provider.awareness),
      yUndoPlugin(),
      keymap({
        'Mod-z': undo,
        'Mod-y': redo,
        'Mod-Shift-z': redo
      })
    ]
  }
}



export default {
  name: "DocumentEditor",
  components: {
    EditorContent,
    EditorMenuBar,
  },
  data() {
    return {
      curRoomName: '',
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({levels: [1, 2, 3]}),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new RealtimeExtension(),
        ],
      }),
    }
  },
  methods: {
    exportText() {
      console.log(this.editor.getHTML())
    },
    test() {
      this.editor.clearContent()
    },
  },
  activated() {
    console.log('activated!')
    this.curRoomName = this.$route.params.projectID
    console.log('roomName',this.curRoomName)
    roomName ='ZhaoSummer' + this.curRoomName
    provider = new WebsocketProvider('wss://demos.yjs.dev', roomName, ydoc)
    awareness = provider.awareness
    awareness.setLocalStateField('user', {
      // Define a print name that should be displayed
      name: localStorage.getItem('username'),
      // Define a color that should be associated to the user:
      color: getColor() // should be a hex color
    })
  },
  beforeCreate() {
    console.log('beforeCreate!')
    this.curRoomName = this.$route.params.projectID
    console.log('roomName',this.curRoomName)
    roomName ='ZhaoSummer' + this.curRoomName
    provider = new WebsocketProvider('wss://demos.yjs.dev', roomName, ydoc)
    awareness = provider.awareness
    awareness.setLocalStateField('user', {
      // Define a print name that should be displayed
      name: localStorage.getItem('username'),
      // Define a color that should be associated to the user:
      color: getColor() // should be a hex color
    })
    /*if (this.curRoomName != localStorage.getItem('roomName')) {
      localStorage.setItem('roomName', this.curRoomName)
      console.log('reload')
      //location.reload()
    }*/
  },
}
</script>

<style>
.iconfont:hover {
  background: #8c8c8c;
  font-size: 30px;
}
.menubar {
  width: 140vh;
}
</style>
