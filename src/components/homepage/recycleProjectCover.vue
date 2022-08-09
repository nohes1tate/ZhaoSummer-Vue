<template>
  <div id="project-cover">
    <div style="margin-left: 195px; margin-top: 8px; position: absolute" >
      <el-popover
          placement="right"
          width="200"
          trigger="hover">
        <el-button size="small" plain @click="recycleProjectDialogVisible = true">恢复项目</el-button>
        <el-button size="small" type="danger" plain @click="deleteProjectDialogVisible = true">销毁项目</el-button>
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
        <div class="info-tag">页面数：</div>
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
