<template>
  <div style="border: solid 2px black;min-height: 70vh;width: 150vh;margin-left: auto;margin-right: auto;margin-top: 2vh">
    <div class="editor" style="margin-left: 5vh;margin-right: 5vh;">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar" >

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.bold() }"
              @click="commands.bold"
          >
            <svg class="icon" aria-hidden="true" >
              <use  xlink:href="#icon-01jiacu"></use>
            </svg>
          </button>

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.italic() }"
              @click="commands.italic"
          >
            <svg class="icon" aria-hidden="true" >
              <use  xlink:href="#icon-02xieti"></use>
            </svg>
          </button>

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.strike() }"
              @click="commands.strike"
          >
            <svg class="icon" aria-hidden="true" >
              <use  xlink:href="#icon-04shanchuxian"></use>
            </svg>
          </button>

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.underline() }"
              @click="commands.underline"
          >
            <svg class="icon" aria-hidden="true" >
              <use  xlink:href="#icon-03xiahuaxian"></use>
            </svg>
          </button>

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 1 }) }"
              @click="commands.heading({ level: 1 })"
          >
            <svg class="icon" aria-hidden="true" >
              <use  xlink:href="#icon-13biaoti1"></use>
            </svg>
          </button>

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 2 }) }"
              @click="commands.heading({ level: 2 })"
          >
            <svg class="icon" aria-hidden="true" >
              <use  xlink:href="#icon-14biaoti2"></use>
            </svg>
          </button>

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 3 }) }"
              @click="commands.heading({ level: 3 })"
          >
            <svg class="icon" aria-hidden="true" >
              <use  xlink:href="#icon-15biaoti3"></use>
            </svg>
          </button>

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.bullet_list() }"
              @click="commands.bullet_list"
          >
            <svg class="icon" aria-hidden="true" >
              <use  xlink:href="#icon-20xiangmufuhao"></use>
            </svg>
          </button>

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.ordered_list() }"
              @click="commands.ordered_list"
          >
            <svg class="icon" aria-hidden="true" >
              <use  xlink:href="#icon-21bianhaogeshi"></use>
            </svg>
          </button>

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.blockquote() }"
              @click="commands.blockquote"
          >
            <svg class="icon" aria-hidden="true" >
              <use  xlink:href="#icon-quote"></use>
            </svg>
          </button>

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.code_block() }"
              @click="commands.code_block"
          >
            <svg class="icon" aria-hidden="true" >
              <use  xlink:href="#icon-yuandaimaxiayoudaima"></use>
            </svg>
          </button>

          <button
              class="menubar__button"
              @click="commands.horizontal_rule"
          >
            <svg class="icon" aria-hidden="true" >
              <use  xlink:href="#icon-hr"></use>
            </svg>
          </button>

          <button
              class="menubar__button"
              @click="commands.undo"
          >
            <svg class="icon" aria-hidden="true" >
              <use  xlink:href="#icon-25chehui"></use>
            </svg>
          </button>

          <button
              class="menubar__button"
              @click="commands.redo"
          >
            <svg class="icon" aria-hidden="true" >
              <use  xlink:href="#icon-26quxiaochehui"></use>
            </svg>
          </button>
          <button
              class="menubar__button"
              @click="test()"
          >
            <svg class="icon" aria-hidden="true" >
              <use  xlink:href="#icon-shanchu"></use>
            </svg>
          </button>

          <button
              class="menubar__button"
              @click="save()"
          >
            <svg class="icon" aria-hidden="true" >
              <use  xlink:href="#icon-save"></use>
            </svg>
          </button>
          <button
              class="menubar__button"
              @click="ban()"
          >
            <svg class="icon" aria-hidden="true" >
              <use  xlink:href="#icon-save"></use>
            </svg>
          </button>
          <hr style="height: 4px;color: black;background: black"/>
        </div>
      </editor-menu-bar>

      <editor-content class="editor__content" :editor="editor" style="text-align: left;width: 140vh;border: solid 2px black;min-height: 60vh"/>
    </div>
  </div>
</template>

<style lang="scss" src="./main.scss">

</style>

<script>
import '@/assets/fonts/iconfont.js'
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
  props: {
    content: {
      type: String,
      default: ''
    }
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
    ban() {
      console.log(this.editor)
    },
    exportText() {
      console.log(this.editor.getHTML())
    },
    test() {
      this.editor.clearContent()
    },
    save() {

      const content = this.editor.getHTML()
      const blob = new Blob([ content ], { type: 'text/html' })
      const objectURL = URL.createObjectURL(blob)

      const anchor = document.createElement('a')
      anchor.href = objectURL
      anchor.download = "document.html"

      anchor.click()

      URL.revokeObjectURL(objectURL)
    },
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
  mounted() {
    //this.editor.content='567415'
  }
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
.icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.icon:hover {
  background: #8c8c8c;
}

</style>
