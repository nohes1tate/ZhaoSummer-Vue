<template>
  <div style="display: flex">
    <div class="UML-leftnav">
      <el-menu
          mode="vertical"
          default-active="0"
          style="width: 30vh"
      >
        <div v-for="(item,index1) in UMLList" v-bind:key="index1+''">
          <el-menu-item :index="index1+''" @click="changeUML(item.id,item.content)">
            <i class="el-icon-document"></i>
            {{ item.name }}
          </el-menu-item>
        </div>
        <el-menu-item index="newUML" @click="toNewUML"><i class="el-icon-plus" ></i>新建UML图</el-menu-item>
      </el-menu>
    </div>
    <div style="width: auto">
      <UMLTool :UMLcontent="curUML" :UMLid="curUMLID" @UMLChange="handleUMLChange"></UMLTool>
    </div>
  </div>
</template>

<script>
import UMLTool from "@/components/UMLDrawer/UMLTool";
export default {
  name: "DesignView",
  components: {
    UMLTool
  },
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  mounted() {
    this.projectID=this.$route.params.projectID
    this.getUMLInfo()
  },
  data() {
    return {
      curUML: '',
      curUMLID: '1',
      UMLList: [],
      projectID:'',
    }
  },
  methods: {
    toNewUML(){
      const self = this
      const data = new FormData
      data.append('userID',localStorage.getItem('userID'))
      data.append('projectID',this.$route.params.projectID)
      data.append('username',localStorage.getItem('username'))
      data.append('authorization',localStorage.getItem('authorization'))
      data.append('umlData','')
      this.$prompt('UML名称','UML页面',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{3,20}$/,
        inputErrorMessage: 'UML名在3~20字之间'
      }).then(({ value }) => {
        data.append('umlName',value)
        self.$axios({
          method: 'post',
          url: 'ProjectManager/createUML/',
          data: data
        })
            .then(res => {
              if(res.data.error !==0) {
                this.$message.error(res.data.msg)
              }
              else {
                this.$message.success('UML创建成功!')
                this.getUMLInfo()
              }
            })
      }).catch(() => {
      });

    },
    getUMLInfo(){
      let data = new FormData()

      data.append('projectID',this.projectID)
      data.append('username',localStorage.getItem('username'))
      data.append('authorization',localStorage.getItem('authorization'))

      this.$axios({
        method: 'post',
        url: 'ProjectManager/viewUMLList/',
        data: data
      })
          .then(res=>{
            if(res.data.error === 0){
              this.UMLList=res.data.uml_list;
              this.reloadkey=!this.reloadkey;
              this.curUMLID=this.UMLList[0].content
              this.curUML=this.UMLList[0].id
            }
          })
    },
    handleUMLChange(content,UMLID){
      //console.log('gotchange')
      let index = null
      // console.log(UMLID)
      for(index=0; index<this.UMLList.length; index++){
        if(this.UMLList[index].UMLid === UMLID){
          //console.log('nani')
          this.UMLList[index].content=content
          // console.log('UMLID ',index,' ischange')
        }
      }
    },
    changeUML(UMLID,content){
      this.curUML=content,
          this.curUMLID=UMLID
    }
  }
}
</script>

<style scoped>
.UML-leftnav {
  border-right: solid 1px #e6e6e6;
}

.UML-butbar {
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
