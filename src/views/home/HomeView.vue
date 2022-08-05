<template>
  <div class="home">
    <div class="nav-left">
      <img style="width: 200px; margin-top: 4vh; margin-bottom: 2vh;"  src="@/assets/logo/logo-yellow.png" alt="">
      <el-menu
          class="select-box"
          background-color="#112F4B"
          active-text-color="#87CEFA"
          text-color="#FFFFFF"
          :default-active="groupIndex">
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-user" style="color: white"></i>
            <span>我的团队</span>
          </template>
          <el-menu-item-group>
            <el-menu-item class="left-bar" v-for="(group,index) in this.groupList"
                          :index="index+''" v-bind:key="group.groupID"
                          @click="clickGroup(group.groupID, group.groupName, group.isCreator, group.isManager, group.groupDescription)">
              {{group.groupName}}</el-menu-item>
            <el-menu-item :index="this.groupList.length+ ''" class="left-bar"
                          @click="newTeamDialogVisible = true"><i class="el-icon-plus" style="color: white"></i>新建团队</el-menu-item>
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
            <el-menu-item index="1" @click="userSetting=true,updateCode=false">
              <i class="el-icon-setting"></i>
              <span slot="title">账号设置</span>
            </el-menu-item>
            <el-menu-item index="2" @click="updateCode=true,userSetting=false">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">更改密码</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="right-box" v-show="userSetting">
          <div class="right-left-box">
            <div class="container-box">
              <div class="label-line">
                <span style="color: red;font-size: 25px;justify-content:center;align-items: center">*</span>
                <span style="text-align: left;font-size: 18px;color: white">当前邮箱</span>
              </div>
              <el-input v-model="currentUserEmail" placeholder="请输入当前邮箱"></el-input>
            </div>
            <div class="container-box">
              <div class="label-line">
                <span style="color: red;font-size: 25px;justify-content:center;align-items: center">*</span>
                <span style="text-align: left;font-size: 18px;color: white">新邮箱</span>
              </div>
              <el-input v-model="newUserEmail" placeholder="请输入新邮箱"></el-input>
            </div>
            <div class="container-button-box">
              <el-button type="primary" @click="updateEmail">修 改 邮 箱</el-button>
            </div>
          </div>
        </div>
        <div class="right-box" v-show="updateCode">
          <div class="right-right-box">
            <div class="right-container-box">
              <div class="label-line">
                <span style="color: red;font-size: 25px;justify-content:center;align-items: center">*</span>
                <span style="text-align: left;font-size: 18px;color: white">当前邮箱</span>
              </div>
              <el-input v-model="currentUserEmail" placeholder="请输入当前邮箱"></el-input>
            </div>
            <div class="right-container-box">
              <div class="label-line">
                <span style="color: red;font-size: 25px;justify-content:center;align-items: center">*</span>
                <span style="text-align: left;font-size: 18px;color: white">验证码</span>
              </div>
              <el-input v-model="checkCode" placeholder="请输入验证码"></el-input>
            </div>
            <div class="right-container-box">
              <div class="label-line">
                <span style="color: red;font-size: 25px;justify-content:center;align-items: center">*</span>
                <span style="text-align: left;font-size: 18px;color: white">新密码</span>
              </div>
              <el-input v-model="newPassword" placeholder="请输入新密码"></el-input>
            </div>
          </div>
          <div class="right-right-button-box">
            <div class="right-button-box">
              <el-button type="primary" @click="forget">获取验证码</el-button>
            </div>
            <div class="right-button-under-box">
              <el-button type="primary" @click="update">确 认 修 改</el-button>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="personalInfoDialogVisible= false">取 消</el-button>
    <el-button type="primary" @click="personalInfoDialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>

    <el-dialog
        :before-close="clearInviteContent"
        title="邀请成员"
        :visible.sync="showInviteDialog"
        width="30%">
      <el-form :model="inviteForm" ref="inviteForm" label-width="100px">
        <el-form-item label="成员用户名" prop="inviteName" required>
          <el-input
              maxlength="20"
              show-word-limit
              :rows="1"
              v-model="inviteForm.inviteName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="clearInviteContent">取 消</el-button>
    <el-button type="primary" @click="inviteMember">确 定</el-button>
  </span>
    </el-dialog>

    <div class="content-home">
      <div class="top-bar">
        <div style="font-size: 20px; margin-bottom: -15px; margin-top: 10px; margin-right: 10px">
          <el-popover
              placement="bottom"
              trigger="hover"
              v-show="is_login">
            <el-button size="small" plain @click="personalInfoDialogVisible = true">个人信息</el-button>
            <el-button size="small" type="danger" plain @click="logout">退出登录</el-button>
            <i class="el-icon-s-tools" style="cursor: pointer" slot="reference"></i>
          </el-popover>
          <el-popover
              placement="bottom"
              trigger="hover"
              v-show="!is_login">
            <el-button type="primary" plain @click="login" v-show="!is_login" width="150px">去 登 录</el-button>
            <i class="el-icon-s-tools" style="cursor: pointer" slot="reference"></i>
          </el-popover>
          {{ curUsername }} {{ curUserEmail }}
        </div>
        <el-divider style="margin: 0"></el-divider>
      </div>
      <div v-if="hasGroup">
        <div style="text-align: left; margin-top: 60px; margin-bottom: 20px;">
          <span style="font-size: 30px;">{{ curGroupName }}</span>
          <span class="member-tag creator-member" v-if="curIsCreator">创建者</span>
          <span class="member-tag manager-member" v-else-if="curIsManager">管理员</span>
          <span class="member-tag normal-member" v-else>普通成员</span>
          <span style="margin-left: 2vh;">{{curGroupIntro}}</span>
        </div>
        <div class="nav-team">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1" @click="showProject">团队项目</el-menu-item>
            <el-menu-item index="2" @click="showTeam">团队管理</el-menu-item>
          </el-menu>
        </div>
        <div class="button--">
          <el-button type="primary" v-if="activeIndex==='1'"
                     @click="newProjectDialogVisible = true"><i class="el-icon-plus"></i> 新建项目
          </el-button>

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

          <el-button type="primary" v-if="activeIndex==='2'" @click="showInviteDialog = true"><i
              class="el-icon-plus"></i> 邀请成员
          </el-button>
        </div>
        <div class="content-project" v-if="activeIndex==='1'">
          <projectCover :projectName=project.projectName :groupID=curGroupID :userID=curUserID :username=curUsername :projectID=project.projectID
                        :docNum="project.docNum" :pageNum="project.pageNum" :projectCreateTime="project.projectCreateTime"
                        :projectIntro="project.projectIntro" :projectCreator="project.creator" :projectManager="project.projectManager"
                        v-for="project in curProjectList" v-bind:key="project.projectID"
                        @click="toProject(project.projectID)"
                        style="margin-left: 7vh; margin-top: 4vh"></projectCover>
        </div>
        <div style="margin-top: 3vh" v-if="activeIndex==='2'">
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
                width="140">
            </el-table-column>
            <el-table-column
                prop="useremail"
                label="邮箱"
                width="240">
            </el-table-column>
            <el-table-column
                prop="level"
                label="权限"
                width="160">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
              <template slot-scope="scope">
                <el-popover
                    placement="right"
                    width="220"
                    trigger="hover">
                  <el-button size="small" :disabled="(!curIsManager) || (scope.row.username === curUsername)" plain
                              v-if="!scope.row.isManager" @click="setManager(scope.row.username, scope.row)">设为管理员</el-button>
                  <el-button size="small" :disabled="(!curIsManager) || (scope.row.username === curUsername)" plain
                             v-else @click="deleteManager(scope.row.username, scope.row)">取消管理员</el-button>
                  <el-button size="small" v-if="scope.row.username !== curUsername"
                             :disabled="!(curIsCreator || (curIsManager && scope.row.level === '普通成员'))" type="danger" plain
                              @click="kickOut(scope.row.username)">
                    移出团队
                  </el-button>
                  <el-button v-else size="small" type="danger" plain @click="quitTeam(scope.row.username)">退出团队</el-button>
                  <i class="el-icon-more" slot="reference"></i>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="no-group" v-else>
        <span style="font-size: 40px; color: #595959">创建团队</span>
        <span style="font-size: 15px; color: #999999; margin-top: 4vh;">当前账号下无团队，请先创建</span>
        <el-button type="primary" style="width: 20vh; margin-top: 4vh;" @click="newTeamDialogVisible = true">创 建 团 队
        </el-button>
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
      currentUserEmail:'',
      newUserEmail:'',
      checkCode:'',
      newPassword:'',
      userSetting:true,
      updateCode:false,
      is_login: false,
      input1: '',
      input2: '',
      input3: '',
      hasGroup: false,
      personalInfoDialogVisible: false,
      showInfoDialog: false,
      showInviteDialog: false,
      inviteMemberName: '',
      activeIndex: '1',
      groupIndex: '0',
      curUsername: '',
      curUserID: 0,
      curUserEmail: '',
      curGroupID: 0,
      curIsManager: false,
      curIsCreator: false,
      curProjectList: [{projectID: 1, projectName: '项目1', projectIntro: '项目简介1'}, {projectID: 2, projectName: '项目2', projectIntro: '项目简介2'}],
      curMemberList: [],
      curGroupIntro: '',
      curGroupName: '示例团队',
      groupList: [],
      newProjectDialogVisible: false,
      projectForm: {
        projectName: '',
        projectIntro: '',
      },
      inviteForm: {
        inviteName: '',
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
    this.curUsername = localStorage.getItem('username');
    this.curUserID = localStorage.getItem('userID');
    this.getGroup();
    if (this.curUserID !== null)
      this.is_login = true
  },
  methods: {
    updateEmail(){
      const self = this;
      const formData = new FormData();
      formData.append("userID", self.curUserID);
      formData.append("email",self.newUserEmail);
      formData.append("authorization", localStorage.getItem('authorization'));
      formData.append("username", this.curUsername);
      self.$axios({
        method: 'post',
        url: 'Login/editUserInfo/',
        data: formData,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                // 前端保存用户信息
                this.$message.success("邮箱修改成功！");
                location.reload();
                break;
              default:
                this.$message.error('邮箱修改失败！');
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    update(){
      const self = this;
      const formData = new FormData();
      formData.append("useremail", self.currentUserEmail);
      formData.append("password",self.newPassword);
      formData.append("code",self.checkCode);
      formData.append("authorization", localStorage.getItem('authorization'));
      formData.append("username", this.curUsername);
      self.$axios({
        method: 'post',
        url: 'Login/update/',
        data: formData,
      })
          .then(res => {
            console.log(res.data);
            switch (res.data.error) {
              case 0:
                // 前端保存用户信息
                this.$message.success("密码修改成功！");
                this.$router.push('/login');
                break;
              case 4001:
                this.$message.error('密码违规！');
                break;
              case 4002:
                this.$message.error('验证码错误！');
                break;
              case 2001:
                this.$message.error('请求方式错误！');
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    forget(){
      const self = this;
      const formData = new FormData();
      formData.append("email", self.currentUserEmail);
      formData.append("authorization", localStorage.getItem('authorization'));
      formData.append("username", this.curUsername);
      console.log(self.currentUserEmail);
      self.$axios({
        method: 'post',
        url: 'Login/forget/',
        data: formData,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                // 前端保存用户信息
                this.$message.success("验证码已发送，请前往邮箱确认！");
                break;
              case 3001:
                this.$message.error('表单信息错误（未全部填写或数据类型有误）！');
                break;
              case 4001:
                this.$message.warning('邮件发送失败！');
                break;
              case 4002:
                this.$message.error('邮箱未注册！');
                break;
              case 2001:
                this.$message.error('请求方式错误！');
                break;
            }
          })
    },
    kickOut(operatedUsername) {
      const dataForm = new FormData();
      dataForm.append("hostID", this.curUserID);
      dataForm.append("name", operatedUsername);
      dataForm.append("groupID", this.curGroupID);
      dataForm.append("username", this.curUsername);
      dataForm.append("authorization", localStorage.getItem('authorization'));
      this.$axios({
        method: 'post',
        url: 'TeamManager/deleteMember/',
        data: dataForm,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                this.$message({
                  message: '移出成功',
                  type: 'success'
                });
                this.kickDialogVisible = false;
                location.reload();
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    quitTeam(operatedUsername) {
      const dataForm = new FormData();
      dataForm.append("hostID", this.curUserID);
      dataForm.append("name", operatedUsername);
      dataForm.append("groupID", this.curGroupID);
      dataForm.append("username", this.curUsername);
      dataForm.append("authorization", localStorage.getItem('authorization'));
      this.$axios({
        method: 'post',
        url: 'TeamManager/deleteMember/',
        data: dataForm,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                this.$message({
                  message: '退出成功',
                  type: 'success'
                });
                this.quitDialogVisible = false;
                location.reload();
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    setManager(operatedUsername, row) {
      const dataForm = new FormData();
      dataForm.append("hostID", this.curUserID);
      dataForm.append("name", operatedUsername);
      dataForm.append("groupID", this.curGroupID);
      dataForm.append("username", this.curUsername);
      dataForm.append("authorization", localStorage.getItem('authorization'));
      this.$axios({
        method: 'post',
        url: 'TeamManager/addManager/',
        data: dataForm,
      })
          .then(res => {
            //console.log(res);
            switch (res.data.error) {
              case 0:
                this.$message({
                  message: '设置成功',
                  type: 'success'
                });
                  row.level = '管理员';
                  row.isManager = true;
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    deleteManager(operatedUsername, row) {
      const dataForm = new FormData();
      dataForm.append("hostID", this.curUserID);
      dataForm.append("name", operatedUsername);
      dataForm.append("groupID", this.curGroupID);
      dataForm.append("username", this.curUsername);
      dataForm.append("authorization", localStorage.getItem('authorization'));
      this.$axios({
        method: 'post',
        url: 'TeamManager/deleteManager/',
        data: dataForm,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                this.$message({
                  message: '设置成功',
                  type: 'success'
                });
                row.level = '普通成员';
                row.isManager = false;
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    handleSelect(param) {
      console.log(param)
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
    clearInviteContent() {
      this.showInviteDialog=false
      this.inviteForm.inviteName=''
    },
    createProject() {
      const formData = new FormData();
      console.log('团队ID:' + this.curGroupID);
      formData.append("projectName", this.projectForm.projectName);
      console.log(this.projectForm.projectName)
      formData.append("projectTeamID", this.curGroupID);
      console.log(this.curGroupID)
      formData.append("projectIntro", this.projectForm.projectIntro);
      console.log(this.projectForm.projectIntro)
      formData.append("projectCreatorID", localStorage.getItem('userID'));
      console.log(localStorage.getItem('userID'))
      formData.append("username", this.curUsername);
      console.log(this.curUsername)
      formData.append("authorization", localStorage.getItem('authorization'));
      console.log(localStorage.getItem('authorization'))
      this.$refs.projectForm.validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'ProjectManager/projectCreate/',
            data: formData,
          })
              .then(res => {
                //console.log(res);
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
        } else {
          return
        }
      })
    },
    createGroup() {
      const formData = new FormData();
      formData.append("creatorID", this.curUserID);
      formData.append("groupName", this.teamForm.teamName);
      formData.append("description", this.teamForm.teamIntro);
      formData.append("username", this.curUsername);
      formData.append("authorization", localStorage.getItem('authorization'));

      this.$refs.teamForm.validate((valid) => {
        console.log(valid)
        if (valid) {
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
        } else {
          return
        }
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
            //console.log(res.data)
            switch (res.data.error) {
              case 0:
                //console.log(res.data.group_list);
                this.groupList = res.data.group_list;
                if (this.groupList.length > 0) {
                  this.hasGroup = true;
                  this.clickGroup(this.groupList[0].groupID, this.groupList[0].groupName, this.groupList[0].isCreator, this.groupList[0].isManager, this.groupList[0].groupDescription);
                } else {
                  this.hasGroup = false;
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
          url: 'TeamManager/groupViewProject/',
          data: projectForm,
        })
            .then(res => {
              switch (res.data.error) {
                case 0:
                  this.curProjectList = res.data.project_list;
                  //console.log('项目列表：');
                  //console.log(res.data.project_list);
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
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    updateMemberInfo() {
      const projectForm = new FormData();
      projectForm.append("groupID", this.curGroupID);
      projectForm.append("username", this.curUsername);
      projectForm.append("authorization", localStorage.getItem('authorization'));
      this.$axios({
        method: 'post',
        url: 'TeamManager/groupViewProject/',
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
    logout() {
      //console.log(this.curUserID)
      this.deleteProjectDialogVisible = true;
      if (this.is_login) {
        localStorage.removeItem('userID');
        localStorage.removeItem('username');
        localStorage.removeItem('authorization');
        this.curUsername = '';
        this.curUserID = 0;
        this.is_login = false;
        location.reload()
      } else
        this.$message.error("您还未登录")
    },
    login() {
      this.$router.push('/login');
    },
    toProject(pID) {
      let path = this.$router.resolve('/project/'+pID);
      window.open(path.href)
    },
    inviteMember() {
      let data = new FormData
      let self = this
      data.append('username', this.curUsername)
      data.append('authorization', localStorage.getItem('authorization'))
      data.append('hostID', this.curUserID)
      data.append('groupID', this.curGroupID)
      data.append('inviteName',this.inviteForm.inviteName)
      this.$refs.inviteForm.validate(valid => {
        if(valid)
        {
          this.$axios({
            method: 'post',
            url: 'TeamManager/addMember/',
            data: data
          }).then(res => {
            console.log(res)
            if(res.data.error === 0){
              this.$message.success('邀请成功')
              this.showInviteDialog = false
              self.updateMemberInfo()
            }
            else {
              this.$message.error(res.data.msg)
            }
          })
        }
        else {
          return
        }
      })
    }
  }
}
</script>

<style>
.home {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 100%;
  min-height: 100vh;
}

.nav-left {
  position: relative;
  width: 300px;
  height: auto;
  background-color: #112F4B;
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
  flex-wrap: wrap;
  width: 160vh;
  margin-left: -20px;
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

.container-style {
  color: #1d93ff;
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: row;
}

.left-box {
  display: flex;
  width: 35%;
}

.right-box {
  width: 100%;
  background-color: #2c3e50;
  display: flex;
  flex-direction: row;
  position: relative;
}

.right-container-box {
  margin-left: 5vh;
  width: 80%;
  margin-top: 3vh;
}

.select-box {
  position: relative;
  width: 100.3%;
  text-align: left;
  align-items: center;
  justify-content: center;
}

.label-line {
  margin-top: 3vh;
  display: flex;
  flex-direction: row;
}

.container-box {
  margin-left: 5vh;
  width: 80%;
  margin-top: 3vh;
}
.container-button-box{
  position: relative;
  margin-top: 8vh;
  margin-left: -14vh;
  width: 100%;
}
.right-button-box{
  margin-top: 8vh;
  width: 60%;
}
.right-button-under-box{
  margin-top: 22vh;
  width: 60%;
}
.right-right-button-box{
  width: 60%;
  margin-left: 5vh;
}
.right-left-box {
  width: 60%;
}
.right-right-box {
  width: 100%;
}
.no-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 33vh;
  margin-left: 42vh;
}
</style>
