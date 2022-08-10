<template>
  <div class="me" @click="showMenu=false">
    <div class="first-img">
      <div class="top-line">
        <a href="/" class="logo">
          <img src="../../assets/logo/logo-yellow.png">
        </a>
        <div class="user-info">
          <img src="../../assets/images/uerImg.jpg" class="avatar" @click.stop="handleMenu">
          <i class="iconfont icon-xiangxia" @click.stop="handleMenu" style="cursor:pointer;color: white;vertical-align: middle;font-size: 6px;font-weight: 1000;margin-left: 5px;background-color:rgba(57, 49, 49, 0);"></i>
          <ul class="user-menu" v-show="showMenu">
            <li>
              <a :href= "'/me/'+this.curUserID">个人中心</a>
            </li>
            <li>
              <a href="/home">我的项目</a>
            </li>
            <li>
              <a href="/login">退出</a>
            </li>
          </ul>
        </div>
      </div>
      <h1>个人中心</h1>
      <h4>管理你的账户</h4>
    </div>
    <div class="my-info-contents">
      <div class="info-top-title">
        <a @click="showMyInfo" :class="{'active':infoActive,'not-active':infoNotActive}">账号信息</a>
        <a @click="showMyTeam" :class="{'active':teamActive,'not-active':teamNotActive}">我的墨书</a>
      </div>
      <div class="all-content-wrap">
        <div class="info-message" v-show="showInfo">
          <img src= "../../assets/images/uerImg.jpg" class="avatar2">
          <div class="list">
            <div class="list-item">
              <span>昵称</span>
              <p><span>{{ this.curUsername }}</span></p>
            </div>
            <div class="list-item">
              <span>邮箱</span>
              <p>
                <span>{{ this.userEmail }}</span>
                <a class="p-span" @click="changeMyEmail">修改</a>
              </p>
            </div>
            <div class="list-item">
              <span>密码</span>
              <p>
                <a class="p-span2 bottom-inOutSpread2" @click="changeMyPassword">修改密码</a>
              </p>
            </div>
            <div class="list-item">
              <span>真实姓名</span>
              <p>
                <span>{{ this.curUserRealname }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="team-info" v-show="showTeam">
          <table class="table-list">
            <thead>
              <tr>
                <th>团队名称</th>
                <th>身份</th>
                <th>团队人数</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody :command=group v-for="group in this.groupList" v-bind:key="group.groupID">
            <td>{{group.groupName}}</td>
            <td>{{group.level}}</td>
            <td>{{group.groupMemberNum}}</td>
            <td>{{group.createdTime}}</td>
            <td>
              <a @click="goToHome">查看</a>
            </td>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div style="height: 7vh"></div>
    <div class="pup-container" v-show="changePassword">
    <div class="con-pup-content">
      <h2>修改密码</h2>
      <input v-model="currentEmail" class="text" placeholder="请输入邮箱" style="border-color: #e76bec;">
      <input v-model="checkCode" class="text" placeholder="请输入验证码"  style="border-color: #e76bec;">
      <input v-model="newPassword" type="password" class="text" placeholder="请输入新密码"  style="border-color: #e76bec;">
      <div class="button-warp">
        <button class="confirm" @click="update">确定</button>
        <button class="cancel" @click="closeChangePassword">取消</button>
        <button class="check-code" @click="forget">获取验证码</button>
      </div>
    </div>
    </div>
    <div class="pup-container" v-show="changeEmail">
      <div class="con-pup-content">
        <h2>修改邮箱</h2>
        <input v-model="currentEmail" class="text" placeholder="请输入当前邮箱"  style="border-color: #e76bec;">
        <input v-model="newEmail" class="text" placeholder="请输入新邮箱"  style="border-color: #e76bec;">
        <div class="button-warp">
          <button class="confirm" @click="updateEmail">确定</button>
          <button class="cancel" @click="closeChangeEmail">取消</button>
        </div>
      </div>
    </div>
    <div class="customer-service" @mouseenter="showVRcode = true" @mouseleave="showVRcode = false">
      <div class="item" id="customer-message">
        <i class="iconfont icon-xiaoxi go-top"></i>
        <div class="VRcode-box" v-show="showVRcode">
          <h2>  需要帮助？</h2>
          <h3>联系产品经理</h3>
          <img src="../../assets/images/product-manager-VRcode.jpg">
          <h3>钊钊国王为您服务</h3>
          <img src="../../assets/images/ZhaoZhaoKingCode.jpg">
          <h2>扫码联系我们吧！</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "meView",
  data(){
    return{
      showVRcode:false,
      curUserID:0,
      curUserRealname:'',
      curUsername:'',
      checkCode:'',
      newPassword:'',
      showInfo:true,
      showMenu:false,
      showTeam:false,
      infoActive:true,
      teamActive:false,
      infoNotActive:false,
      teamNotActive:true,
      changeEmail:false,
      changePassword:false,
      currentEmail:'',
      newEmail:'',
      groupList:[],
      hasGroup:false,
      isManager:false,
      isCreator:false,
      userEmail:''
    }
  },
  created() {
    this.curUsername = localStorage.getItem('username');
    this.curUserID = localStorage.getItem('userID');
    this.getGroup();
  },
  methods:{
    goToHome(){
      this.$router.push({ name: 'home', query: { leftIndex: '2' } })
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
                this.groupList = res.data.group_list;
                if (this.groupList.length > 0) {
                  this.hasGroup = true;
                } else {
                  this.hasGroup = false;
                }
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })

      this.$axios({
        method: 'post',
        url: 'Login/viewUser/',
        data: formData,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                this.userEmail=res.data.data.userEmail;
                this.curUserRealname=res.data.data.realName;
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    closeChangeEmail(){
      this.changeEmail=false
    },
    closeChangePassword(){
      this.changePassword=false
    },
    changeMyPassword(){
      this.changePassword=true
    },
    changeMyEmail(){
      this.changeEmail=true;
    },
    handleMenu(){
      this.showMenu = this.showMenu !== true;
    },
    showMyInfo(){
      this.showInfo=true;
      this.showTeam=false;
      this.infoActive=true;
      this.teamActive=false;
      this.infoNotActive=false;
      this.teamNotActive=true;
    },
    showMyTeam(){
      this.showInfo=false;
      this.showTeam=true;
      this.infoActive=false;
      this.teamActive=true;
      this.infoNotActive=true;
      this.teamNotActive=false;
    },
    updateEmail(){
      const self = this;
      const formData = new FormData();
      formData.append("userID", self.curUserID);
      formData.append("email",self.newEmail);
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
      formData.append("useremail", self.currentEmail);
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
      formData.append("email", self.currentEmail);
      formData.append("authorization", localStorage.getItem('authorization'));
      formData.append("username", this.curUsername);
      //console.log(self.currentEmail);
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
  }
}
</script>

<style scoped>
.me{
  width: 100%;
  background-color: #f7f4f5;
}
.first-img{
  background-image: url("../../assets/images/selfPage.png");
  height: 400px;
  text-align: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box;
  position: relative;
  user-select: none;
}
.first-img h1{
  font-weight: 600;
  font-size: 48px;
  color: #ffffff;
  line-height: 1.5;
  letter-spacing: 0;
  position: relative;
  z-index: 2;
  margin-top: 90px;
  margin-bottom: 20px;
}
.first-img h4{
  margin-bottom: 29px;
  font-size: 20px;
  color: #ffffff;
  line-height: 150%;
  letter-spacing: 0;
  position: relative;
  z-index: 2;
  font-weight: 400;
  margin-top: 0;
}
.top-line{
  width: 92%;
  max-width: 1300px;
  margin: auto;
  padding: 22px 0;
  height: 36px;
  zoom: 1;
}
.logo{
  display: block;
  float: left;
  font-size: 22px;
}
.logo span{
  vertical-align: middle;
  font-size: 24px;
  color: white;
}
.logo img{
  height: 100px;
  margin-top: -30px;
}
.user-info{
  float: right;
  display: inline-block;
  vertical-align: top;
  margin-top: 2px;
}
.avatar{
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #ffffff;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  position: relative;
}
.avatar2{
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #ffffff;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  position: relative;
  float: left;
}
.feature-item h3{
  font-size: 24px;
  line-height: 150%;
  margin: 20px 0 4px;
  font-weight: 600;
  letter-spacing: 2px;
}
.feature-item p{
  max-width: 310px;
  margin: 0 auto;
  font-size: 14px;
  line-height: 175%;
  color: #8c8889;
}
.content-red h5{
  font-size: 48px;
  line-height: 1.5;
  color: #ffffff;
  font-weight: 600;
  margin: 0 0 20px;
}
.content-red h6{
  font-size: 20px;
  line-height: 100%;
  color: #ffffff;
  font-weight: 400;
  margin: 0;
}
.text-box h2{
  font-size: 60px;
  font-weight: 1000;
  color: white;
}
.text-box p {
  font-size: 20px;
  color: white;
}
.user-menu{
  display: block;
  position: absolute;
  top: 9vh;
  right: 15vh;
  background-color: #ffffff;
  margin: 0;
  padding: 12px 0;
  z-index: 9;
  box-shadow: 0 4px 12px rgba(0,0,0 , 0.15);
  width: 140px;
  border-radius: 6px;
}
.user-menu li{
  display: block;
  transition: 0.15s;
}
ul,li{
  list-style: none;
  box-sizing: border-box;
}
.user-menu a{
  display: inline-block;
  width: 100%;
  padding: 0 20px;
  color: #000000;
  box-sizing: border-box;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  text-align: left;

}
.user-menu a:hover{
  transition: 0.3s;
  background-color: #d1d1d1;
}
.customer-service{
  position: fixed;
  z-index: 90;
  bottom: 40px;
  right:40px;
}
.item{
  cursor: pointer;
  margin-top: 8px;
  width: 56px;
  height: 56px;
  background-color: #ffffff;
  border-radius: 6px;
  text-align: center;
  transition: 0.3s;
  position: relative;
  border: 1px solid #e9e9e9;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0,0,0, 0.02);
}
.go-top{
  display: block;
  position: absolute;
  top:50%;
  width: 100%;
  transform: translateY(-50%);
  font-size: 25px;
  color: #8c8889;
  transition: 0.3s;
}
.go-top:hover{
  color: white;
}
.item:hover{
  background-color: #e76bec;
  border: 1px solid #e76bec;
}
.my-info-contents{
  box-sizing: border-box;
  max-width: 970px;
  min-height: 400px;
  margin: 48px auto 0;
  padding-bottom: 30px;
  background: #ffffff;
  width: 80%;
  border: 1px solid #f0f0f0;
  border-radius: 16px;
}
.info-top-title{
  overflow: hidden;
  border-bottom: 1px solid #f0f0f0;
  padding-top: 16px;
}
.active{
  position: relative;
  color: #e76bec;
  cursor: pointer;
}
.active:before{
  content: "";
  width: 100%;
  border-bottom: 3px solid #a259ff;
  position: absolute;
  bottom: 0;
  animation: underline-moving linear 0.1s 1;
}
@keyframes underline-moving {
  0%{left: 50%;width: 0}
  100%{left: 0;width: 100%}
}
.not-active{
  color: black;
  cursor: pointer;
}
.info-top-title a{
  padding-bottom: 12px;
  font-size: 16px;
  display: block;
  line-height: 24px;
  transition: 0.2s;
  float: left;
  margin-left: 48px;
}
.all-content-wrap{
  padding: 30px 48px 0;
}
.info-message{
  display: flex;
  flex-direction: column;
}
.list{
  width: 100%;
}
.list-item{
  margin-top: 16px;
  position: relative;
  text-align: left;
}
.list-item span{
  display: block;
  font-size: 14px;
  line-height: 24px;
  color: #8c8889;
}
.list-item p{
  font-size: 14px;
  color: #353030;
  line-height: 24px;
}
.list-item p span{
  display: inline;
  position: static;
  color: #000000;
  vertical-align: middle;
  font-weight: 600;
}
.p-span{
  position: relative;
  color: #a259ff;
  font-weight: 600;
  margin-left: 10px;
  padding-bottom: 4px;
}
.p-span:hover:before{
  left: 0;
  width: 100%;
}
.p-span:before{
  content: "";
  width: 0;
  border-bottom: 2px solid #a259ff;
  position: absolute;
  bottom: 0;
  left: 50%;
  transition: all linear 0.1s;
}
.p-span2{
  color: #a259ff;
  font-weight: 600;
  position: relative;
  padding-bottom: 4px;
}
.p-span2:hover:before{
  left: 0;
  width: 100%;
}
.p-span2:before{
  content: "";
  width: 0;
  border-bottom: 2px solid #a259ff;
  position: absolute;
  bottom: 0;
  left: 50%;
  transition: all linear 0.1s;
}
.team-info{
  margin: 0 -16px;
}
.table-list{
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}
.table-list tr th:first-child{
  text-align: left;
  padding-left: 16px;
}
.table-list thead th{
  background: #f8f6f6;
  line-height: 38px;
  font-size: 14px;
  color: #8c8889;
  font-weight: normal;
}
.table-list tbody td:first-child{
  text-align: left;
  padding-left: 16px;
}
.table-list td{
  font-size: 14px;
  color: #353030;
  line-height: 22px;
  padding: 13px 5px;
  min-width: 60px;
  max-width: 140px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  border-bottom: 1px solid #f8f6f6;
}
.pup-container{
  width: 100%;
  position: fixed;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
  left: 0;
  top: 0;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  display: flex;
}
.con-pup-content{
  width: 96%;
  max-width: 500px;
  background: #ffffff;
  border-radius: 16px;
  padding: 22px 32px 32px;
  box-sizing: border-box;
  color: #353030;
  position: relative;
}
.con-pup-content h2{
  font-size: 18px;
  line-height: 28px;
  color: #353030;
  font-weight: bold;
}
.text{
  margin-top: 16px;
  border: 1px solid #e9e9e9;
  border-radius: 8px;
  padding: 0 16px;
  width: 100%;
  height: 44px;
}
.button-warp{
  margin-top: 20px;
  overflow: hidden;
}
.confirm{
  float: right;
  line-height: 40px;
  border-radius: 8px;
  padding: 0 24px;
  text-align: center;
  cursor: pointer;
  margin-left: 8px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  background: #a259ff;
  color: #ffffff;
  transition: 0.3s;
}
.confirm:hover{
  background-color: #e76bec;
}
.cancel{
  background: #f8f6f6;
  color: #353030;
  float: right;
  line-height: 40px;
  border-radius: 8px;
  padding: 0 24px;
  text-align: center;
  cursor: pointer;
  margin-left: 8px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  transition: 0.3s;
}
.cancel:hover{
  background-color: #d1d1d1;
}
.check-code{
  float: left;
  line-height: 40px;
  border-radius: 8px;
  padding: 0 24px;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  border: none;
  background: #a259ff;
  color: #ffffff;
  transition: 0.3s;
}
.check-code:hover{
  background-color: #e76bec;
}
.VRcode-box{
  bottom: 0px;
  right: 60px;
  width: 250px;
  height: 560px;
  background-color: #ffffff;
  border-radius: 6px;
  text-align: center;
  transition: 0.3s;
  position: absolute;
  border: 1px solid #e9e9e9;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0,0,0, 0.02);
}
.VRcode-box h2{
  margin-top: 10px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}
.VRcode-box h3{
  color: #8c8889;
  font-size: 15px;
  height: 20px;
  margin-top:10px;
}
.VRcode-box img{
  width: 200px;
}
</style>
