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
            <el-menu-item index="1" class="left-bar" v-for="group in this.groupList" v-bind:key="group.groupID">{{group.groupName}}</el-menu-item>
            <el-menu-item index="2" class="left-bar">示例团队</el-menu-item>
            <el-menu-item index="3" class="left-bar"
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

    <div class="content-home">
      <div class="top-bar">
        <div style="font-size: 20px; margin-bottom: -15px; margin-top: 10px; margin-right: 10px">
          <el-popover
            placement="bottom"
            trigger="hover">
          <el-button size="small" plain @click="newProjectNameDialogVisible = true">个人信息</el-button>
          <el-button size="small" type="danger" plain @click="deleteProjectDialogVisible = true">退出登录</el-button>
            <i class="el-icon-s-tools" style="cursor: pointer" slot="reference"></i>
        </el-popover>
          {{curUsername}} {{curUserEmail}}
        </div>
        <el-divider style="margin: 0"></el-divider>
      </div>
      <div style="text-align: left; margin-top: 60px; margin-bottom: 20px;">
        <span style="font-size: 30px;">团队名称</span>
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
            :data="tableData"
            stripe
            style="width: 100%">
          <el-table-column
              prop="member"
              label="成员"
              width="180">
          </el-table-column>
          <el-table-column
              prop="name"
              label="真实姓名"
              width="100">
          </el-table-column>
          <el-table-column
              prop="email"
              label="邮箱"
              width="180">
          </el-table-column>
          <el-table-column
              prop="level"
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
        showInfoDialog: false,
        activeIndex: '1',
        groupIndex: '1',
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
       tableData: [{
         member: '番茄炒西红柿666',
         name: '陈百铭',
         level: '管理员',
         email: '957167412@qq.com'
       }, {
         member: '番茄炒西红柿666',
         name: '陈百铭',
         level: '管理员',
         email: '957167412@qq.com'
       },{
         member: '番茄炒西红柿666',
         name: '陈百铭',
         level: '管理员',
         email: '957167412@qq.com'
       }]
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
                  this.toRegister();
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
                  break;
              }
            })
            .catch(err => {
              console.log(err);
            })
      }
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
</style>
