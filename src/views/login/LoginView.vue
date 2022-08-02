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
          <el-input placeholder="真实姓名" v-model="registerForm.realName"></el-input>
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
    let checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      } else {
        var reg=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
        if (!reg.test(value)) {
        callback(new Error('用户名由中英文、数字或下划线组成'))
      } else {
        callback();
      }
      }
    };
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      } else {
        var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(value)) {
          callback(new Error('请输入有效的邮箱'));
        } else {
          callback();
        }
      }
    };
    let validatePass = (rule, value, callback) => {
      if (!value) {
        console.log('密码不能为空');
        callback(new Error('请输入密码'));
      } else {
        var reg_pwd=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/;
        if (!reg_pwd.test(value)) {
          callback(new Error('密码至少同时包含字母和数字，且长度为8-18'));
        } else {
          if (this.registerForm.confirmPassword !== '') {
            this.$refs.registerForm.validateField('password');
          }
          callback();
        }
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var checkRealName = (rule, value, callback) => {
      const reg=/^[\u4e00-\u9fa5a-zA-Z]+$/;
      if (!value) {
        return callback(new Error('真实姓名不能为空'));
      } else if (!reg.test(value)) {
        callback(new Error('真实姓名由中英文组成'))
      } else {
        callback();
      }
    };
    return {
      registerDialogVisible: false,
      loginDialogVisible: true,
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      registerForm: {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        realName: "",
      },
      registerRules: {
        username: [
          { validator: checkUsername, trigger: 'blur'}
        ],
        email: [
          { validator: checkEmail, trigger: 'blur'}
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        realName: [
          { validator: checkRealName, trigger: 'blur'}
        ],
      }
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