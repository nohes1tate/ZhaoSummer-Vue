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
          </el-menu>
    </div>
    <div style="width: auto">
        <div style="border: 1px solid #ccc">
          <div>
            <div style="display: flex;align-items: center;margin-right: 30px;border-bottom: 1px solid #ccc" >
              <el-button type="success" size="mini" style="margin-left: auto"><i class="el-icon-download"></i>下载 </el-button>
              <el-button type="success" size="mini"><i class="el-icon-edit"></i>编辑</el-button>
            </div>
            <!-- 工具栏 -->
            <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editor"
                :defaultConfig="toolbarConfig"
            />
          </div>
          <!-- 编辑器 -->
          <Editor
              style="height: 85vh; overflow: auto; padding: 30px 30px 0 30px;background-color: rgba(234,235,235,.5);"
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

export default {
  name: "DocumentView",
  components: {
    //DocumentEdit
    Editor, Toolbar
  },
  props: {
    list: []
  },
  data() {
    return {
      editor: null,
      groupId: '',
      projectId: '',
      html: '',
      documentList: this.list,
      toolbarConfig: {
        // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
        excludeKeys: [ 'group-image','group-video' ],
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
      this.editor.disable()
      this.html=this.documentList[0].content
    },
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁 editor ，重要！！！
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
</style>
<style src="@wangeditor/editor/dist/css/style.css"></style>
