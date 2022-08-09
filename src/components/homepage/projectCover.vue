<template>
  <div id="project-cover" @click="toProjectPage">
    <div style="margin-left: 210px; margin-top: 8px; position: absolute">
      <el-dropdown placement="bottom-start" @command="handleCommand">
        <span class="el-dropdown-link" style="color: whitesmoke">
          <i class="el-icon-edit" slot="reference"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">重命名</el-dropdown-item>
          <el-dropdown-item command="3">复制</el-dropdown-item>
          <el-dropdown-item command="5" v-if="hasFavored">取消收藏</el-dropdown-item>
          <el-dropdown-item command="4" v-else>收藏</el-dropdown-item>
          <el-dropdown-item command="2">删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="cover-box">
      <img src="../../../src/assets/images/project-cover2.jpg" style="width: 100%; height: 100%;">
    </div>
    <div style="margin-top: 10px; display: flex;flex-direction: column">
      <span style="font-size: 20px;">{{ projectName }}</span>
      <span style="font-size: 12px; color: #999; margin-top: 5px;">创建者：{{ projectCreator }}</span>
      <span style="font-size: 12px; color: #999; margin-top: 2px">创建时间：{{ projectCreateTime }}</span>
    </div>
      <el-dialog
          title="修改项目名称"
          :visible.sync="newProjectNameDialogVisible"
          width="30%"
          :before-close="handleClose">
        <el-form :model="newProjectNameForm" :rules="newProjectNameRules" ref="newProjectNameForm" label-width="100px">
          <el-form-item label="项目名称" prop="newProjectName">
            <el-input
                maxlength="10"
                show-word-limit
                :rows="1"
                v-model="newProjectNameForm.newProjectName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="newProjectNameDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="renameProject">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
          title="删除项目"
          :visible.sync="deleteProjectDialogVisible"
          width="30%"
          :before-close="handleClose">
        <span>确认删除项目 {{projectName}} ?</span>
        <span slot="footer" class="dialog-footer">
      <el-button @click="deleteProjectDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="deleteProject">确 定</el-button>
    </span>
      </el-dialog>
  </div>
</template>

<script>
import HomeView from "@/views/home/HomeView";

export default {
  name: "projectCover",
  data(){
    return{
      dotdotdot: false,
      newProjectNameDialogVisible: false,
      newProjectNameForm: {
        newProjectName: '',
      },
      newProjectNameRules: {
        newProjectName: [
          {required: true, message: '请输入项目名称', trigger: 'blur'}
        ],
      },
      deleteProjectDialogVisible: false,
    }
  },
  created() {
    const dataForm = new FormData();
    dataForm.append("projectID", this.projectID);
    dataForm.append("userID", this.userID);
    dataForm.append("username", this.username);
    dataForm.append("authorization", localStorage.getItem('authorization'));
    this.$axios({
      method: 'post',
      url: 'ProjectManager/isCollect/',
      data: dataForm,
    })
        .then(res => {
          switch (res.data.error) {
            case 0:
              // eslint-disable-next-line vue/no-mutating-props
              this.hasFavored = true;
              break;
            case 1:
              // eslint-disable-next-line vue/no-mutating-props
              this.hasFavored = false;
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
  },
  methods: {
    handleClose() {
      this.newProjectNameDialogVisible = false;
      this.deleteProjectDialogVisible = false;
    },
    handleCommand(command) {
      if (command ==='1') {
        this.newProjectNameDialogVisible = true;
      } else if (command ==='2') {
        this.deleteProjectDialogVisible = true;
      } else if (command ==='3') {
        this.copyProject();
      } else if (command ==='4') {
        this.favorProject();
      } else if (command ==='5') {
        this.unFavorProject();
      }
    },
    copyProject() {
      const dataForm = new FormData();
      dataForm.append("projectID", this.projectID);
      dataForm.append("username", this.username);
      dataForm.append("authorization", localStorage.getItem('authorization'));
      this.$axios({
        method: 'post',
        url: 'ProjectManager/projectCopy/',
        data: dataForm,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                HomeView.methods.toAllProject();
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    favorProject() {
      const dataForm = new FormData();
      dataForm.append("projectID", this.projectID);
      dataForm.append("projectTeamID", this.groupID);
      dataForm.append("userID", this.userID);
      dataForm.append("username", this.username);
      dataForm.append("authorization", localStorage.getItem('authorization'));
      this.$axios({
        method: 'post',
        url: 'ProjectManager/projectCollect/',
        data: dataForm,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                // eslint-disable-next-line vue/no-mutating-props
                this.hasFavored = true;
                HomeView.methods.refreshFavorProject();
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    unFavorProject() {
      const dataForm = new FormData();
      dataForm.append("projectID", this.projectID);
      dataForm.append("projectTeamID", this.groupID);
      dataForm.append("userID", this.userID);
      dataForm.append("username", this.username);
      dataForm.append("authorization", localStorage.getItem('authorization'));
      this.$axios({
        method: 'post',
        url: 'ProjectManager/projectUnCollect/',
        data: dataForm,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                // eslint-disable-next-line vue/no-mutating-props
                this.hasFavored = false;
                HomeView.methods.refreshFavorProject();
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    toProjectPage() {
      const dataForm = new FormData();
      dataForm.append("projectID", this.projectID);
      dataForm.append("userID", this.userID);
      dataForm.append("username", this.username);
      dataForm.append("authorization", localStorage.getItem('authorization'));
      this.$axios({
        method: 'post',
        url: 'ProjectManager/projectClick',
        data: dataForm,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
      let path ='/project/' + this.projectID
      if (path !== this.$route.fullPath) {
        this.$router.push(path);
      }
    },
    renameProject() {
      const formData = new FormData();
      formData.append("projectName", this.projectName);
      formData.append("projectTeamID", this.groupID);
      formData.append("projectUserID", this.userID);
      formData.append("projectNewName", this.newProjectNameForm.newProjectName);
      formData.append("username", this.username);
      formData.append("authorization", localStorage.getItem('authorization'));
      this.$axios({
        method: 'post',
        url: 'ProjectManager/projectRename/',
        data: formData,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                this.$message({
                  message: '重命名成功',
                  type: 'success'
                });
                this.newProjectNameDialogVisible = false;
                location.reload();
                break;
              case 4001:
                this.$message.warning('用户不存在！');
                break;
              case 4002:
                this.$message.warning('团队不存在！');
                break;
              case 4004:
                this.$message.warning('非团队成员无权限操作！');
                break;
              case 4003:
                this.$message.warning('项目不存在！');
                break;
              case 4005:
                this.$message.warning('非本团队项目无权限操作！');
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    deleteProject() {
      const formData = new FormData();
      formData.append("projectName", this.projectName);
      formData.append("projectTeamID", this.groupID);
      formData.append("projectUserID", this.userID);
      formData.append("username", this.username);
      formData.append("authorization", localStorage.getItem('authorization'));
      this.$axios({
        method: 'post',
        url: 'ProjectManager/projectDelete/',
        data: formData,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.deleteProjectDialogVisible = false;
                location.reload();
                break;
              case 4001:
                this.$message.warning('用户不存在！');
                break;
              case 4002:
                this.$message.warning('团队不存在！');
                break;
              case 4004:
                this.$message.warning('非团队成员无权限操作！');
                break;
              case 4003:
                this.$message.warning('项目不存在！');
                break;
              case 4005:
                this.$message.warning('非本团队项目无权限操作！');
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
  },
  props:{
    projectName:{default:'项目名称'},
    groupID:{default: 0},
    userID:{default: 0},
    username:{default: ''},
    projectID:{default: 0},
    projectIntro:{default: '项目简介简介简介简介简介简介简介简介简介简'},
    projectCreator:{default: '项目创建者啊啊啊啊啊'},
    projectCreateTime:{default: '2022-10-10'},
    docNum:{default: 0},
    pageNum:{default: 0},
    hasFavored:{default: false},
  },
}
</script>

<style>
#project-cover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 10px;
  width: 240px;
  height: 240px;
  display: flex;
  flex-direction: column;
  text-align: center;
  cursor: pointer;
}
#project-cover:hover {
  box-shadow: 8px 8px 10px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.cover-box {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  overflow: hidden;
  width: 100%;
  height: 143px;
}

.info-box {

}
.info-row {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}
.info-tag {
  font-family: "black",serif;
  width: 60px;
  margin-left: 20px;
}
.project-name {
  font-size: 20px;
  color: #46a6ff;
  text-align: center;
  width: 100%;
  margin-top: 25px;
  margin-bottom: 5px;
}
.intro-text {
  width: 130px;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
