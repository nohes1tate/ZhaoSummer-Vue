<template>
  <div class="home">
    <div class="nav-left">
      <div style="height: 60px; font-size: 40px; margin-top: 20px">墨书</div>
      <el-menu
          class="select-box"
          background-color="#f3f0e1"
          text-color="#000"
          active-text-color="#6667ab"
          :default-active="groupIndex">
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>我的团队</span>
          </template>
          <el-menu-item-group>
            <el-menu-item class="left-bar" v-for="(group,index) in this.groupList"
                          :index="index+''" v-bind:key="group.groupID"
                          @click="clickGroup(group.groupID, group.groupName, group.isCreator, group.isManager, group.groupDescription)">
              {{group.groupName}}</el-menu-item>
            <el-menu-item :index="this.groupList.length+ ''" class="left-bar"
                          @click="newTeamDialogVisible = true"><i class="el-icon-plus"></i>新建团队</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>

    <el-dialog
        title="新建团队"
        :visible.sync="newTeamDialogVisible"
        width="30%">
      <el-form :model="teamForm" :rules="teamRules" ref="teamForm" label-width="100px">
        <el-form-item label="团队名称" prop="teamName">
          <el-input
              maxlength="10"
              show-word-limit
              :rows="1"
              v-model="teamForm.teamName"></el-input>
        </el-form-item>
        <el-form-item label="团队简介" prop="teamIntro">
          <el-input
              type="textarea"
              maxlength="100"
              show-word-limit
              :rows="4"
              v-model="teamForm.teamIntro"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="newTeamDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="createGroup">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
        title="账号设置"
        :visible.sync="personalInfoDialogVisible"
        width="60%">
      <div class="container-style">
        <div class="left-box">
          <el-menu
              default-active="1"
              class="select-box"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
            <el-menu-item index="1">
              <i class="el-icon-setting"></i>
              <span slot="title">账号设置</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="right-box">
          <div class="right-left-box">
            <div class="container-box">
              <div class="label-line">
                <span style="color: red;font-size: 25px;justify-content:center;align-items: center">*</span>
                <span style="text-align: left;font-size: 18px;color: white">绑定邮箱</span>
              </div>
              <el-input v-model="input1" placeholder="请输入邮箱"></el-input>
            </div>
            <div class="container-box">
              <div class="label-line">
                <span style="color: red;font-size: 25px;justify-content:center;align-items: center">*</span>
                <span style="text-align: left;font-size: 18px;color: white">当前密码</span>
              </div>
              <el-input v-model="input2" placeholder="请输入密码"></el-input>
            </div>
            <div class="container-box">
              <div class="label-line">
                <span style="color: red;font-size: 25px;justify-content:center;align-items: center">*</span>
                <span style="text-align: left;font-size: 18px;color: white">修改密码</span>
              </div>
              <el-input v-model="input3" placeholder="请输入需要修改的密码"></el-input>
          </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="personalInfoDialogVisible= false">取 消</el-button>
    <el-button type="primary" @click="personalInfoDialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>

    <div class="content-home">
      <div class="top-bar">
        <div style="font-size: 20px; margin-bottom: -15px; margin-top: 10px; margin-right: 10px">
          <el-popover
            placement="bottom"
            trigger="hover">
          <el-button size="small" plain @click="personalInfoDialogVisible = true">个人信息</el-button>
          <el-button size="small" type="danger" plain @click="deleteProjectDialogVisible = true">退出登录</el-button>
            <i class="el-icon-s-tools" style="cursor: pointer" slot="reference"></i>
        </el-popover>

          {{curUsername}} {{curUserEmail}}
        </div>
        <el-divider style="margin: 0"></el-divider>
      </div>
      <div style="text-align: left; margin-top: 60px; margin-bottom: 20px;">
        <span style="font-size: 30px;">{{ curGroupName }}</span>
        <span class="member-tag creator-member" v-if="curIsCreator">创建者</span>
        <span class="member-tag manager-member" v-else-if="curIsManager">管理员</span>
        <span class="member-tag normal-member" v-else>普通成员</span>
      </div>
      <div class="nav-team">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1" @click="showProject">团队项目</el-menu-item>
          <el-menu-item index="2" @click="showTeam">团队管理</el-menu-item>
        </el-menu>
      </div>
      <div class="button--">
        <el-button type="primary" v-if="activeIndex==='1'"
                   @click="newProjectDialogVisible = true"><i class="el-icon-plus"></i> 新建项目</el-button>

        <el-dialog
            title="新建项目"
            :visible.sync="newProjectDialogVisible"
            width="30%">
          <el-form :model="projectForm" :rules="projectRules" ref="projectForm" label-width="100px">
            <el-form-item label="项目名称" prop="projectName">
              <el-input
                  maxlength="10"
                  show-word-limit
                  :rows="1"
                  v-model="projectForm.projectName"></el-input>
            </el-form-item>
            <el-form-item label="项目简介" prop="projectIntro">
              <el-input
                  type="textarea"
                  maxlength="100"
                  show-word-limit
                  :rows="4"
                  v-model="projectForm.projectIntro"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
    <el-button @click="newProjectDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="createProject">确 定</el-button>
  </span>
        </el-dialog>

        <el-button type="primary" v-if="activeIndex==='2'"><i class="el-icon-plus"></i> 邀请成员</el-button>
      </div>
      <div class="content-project" v-if="activeIndex==='1'">
        <projectCover projectName='项目1'></projectCover>
        <projectCover projectName='项目2'></projectCover>
      </div>
      <div class="content-team" v-if="activeIndex==='2'">
        <el-table
            :data="curMemberList"
            stripe
            style="width: 100%">
          <el-table-column
              prop="username"
              label="成员"
              width="180">
          </el-table-column>
          <el-table-column
              prop="realName"
              label="真实姓名"
              width="100">
          </el-table-column>
          <el-table-column
              prop="useremail"
              label="邮箱"
              width="180">
          </el-table-column>
          <el-table-column
              prop="isManager"
              label="权限"
              width="80">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="100">
            <el-popover
                placement="right"
                width="220"
                trigger="hover">
              <el-button size="small" plain>设为管理员</el-button>
              <el-button size="small" type="danger" plain>移出团队</el-button>
              <i class="el-icon-more" slot="reference"></i>
            </el-popover>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectCover from "@/components/homepage/projectCover.vue";
export default {
  name: 'HomeView',
  components: {ProjectCover},
  data() {
      return {
        input1:'',
        input2:'',
        personalInfoDialogVisible:false,
        showInfoDialog: false,
        activeIndex: '1',
        groupIndex: '0',
        curUsername: '',
        curUserID: 0,
        curUserEmail: '',
        curGroupID: 0,
        curIsManager: false,
        curIsCreator: false,
        curProjectList: [],
        curMemberList: [],
        curGroupIntro: '',
        curGroupName: '示例团队',
        groupList: [],
        newProjectDialogVisible: false,
        projectForm: {
          projectName: '',
          projectIntro: '',
        },
        projectRules: {
          projectName: [
            {required: true, message: '请输入项目名称', trigger: 'blur'}
          ],
          projectIntro: [
            {required: true, message: '请输入项目简介', trigger: 'blur'}
          ]
        },
        newTeamDialogVisible: false,
        teamForm: {
          teamName: '',
          teamIntro: '',
        },
        teamRules: {
          teamName: [
            {required: true, message: '请输入团队名称', trigger: 'blur'}
          ],
          teamIntro: [
            {required: true, message: '请输入团队简介', trigger: 'blur'}
          ]
        },
      };
    },
    created() {
      //console.log(localStorage);
      this.curUsername = localStorage.getItem('username');
      this.curUserID = localStorage.getItem('userID');
      this.getGroup();
    },
    methods: {
    handleSelect(param){
      console.log(param)
    },
    logout() {
      console.log('logout')
    },
      showProject() {
        this.activeIndex = '1';
      },
      showTeam() {
        this.activeIndex = '2';
      },
      handleOpen() {
        console.log('open')
      },
      handleClose() {
        console.log('close')
      },
      createProject() {
        const formData = new FormData();
        console.log('团队ID:' + this.curGroupID);
        formData.append("projectName", this.projectForm.projectName);
        formData.append("projectTeamID", this.curGroupID);
        formData.append("projectIntro", this.projectForm.projectIntro);
        formData.append("projectCreatorID", localStorage.getItem('userID'));
        formData.append("username", this.curUsername);
        formData.append("authorization", localStorage.getItem('authorization'));
        this.$axios({
          method: 'post',
          url: 'ProjectManager/projectCreate/',
          data: formData,
        })
            .then(res => {
              switch (res.data.error) {
                case 0:
                  this.$message({
                    message: '项目创建成功',
                    type: 'success'
                  });
                  break;
                case 4001:
                  this.$message.warning('用户不存在！');
                  break;
                case 4002:
                  this.$message.warning('团队不存在！');
                  break;
                case 4003:
                  this.$message.warning('非团队成员无权限操作！');
                  break;
              }
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => {
              this.newProjectDialogVisible = false;
              location.reload();
            })
      },
      createGroup() {
        const formData = new FormData();
        formData.append("creatorID", this.curUserID);
        formData.append("groupName", this.teamForm.teamName);
        formData.append("description", this.teamForm.teamIntro);
        formData.append("username", this.curUsername);
        formData.append("authorization", localStorage.getItem('authorization'));
        this.$axios({
          method: 'post',
          url: 'TeamManager/groupBuild/',
          data: formData,
        })
            .then(res => {
              switch (res.data.error) {
                case 0:
                  this.$message({
                    message: '团队创建成功',
                    type: 'success'
                  });
                  break;
              }
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => {
              this.newTeamDialogVisible = false;
              location.reload();
            })
      },
      getGroup() {
        const formData = new FormData();
        formData.append("userID", this.curUserID);
        formData.append("username", this.curUsername);
        formData.append("authorization", localStorage.getItem('authorization'));
        this.$axios({
          method: 'post',
          url: 'TeamManager/getGroupInfo/',
          data: formData,
        })
            .then(res => {
              switch (res.data.error) {
                case 0:
                  //console.log(res.data.group_list);
                  this.groupList = res.data.group_list;
                  if(this.groupList.length > 0) {
                    this.clickGroup(this.groupList[0].groupID, this.groupList[0].groupName, this.groupList[0].isCreator, this.groupList[0].isManager, this.groupList[0].groupDescription);
                  }
                  break;
              }
            })
            .catch(err => {
              console.log(err);
            })
      },
      clickGroup(groupID, groupName, isCreator, isManager, groupDescription) {
        this.curGroupID = groupID;
        //console.log('团队ID:' + this.curGroupID);
        this.curGroupName = groupName;
        this.curIsCreator = isCreator;
        this.curIsManager = isManager;
        this.curGroupIntro = groupDescription;

        const projectForm = new FormData();
        projectForm.append("groupID", this.curGroupID);
        projectForm.append("username", this.curUsername);
        projectForm.append("authorization", localStorage.getItem('authorization'));
        this.$axios({
          method: 'post',
          url: 'ProjectManager/groupProjectView/',
          data: projectForm,
        })
            .then(res => {
              switch (res.data.error) {
                case 0:
                  this.curProjectList = res.data.projectlist;
                  console.log(this.curProjectList);
                  break;
              }
            })
            .catch(err => {
              console.log(err);
            })

        const formData = new FormData();
        formData.append("groupID", this.curGroupID);
        formData.append("username", this.curUsername);
        formData.append("authorization", localStorage.getItem('authorization'));
        this.$axios({
          method: 'post',
          url: 'TeamManager/getMemberInfo/',
          data: formData,
        })
            .then(res => {
              switch (res.data.error) {
                case 0:
                  this.curMemberList = res.data.member_list;
                  //console.log(this.curMemberList);
                  break;
              }
            })
            .catch(err => {
              console.log(err);
            })
      },
      updateCode(){
        //const formData = new FormData();

      },
    }
}
</script>

<style>
.home {
  position: absolute;
  display: flex;
  flex-direction: row;
  height: 100%;
}
.nav-left {
  position: relative;
  width: 300px;
  height: 100%;
  background-color: #f3f0e1;
  border-right: 1px solid #e8e8e8;
  margin-right: 20px;
}
.content-home {
  display: flex;
  flex-direction: column;
  margin: 10px;
}
.button-- {
  text-align: left;
  margin-top: 15px;
  margin-left: 10px;
}
.content-project {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-left: 10px;
}
.member-tag {
  font-size: 15px;
  padding: 2px 5px;
  border-radius: 5px;
  margin-left: 15px;
}
.normal-member {
  background-color: #c0f0db;
  color: #2ca37f;
}
.manager-member {
  background-color: #ecf5ff;
  color: #409EFF;
}
.creator-member {
  background-color: #fdf6ec;
  color: orange;
}
.left-bar {
  text-align: left;
}
.top-bar {
  margin-top: -10px;
  position: absolute;
  width: 160vh;
  text-align: right;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.container-style{
  color: #1d93ff;
  width: 100%;
  height: 50vh;
  //border: solid 5px rosybrown;
  display: flex;
  flex-direction: row;
}
.left-box{
  display: flex;
  width: 35%;
  //border-right: solid 1px black;
}
.right-box{
  display: flex;
  width: 100%;
  //border: solid 5px red;
  flex-direction: row;
  background-color: #2c3e50;
}
.select-box{
  position: relative;
  width: 100%;
  text-align: left;
  align-items: center;
  justify-content: center;
}
.label-line{
  margin-top: 5px;
  margin-left: 5px;
  display: flex;
  flex-direction: row;
}
.container-box{
  margin-left: 30px;
  width: 80%;
  margin-top: 20px;
}
.right-left-box{
  width: 60%;
  //border: solid 1px black;
}
</style>
