<template>
  <div class="home" v-title data-title="墨书-软工管理平台">
    <div class="nav-left">
      <div class="avatar-box">
        <el-popover
            placement="right"
            trigger="hover"
            v-show="is_login">
          <el-button size="small" plain @click="personalInfoDialogVisible = true">个人信息</el-button>
          <el-button size="small" type="danger" plain @click="logout">退出登录</el-button>

        </el-popover>
        <el-dropdown placement="bottom-start" @command="handleAvatarCommand">
        <span class="el-dropdown-link">
          <el-avatar :size="30" src="https://img02.mockplus.cn/mockplus/avatars/05.jpg" fit="cover" style="margin-left: -5px; cursor: pointer" slot="reference" ></el-avatar>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">个人信息</el-dropdown-item>
            <el-dropdown-item command="2">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-popover
            placement="right"
            trigger="hover"
            v-show="!is_login">
          <el-button type="primary" plain @click="login" v-show="!is_login" width="150px">去 登 录</el-button>
          <el-avatar :size="30" src="https://img02.mockplus.cn/mockplus/avatars/05.jpg" fit="cover" style="margin-left: -5px; cursor: pointer" slot="reference"></el-avatar>
        </el-popover>
      </div>
      <el-menu
          class="select-box"
          background-color="#112F4B"
          active-text-color="#87CEFA"
          text-color="grey"
          :default-active="leftIndex"
          style="margin-bottom: 35vh;">
        <el-menu-item index="1" style="height: 80px; padding-top: 10px;" @click="showProject">
          <div class="left-nav-item">
            <i class="el-icon-document" style="font-size: 25px"></i>
            <span style="height: 10px; margin-left: -15px; margin-top: -10px">团队项目</span>
          </div>
        </el-menu-item>
        <el-menu-item index="2" style="height: 80px; padding-top: 10px;" @click="showTeam">
          <div class="left-nav-item">
            <i class="el-icon-user" style="font-size: 25px"></i>
            <span style="height: 10px; margin-left: -15px; margin-top: -10px">团队管理</span>
          </div>
        </el-menu-item>
        <el-menu-item index="3" style="height: 80px; padding-top: 10px;" @click="showFileCenter">
          <div class="left-nav-item">
            <i class="el-icon-files" style="font-size: 25px"></i>
            <span style="height: 10px; margin-left: -15px; margin-top: -10px">文档中心</span>
          </div>
        </el-menu-item>
      </el-menu>
      <el-dropdown placement="top-start" @command="handleChangeGroupCommand">
        <span class="el-dropdown-link">
          <div class="left-nav-item" style="color: #999999; cursor: pointer">
            <i class="el-icon-sort" style="font-size: 25px"></i>
            <span style="height: 10px; margin-top: 10px;">切换团队</span>
          </div>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command=group v-for="group in this.groupList" v-bind:key="group.groupID">
            <i class="el-icon-check" v-if="curGroupID===group.groupID" style="position: absolute; margin-top: 12px; margin-left: -12px; color: #1d93ff"></i>
            <div style="margin-left: 10px">{{ group.groupName }}</div>
          </el-dropdown-item>
          <el-dropdown-item command="new">
            <i class="el-icon-plus" style="position: absolute; margin-top: 12px; margin-left: -12px;"></i>
            <div style="margin-left: 10px">新建团队</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
      <div v-if="hasGroup">
        <div class="project-box" v-if="leftIndex==='1'">
          <div class="project-nav">
            <el-menu :default-active="projectIndex" class="el-menu-vertical-demo" style="margin-top: 40px; border-right: none">
              <el-menu-item index="1" @click="toAllProject">
                <i class="el-icon-discount"></i>
                <span slot="title">全部项目</span>
              </el-menu-item>
              <el-menu-item index="2" @click="toFavorProject">
                <i class="el-icon-star-on"></i>
                <span slot="title">我的收藏</span>
              </el-menu-item>
              <el-menu-item index="3" @click="toRecentView">
                <i class="el-icon-time"></i>
                <span slot="title">最近查看</span>
              </el-menu-item>
              <el-menu-item index="4" @click="toMyCreateProject">
                <i class="el-icon-user-solid"></i>
                <span slot="title">我创建的</span>
              </el-menu-item>
              <el-menu-item index="5" @click="toDeletedProject">
                <i class="el-icon-delete-solid"></i>
                <span slot="title">回收站</span>
              </el-menu-item>
            </el-menu>
          </div>
          <div class="project-right">
            <div class="button--">
              <el-button type="primary"
                         @click="newProjectDialogVisible = true"><i class="el-icon-plus"></i> 新建项目
              </el-button>
              <el-input placeholder="搜索项目" prefix-icon="el-icon-search" @keyup.enter.native="searchProject"
                        v-model="searchProjectInput" style="width: 30vh; margin-left: 10vh;">
              </el-input>

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
            </div>
            <div class="project-list-title">
              <span v-if="projectIndex==='1'">全部项目</span>
              <span v-else-if="projectIndex==='2'">我的收藏</span>
              <span v-else-if="projectIndex==='3'">最近查看</span>
              <span v-else-if="projectIndex==='4'">我创建的</span>
              <span v-else-if="projectIndex==='5'">回收站</span>
            </div>
            <div class="sort-select">
              <el-dropdown @command="handleSort">
                <span class="el-dropdown-link">
                  <i class="el-icon-s-operation"></i> {{ sortRule }}
                  <i class="el-icon-top" v-if="byAsc"></i><i class="el-icon-bottom" v-else></i>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command=1>创建时间</el-dropdown-item>
                  <el-dropdown-item command=2>项目名称</el-dropdown-item>
                  <el-dropdown-item command=3 divided>升序</el-dropdown-item>
                  <el-dropdown-item command=4>降序</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="content-project" v-if="projectIndex === '5'">
              <recycleProjectCover :projectName=project.projectName :groupID=curGroupID :userID=curUserID :username=curUsername :projectID=project.projectID
                                   :docNum="project.docNum" :pageNum="project.pageNum" :projectCreateTime="project.projectCreateTime"
                                   :projectIntro="project.projectIntro" :projectCreator="project.creator" :projectManager="project.projectManager"
                                   v-for="project in recycleProjectList" v-bind:key="project.projectID"
                                   @click="toProject(project.projectID)"
                                   style="margin-right: 7vh; margin-top: 4vh"></recycleProjectCover>
            </div>
            <div class="content-project" v-else>
              <projectCover :projectName=project.projectName :groupID=curGroupID :userID=curUserID :username=curUsername :projectID=project.projectID
                            :docNum="project.docNum" :pageNum="project.pageNum" :projectCreateTime="project.projectCreateTime"
                            :projectIntro="project.projectIntro" :projectCreator="project.creator" :projectManager="project.projectManager"
                            :hasFavored="project.hasFavored"
                            v-for="project in curProjectList" v-bind:key="project.projectID"
                            @click="toProject(project.projectID)"
                            style="margin-right: 7vh; margin-top: 4vh"></projectCover>
            </div>
          </div>
        </div>

        <div class="group-box" v-if="leftIndex==='2'">
          <div style="text-align: left; margin-top: 10vh;">
            <span style="font-size: 40px;">{{ curGroupName }}</span>
            <span class="member-tag creator-member" v-if="curIsCreator">创建者</span>
            <span class="member-tag manager-member" v-else-if="curIsManager">管理员</span>
            <span class="member-tag normal-member" v-else>普通成员</span>
          </div>
          <div style="text-align: left; margin-top: 3vh; width: 80vh; font-size: 15px;">团队简介：{{curGroupIntro}}</div>
          <el-button type="primary" style="width: 20vh; margin-top: 4vh;" @click="showInviteDialog = true">
            <i class="el-icon-plus"></i> 邀请成员
          </el-button>
          <div style="margin-top: 3vh; width: 110vh">
            <el-table
                :data="curMemberList"
                stripe>
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

        <div v-if="leftIndex==='3'">
          <DocumentView :list="documentList"></DocumentView>
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
import recycleProjectCover from "@/components/homepage/recycleProjectCover";
import DocumentView from "@/views/documentEdit/DocumentView";

export default {
  name: 'HomeView',
  components: {ProjectCover,recycleProjectCover, DocumentView},
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
      searchProjectInput: '',
      hasGroup: false,
      personalInfoDialogVisible: false,
      showInfoDialog: false,
      showInviteDialog: false,
      inviteMemberName: '',
      leftIndex: '1',
      projectIndex: '1',
      sortRule: '创建时间',
      byAsc : true,
      groupIndex: '0',
      curUsername: '',
      curUserID: 0,
      curUserEmail: '',
      curGroupID: 0,
      curIsManager: false,
      curIsCreator: false,
      curProjectList: [{projectID: 1, projectName: '项目1', projectIntro: '项目简介1'}, {projectID: 2, projectName: '项目2', projectIntro: '项目简介2'}],
      favorProjectList: [],
      myCreateProjectList: [],
      recycleProjectList: [{projectID: 1, projectName: '项目1', projectIntro: '项目简介1'}, {projectID: 2, projectName: '项目2', projectIntro: '项目简介2'}],
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
      documentList: [{
        isSub: false,
        title: 'title1',
        content: '<p>content1</p>',
        childDoc: []
      },
        {
          isSub: false,
          title: 'title2',
          content: '<p>content2</p>',
          childDoc: []
        },
        {
          isSub: true,
          title: 'project1',
          content: '',
          childDoc: [{title: 'title3', content: '<p>content3</p>'}, {title: 'title4', content: '<p>content4</p>'}]
        }]
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
    searchProject() {
      const dataForm = new FormData();
      dataForm.append("key", this.searchProjectInput);
      dataForm.append("username", this.username);
      dataForm.append("authorization", localStorage.getItem('authorization'));
      console.log(this.searchProjectInput);
      this.$axios({
        method: 'post',
        url: 'ProjectManager/searchProject/',
        data: dataForm,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                this.curProjectList = res.data.projectList;
                break;
              case 4001:
                this.$message({
                  message: '无相关项目！',
                  type: 'warning'
                });
                break;
              case 4002:
                this.$message({
                  message: '搜索内容不能为空！',
                  type: 'warning'
                });
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    handleAvatarCommand(index) {
      if(index === '1') {
        this.personalInfoDialogVisible = true;
      } else if(index === '2') {
        this.logout();
      }
    },
    handleChangeGroupCommand(group) {
      if(group === 'new') {
        this.newTeamDialogVisible = true;
      } else {
        this.clickGroup(group.groupID, group.groupName, group.isCreator, group.isManager, group.groupDescription);
      }
    },
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
                this.updateMemberInfo();
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
      this.leftIndex = '1';
    },
    showTeam() {
      this.leftIndex = '2';
    },
    showFileCenter() {
      this.leftIndex = '3';
    },
    toAllProject() {
      this.projectIndex = '1';
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
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    toFavorProject() {
      this.projectIndex = '2';
      this.refreshFavorProject();
    },
    refreshFavorProject() {
      const projectForm = new FormData();
      projectForm.append("groupID", this.curGroupID);
      projectForm.append("username", this.curUsername);
      projectForm.append("authorization", localStorage.getItem('authorization'));
      this.$axios({
        method: 'post',
        url: 'ProjectManager/viewCollect',
        data: projectForm,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                this.favorProjectList = res.data.project_list;
                if(this.projectIndex === '2'){
                  this.curProjectList = this.favorProjectList;
                }
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    toRecentView() {
      this.projectIndex = '3';
    },
    toMyCreateProject() {
      this.projectIndex = '4';
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
                this.myCreateProjectList = [];
                for (let i = 0; i < res.data.project_list.length; i++) {
                  if (res.data.project_list[i].creator === this.curUsername) {
                    this.myCreateProjectList.push(res.data.project_list[i]);
                  }
                }
                this.curProjectList = this.myCreateProjectList;
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    toDeletedProject() {
      this.projectIndex = '5';
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
                    this.teamForm.teamName = '';
                    this.teamForm.teamIntro = '';
                    break;
                }
              })
              .catch(err => {
                console.log(err);
              })
              .finally(() => {
                this.newTeamDialogVisible = false;
                this.getGroup();
                setTimeout(() => {
                  const index = this.groupList.length - 1;
                  this.clickGroup(this.groupList[index].groupID, this.groupList[index].groupName, this.groupList[index].isCreator, this.groupList[index].isManager, this.groupList[index].groupDescription);
                  this.groupIndex = index + '';
                }, 1000);

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
                  break;
              }
            })
            .catch(err => {
              console.log(err);
            })

      const recycleProjectForm = new FormData();
      recycleProjectForm.append("groupID", this.curGroupID);
      recycleProjectForm.append("username", this.curUsername);
      recycleProjectForm.append("authorization", localStorage.getItem('authorization'));
      this.$axios({
        method: 'post',
        url: 'ProjectManager/viewRecycle/',
        data: recycleProjectForm,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                this.recycleProjectList = res.data.project_list;
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
                this.curProjectList = res.data.project_list;
                //console.log(this.curProjectList);
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

      const recycleProjectForm = new FormData();
      recycleProjectForm.append("groupID", this.curGroupID);
      recycleProjectForm.append("username", this.curUsername);
      recycleProjectForm.append("authorization", localStorage.getItem('authorization'));
      this.$axios({
        method: 'post',
        url: 'ProjectManager/viewRecycle/',
        data: recycleProjectForm,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                this.recycleProjectList = res.data.project_list;
                console.log('返回回收站信息');
                console.log(res.data.project_list);
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
        this.$router.push('/login');
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
    handleSort(index) {
      if(index === '1') {
        this.sortRule = '创建时间';
      } else if (index === '2') {
        this.sortRule = '项目名称';
      } else if (index === '3') {
        this.byAsc = true;
      } else if (index === '4') {
        this.byAsc = false;
      }
      this.curProjectList.sort((a, b) => {
        if (this.sortRule === '创建时间') {
          if (this.byAsc) {
            return a.projectCreateTime.localeCompare(b.projectCreateTime);
          } else {
            return b.projectCreateTime.localeCompare(a.projectCreateTime);
          }
        } else if (this.sortRule === '项目名称') {
          if (this.byAsc) {
            return a.projectName.localeCompare(b.projectName);
          } else {
            return b.projectName.localeCompare(a.projectName);
          }
        }
      });
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
              this.$message.success('邀请成功，请等待对方确认')
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
.avatar-box {
  margin-top: 50px;
  margin-bottom: 50px;
}

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
  width: 70px;
  height: auto;
  background-color: #112F4B;
}

.left-nav-item {
  display: flex;
  flex-direction: column;
}

.project-box {
  display: flex;
  flex-direction: row;
}

.group-box {
  display: flex;
  flex-direction: column;
  margin-left: 20vh;
}

.project-nav {
  width: 190px;
  height: 100vh;
  border-right: solid 1px #e6e6e6;
}

.project-right {
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-left: 10vh;
  justify-content: left;
}

.project-list-title {
  margin-top: 5vh;
  text-align: left;
  font-size: 20px;
}

.sort-select {
  text-align: left;
  margin-top: 5vh;
  padding-bottom: 1vh;
  border-bottom: solid 1px #e6e6e6;
  width: 95%;
}

.content-home {
  width: 100%;
  height: auto;
}


.button-- {
  text-align: left;
  margin-top: 6vh;
}

.content-project {
  display: flex;
  flex-wrap: wrap;
  width: 160vh;
}

.member-tag {
  font-size: 15px;
  padding: 2px 5px;
  border-radius: 5px;
  margin-left: 4vh;
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
  width: 102%;
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
  margin-left: 20vh;
}
</style>
