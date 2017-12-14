<style lang="scss" scoped>
@import '~common/scss/public/base-variable';
@import '~common/scss/public/base-mixin';
@import '~common/scss/base-style';
.clear {
    @include clear;
}

.top-bar {
    border: 1px solid #d7dde4;
    background: $home-blue;
    height: 32px;
}
.top-content {
    float: right;
    margin-right: 25px;
    height: 32px;
    line-height: 32px;
    a {
        color: #fff;
        margin: 0 10px;
    }
}

.banner {
    overflow:hidden;
    margin:0 auto;
    .carousel {
         width: 100%;
            height: 100%;
        img {
            width: 100%;
            display:block;
        }
    }
}
.inner{
        padding-top:60px;
        text-align:center;
        color:#333;
        .inner-title{
            font-size:20px; 
            font-weight:bold;
            letter-spacing:0.5rem;
            span{
                font-size:14px;
                color:#ff6600;
                letter-spacing:0;
                font-weight:normal;
            }
        }
    }
    /*精准医学*/
    .medicine{
        height:430px;
        background:rgba(242, 242, 242, 1);
        .medicine-inner{
            padding:60px;
            .medicine-pic{
                width:120px;
                margin:auto;
                .medicine-icon{
                    width:100%;
                    height:120px;
                    border-radius:50%;
                    img{
                        width:60px;
                        height:60px;
                        display:inline-block;
                        margin-top:30px;
                    }
                }
                p{
                    margin-top:20px;
                    width:130px;
                    &:hover{
                        color:#ff6600;
                    }
                }
            }
        }
    }
    /*组学云平台*/ 
    .cloud{
        height:720px;
        background:rgba(255, 255, 255, 1);
        .cloud-inner{
            height:488px;
            padding:40px 50px 0;
            .cloud-pic-fs{
                height:488px;
                background:url('./u8.jpg') no-repeat;
            }
            .cloud-pic-sc{
                height:244px;
                background:url('./u6.jpg') no-repeat;
            }
            .cloud-pic-th{
                height:244px;
                background:url('./u218.jpg') no-repeat;
            }
            .cloud-pic-fr{
                height:244px;
                background:url('./u94.jpg') no-repeat;
                background-size:100% 100%;
            }
            .cloud-pic{
                position:relative;
                .cloud-bg{
                    width:100%;
                    height:100%;
                    position:absolute;
                    top:0;
                    left:0;
                    z-index:333;
                    font-size:20px;
                    font-weight:700;
                    line-height:244px;
                    text-align:center;
                    color:#fff;
                }
                .cloud-bg.cloud-bg-fs{
                    background:rgba(25, 158, 216, .7);
                    line-height:488px;
                    &:hover{
                        background:rgba(25, 158, 216, .5);
                    }
                }
                .cloud-bg.cloud-bg-sc{
                    background:rgba(0, 181, 0, .7);
                    &:hover{
                        background:rgba(0, 181, 0, .5);
                    }
                }
                .cloud-bg.cloud-bg-th{
                    background:rgba(255, 102, 0, .7);
                    &:hover{
                        background:rgba(255, 102, 0, .5);
                    }
                }
                .cloud-bg.cloud-bg-fr{
                    background:rgba(0, 0, 0, .7);
                    &:hover{
                        background:rgba(0, 0, 0, .5);
                    }
                }
            }
        }
    }
        /*关于我们 */
    .about{
       height:373px;
       background-image:url('./about.png');
       background-size:100% 100%;
       width:100%; 
       .inner{
           color:#fff;
       }
       .about-txt{
           color:#fff;
           text-indent:2em;
           padding:30px 50px 0;
           margin:auto;
           line-height:28px;
           p{
                text-align: left;
                width: 92%;
                float: right;
           }
       }
    }
    /*科研合作 */
    .cooperate{
        height:490px;
        background:rgba(255, 255, 255, 1);
        .cooperate-inner{
            padding:60px 50px 0;
            position:relative;
            height:196px;
            .cooperate-left,.cooperate-right{
                position: absolute;
                top: 70%;
                width: 40px;
                height: 40px;
                background-image:url('./left.png');
                background-size:220% 200%;
                
            }
            .cooperate-left{
                left:0;
                background-position:1px 0px;
                &:hover{
                    background-position:-46px 0px;
                }
            }
            .cooperate-right{
                right:0;
                background-position:1px -40px;
                &:hover{
                    background-position:-46px -40px;
                }
            }
            .cooperate-content{
                width:100%;
                height:198px;
                position:relative;
                .cooperate-pic{
                    width:100%;
                    height:100%;
                    position:absolute;
                    top:0;
                    left:0;
                    &:hover{
                        transition:all ease .5s;
                        top:-10px;
                        box-shadow:0 5px 5px #666;
                        .cooperate-bg{
                            display:block;
                        }
                        .cooperate-title{
                            background:rgba(25, 150, 205, 1);
                        }
                    }
                    .cooperate-bg{
                        width:100%;
                        height:100%;
                        position:absolute;
                        top:0;
                        left:0;
                        z-index:222;
                        background:rgba(0,0,0,.6);
                        color:#fff;
                        display:none;
                        p{
                            padding:0 20px;
                            text-indent:2rem;
                            font-size:14px;
                        }
                        
                    }
                    .cooperate-title{
                        position:absolute;
                        bottom:0;
                        left:0;
                        z-index:333;
                        width:100%;
                        height:40px;
                        background:rgba(0,0,0,.6);
                        color:#fff;
                        text-align:center;
                        line-height:40px;
                    }
                }
                .cooperate-pic.cooperate-pic-fs{
                    background:url('./u160.jpg');
                }
                .cooperate-pic.cooperate-pic-sc{
                    background:url('./u158.jpg');
                }
                .cooperate-pic.cooperate-pic-th{
                    background:url('./u160.jpg');
                }
            }
        }
    }
</style>
<template>
    <div class="index">
        <div class="banner">
            <el-carousel :interval="5000" arrow="never" :height="height" >
                <el-carousel-item v-for="(item,index) in banners" :key="index">
                    <div class="carousel">
                        <img :src="item.img" alt="" :height="height">
                    </div>
                </el-carousel-item>
            </el-carousel>  
        </div>
        <!--精准医学-->
        <div class="medicine">
            <div class="inner container">
                <div class="inner-title">精准医学</div>
                <div class="medicine-inner">
                    <Row type="flex" justify="space-between">
                        <Col :lg="{span:6}">
                            <div class="medicine-pic">
                                <div class="medicine-icon" style="background:#1ea8e3;">
                                    <img src="./tu2.jpg"/>
                                </div>
                                <p>罕见病精准医学</p>
                            </div>
                        </Col>
                        <Col :lg="{span:6}">
                            <div class="medicine-pic">
                                <div class="medicine-icon" style="background:#00c800;">
                                    <img src="./tu3.jpg"/>
                                </div>
                                <p>肿瘤精准医学</p>
                            </div>
                        </Col>
                        <Col :lg="{span:6}">
                            <div class="medicine-pic">
                                <div class="medicine-icon" style="background:#00c8c8;">
                                    <img src="./tu1.jpg"/>
                                </div>
                                <p>药物基因组精准分析</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
        
        <!--组学云平台-->
        <div class="cloud">
            <div class="inner container">
                <div class="inner-title">组学云平台</div>
                <div class="cloud-inner">
                    <Row>
                        <Col span="6">
                            <div class="cloud-pic cloud-pic-fs">
                                <div class="cloud-bg cloud-bg-fs">基因组学研究</div>
                            </div>
                        </Col>
                        <Col span="18">
                            <div class="cloud-pic cloud-pic-sc">
                                <div class="cloud-bg cloud-bg-sc">蛋白质组研究</div>
                            </div>
                            <Row>
                                <Col span="12">
                                    <div class="cloud-pic cloud-pic-th">
                                        <div class="cloud-bg cloud-bg-th">代谢组</div>
                                    </div>
                                </Col>
                                <Col span="12">
                                    <div class="cloud-pic cloud-pic-fr">
                                        <div class="cloud-bg cloud-bg-fr">更多</div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
        <!--关于我们-->
        <div class="about" id="#about">
            <div class="inner container">
                <div class="inner-title">关于我们</div>
                <div class="about-txt">
                    <Row>
                        <Col span="4">
                            <div style="width:160px;">
                                <img src="./u206.jpg" style="width:100%;height:100%;display:block;"/>
                            </div>
                        </Col>
                        <Col span="20">
                            <p>
                                <span style="color:#C10028;font-weight:700;font-size:20px;">神</span>州医疗集合神州数码大数据领域、医疗健康领域等专业团队，向政府、医疗机构、企业、居民提供医疗信息化、健康管理、医疗大数据分析、建模，软件平台开发和系统集成等全方位解决方案。神州医疗专注于大数据分析、精准医疗、基因大数据分析、决策支持等医疗信息化解决方案，承担多项国家863计划课题研究，涵盖肿瘤大数据、罕见病、PADIS多个领域，是智慧医疗、卫生信息化领域的领先者，立志成为中国精准医疗信息化第一品牌。神州医疗基因分析云平台为医学科学研究和临床基因检测提供服务。平台开发了标准数据分析流程，对数据分析进行了严格的质控，力求更准确的发现基因变异位点，为临床基因检测提供支持。平台开发的项目协作模块，能满足多用户的合作需求，使数据的分享和利用更加便捷。
                            </p>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
        <!--科研合作-->
        <div class="cooperate">
            <div class="inner container">
                <div class="inner-title">科研合作</div>
                <div class="cooperate-inner">
                    <div class="cooperate-left"></div>
                    <Row type="flex" justify="space-around">
                        <Col span="6">
                            <div class="cooperate-content">
                                <div class="cooperate-pic cooperate-pic-fs">
                                    <div class="cooperate-bg">
                                        <div><img src="./u178.jpg"/></div>
                                        <p>这里是对合作伙伴简短的介绍，包括医院成立时间、地址、级别合作项目等介绍</p>
                                    </div>
                                    <div class="cooperate-title">上海复旦儿科</div>
                                </div>
                            </div>
                        </Col>
                        <Col span="6">
                            <div class="cooperate-content">
                                <div class="cooperate-pic cooperate-pic-sc">
                                    <div class="cooperate-bg">
                                        <div><img src="./u178.jpg"/></div>
                                        <p>这里是对合作伙伴简短的介绍，包括医院成立时间、地址、级别合作项目等介绍</p>
                                    </div>
                                    <div class="cooperate-title">湖北省肿瘤医院</div>
                                </div>
                            </div>
                        </Col>
                        <Col span="6">
                            <div class="cooperate-content">
                                <div class="cooperate-pic cooperate-pic-th">
                                    <div class="cooperate-bg">
                                        <div><img src="./u178.jpg"/></div>
                                        <p>这里是对合作伙伴简短的介绍，包括医院成立时间、地址、级别合作项目等介绍</p>
                                    </div>
                                    <div class="cooperate-title">北京协和</div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div class="cooperate-right"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    feature,
    database
} from 'api/index.js';
export default {
    name: "index",
    data() {
        return {
            height:"408px",
            banners:[{img:require('./bn1.jpg')},{img:require('./bn2.jpg')},{img:require('./bn3.jpg')},{img:require('./bn4.jpg')}]
        }
    },
    methods: {
    	resize:function(){//动态改变banner图的高度
    		 const that = this;
    		 window.screenWidth = document.body.clientWidth;
             that.screenWidth = window.screenWidth;
             that.height=that.screenWidth*0.2125+"px";
    	}
    },
    mounted () { 
       	this.resize();
       	const that = this;
       	window.onresize = function() {
        	return that.resize();
        } 
    }
}
</script>
