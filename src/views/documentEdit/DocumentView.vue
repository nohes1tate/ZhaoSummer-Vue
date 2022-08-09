<template>
  <div style="display: flex">
    <div class="doc-leftnav">
          <el-menu
              mode="vertical"
              default-active="0"
              style="width: 30vh"
          >
            <div v-for="(item,index1) in documentList" v-bind:key="index1+''">
              <el-menu-item :index="index1+''" v-if="item.isSub===false" @click="changeDoc(item.docid,item.content)">
                <i class="el-icon-document"></i>
                {{ item.title }}
              </el-menu-item>
              <el-submenu :index="index1 + ''" v-else style="text-align: left">
                <template slot="title"><span>{{ item.title }}</span></template>
                <el-menu-item-group>
                  <el-menu-item v-for="(subItem,index2) in item.childDoc"
                                v-bind:key="index1+'-'+index2"
                                :index="index1+'-'+index2"
                                @click="changeDoc(subItem.docid,subItem.content)">
                    <i class="el-icon-document"></i>{{ subItem.title }}
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </div>
            <el-menu-item index="newDoc"><i class="el-icon-plus"></i>新建文档</el-menu-item>
          </el-menu>
    </div>
    <div style="width: auto">
       <DocumentEditor :documentid="curDocID" @htmlChange="handleChangeHtml" :showhtml="curHtml"></DocumentEditor>
    </div>
  </div>
</template>

<script>
import DocumentEditor from "@/components/WangEditor/DocumentEditor";
//import DocumentEdit from "@/components/WangEditor/DocumentEditor";
//import DocumentDisplay from "@/components/WangEditor/DocumentDisplay";
//import {Editor, Toolbar} from "@wangeditor/editor-for-vue";

export default {
  name: "DocumentView",
  components: {
    //DocumentEdit
    DocumentEditor
  },
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      curHtml: '',
      editor: null,
      curDocID: '1',
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
    changeDoc(docID,content){
      this.curDocID=docID
      this.curHtml=content
    },
    handleChangeHtml(html,docID){
      let index = null
      let subIndex = null
      for(index=0; index<this.documentList.length; index++){
       // console.log(this.documentList[index].childDoc.length !== 0)
        if(this.documentList[index].childDoc.length !== 0){
          for(subIndex=0; subIndex<this.documentList[index].childDoc.length ; subIndex++){
            //console.log('sub',subItem[subIndex])
            if(this.documentList[index].childDoc[subIndex].docid,docID,this.documentList[index].childDoc[subIndex].docid === docID){
              this.documentList[index].childDoc[subIndex].content=html
            }
          }
        }
        else {
          //console.log('outer',this.documentList[index])
          if(this.documentList[index].docid,docID, this.documentList[index].docid === docID){
            this.documentList[index].content=html
          }
        }
      }
      console.log(this.documentList)
    }
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
