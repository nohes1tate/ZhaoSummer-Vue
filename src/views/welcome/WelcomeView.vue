<template>
  <div class="welcome">
    <div class="first-img">
      <div class="top-line">
        <a href="/" class="logo">
          <img src="../../assets/logo/logo-yellow.png">
        </a>
        <div class="user-info">
          <img src="../../assets/images/uerImg.jpg" class="avatar">
          <svg class="icon" aria-hidden="true" style="color: white;vertical-align: middle;font-size: 6px;font-weight: 1000;margin-left: 5px;background-color:rgba(57, 49, 49, 0);">
            <use xlink:href="#icon-xiangxia"></use>
          </svg>
        </div>
        <div class="banner-inner">
          <h1 class="banner-title1">产品协作设计，更快更简单</h1>
          <h2 class="banner-title2">更好的产品设计平台，设计师的利器，产品经理的帮手，工程师的伙伴</h2>
          <a class="banner-btn">开始使用</a>
          <div class="spec">加入墨书，开启高效协作设计</div>
        </div>
        <div class="scroll">
          <svg class="icon" aria-hidden="true" style="color: white;vertical-align: middle;font-size: 20px;font-weight: 1000;margin-left: 5px;background-color:rgba(57, 49, 49, 0);">
            <use xlink:href="#icon-xiangxiazhanhang"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="feature">
      <h2 class="home-title">我的设计利器，团队的协作平台</h2>
      <div class="feature-content">
        <div class="feature-item">
          <svg class="icon" aria-hidden="true" style="color: #00BFFF;vertical-align: middle;font-size: 35px;font-weight: 1000;background-color:rgba(57, 49, 49, 0);">
            <use xlink:href="#icon-webyemiansheji"></use>
          </svg>
          <h3>快速原型设计</h3>
          <p>
            海量组件图标，丰富交互特效
            <br>
            用墨书，快速实现创意落地
          </p>
        </div>
        <div class="feature-item">
          <svg class="icon" aria-hidden="true" style="color:#00BFFF;vertical-align: middle;font-size: 35px;font-weight: 1000;background-color:rgba(57, 49, 49, 0);">
            <use xlink:href="#icon-UIshejishi"></use>
          </svg>
          <h3>专业UI设计</h3>
          <p>
            矢量编辑、协同设计、资源复用
            <br>
            用墨书，轻松搞定设计创作
          </p>
        </div>
        <div class="feature-item">
          <svg class="icon" aria-hidden="true" style="color:#00BFFF;vertical-align: middle;font-size: 35px;font-weight: 1000;background-color:rgba(57, 49, 49, 0);">
            <use xlink:href="#icon-xietongbangong1"></use>
          </svg>
          <h3>高效协同工作</h3>
          <p>
            从产品、设计到开发，全流程协作
            <br>
            用墨书，提升团队协作效能
          </p>
        </div>
        <div class="feature-item">
          <svg class="icon" aria-hidden="true" style="color:#00BFFF;vertical-align: middle;font-size: 35px;font-weight: 1000;background-color:rgba(57, 49, 49, 0);">
            <use xlink:href="#icon-shejiguanli2"></use>
          </svg>
          <h3>设计规范管理</h3>
          <p>
            轻松定制规范，高效管理资源
            <br>
            用墨书，发挥设计资源价值
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomeView"
}
</script>

<style scoped>
.icon{
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.welcome{
  width: 100%;
}
.first-img{
  width: 100%;
  height: 100vh;
  background-image: url("../../assets/images/welcomePage.png");
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 620px;
  position: relative;
  box-sizing: border-box;
  user-select: none;
}
.top-line{
  width: 92%;
  max-width: 1300px;
  margin: auto;
  padding: 22px 0;
  height: 36px;
  zoom: 1;
  //border: solid 1px red;
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
.banner-inner{
  margin-top: 25vh;
}
.banner-title1{
  color: #fff;
  font-size: 48px;
  line-height: 1.5;
  letter-spacing: 0;
  margin-bottom: 16px;
  font-weight: 600;
}
.banner-title2{
  color: #fff;
  font-size: 20px;
  line-height: 1.6;
  letter-spacing: 0;
  font-weight: 400;
  margin: 0;
}
.banner-btn{
  width: 240px;
  margin: 72px auto 0;
  line-height: 56px;
  height: 56px;
  font-size: 16px;
  box-sizing: border-box;
  display: inline-block;
  color: #ffffff;
  background-color: #fe4066;
  text-align: center;
  vertical-align: middle;
  border-radius: 6px;
}
.spec{
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  margin-top: 20px;
}
.feature{
  text-align: center;
  padding-bottom: 50px;
}
.home-title{
  font-size: 40px;
  line-height: 128%;
  color: #000000;
  text-align: center;
  padding: 140px 15px 0;
  font-weight: 600;
}
.feature-content{
  margin: 80px auto 0;
  overflow: hidden;
  max-width: 1300px;
  width: 92%;
}
.feature-item{
  vertical-align: top;
  float: left;
  width: 25%;
  padding: 0 10px;
  box-sizing: border-box;
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
.scroll{
  cursor: pointer;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  animation: moving alternate 0.5s infinite;
  -webkit-animation:moving alternate 0.5s infinite;
}
.scroll i{
  color: #ffffff;
  font-size: 40px;
}
@keyframes moving {
  0%{bottom:20px}
  100%{bottom:5px}
}
@-webkit-keyframes moving{
  0%{bottom:20px}
  100%{bottom:5px}
}
</style>
