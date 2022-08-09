<template>
  <div style="display: flex">
    <div class="doc-leftnav">
          <el-menu
              mode="vertical"
              default-active="0"
              style="width: 30vh"
          >
            <div v-for="(item,index1) in documentList" v-bind:key="index1+''">
              <el-menu-item :index="index1+''" v-if="item.isSub===false" @click="html=item.content">
                <i class="el-icon-document"></i>
                {{ item.title }}
              </el-menu-item>
              <el-submenu :index="index1 + ''" v-else style="text-align: left">
                <template slot="title"><span>{{ item.title }}</span></template>
                <el-menu-item-group>
                  <el-menu-item v-for="(subItem,index2) in item.childDoc"
                                v-bind:key="index1+'-'+index2"
                                :index="index1+'-'+index2"
                                @click="html=subItem.content">
                    <i class="el-icon-document"></i>{{ subItem.title }}
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </div>
            <el-menu-item index="newDoc"><i class="el-icon-plus"></i>新建文档</el-menu-item>
          </el-menu>
    </div>
    <div style="width: auto">
        <div style="border: 1px solid #ccc">
            <!-- 工具栏 -->
            <Toolbar
                :editor="editor"
                :defaultConfig="toolbarConfig"
            />
          <!-- 编辑器 -->
          <Editor
              style="height: 85vh; overflow: auto; padding: 30px 30px 0 30px;background-color: rgba(234,235,235,1);"
              :defaultConfig="editorConfig"
              v-model="html"
              @onCreated="onCreated"
          />
      </div>
    </div>
  </div>
</template>

<script>
//import DocumentEdit from "@/components/WangEditor/DocumentEditor";
//import DocumentDisplay from "@/components/WangEditor/DocumentDisplay";
import {Editor, Toolbar} from "@wangeditor/editor-for-vue";
import {ListItem} from "tiptap-extensions";

export default {
  name: "DocumentView",
  components: {
    //DocumentEdit
    Editor, Toolbar
  },
  props: {
    list: {
      type: ListItem,
      default: []
    }
  },
  data() {
    return {
      editor: null,
      groupId: '',
      projectId: '',
      html: '',
      documentList: this.list,
      toolbarConfig: {
         // toolbarKeys: [ 'headerSelect', 'blockquote', '|','bold', 'underline', 'italic',  ],
        // excludeKeys: [ 'group-image','group-video', 'fullScreen' ],

      },
      editorConfig: {
        placeholder: "请输入内容...",
        // autoFocus: false,

        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {},
      }
    }
  },
  mounted() {
    //this.documentList=this.list
    //console.log(this.documentList[0])
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 【注意】一定要用 Object.seal() 否则会报错
      //this.editor.disable()
      this.html=this.documentList[0].content


       console.log(editor.getAllMenuKeys())
      console.log(Toolbar)

    },
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁 editor ，重要！！！
    console.log('destroy')
  },
}
</script>

<style scoped>
.doc-leftnav {
  border-right: solid 1px #e6e6e6;
}

.doc-butbar {
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
<style src="@wangeditor/editor/dist/css/style.css"></style>
