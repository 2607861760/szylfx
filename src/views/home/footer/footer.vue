<style lang="scss">
.footer {
    .footer-content{
        height:440px;
        background:rgba(0,0,0,.8);
        .footer-content-inner{
            @media screen and(min-width: 860px) {
                padding:20px 0;
            }
            @media screen and (min-width: 1200px) {
                padding:20px 50px;
            }
            .footer-form{
                padding-right:20px;
                .ivu-form .ivu-form-item-label{
                    color:#fff;
                }
                .ivu-input{
                    background:rgba(255, 255, 255, .3);
                    border: none;
                }
                .submit{
                    width: 280px;
                    float: right;
                    margin-top: 40px;
                    // margin-right:150px;
                    @media screen and(min-width: 860px) {
                        margin-right:8%;
                    }
                    @media screen and(min-width: 920px) {
                        margin-right:30%;
                    }
                    @media screen and (min-width: 1200px) {
                        margin-right:150px;
                    }
                }
            }
            .details{
                margin-left:20px;
                margin-top:30px;
                .weixin{
                    width:100%;
                    padding-bottom:20px;
                    border-bottom:1px solid #fff;
                    img{
                        width:137px;
                        height:137px;
                        display:block;
                        margin:auto;
                    }
                    h4{
                        margin-top:10px;
                        color:#ff6600;
                        text-align:center;
                    }
                }
                .details-txt{
                    line-height:20px;
                    color:#fff;
                    padding-top:10px;
                }
            }
        }
    }
    p{
        position: absolute;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 1);
        width: 100%;
        height: 60px;
        line-height: 60px;
        color: #FFF4EE;
        text-align: center;
    }
}
</style>
<template>
    <div class="footer">
        <div class="footer-content">
            <div class="footer-content-inner container">
                <Row>
                    <Col span="12">
                        <div class="footer-form">
                            <Form :model="formLeft" label-position="right" :label-width="100">
                                <FormItem label="姓名：">
                                    <Input v-model="formLeft.name" placeholder="您的姓名"></Input>
                                </FormItem>
                                <FormItem label="邮箱：">
                                    <Input v-model="formLeft.email" placeholder="您的邮箱"></Input>
                                </FormItem>
                                <FormItem label="电话：">
                                    <Input v-model="formLeft.phone" placeholder="您的电话"></Input>
                                </FormItem>
                                <FormItem label="工作单位：">
                                    <Input v-model="formLeft.company" placeholder="您的工作单位"></Input>
                                </FormItem>
                            </Form>
                            <div class="submit">
                                <Button type="warning" long>提交</Button>
                            </div>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="details">
                            <div class="weixin">
                                <Row type="flex" justify="space-around">
                                    <Col span="12">
                                        <img src="./weixin1.jpg"/>
                                        <h4>神州数码集团</h4>
                                    </Col>
                                    <Col span="12">
                                        <img src="./weixin2.jpg"/>
                                        <h4>神州数码医疗</h4>
                                    </Col>
                                </Row>
                            </div>
                            <div class="details-txt">
                                <div>地址：北京市海淀区苏州街16号神州数码大厦7层</div>
                                <div>电话：010-86452272</div>
                                <div>邮箱：gene_support@dchealth.com</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <p>Copyright © 2014-2016 神州数码医疗科技股份有限公司 All Rights Reserved. </p>
    </div>
</template>
<script>
export default {
    name: "footer",
    data(){
        return{
            formLeft:{}
        }
    }
}
</script>
