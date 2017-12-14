<style lang="scss" scoped>
    .local{
        padding: 5px 0 20px;
        font-size:16px;
    }
    .info{
        box-shadow:1px 1px 3px rgba(0,0,0,0.345);
        .info-title{
            padding:20px 10px;
            border-bottom:1px solid rgba(0,0,0,0.1);
            font-size:16px;
        }
        .info-form{
            padding:0px 20px 40px;
            border-bottom:1px solid rgba(0,0,0,0.1);
            font-size:14px;
        }
        .info-btn{
            text-align:center;
            padding-top:10px;
            padding-bottom:40px;
        }
    }
</style>
<template>
    <div>
        <div class="local">当前位置：{{email}}</div>
        <div class="info">
            <div class="info-title">个人信息</div>
            <div class="info-form">
                <Form :model="formItem" :label-width="100" align="left">
                    <FormItem label="用户名：">
                        <Input v-model="formItem.username"></Input>
                    </FormItem>
                    <FormItem label="邮箱账号：">
                        <Input v-model="formItem.email" disabled style="color:#666;"></Input>
                    </FormItem>
                    <FormItem label="工作单位：">
                        <Input v-model="formItem.work" disabled></Input>
                    </FormItem>
                    <FormItem label="手机号:">
                        <Input v-model="formItem.phone"></Input>
                    </FormItem>
                </Form>
            </div>
            <div class="info-btn"><Button type="primary">保存</Button></div>
        </div>
    </div>
</template>
<script>
import {getCookie} from '@/common/js/cookie.js'
    export default{
        name:'userinfo',
        data(){
            return{
                formItem:{},
                email:''
            }
        },
        mounted(){
            M.extend(this.formItem,this.$store.state.currentUser);
        }
    }
</script>