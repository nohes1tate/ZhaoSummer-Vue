import { keymap } from 'prosemirror-keymap'
import { Extension } from 'tiptap'
import { redo, undo, yCursorPlugin, ySyncPlugin, yUndoPlugin } from 'y-prosemirror'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

const ydoc = new Y.Doc()
const roomName = localStorage.getItem('roomName')
const provider = new WebsocketProvider('wss://demos.yjs.dev', roomName, ydoc)
const type = ydoc.getXmlFragment('prosemirror')

const awareness = provider.awareness
awareness.setLocalStateField('user', {
  // Define a print name that should be displayed
  name: localStorage.getItem('username'),
  // Define a color that should be associated to the user:
  color: getColor() // should be a hex color
})

function getColor() {
  var str = "0123456789abcdef"
  var color = "#"
  for (var i = 1; i <= 6; i++) {
    color += str[parseInt(Math.random() * 16)]
  }
  return color
}

export default class RealtimeExtension extends Extension {
  get name () {
    return 'realtime'
  }

  get plugins () {
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
