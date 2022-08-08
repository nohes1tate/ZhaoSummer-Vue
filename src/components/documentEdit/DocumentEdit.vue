<template>
  <div v-if="editor"
       style="border: solid 2px black;height: 70vh;width: 150vh;margin-left: auto;margin-right: auto;margin-top: 2vh;">
    <bubble-menu
        class="bubble-menu"
        :tippy-options="{ duration: 100 }"
        :editor="editor"
    >
      <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        Bold
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        Italic
      </button>
      <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
        Strike
      </button>
    </bubble-menu>

    <floating-menu
        class="floating-menu"
        :tippy-options="{ duration: 100 }"
        :editor="editor"
    >
      <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        H1
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        H2
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()"
              :class="{ 'is-active': editor.isActive('bulletList') }">
        Bullet List
      </button>
    </floating-menu>
    <div style="border-bottom: solid 2px black">
      <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        bold
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        italic
      </button>
      <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
        strike
      </button>
      <button @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
        code
      </button>
      <button @click="editor.chain().focus().toggleHighlight().run()" :class="{ 'is-active': editor.isActive('highlight') }">
        highlight
      </button>
      <button @click="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </button>
      <button @click="editor.chain().focus().clearNodes().run()">
        clear nodes
      </button>
      <button @click="editor.chain().focus().setParagraph().run()"
              :class="{ 'is-active': editor.isActive('paragraph') }">
        paragraph
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        h1
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        h2
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        h3
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
        h4
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
        h5
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
        h6
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()"
              :class="{ 'is-active': editor.isActive('bulletList') }">
        bullet list
      </button>
      <button @click="editor.chain().focus().toggleOrderedList().run()"
              :class="{ 'is-active': editor.isActive('orderedList') }">
        ordered list
      </button>
      <button @click="editor.chain().focus().toggleCodeBlock().run()"
              :class="{ 'is-active': editor.isActive('codeBlock') }">
        code block
      </button>
      <button @click="editor.chain().focus().toggleBlockquote().run()"
              :class="{ 'is-active': editor.isActive('blockquote') }">
        blockquote
      </button>
      <button @click="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </button>
      <button @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </button>
      <button @click="collaUndo">
        undo
      </button>
      <button @click="collaRedo">
        redo
      </button>
      <button @click="editor.chain().focus().setTextAlign('left').run()"
              :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
        left
      </button>
      <button @click="editor.chain().focus().setTextAlign('center').run()"
              :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
        center
      </button>
      <button @click="editor.chain().focus().setTextAlign('right').run()"
              :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
        right
      </button>
      <button @click="editor.chain().focus().setTextAlign('justify').run()"
              :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
        justify
      </button>
      <button @click="editor.chain().focus().unsetTextAlign().run()">
        unsetTextAlign
      </button>
      <button @click="fuck()">
        SetContent
      </button>
    </div>
    <editor-content :editor="editor" style="margin-left: 5vh;margin-right: 5vh;text-align: left;overflow: auto;height: 50vh"/>
  </div>
</template>

<script>
import { HocuspocusProvider } from '@hocuspocus/provider'
import CharacterCount from '@tiptap/extension-character-count'
//import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Heading from '@tiptap/extension-heading'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
// eslint-disable-next-line no-unused-vars
// import CollaborationCursor from '@tiptap/extension-collaboration-cursor'

import {Editor, EditorContent, BubbleMenu, FloatingMenu} from '@tiptap/vue-2'
//import {WebrtcProvider} from 'y-webrtc'
import * as Y from 'yjs'

export default {
  components: {
    EditorContent,
    BubbleMenu,
    FloatingMenu
  },

  methods: {
    fuck() {
      this.editor.commands.setContent('5674159')
    },
    collaRedo(){
      console.log('redo')
      this.editor.commands.redo()
    },
    collaUndo() {
      console.log('undo')
      this.editor.commands.undo()
    }
  },

  data() {
    return {
      editor: null,
      provider: null,
      roomName: '',
      currentUser: JSON.parse(localStorage.getItem('currentUser')) || {
        name: 'nohesitate',
        color: '#66ccff',
      },
    }
  },

  mounted() {

    this.roomName = this.$route.params.documentID
    console.log('roomName:', this.roomName)

    const ydoc = new Y.Doc()


    this.provider = new HocuspocusProvider({
      url: 'wss://connect.gethocuspocus.com',
      parameters: {
        key: 'write_bqgvQ3Zwl34V4Nxt43zR',
      },
      name: this.roomName,
      document: ydoc,
    })


    /*this.provider.on('status', event => {
      console.log('status',event)
    })*/

    //this.provider = new WebrtcProvider(this.roomName, ydoc)

    this.editor = new Editor({
      editorProps: {
        attributes: {
          spellcheck: 'false',
        },
      },
      extensions: [
        StarterKit.configure({
          history: false,
        }),
          Heading,
          TextAlign.configure({
            types: ['heading', 'paragraph'],
          }),
          Document,
          Paragraph,
          Text,
          Collaboration.configure({
            document: ydoc,
          }),
        CharacterCount.configure({
          limit: 10000,
        }),
          Placeholder.configure({
            placeholder: 'Write something … It’ll be shared with everyone else looking at this example.',
          }),
          Highlight,
          Typography,
    ],
    }
  )
    console.log(this.editor.extensionManager)
    this.editor.extensionManager
    /*this.editor.extensions.append(   CollaborationCursor.configure({
      provider: this.provider,
      user: {
        name: 'Cyndi Lauper',
        color: '#f783ac',
      },
    }))*/
  },

    beforeUnmount()
    {
      this.editor.destroy()
      this.provider.destroy()
    }
  ,
  }
</script>

<style lang="scss">
.editor {
  display: flex;
  flex-direction: column;
  max-height: 26rem;
  color: #0D0D0D;
  background-color: #FFF;
  border: 3px solid #0D0D0D;
  border-radius: 0.75rem;

  &__header {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
    border-bottom: 3px solid #0D0D0D;
  }

  &__content {
    padding: 1.25rem 1rem;
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  &__footer {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    white-space: nowrap;
    border-top: 3px solid #0D0D0D;
    font-size: 12px;
    font-weight: 600;
    color: #0D0D0D;
    white-space: nowrap;
    padding: 0.25rem 0.75rem;
  }

  /* Some information about the status */
  &__status {
    display: flex;
    align-items: center;
    border-radius: 5px;

    &::before {
      content: ' ';
      flex: 0 0 auto;
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: rgba(#0D0D0D, 0.5);
      border-radius: 50%;
      margin-right: 0.5rem;
    }

    &--connecting::before {
      background: #616161;
    }

    &--connected::before {
      background: #B9F18D;
    }
  }

  &__name {
    button {
      background: none;
      border: none;
      font: inherit;
      font-size: 12px;
      font-weight: 600;
      color: #0D0D0D;
      border-radius: 0.4rem;
      padding: 0.25rem 0.5rem;

      &:hover {
        color: #FFF;
        background-color: #0D0D0D;
      }
    }
  }
}
</style>

<style lang="scss">
                    /* Give a remote user a caret */
                  .collaboration-cursor__caret {
                    position: relative;
                    margin-left: -1px;
                    margin-right: -1px;
                    border-left: 1px solid #0D0D0D;
                    border-right: 1px solid #0D0D0D;
                    word-break: normal;
                    pointer-events: none;
                  }

/* Render the username above the caret */
.collaboration-cursor__label {
  position: absolute;
  top: -1.4em;
  left: -1px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  user-select: none;
  color: #0D0D0D;
  padding: 0.1rem 0.3rem;
  border-radius: 3px 3px 3px 0;
  white-space: nowrap;
}

/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  mark {
    background-color: #FAF594;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }
  }
}
</style>
