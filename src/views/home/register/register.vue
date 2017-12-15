<style lang="scss" scoped>
// @import '~common/scss/logon-register.scss'
.bg{
    background-image:url('./bg.jpg');
    width:100%;
    height:100%;
    background-size:100% 100%;
}
.language{
    position:absolute;
    top:20px;
    left:20%;
    height:20px;
    color:#fff;
    font-size:16px;
    a{
        color:#fff;
        padding:0 15px;
    }
}
.logo{
    width:257px;
    padding-top:50px;
    img{
        width:100%;
        height:100%;
        display:block;
    }
}
.register{
    height:480px !important;
}
.login{
    width:350px;
    height:290px;
    margin-top:30px;
    background:#fff;
    border-radius:5px;
    .login-inner{
        margin:0 auto;
        width:280px;
        padding-top:20px;
        p{
            font-size:18px;
            color:#333;
            text-align:center;
        }
        
        a.now{
            margin:10px auto 0;
            width:100%;
            display:block;
            color:#199ed8;
            text-align:center;
            text-decoration:underline;
        }
    }
}
</style>
<template>
<div class="bg">
    <div class="logo container">
         <img src="./logo2.png" />
    </div>
    <div class="login container register">
        <div class="login-inner">
            <p>新用户注册</p>
            <Form ref="formRegister" :model="formRegister" :rules="ruleRegister">
        <FormItem prop="userName">
            <Input type="text" v-model.lazy.trim="formRegister.userName" placeholder="请输入用户名">
                <Icon type="android-person" slot="prepend"></Icon>
                <span class="validatorError" v-if="validatorList.success=== 'true'">{{validatorList.info}}</span>
                        <span class="validatorSuccess" v-if="validatorList.success=== 'false'">{{validatorList.info}}</span>
            </Input>
        </FormItem>
        <FormItem prop="email">
            <Input type="text" v-model.lazy.trim="formRegister.email" placeholder="请输入邮箱">
                <Icon type="android-mail" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="code" style="width:120px;">
            <Input type="text" v-model.lazy.trim="formRegister.code" placeholder="请输入验证码" style="width:120px;"></Input>
            <Button type="primary" style="width:120px;float:right;padding:6px 0px;">发送验证码</Button>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model.lazy.trim="formRegister.password" placeholder="请输入密码">
                <Icon type="ios-locked" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="passwordConfirm">
            <Input type="password" v-model.lazy.trim="formRegister.passwordConfirm" placeholder="请再次输入密码">
                <Icon type="ios-locked" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem style="width:280px;">
            <Button type="primary" @click="reg" style="width:280px;">注册</Button>
        </FormItem>
        <div style="margin-top:10px;">
                    <input type="checkbox" />
                    <span style="color:#666">同意注册</span>
                </div>
        </Form>
            <router-link to="/login" class="now">返回登录</router-link>
        </div>
    </div>
</div>   
</template>
  <script>
// // 引入注册模块
import {
    register
} from 'api/index.js'
export default {
        data () {
            // 验证用户名是否为空
            let validateUser = (rule, value, callback) => {
                if (value === '') {
                    this.validatorList.info = ''
                    return callback(new Error('用户名不能为空'));
                } else {
                    callback();
                }
            };
            let validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formRegister.passwordConfirm !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formRegister.validateField('passwordConfirm');
                    }
                    callback();
                }
            };
            let validatePasswordConfirm = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formRegister.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            let validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('邮箱不能为空'));
                } else {
                    callback();
                }
            };
            let validateCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else {
                    callback();
                }
            };
            return {
                flag:true,
                validatorList: {},
                formRegister: {
                    userName: '',
                    password: '',
                    email:'',
                    code:'',
                    passwordConfirm:''
                },
                ruleRegister: {
                    userName: [{
                        validator: validateUser,
                        trigger: 'blur'
                        }],
                    email: [{
                        validator: validateEmail,
                        trigger: 'blur'
                        }],
                    password: [{
                        validator: validatePassword,
                        trigger: 'blur'
                        }],
                    code: [{
                        validator: validateCode,
                        trigger: 'blur'
                        }],
                    passwordConfirm:[{
                        validator: validatePasswordConfirm,
                        trigger: 'blur'
                        }]
                }
            }
        },
        methods: {
            reg(){
                if(this.flag){
                    this.flag=false;
                    let user={
                        "userName" : this.formRegister.userName,
                        "passWord" : this.formRegister.password,
                        "regCode" : "123",
                        "email" : this.formRegister.email
                    }
                    register.Register(user).then((data)=>{
                        console.log(data)
                        this.flag=true;
                        if(data.returnCode==0 || data.returnCode==200){
                            this.$router.push('/login')
                        }else{
                            this.$Message.error(data.msg)
                        }
                    })
                }
            }
        }
    }
 </script>
