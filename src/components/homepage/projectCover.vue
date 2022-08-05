<template>
  <div id="project-cover">
    <div style="margin-left: 195px; margin-top: 8px; position: absolute" >
      <el-popover
          placement="right"
          width="200"
          trigger="hover">
        <el-button size="small" plain @click="newProjectNameDialogVisible = true">修改名称</el-button>
        <el-button size="small" type="danger" plain @click="deleteProjectDialogVisible = true">删除项目</el-button>
        <i class="el-icon-edit" slot="reference" ></i>
      </el-popover>
    </div>
    <div @click="toProjectPage" style="height: 240px">
      <div class="project-name" >
        <span style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; width: 300px">{{projectName}}</span>
      </div>
      <div class="info-row">
        <div class="info-tag">创建者：</div>
        <div>{{projectCreator}}</div>
      </div>
      <div class="info-row">
        <div class="info-tag">创建时间：</div>
        <div>{{projectCreateTime}}</div>
      </div>
      <div class="info-row">
        <div class="info-tag">原型数：</div>
        <div>{{pageNum}}</div>
      </div>
      <div class="info-row">
        <div class="info-tag">文档数：</div>
        <div>1</div>
      </div>
      <div class="info-row">
        <div class="info-tag">项目简介：</div>
        <div class="intro-text">{{projectIntro}}</div>
      </div>
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
  methods: {
    handleClose() {
      this.newProjectNameDialogVisible = false;
      this.deleteProjectDialogVisible = false;
    },
    toProjectPage() {
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
  },
}
</script>

<style>
#project-cover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 20px;
  width: 240px;
  padding-left: 10px;
  padding-right: 10px;
  height: 250px;
  display: flex;
  flex-direction: column;
  text-align: left;
  cursor: pointer;
  border: solid 2px grey;
}
#project-cover:hover {
  background: #d9d9d9;
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
