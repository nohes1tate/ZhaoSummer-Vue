<template>
  <!-- 最外层的大盒子 -->
  <div class="bigBox">
    <div class="box">
      <!-- 滑动盒子 -->
      <div class="pre-box">
        <div class="img-box">
          <img src="@/assets/logo/墨书.png" alt="" id="avatar" />
        </div>
        <p>高效的软工团队协作与管理平台</p>
      </div>
      <!-- 注册盒子 -->
      <div class="register-form">
        <!-- 标题盒子 -->
        <div class="title-box-register">
          <h1>注册</h1>
        </div>
        <!-- 输入框盒子 -->
        <el-form
            ref="registerFormRef"
            :model="registerForm"
            :rules="rules"
            label-with="5px"
        >
          <el-form-item prop="username" label=" ">
            <el-input
                type="text"
                placeholder="用户名"
                v-model="registerForm.username"
            />
          </el-form-item>
          <el-form-item prop="email" label=" ">
            <el-input
                type="text"
                placeholder="邮箱"
                v-model="registerForm.email"
            />
          </el-form-item>
          <el-form-item prop="realname" label=" ">
            <el-input
                type="text"
                placeholder="真实姓名"
                v-model="registerForm.realname"
            />
          </el-form-item>
          <el-form-item prop="password" label=" ">
            <el-input
                type="password"
                placeholder="密码"
                v-model="registerForm.password"
            />
          </el-form-item>
          <el-form-item prop="confirmPassword" label=" ">
            <el-input
                type="password"
                placeholder="确认密码"
                v-model="registerForm.confirmPassword"
            />
          </el-form-item>
        </el-form>
        <!-- 按钮盒子 -->
        <div class="btn-box">
          <button @click="register">注册</button>
          <!-- 绑定点击事件 -->
          <p @click="mySwitch">已有账号?去登录</p>
        </div>
      </div>
      <!-- 登录盒子 -->
      <div class="login-form">
        <!-- 标题盒子 -->
        <div class="title-box-login">
          <h1>登录</h1>
        </div>
        <!-- 输入框盒子 -->
        <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="rules"
            label-with="5px"
        >
          <el-form-item prop="username" label=" ">
            <el-input
                type="text"
                placeholder="用户名"
                v-model="loginForm.username"
            />
          </el-form-item>
          <el-form-item prop="password" label=" ">
            <el-input
                type="password"
                placeholder="密码"
                v-model="loginForm.password"
            />
          </el-form-item>
        </el-form>
        <!-- 按钮盒子 -->
        <div class="btn-box">
          <button @click="login">登录</button>
          <!-- 绑定点击事件 -->
          <p @click="mySwitch">没有账号?去注册</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      flag: true,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        realname: '',
      },
      rules: {
        realname: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度应该在3~20个字符之间', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '长度应该大于6', trigger: 'blur' },
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { min: 6, message: '长度应该大于6', trigger: 'blur' },
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          { validator: this.validateEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    validateEmail (rule, value, callback) {
      if (value === '') {
        callback(new Error('请正确填写邮箱'));
      } else {
        if (value !== '') {
          var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if(!reg.test(value)){
            callback(new Error('请输入有效的邮箱'));
          }
        }
        callback();
      }
    },
    mySwitch () {
      const pre_box = document.querySelector('.pre-box')
      if (this.flag) {
        pre_box.style.transform = "translateX(100%)"
        pre_box.style.backgroundColor = "#c9e0ed"
      }
      else {
        pre_box.style.transform = "translateX(0%)"
        pre_box.style.backgroundColor = "#faf4e8"
      }
      this.flag = !this.flag
    },
    login()  {
      let data = new FormData
      data.append('username',this.loginForm.username)
      data.append('password',this.loginForm.password)
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            data: data,
            url: 'Login/login/'
          })
              .then( res => {
                if(res.data.error === 0){
                  this.$message.success(res.data.msg)
                  localStorage.setItem('authorization',res.data.authorization)
                  localStorage.setItem('username',res.data.username)
                  localStorage.setItem('userID',res.data.userID)
                  this.$router.push('/home');
                  }
                else {
                  this.$message.error(res.data.msg)}
              })
        } else {
          return
        }
      })
    },
    register() {
      let data = new FormData
      data.append('username',this.registerForm.username)
      data.append('password1',this.registerForm.password)
      data.append('password2',this.registerForm.confirmPassword)
      data.append('email',this.registerForm.email)
      data.append('realName',this.registerForm.realname)
      this.$refs.registerFormRef.validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            data: data,
            url: 'Login/register/'
          })
              .then( res => {
                console.log(res)
                if(res.data.error === 0)
                this.$message.success(res.data.msg)
                else {
                  this.$message.error(res.data.msg)
                }
              })
        } else {
          return
        }
      })
    }
  }
}

</script>

<style scoped>
/* 去除input的轮廓 */
input {
  outline: none;
}

.bigBox {
  /* 溢出隐藏 */
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  /* 渐变方向从左到右 */
  background: linear-gradient(to right, #faf4e8, #c9e0ed);
}

/* 最外层的大盒子 */
.box {
  width: 1050px;
  height: 90vh;
  display: flex;
  /* 相对定位 */
  position: relative;
  z-index: 2;
  margin: auto;
  /* 设置圆角 */
  border-radius: 8px;
  /* 设置边框 */
  border: 1px solid rgba(255, 255, 255, 0.6);
  /* 设置盒子阴影 */
  box-shadow: 2px 1px 19px rgba(0, 0, 0, 0.1);
}

/* 滑动的盒子 */
.pre-box {
  /* 宽度为大盒子的一半 */
  width: calc(1050px / 2);
  height: 100%;
  /* 绝对定位 */
  position: absolute;
  /* 距离大盒子左侧为0 */
  left: 0;
  /* 距离大盒子顶部为0 */
  top: 0;
  z-index: 99;
  border-radius: 4px;
  background-color: #faf4e8;
  box-shadow: 2px 1px 19px rgba(0, 0, 0, 0.1);
  /* 动画过渡，先加速再减速 */
  transition: 0.5s ease-in-out;
}

/* 滑动盒子的标题 */
.pre-box h1 {
  margin-top: 50px;
  text-align: center;
  /* 文字间距 */
  letter-spacing: 5px;
  color: #262626;
  /* 禁止选中 */
  user-select: none;
  /* 文字阴影 */
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 滑动盒子的文字 */
.pre-box p {
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 20px 0;
  /* 禁止选中 */
  user-select: none;
  font-weight: bold;
  color: #262626;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 图片盒子 */
.img-box {
  width: 200px;
  height: 200px;
  margin: 20px auto;
  /* 设置用户禁止选中 */
  user-select: none;
  overflow: hidden;
}

/* 图片 */
.img-box img {
  width: 100%;
  transition: 0.5s;
}

/* 登录和注册盒子 */
.login-form {
  flex: 1;
  height: 100%;
}
.register-form {
  flex: 1;
  height: 100%;
}

/* 标题盒子 */
.title-box-register {
  margin-top: 5vh;
}

.title-box-login {
  margin-top: 20vh;
}

/* 标题 */
.title-box h1 {
  text-align: center;
  color: #262626;
  /* 禁止选中 */
  user-select: none;
  letter-spacing: 5px;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 输入框盒子 */
.el-form {
  display: flex;
  /* 纵向布局 */
  flex-direction: column;
  /* 水平居中 */
  align-items: center;
}
.el-form-item {
  width: 65%;
  line-height: 30px;
}
/* 输入框 */
input {
  /* width: 60%; */
  height: 30px;
  margin-bottom: 10px;
  text-indent: 10px;
  border: 1px solid #fff;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 120px;
  /* 增加磨砂质感 */
  backdrop-filter: blur(10px);
}

input:focus {
  /* 光标颜色 */
  color: #b0cfe9;
}

/* 聚焦时隐藏文字 */
input:focus::placeholder {
  opacity: 0;
}

/* 按钮盒子 */
.btn-box {
  display: flex;
  justify-content: center;
}

/* 按钮 */
button {
  width: 100px;
  height: 30px;
  margin: 0 7px;
  line-height: 30px;
  border: none;
  border-radius: 4px;
  background-color: #69b3f0;
  color: white;
}

/* 按钮悬停时 */
button:hover {
  /* 鼠标小手 */
  cursor: pointer;
  /* 透明度 */
  opacity: 0.8;
}

/* 按钮文字 */
.btn-box p {
  height: 30px;
  line-height: 30px;
  /* 禁止选中 */
  user-select: none;
  font-size: 14px;
  color: #262626;
}

.btn-box p:hover {
  cursor: pointer;
  border-bottom: 1px solid #262626;
}


</style>
