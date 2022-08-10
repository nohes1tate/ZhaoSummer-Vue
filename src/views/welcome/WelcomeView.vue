<template>
  <div class="welcome" @click="showMenu=false" v-title data-title="墨书-高效的软工平台">
    <div class="first-img">
      <div class="top-line">
        <a href="/" class="logo">
          <img src="../../assets/logo/logo-yellow.png">
        </a>
        <div class="user-info">
          <img src="../../assets/images/uerImg.jpg" class="avatar" @click.stop="handleMenu">
          <svg class="icon" aria-hidden="true"  @click.stop="handleMenu" style="cursor:pointer;color: white;vertical-align: middle;font-size: 6px;font-weight: 1000;margin-left: 5px;background-color:rgba(57, 49, 49, 0);">
            <use xlink:href="#icon-xiangxia"></use>
          </svg>
          <ul class="user-menu" v-show="showMenu">
            <li>
              <a :href= "this.meUrl">个人中心</a>
            </li>
            <li>
              <a :href="this.homeUrl">我的项目</a>
            </li>
            <li>
              <a href="/login">退出</a>
            </li>
          </ul>
        </div>
        <div class="banner-inner">
          <h1 class="banner-title1">墨书，高效的团队协作和管理平台</h1>
          <h2 class="banner-title2">设计师的利器，产品经理的帮手，工程师的伙伴</h2>
          <a class="banner-btn" :href="this.homeUrl">开始使用</a>
          <div class="spec">加入墨书，开启高效团队协作</div>
        </div>
        <div class="scroll" @click="go">
          <svg class="icon" aria-hidden="true" style="color: white;vertical-align: middle;font-size: 20px;font-weight: 1000;margin-left: 5px;background-color:rgba(57, 49, 49, 0);">
            <use xlink:href="#icon-xiangxiazhanhang"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="feature" id="first-element">
      <h2 class="home-title">我的设计利器，团队的协作平台</h2>
      <div class="feature-content">
        <div class="feature-item">
          <svg class="icon" aria-hidden="true" style="color:#00BFFF;vertical-align: middle;font-size: 35px;font-weight: 1000;background-color:rgba(57, 49, 49, 0);">
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
    <section class="team-work" id="team-work">
      <div class="text-box">
        <div class="inner-box"></div>
        <h2>高效团队管理</h2>
        <p>
          通过搭建团队空间，结构化沉淀和管理工作流程，多人多端实时协同互动，构建一站式工作中心
        </p>
        <a :href="this.homeUrl" class="banner-btn">了解更多</a>
      </div>
    </section>
    <section class="team-work" id="co-edit">
      <div class="text-box">
        <h2>共享文档编辑</h2>
        <p>
          云端编辑、实时协作、分享交付，一站完成工作与沟通，让人、事、物流畅运作
        </p>
        <p>
          <a :href="this.homeUrl" class="banner-btn">了解更多</a>
        </p>
      </div>
    </section>
    <section class="team-work" id="UI-design">
      <div class="text-box">
      <h2>产品原型设计</h2>
      <p>
        快速原型、矢量绘图、在线预览，轻松搞定原型设计
      </p>
      <p>
        <a :href="this.homeUrl" class="banner-btn">了解更多</a>
      </p>
      </div>
    </section>
    <section class="team-work" id="UML-design">
      <div class="text-box">
        <h2>快速UML绘制</h2>
        <p>
          利用简单方便而功能强大的绘图功能绘制团队的UML图
        </p>
        <p>
          <a :href="this.homeUrl" class="banner-btn">了解更多</a>
        </p>
      </div>
    </section>
    <div class="content-red">
      <h5>使用墨书获得全新的设计体验</h5>
      <h6>和团队一起开启高效协作之旅</h6>
      <a class="footer-btna" :href="this.homeUrl">点击开始</a>
    </div>
    <div class="customer-service" >
      <div class="item" id="customer-message" @mouseenter="showVRcode = true" @mouseleave="showVRcode = false">
        <svg class="icon go-top" aria-hidden="true">
          <use xlink:href="#icon-xiaoxi"></use>
        </svg>
        <div class="VRcode-box" v-show="showVRcode">
          <h2>  需要帮助？</h2>
          <h3>联系产品经理</h3>
          <img src="../../assets/images/product-manager-VRcode.jpg">
          <h3>钊钊国王为您服务</h3>
          <img src="../../assets/images/ZhaoZhaoKingCode.jpg">
          <h2>扫码联系我们吧！</h2>
        </div>
      </div>
      <div class="item" id="go-top" @click="backTop" v-show="showTopbtn">
        <svg class="icon go-top" aria-hidden="true">
          <use xlink:href="#icon-huidaodingbu"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomeView",
  data(){
    return{
      showVRcode:false,
      showMenu:false,
      showTopbtn:false,
      scrollTop:0,
      curUsername:'',
      curUserID:0,
      meUrl:'',
      homeUrl:'',
    }
  },
  created() {
    this.curUsername = localStorage.getItem('username');
    this.curUserID = localStorage.getItem('userID');
    console.log(this.curUserID)
    if(this.curUserID===null)
    {
      //console.log('true')
      this.meUrl='/login'
      this.homeUrl='/login'
    }
    else
    {
      //console.log('false')
      this.meUrl='/me/'+this.curUserID+''
      this.homeUrl='/home'
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods:{
    handleMenu(){
      this.showMenu = this.showMenu !== true;
    },
    go(){
      document.getElementById("first-element").scrollIntoView({ behavior: 'smooth' });
    },
    handleScroll(){
      this.scrollTop = document.documentElement.scrollTop;//滚动高度
      this.showTopbtn = this.scrollTop > 725;
    },
    backTop() {
      var timer = setInterval(function () {
        let osTop =
            document.documentElement.scrollTop || document.body.scrollTop;
        let ispeed = Math.floor(-osTop / 10);
        document.documentElement.scrollTop = document.body.scrollTop =
            osTop + ispeed;
        this.isTop = true;
        if (osTop === 0) {
          clearInterval(timer);
        }
      }, 10);
    },
  }
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
  background-color: #a259ff;
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
  height: 80vh;
  min-height: 620px;
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
  margin: 100px auto 0;
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
.content-red{
  background-color: #a259ff;
  padding: 100px 0;
  text-align: center;
  box-sizing: border-box;
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
.footer-btna{
  display: block;
  width: 240px;
  height: 56px;
  line-height: 56px;
  margin: 72px auto 0;
  font-size: 16px;
  color: #a259ff;
  background-color: #ffffff;
  border-radius: 6px;
  transition: 0.3s;
}
section{
  height: 100vh;
  position: relative;
  color: rgba(255,255,255,0.8);
  font-size: 10vh;
  //text-shadow: 4px 4px rgb(46,43,43);
  display: flex;
  justify-content: center;
  align-content: center;
  min-height: 620px;
}
.team-work{
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  user-select: none;
  background-size: cover;
}
#team-work{
  background-image: url("../../assets/images/teamwork.png");
}
#UI-design{
  background-image: url("../../assets/images/UIdesign.png");
}
#UML-design{
  background-image: url("../../assets/images/UML.png");
}
#co-edit{
  background-image: url("../../assets/images/co-edit.png");
}

.text-box{
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 25%;
  text-align: center;
}
.text-box h2{
  font-size: 60px;
  font-weight: 1000;
  color: white;
}
.text-box p{
  font-size: 20px;
  color: white;
}
.customer-service{
  position: fixed;
  z-index: 999;
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
  font-size: 13px;
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
