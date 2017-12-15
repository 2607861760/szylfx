<style lang="scss" scoped>
  // 公共变量
  @import '~common/scss/public/base-url';

  /* 头部 */

.admin-head {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #2B3245;
    .admin-logo-head {
        width: 12%;
        height: 60px;
        padding: 5px 0px;
        float: left;
    }
    .admin-head-right {
        width: 30%;
        float: right;
        height: 60px;
        .user-wrap {
            margin-right: 20px;
            float: right;
            height: 60px;
            line-height: 60px;
            .user-name {
              color: #fff;
              font-size: 12px;
            }
            .ivu-avatar {
                vertical-align: middle;
            }
            .admin-exit {
                  width: 18px;
                  height: 18px;
                  color: #fff;
                  float: right;
                  font-size: 18px;
                  margin-left: 20px;
            }
        }
    }
}
</style>
<template>
<div class="admin-head clear">
    <div class="admin-logo-head">
        <router-link :to="routes"><img src="./logo2.png"></router-link>
    </div>
    <div class="admin-head-right">
        <div class="user-wrap">
            <Avatar icon="person" style="margin-right:10px;"/>
            <Dropdown>
                <a href="javascript:void(0)" class="user-name" @click="userInfo">{{cusername}}</a>
            </Dropdown>
            <div class="admin-exit" @click="exit">
                <!--<a href="https://auth-dch-qa.genecards.cn/account/LogOff/?RetUrl=http://42.123.124.204:8081&app=DCHDM" style="color:#fff;"></a>-->
                <Icon type="log-out"></Icon>
            </div>

        </div>
    </div>
</div>
</template>
<script>
import {data} from 'api/index.js'
import {getCookie,delCookie} from '@/common/js/cookie.js'
export default {
    name: 'admin-head',
    props:["cusername"],
    data() {
        return {
            routes:"",
            username:''
        }
    },
    methods: {
        exit(){
            if(this.$store.state.code==''){
                // let obj={
                //     userId:getCookie('userid')
                // }
                // data.logout(obj).then((data)=>{
                //     console.log(data)
                //     if(data.returnCode==0 || data.returnCode==200){
                //         M.each(this.$store.state.currentUser,(value,key)=>{
                //             delete this.$store.state.currentUser[key]
                //         })
                //         console.log(this.$store.state.currentUser)
                        this.$router.push("/");
                        delCookie("userid");
                        delCookie("email");
                        delCookie("password");
                        delCookie("rememberPassword");
                        delCookie("username");
                        this.currentUserName='';
                //     }else{
                //         this.$Message.error(data.msg)
                //     }
                // }).catch((error)=>{

                // })
            }else{
                let obj={
                    userId:getCookie('userid')
                }
                data.logout(obj).then((data)=>{
                    if(data.returnCode==0 || data.returnCode==200){
                        delCookie("userid");
                        delCookie("email");
                        delCookie("password");
                        delCookie("rememberPassword");
                        delCookie("username");
                        this.$store.state.code='';
                        this.currentUserName='';
                        window.location.href='https://auth-dch-qa.genecards.cn/account/LogOff/?returnUrl=http://10.131.101.159:8080&app=DCHDM';
                        // window.location.href='https://auth-dch-qa.genecards.cn/account/LogOff/?returnUrl=http://42.123.124.204:8081&app=DCHDM';
                    }else{
                        this.$Message.error(data.msg)
                    }
                }).catch((error)=>{

                })
                
            }
        },
        userInfo(){
            this.$router.push("/admin/userinfo")
        }
    },
    mounted(){
        this.username=getCookie('username')
        let search=window.location.search.slice(1,6);
        if(search=="code="){
            let code=window.location.search.substr(6).split("&")[0];
            this.routes='/?code='+code;
        }else{
            this.routes='/'
        }
    }
};
</script>
