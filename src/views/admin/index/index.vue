<style lang="scss">
// 公共变量
@import '~common/scss/public/base-url';
// 后台公共样式
@import '~common/scss/admin-basic-style';

/* 当前页面使用的变量 */

$admin-layout-toggle-height: 24px;
// 左侧导航字体
$left-menu-font: 18px;
// 左侧导航背景
$left-menu-bg: #3C3F60;
// 右侧主体背景
$right-main-bg: #ECF0F5;

/* 后台主容器 */

.admin {
  /* 主容器 */
    .admin-layout {
        position: relative;
        // overflow: hidden;
        height: 100%;
        padding-top: 60px;
        background: $right-main-bg;
        // overflow-y:scroll;
    }
    /* 主体 */
    .admin-main {
        width: 100%;
        height: 100%;
        .admin-layout-left,
        .layout-container {
            transition: width .3s ease-in-out;
        }
    }
    /* 左侧导航 */
    .admin-layout-left {
        position: relative;
        height: 100%;
        padding-top: $admin-layout-toggle-height;
        background: $left-menu-bg;
        color: #b8c7ce;
        font-size: $left-menu-font;
        .admin-layout-nav {
            width: 100%;
            height: 60px;
            padding-left: 9%;
            line-height: 60px;
            font-size: 14px;
            .menu{
                letter-spacing:35px;
                @media screen and (max-width:1100px){
                    letter-spacing:20px;
                }
                @media screen and (max-width:812px){
                    letter-spacing:10px;
                }
            }
            &:hover {
                color: #fff;
                background: #2B3245;
            }
            &:nth-of-type(1) {
                color: #b8c7ce;
                background: #3C3F60;
            }
        }
    }
    /* 右侧主体内容*/
    .layout-container {
        background: $right-main-bg;
        overflow-y:auto;
        height:100%;
        .layout-content {
            margin-top: $admin-layout-toggle-height;
            margin-left: 20px;
            margin-right: 20px;
            background:#fff;
            .layout-main {
                .main-head {
                    border: 10px solid #fff;
                    height: 50px;
                    line-height: 30px;
                    .ivu-breadcrumb {
                        color: #3c8dbc;
                        font-size: 16px;
                        & > span:first-child {
                            padding-left: 10px;
                        }
                        & > span:last-child {
                            font-weight: normal;
                            color: #666;
                        }
                    }
                }
                .main-inner {
                    margin-top: 12px;
                    height: 1000px;
                    background: #fff;
                }
            }
        }
    }
}
</style>
<template>
<!-- 后台主容器 -->
<div class="admin-layout" v-loading="load">
    <!-- 头部 -->
    <adminHead :cusername="cusername"></adminHead>
    <!-- 主体 -->
    <Row class="admin-main" type="flex">
          <i-col class="admin-layout-left" :span="spanLeft">
              <!-- 菜单导航 -->
              <el-menu theme="dark" :default-active="$route.path" class="el-menu-vertical-demo" :router="true">
                  <div class="admin-layout-nav" >
                      <!--<Icon type="navicon-round" style="margin-right:8%;"></Icon>-->
                      <span class="menu">目录</span>
                  </div>
                  <el-menu-item index="/admin">
                      <Icon type="android-list" style="margin-right:8%;"></Icon>
                      数据管理
                  </el-menu-item>
                  <el-menu-item index="/admin/tumour">
                      <Icon type="ios-pie" style="margin-right:8%;"></Icon>
                      癌症
                  </el-menu-item>                  
                  <el-menu-item index="/admin/task-management">
                      <Icon type="social-buffer" style="margin-right:8%;"></Icon>
                      任务管理
                  </el-menu-item>
              </el-menu>
          </i-col>
          <!-- 右侧主内容区域 -->
          <i-col id="layout-container" class="layout-container" :span="spanRight">
              <div class="layout-content">
                  <div class="layout-main">
                      <!-- 子页面展示区域 -->
                      <router-view v-if="show"></router-view>
                  </div>
              </div>
          </i-col>
    </Row>
</div>
</template>
<script>
  // 引入头部
import adminHead from './head.vue';
import {login} from 'api/index.js'
import {setCookie,getCookie} from '@/common/js/cookie.js'
  // 实例
export default {
    data() {
        return {
            cusername:"",
            load:Boolean,
            url:M.url(),
            // 左侧导航列数
            spanLeft: 3,
            // 右侧内容列数
            spanRight: 21,
            // 当前菜单列表
            datashow: true,
            uid:'',
            show:false,
            menu: [{
                  menuName: "数据管理",
                  type: 'ios-pie',
                  // path: '/admin/mydata',
                  index: '2'
              }, {
                  menuName: "ICMDB",
                  type: 'android-list',
                  // path: '/admin/gene',
                  index: '1'
              }, {
                  menuName: "任务管理",
                  type: 'social-buffer',
                  // path: '3',
                  index: '3'
            }]
        }
    },
    computed: {
        // 导航图标大小
        iconSize() {
            return this.spanLeft === 4 ? 16 : 20;
        },
    },
    created() {
        let search=window.location.search.slice(1,6);
        if(search=="code="){
            let code=window.location.search.substr(6).split("&")[0];
            console.log(code) 
            this.load=true;
            login.tgexLogin(code).then((data)=>{
                if(data.returnCode==0 || data.returnCode==200){
                    if(data.data==null || data.data=="null"){
                        this.$Message.error(data.msg);
                        this.load=false;
                    }else{
                        M.extend(this.$store.state.currentUser,data.data)
                        setCookie('email',data.data.user.email,null,null,null);
                        setCookie('userid',data.data.user.dchUserId,null,null,null);
                        setCookie('username',data.data.user.username,null,null,null)
                        this.cusername=getCookie('username');
                        this.$store.state.uid=data.data.userid;
                        this.$store.state.code=code;
                        this.show=true;
                        this.load=false;
                    }
                }else{
                    this.$Message.error(data.msg);
                    this.load=false;
                    this.$router.push('/')
                }
                
            })
        }else{
            this.load=false;
            this.show=true;
            this.cusername=getCookie('username');
        }
    },
    // 实例创建完成
    // mounted() {
        
    // },
    // 组件
    components: {
      // 头部
      adminHead,
    }
  }

</script>
