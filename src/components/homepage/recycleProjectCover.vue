<template>
  <div id="project-cover">
    <div style="margin-left: 210px; margin-top: 8px; position: absolute">
      <el-dropdown placement="bottom-start" @command="handleCommand">
        <span class="el-dropdown-link" style="color: whitesmoke">
          <i class="el-icon-edit" slot="reference"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">恢复项目</el-dropdown-item>
          <el-dropdown-item command="2">销毁项目</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="cover-box"  @click="toProjectPage">
      <img src="../../../src/assets/images/project-cover2.jpg" style="width: 100%; height: 100%;">
    </div>
    <div style="margin-top: 10px; display: flex;flex-direction: column" @click="toProjectPage">
      <span style="font-size: 20px;">{{ projectName }}</span>
      <span style="font-size: 12px; color: #999; margin-top: 5px;">创建者：{{ projectCreator }}</span>
      <span style="font-size: 12px; color: #999; margin-top: 2px">创建时间：{{ projectCreateTime }}</span>
    </div>

    <el-dialog
        title="恢复项目"
        :visible.sync="recycleProjectDialogVisible"
        width="30%"
        :before-close="handleClose">
      <span>是否恢复项目 {{projectName}} ?</span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="recycleProjectDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="recoverProject">确 定</el-button>
    </span>
    </el-dialog>
    <el-dialog
        title="销毁项目"
        :visible.sync="deleteProjectDialogVisible"
        width="30%"
        :before-close="handleClose">
      <span>确认销毁项目 {{projectName}} ?</span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="deleteProjectDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="destroyProject">确 定</el-button>
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
      recycleProjectDialogVisible: false,
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
      this.recycleProjectDialogVisible = false;
      this.deleteProjectDialogVisible = false;
    },
    toProjectPage() {
      this.$message.warning('请先恢复项目');
    },
    handleCommand(command) {
      if (command ==='1') {
        this.recycleProjectDialogVisible = true
      } else if (command ==='2') {
        this.deleteProjectDialogVisible = true;
      }
    },
    recoverProject(){
      const formData = new FormData();
      formData.append("projectID", this.projectID);
      formData.append("projectTeamID", this.groupID);
      formData.append("projectUserID", this.userID);
      formData.append("username", this.username);
      formData.append("authorization", localStorage.getItem('authorization'));
      this.$axios({
        method: 'post',
        url: 'ProjectManager/recoverProject/',
        data: formData,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                this.$message({
                  message: '恢复成功',
                  type: 'success'
                });
                this.recycleProjectDialogVisible = false;
                location.reload();
                break;
              case 2001:
                this.$message.warning('请求方式错误！');
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    destroyProject() {
      const formData = new FormData();
      formData.append("projectID", this.projectID);
      formData.append("projectTeamID", this.groupID);
      formData.append("projectUserID", this.userID);
      formData.append("username", this.username);
      formData.append("authorization", localStorage.getItem('authorization'));
      this.$axios({
        method: 'post',
        url: 'ProjectManager/destroyProject/',
        data: formData,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                this.$message({
                  message: '销毁项目成功',
                  type: 'success'
                });
                this.deleteProjectDialogVisible = false;
                location.reload();
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


</style>
