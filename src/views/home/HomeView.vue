<template>
  <div class="home">
    <div class="nav-left">
      <el-menu :default-active="Index" class="el-menu-vertical-demo" @select="handleSelect">
        <el-submenu>
          <template slot="title">我的团队</template>
          <el-menu-item index="1">小学期</el-menu-item>
          <el-menu-item index="2">示例团队</el-menu-item>
          <el-menu-item index="3">+ 新建团队</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="content-home">
      <div style="font-size: 20px; text-align: left">
        团队名称
      </div>
      <div class="nav-team">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1" @click="showProject">团队项目</el-menu-item>
          <el-menu-item index="2" @click="showTeam">团队管理</el-menu-item>
        </el-menu>
      </div>
      <div class="button">
        <el-button type="primary" v-if="activeIndex==='1'">+ 新建项目</el-button>
        <el-button type="primary" v-if="activeIndex==='2'">+ 邀请成员</el-button>
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
                placement="bottom"
                width="100"
                trigger="hover">
              <ul>移出团队</ul>
              <ul>设为管理员</ul>
              <el-button slot="reference">…</el-button>
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
        activeIndex: '1',
        Index: '1',
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
    methods: {
      showProject() {
        this.activeIndex = '1';
      },
      showTeam() {
        this.activeIndex = '2';
      },
    }
}
</script>

<style>
.home {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.nav-left {
  width: 200px;
  height: 100%;
  color: grey;
  border-right: 1px solid #e8e8e8;
}
.content-home {
  display: flex;
  flex-direction: column;
  margin: 10px;
}
.button {
  text-align: left;
  margin-top: 10px;
}
.content-project {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
</style>