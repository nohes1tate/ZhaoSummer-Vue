<template>
  <div class="login-page">
    <div class="logo-container">
      <img src="@/assets/logo/墨书.png" alt="logo" class="logo">
    </div>
    <div style="text-align: center; font-size: 30px;">
      <span>高效的软工团队协作与管理平台</span>
    </div>
    <div class="login-container" v-if="loginDialogVisible">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="100px" style="margin-left: -100px">
        <el-form-item prop="username">
          <el-input placeholder="用户名" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="密码" v-model="loginForm.password" show-password></el-input>
        </el-form-item>
      </el-form>
      <el-button style="width: 220px" type="primary">登录</el-button>
      <div style="font-size: 12px; color: deepskyblue; margin-top: 20px; margin-left: -170px; cursor: pointer">
        <span @click="toRegister">注册账号</span>
      </div>
    </div>
    <div class="login-container" v-if="registerDialogVisible">
      <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="100px" style="margin-left: -100px">
        <el-form-item prop="username">
          <el-input placeholder="用户名" v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="密码" v-model="registerForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input placeholder="确认密码" v-model="registerForm.confirmPassword" show-password></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input placeholder="邮箱" v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="realName">
          <el-input placeholder="真实姓名" v-model="registerForm.email"></el-input>
        </el-form-item>
      </el-form>
      <el-button style="width: 220px" type="primary" @click="register">注册</el-button>
      <div style="font-size: 12px; color: deepskyblue; margin-top: 20px; margin-left: -170px; cursor: pointer">
        <span @click="toLogin">已有账号</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loginView",
  data() {
    return {
      registerDialogVisible: false,
      loginDialogVisible: true,
      loginForm: {
        username: "",
        password: "",
      },
      registerForm: {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        realName: "",
      },
    }
  },
  methods: {
    toRegister() {
      this.loginDialogVisible = false;
      this.registerDialogVisible = true;
    },
    toLogin() {
      this.loginDialogVisible = true;
      this.registerDialogVisible = false;
    },
  },
}
</script>

<style>
.login-page {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  position: absolute;
  display: flex;
  flex-direction: column;
}
.logo-container {
  align-items: center;
  margin-top: 100px;
}
.logo {
  width: 300px;
}
.login-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>