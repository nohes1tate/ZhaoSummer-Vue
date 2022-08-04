<template>
  <div class="project">
    <div class="left-side-box">
      <div class="title-line" @mouseenter="showTip = true" @mouseleave="showTip = false" @click="go('/home')">
        <span>{{ this.projectName }}</span>
      </div>
      <div v-show="showTip" class="tip">
        <div class="tip-line">切换项目、设置团队/成员/权限</div>
      </div>
      <el-menu
          v-if="dateKey"
          class="select-box"
          @open="handleOpen"
          @close="handleClose"
          background-color="#4ab2cf"
          active-text-color="#112F4B"
          text-color="#FBF1E3"
          :default-active="this.$route.path"
          :key="dateKey"
      >
        <el-menu-item :index="'/project/' + projectID + '/overview'" @click="getOverview">
          <i class="el-icon-menu" style="color: #FBF1E3"></i>
          <span slot="title">项目概览</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-brush" style="color: #FBF1E3"></i>
            <span>原型设计</span>
          </template>
          <el-menu-item-group>
            <el-menu-item style="text-overflow: ellipsis" v-for="(item,index) in axureList"
                          :index="'/project/' + projectID + '/axure/' + item.axureID" v-bind:key="index"
                          @click="goAxure(item.axureID)"><span style="  display:block;
  width:90%;
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;">{{ item.axureName }}</span></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="3" @click="toDrawio()">
          <i class="el-icon-s-marketing" style="color: #FBF1E3"></i>
          <span slot="title">UML图</span>
        </el-menu-item>
        <el-menu-item :index="'/project/' + projectID + '/document'" @click="goDocument()"><i class="el-icon-document"
                                                                                              style="color: #FBF1E3"></i><span
            slot="title">项目文档</span></el-menu-item>
        <el-menu-item :index="'/project/' + projectID" @click="backToNew">
          <i class="el-icon-folder-add" style="color: #FBF1E3"></i>
          <span slot="title">新建</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right-side-box">
      <div class="top-line">
        <div class="top-left-box">
          <page-tabs :keep-alive-component-instance="keepAliveComponentInstance"/>
          <div ref="keepAliveContainer">
            <keep-alive>
              <router-view :key="$route.fullPath" @createDoc="appendNewDoc" @createAxure="appendNewAxure"/>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTabs from "@/components/projectpage/PageTabs";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "project",
  components: {
    PageTabs
  },
  mounted() {
    console.log(this.$route.path)
    this.dateKey = !this.dateKey
    this.projectID = this.$route.params.projectID
    if (this.$refs.keepAliveContainer) {
      this.keepAliveComponentInstance = this.$refs.keepAliveContainer.childNodes[0].__vue__;
    }

    let data = new FormData()

    data.append('projectID',this.$route.params.projectID)
    data.append('username',localStorage.getItem('username'))
    data.append('authorization',localStorage.getItem('authorization'))

    this.$axios({
      method: 'post',
      url: 'ProjectManager/viewAxureList/',
      data: data
    })
        .then(res=>{
          if(res.data.error === 0){
            console.log(res.data.axure_list)
          this.axureList=res.data.axure_list;
          }
        })
  },
  data() {
    return {
      dateKey: false,
      keepAliveComponentInstance: null,
      showTip: false,
      projectName: '小学期项目',
      projectID: 0,
      axureList: [],
      documentList: [],
    }
  },
  methods: {
    getEmit(params) {
      this.$message.success(params)
    },
    fuck() {
      console.log('getEmit')
    },
    go(path) {
      //console.log(path);
      if (path !== this.$route.fullPath) {
        this.$router.push(path);
      }
    },
    getOverview() {
      //this.axureList.push({axureID: 2,axureName: '新的axure'})
      this.projectID = this.$route.params.projectID;
      let path = '/project/' + this.projectID + '/overview';
      if (path !== this.$route.fullPath) {
        this.$router.push(path);
      }
      //console.log(this.$children)
    },
    goAxure(axureID) {
      this.projectID = this.$route.params.projectID;
      let path = '/project/' + this.projectID + '/axure/' + axureID
      if (path !== this.$route.fullPath) {
        this.$router.push(path);
      }
    },
    goDocument() {
      this.projectID = this.$route.params.projectID;
      let path = '/project/' + this.projectID + '/document'
      //let newPath = this.$router.resolve(path);
      //window.open(newPath.href)
      if (path !== this.$route.fullPath) {
        this.$router.push(path);
      }
    },
    backToNew() {
      this.projectID = this.$route.params.projectID;
      let path = '/project/' + this.projectID;
      if (path !== this.$route.fullPath) {
        this.$router.push(path);
      }
    },
    toDrawio() {
      window.open('https://app.diagrams.net/')
    },
    handleClose() {
      console.log('close')
    },
    handleOpen() {
      console.log('open')
    },
    getProjectInfo() {
      const formData = new FormData();
      formData.append('projectName', this.projectName);
      this.$axios({
        method: 'post',
        url: 'ProjectManager/projectView/',
        data: formData,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                this.$message({
                  message: '项目信息收集成功!',
                  type: 'success'
                });
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    appendNewDoc(data) {
      console.log('getNewDoc')
      console.log(data)
      this.documentList.push(data)
      this.goDocument(data.documentID)
    },
    appendNewAxure(data) {
      console.log(data)
      this.axureList.push(data)
      this.goAxure(data.axureID)
    }
  },
}
</script>

<style scoped>
.project {
  width: 100%;
  height: 100vh;
  background-color: #FBF1E3;
  display: flex;
  position: absolute;
}

.left-side-box {
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  width: 35vh;
  height: 100vh;
  background-color: #4ab2cf;

  text-align: left;
}

.title-line {
  width: 300px;
  height: 50px;
  display: flex;
  position: relative;
  top: 15px;
}

.title-line span {
  margin-top: 10px;
  margin-left: 20px;
  font-weight: 800;
  font-size: 25px;
  color: #FBF1E3;
  transition: background-color .2s, color .2s;
}

.title-line span:hover {
  color: #112F4B;
  cursor: pointer;
}

.select-box {
  position: relative;
  top: 5vh;
  width: 101%;
}

.project-view-line span {
  margin-top: 3px;
  margin-left: 3px;
}

.project-view-line img {
  width: 22px;
  height: 22px;
  margin-left: 5px;
  margin-top: 2px;
}

.right-side-box {
  height: 100vh;
  width: 100%;
  text-align: center;
}

.top-line {
  position: relative;
  width: 100%;
  height: 5%;
  display: flex;
  margin-bottom: 5px;
  background-color: #4ab2cf;
}

.top-card i {
  margin-top: 80px;
}

.tip {
  position: fixed;
  width: 230px;
  height: 30px;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  background-color: #fbfbfb;
  border-radius: 5px;
  z-index: 2;
  top: 70px;
  left: 5px;
  box-shadow: 0 5px 15px 2px grey;
}

.tip::before, .tip::after {
  content: '';
  display: block;
  border-width: 6px;
  position: absolute;
  top: -10px;
  left: 70px;
  height: 5px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 10px solid #fbfbfb;
}

.tip-line {
  color: grey;
  margin-top: 5px;
}

.el-menu-item .span {
  display: block;
  width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
