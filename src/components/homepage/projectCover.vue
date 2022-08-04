<template>
  <div id="project-cover">
    <div style="margin-left: 10px; margin-top: 15px; width: 450px">
      {{projectName}}
    </div>
    <div style="float: right; margin-top: 16px">
      <el-popover
          placement="right"
          width="200"
          trigger="hover">
        <el-button size="small" plain @click="newProjectNameDialogVisible = true">修改名称</el-button>
        <el-button size="small" type="danger" plain @click="deleteProjectDialogVisible = true">删除项目</el-button>
        <i class="el-icon-more" slot="reference"></i>
      </el-popover>
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
  },
}
</script>

<style>
#project-cover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 20px;
  width: 500px;
  height: 50px;
  display: flex;
  flex-direction: row;
  text-align: left;
  cursor: pointer;
}
#project-cover:hover {
  border: solid 2px deepskyblue;
}
</style>
