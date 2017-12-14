<style lang="scss" scope>
// 引入公共变量及方法
@import '~common/scss/public/base-url.scss';
.task-details {
    padding-top:20px;
    .details-nav {
        padding:25px 30px;
    }
    .card-cont span{
        display: inline-block;
        position: relative;
        padding-right: 20px;
        color:#fff;
        font-size: 16px;
        width:70%;
        height:50px;
        overflow:hidden;
    }
    .card-cont img {
        margin-top:-60px;
        float:right;
    }
    .task-title{
        padding:10px 60px;
        .title {
            font-size: 18px;
            font-weight: 600;
        }
        .task-right{
            font-size:14px;
            .task-download{
                float: right;
                padding: 5px 10px;
                background:#4578ad;
                color:#fff;
                border-radius:3px;
            }
        }
    }
    .card1,.card2,.card3,.card4,.card5{
        position:relative;
        width:200px;
        height:110px;
        margin:auto;
        &:hover {
            cursor:pointer;
            .card-bg {
                background:0;
            } 
        }
    }
    .card-click {
        &.active {
            .card-bg {
                background:0;
            } 
        }
    }
    .card-bg{
        width:100%;
        height:110px;
    }
    .details-nav .card-bg {
        position:absolute;
        z-index: 999;
        left:0;
        top:0;
        background:rgba(0,0,0,0.3);
    }
    .card1 .ivu-card-bordered {
        background:#717BB6;
    }
    .card2 .ivu-card-bordered {
        background:#3883CB;
    }
    .card3 .ivu-card-bordered {
        background:#149F9E;
    }
    .card4 .ivu-card-bordered {
        background:#DFAF2D;
    }
    .card5 .ivu-card-bordered {
        background:#D0514E;
    }
    .task-content {
        position:relative;
        margin-top: 20px;
        border-top:20px solid #ECF0F5;
    }
}

</style>
<template>
    <div class="task-details">
        <div class="task-title">
            <Row>
                <Col span="12">
                    <div class="title">
                        <span>样本编号：{{url.samplecode}}</span><span></span>
                    </div>
                </Col>
                <Col span="12">
                    <div class="task-right">
                        <!--<a class="task-download" :href="'http://42.123.124.204:8081/dchealth-platform/1.0/data/vcfdownload?jobid='+this.url.jobid" download>下载vcf文件</a>-->
                        <a class="task-download" :href="'http://10.131.101.159:8080/dchealth-platform/1.0/data/vcfdownload?jobid='+this.url.jobid" download>下载vcf文件</a>
                    </div>
                </Col>
            </Row>
        </div>
        <div class="details-nav">
            <Row type="flex" justify="space-between">
                <Col :lg="{span:4}" >
                    <div class="card1 card-click" @click="currentView='quality'" :class="{'active':'quality'==currentView}" >
                        <div class="card-bg" >
                        </div><!-- 设置高亮 -->
                        <div class="card-cont">
                            <Card style="height:110px;">
                                <div class="card-cont">
                                    <div class="card-name">
                                        <span>质控与统计</span>
                                    </div>
                                    <div calss="card-img">
                                        <img src="./img/1.png" height="50" width="50" alt="">
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                      
                </Col>
                <Col :lg="{span:4}" >
                    <div class="card2 card-click" @click="currentView='clean'" :class="{'active':'clean'==currentView}" >
                        <div class="card-bg">
                        </div><!-- 设置高亮 -->
                        <div class="card-cont">
                            <Card style="height:110px;">
                                <div class="card-cont">
                                    <div class="card-name">
                                        <span>clean reads和参考基因组比对与外显子捕获统计</span>
                                    </div>
                                    <div calss="card-img">
                                        <img src="./img/2.png" height="50" width="50" alt="">
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </Col>
                <Col :lg="{span:4}" >
                    <div class="card3 card-click" @click="currentView='visual'" :class="{'active':'visual'==currentView}" >
                        <div class="card-bg">
                        </div><!-- 设置高亮 -->
                        <div class="card-cont">
                            <Card style="height:110px;">
                                <div class="card-cont">
                                    <div class="card-name">
                                        <span>变异位点可视化</span>
                                    </div>
                                    <div calss="card-img">
                                        <img src="./img/3.png" height="50" width="50" alt="">
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </Col>
                <Col :lg="{span:4}">
                    <div class="card4 card-click"  @click="currentView='note'" :class="{'active':'note'==currentView}">
                        <div class="card-bg" >
                        </div><!-- 设置高亮 -->
                        <div class="card-cont">
                            <Card style="height:110px;">
                                <div class="card-cont">
                                    <div class="card-name">
                                        <span>突变检测及注释</span>
                                    </div>
                                    <div calss="card-img">
                                        <img src="./img/4.png" height="50" width="50" alt="">
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </Col>
                <Col :lg="{span:4}" >
                    <div class="card5 card-click"  @click="currentView='nintdata'" :class="{'active':'nintdata'==currentView}" >
                        <div class="card-bg" >
                        </div><!-- 设置高亮 -->
                        <div class="card-cont">
                            <Card style="height:110px;">
                                <div class="card-cont">
                                    <div class="card-name">
                                        <span>原始数据说明</span>
                                    </div>
                                    <div calss="card-img">
                                        <img src="./img/5.png" height="50" width="50" alt="">
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
        <div class="task-content task-child">
            <!-- <quality></quality> -->
            <component :is="currentView">
                <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
        </div>
        <!-- 编辑弹框 -->
        <Modal class-name="ivu-modal-center-wrap" v-model="openLoadModel" title="查看详情" width="800" :mask-closable="false">
            <div class="load-modal">
                <el-table :data="taskModelList" border default-expand-al="true">
                    <el-table-column prop="projectName" label="文件名" align="center"></el-table-column>
                    <el-table-column prop="projectPerson" label="下载进度" align="center"></el-table-column>
                    <el-table-column label="下载vcf" align="center">
                        <template slot-scope="scope">
                            <Dropdown trigger
                            ="click" @on-click="handelBtnClick($event, scope.row)">
                                <Button class="table-btn" type="ghost" shape="circle" size="small" @click="handelBtnClick('apply', scope.row)">下载
                                </Button>
                            </Dropdown>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </Modal>
    </div>
</template>
<script>
// 组件实例
export default {
    name:"task-index",
    data() {
        return {
            url:M.url(),
            path:'',
            openLoadModel:false, // 下载弹框
            taskModelList:[],    // 弹层数据
            currentView: "quality",     //需要的组件名称
            show:true,
        }
    },
    // 实例创建时
    created() {
        this.currentView = this.$route.query.type;
        this.productId=this.url.productId; 
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        currentView(newVal, oldVal) {
            this.$router.push({
                path: "/admin/task-details",
                query: {
                    type: newVal,
                    path:this.url.path ? this.url.path : '',
                    jobid:this.url.jobid ? this.url.jobid : ''
                }
            })
        },
        $route(newVal, old) {
            this.currentView = this.$route.query.type;
        }
    },
    methods: {
       clickBtnTask(type,row) {
            this.openLoadModel = true;
       },
       // 下载
       handelBtnClick() {

       }
    },
    components: {
        quality: resolve => require(['./quality-control'], resolve),
        clean: resolve => require(['./clean-reads'], resolve),
        note: resolve => require(['./note'], resolve),
        nintdata: resolve => require(['./initial-data'], resolve),
        visual:resolve => require(['./visualization'], resolve)
    }
}
    
</script>