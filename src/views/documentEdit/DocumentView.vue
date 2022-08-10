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
                  <el-menu-item v-for="(subItem,index2) in item.childdoc"
                                v-bind:key="index1+'-'+index2"
                                :index="index1+'-'+index2"
                                @click="changeDoc(subItem.docid,subItem.content)">
                    <i class="el-icon-document"></i>{{ subItem.title }}
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </div>
            <el-menu-item index="newDoc" @click="createDoc"><i class="el-icon-plus"></i>新建文档</el-menu-item>
          </el-menu>
    </div>
    <div style="width: auto">
       <DocumentEditor :documentid="curDocID + ''" @htmlChange="handleChangeHtml" :showhtml="curHtml" ></DocumentEditor>
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
    },
    content: {
      type: String,
      default: ''
    },
    group: {
      type: String,
      default: ''
    },
    project: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      docreload: false,
      curHtml: '',
      editor: null,
      curDocID: '1',
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
    setTimeout(()=>{this.curHtml=this.content,
    this.documentList=this.list},500)

  },
  methods: {
    createDoc() {
      let docForm = new FormData
      docForm.append('username',localStorage.getItem('username'))
      //console.log(localStorage.getItem('username'))
      docForm.append('authorization', localStorage.getItem('authorization'))
     // console.log(localStorage.getItem('authorization'))
      docForm.append('userID', localStorage.getItem('userID'))
      //console.log(localStorage.getItem('userID'))
      docForm.append('projectID',this.project)
     // console.log('projectID',this.project)
      docForm.append('groupID',this.group)
     // console.log('groupID',this.group)
      docForm.append('title','总之这里是新的文档')
     // console.log('123456')
      docForm.append('content','这是新的文档 的内容')
     // console.log('789987')
      docForm.append('type',this.type)//type为0
      console.log(this.type)

      this.$axios({
        method: 'post',
        url: 'DocsEdit/createDocument/',
        data: docForm
      }).then((res) => {
        if(res.data.errno===0){
          this.$message.success('创建成功')
          setTimeout(()=>{location.reload()},1000)
        }
        else {
          this.$message.error(res.data.msg)
        }
      })

    },
    changeDoc(docID,content){
      this.curDocID=docID
      this.curHtml=content
    },
    handleChangeHtml(html,docID){
      let index = null
      let subIndex = null
      for(index=0; index<this.documentList.length; index++){
       // console.log(this.documentList[index].childdoc.length !== 0)
        if(this.documentList[index].childdoc.length !== 0){
          for(subIndex=0; subIndex<this.documentList[index].childdoc.length ; subIndex++){
            //console.log('sub',subItem[subIndex])
            if(this.documentList[index].childdoc[subIndex].docid,docID,this.documentList[index].childdoc[subIndex].docid === docID){
              this.documentList[index].childdoc[subIndex].content=html
            }
          }
        }
        else {
          //console.log('outer',this.documentList[index])
          if(this.documentList[index].docid === docID){
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
