<style lang="scss">
@import '~common/scss/public/base-variable';
@import '~common/scss/public/base-mixin';
@import '~common/scss/base-style';
.home-header{
    background:#fff;
    .home-header-top{
        height:90px;
        .home-header-top-right {
            float:right;
            line-height:60px;
            li{
                float:left;
                font-size:16px;
                color:#1996cd;
                .header-phone{
                    font-weight:700;
                    color:#1996cd;
                }
                .el-button--primary{
                    background:#1996cd;
                    &:hover{
                        opacity:0.8;
                    }
                }
                .top-own a{
                    color:#1996cd;
                    font-size:12px;
                    font-weight:700;
                }
            }
            li+li{
                margin-left:20px;
            }
        }
    }
    .home-header-nav{
        background:rgba(25, 150, 205, 1);
        height:40px;
        box-shadow:0 5px 5px #666;
        .nav-inner{
            width:1200px;
            margin:auto;
            height:100%;
            line-height:40px;
            li{
                float:left;
                color:#fff;
                font-size:16px;
                padding-left:20px;
                padding-right:20px;
                .nav-info{
                    display:none;
                    width:100%;
                    padding-top:10px;
                    padding-bottom:10px;
                    background:rgba(255,255,255,0.9);
                    position:absolute;
                    z-index:999;
                    left:0;
                    box-shadow:0 5px 5px #666;
                    .nav-info-inner{
                        @media (min-width: 768px) {
                            width: 750px;
                        }
                        @media (min-width: 992px) {
                            width: 870px;
                        }
                        @media (min-width: 1200px) {
                            width: 1200px;
                        }
                        margin:auto;
                        .goods{
                            &>div{
                                width:150px;
                                height:30px;
                                line-height:30px;
                                float:left;
                                font-size:14px;
                                .round{
                                    width:10px;
                                    height:10px;
                                    float:left;
                                    border-radius:50%;
                                    margin-top:10px;
                                    border:1px solid #1996cd;
                                }
                                span{
                                    color:#1996cd;
                                    padding-left:10px;
                                }
                                &:hover{
                                    .round{
                                        background:#1996cd;
                                    }
                                    span{
                                       color:#ff6600; 
                                    }
                                }
                            }
                        }
                        .nav-txt{
                            width:600px;
                            float:left;
                            padding-left:20px;
                            padding-right:20px;
                            line-height:20px;
                            color:#000;

                        }
                    }
                }
                &:hover{
                    color:#ff6600;
                    &:after{
                        content:'';
                        width:100%;
                        height:3px;
                        float:left;
                        background:#ff6600;
                        margin-top:-3px;
                    }
                    .nav-info{
                        display:block;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <header id="header" class="home-header">
        <div class="home-header-top">
            <Row style="padding:10px 20px;">
                <Col span="12">
                    <div>
                        <a href="http://www.dchealth.com/"><img src='./logo.png'/></a>
                    </div>
                </Col>
                <Col span="12">
                    <!--<a href="https://auth-dch-qa.genecards.cn/account/LogOff/?RetUrl=http://42.123.124.204:8081&app=DCHDM">下载</a>-->
                    <ul class="home-header-top-right">
                        <li>
                            <Icon type="ios-telephone" color="#1996CD" size="16"></Icon>
                            <span class="header-phone">010-61852722</span>
                        </li>
                        <li>
                            <el-button size="small" type="primary">联系客服</el-button>
                        </li>
                        <li>
                            <div class="top-own">
                                <div v-if="currentUserName">
                                    <Avatar icon="person" style="margin-right:-20px;"/>
                                    <router-link to="/admin"  class="avatar-admin" style="margin-left:30px;">{{currentUserName}}</router-link>
                                </div>
                                <div v-else>
                                    <router-link to="/login"  @click="loginModal = true" class="active" v-show="showBtn">登录</router-link>
                                    <span>|</span>
                                    <router-link to="/register" v-show="showBtn">
                                        注册
                                    </router-link>
                                </div>
                                
                            </div>
                        </li>
                    </ul>
                </Col>
            </Row>
        </div>
        <div class="home-header-nav">
            <ul class="nav-inner container">
                <li>首页</li>
                <li>关于我们</li>
                <li>
                    精准医学
                    <div class="nav-info">
                        <div class="nav-info-inner">
                            <div style="width:192px;height:122px;float:left;">
                                <img src="./gene.jpg" style="width:100%;height:100%;"/>
                            </div>
                            <div class="nav-txt">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
                            </div>
                            <div style="float:left;margin-left: 17px;">
                                <p style="font-size:18px;color:#1996cd;">产品中心</p>
                                <div class="goods">
                                    <div>
                                        <div class="round"></div>
                                        <span>肿瘤精准医学</span>
                                    </div>
                                    <div style="margin-left:20px;">
                                        <div class="round"></div>
                                        <span>更多内容</span>
                                    </div>
                                </div>
                                <div class="goods">
                                    <div>
                                        <div class="round"></div>
                                        <span>罕见病精准医学</span>
                                    </div>
                                    <div style="margin-left:20px;">
                                        <div class="round"></div>
                                        <span>更多内容</span>
                                    </div>
                                </div>
                                <div class="goods">
                                    <div>
                                        <div class="round"></div>
                                        <span>药物基因组精准分析</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>组学云平台</li>
                <li>科研合作</li>
            </ul>
        </div>
    </header>
</template>
<script>
import {getCookie} from '@/common/js/cookie.js'
export default {
    name: "header",
    data() {
        return {
            avatarShow:false,
            currentUserEmail:'',
            showBtn: true,
            currentUserName: '',
            // 绑定用户名和密码
            formLogin: {},
            ruleValidate: {
                userName: [{
                    required: true,
                    message: '用户名不能为空',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '密码不能为空',
                    trigger: 'blur'
                }],

            },
        }
    },
    methods: {
        getCookieValue() {
            let userName = getCookie('username');
            if(userName) {
                this.currentUserName = userName;
                this.showBtn = false;
                this.avatarShow = true;
            }
        }
    },
    created() {
        this.getCookieValue();
    },

    computed: {

    }
}
</script>
