<style lang="scss" scope>
// 引入公共变量及方法
// @import '~common/scss/public/base-url.scss';
.tumour-task-details {
    padding-top:20px;
    .details-nav {
        padding:25px 50px;
    }
    .task-title{
        padding:10px 50px;
        .title {
            font-size: 18px;
            font-weight: 600;
        }
        .task-right{
            font-size:14px;
            button {
                float: right;
                padding: 5px 10px;
            }
        }
    }
    .ivu-card-body{
        padding:0;
        .card-cont{
            width:100%;
            height:119px;
            .card-img{
                width:120px;
                height:100%;
                float:left;
                img{
                    width:100%;
                    height:100%;
                    padding:25px;
                    box-sizing:border-box;
                    display:block;
                }
            }
            .card-name{
                font-size:18px;
                text-align:center;
                line-height:119px;
                letter-spacing:5px;
            }
        }
    }
    .tumour-card1,.tumour-card2,.tumour-card3,.tumour-card4,.tumour-card5{
        position:relative;
        width:100%;
        height:120px;
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
        height:120px;
    }
    .details-nav .card-bg {
        position:absolute;
        z-index: 999;
        left:0;
        top:0;
        background:rgba(0,0,0,0.3);
    }
    .tumour-card1 .ivu-card-bordered {
        border:1px solid #717BB6;
        color:#717BB6;
        .card-img{
            background:#717BB6;
        }
    }
    .tumour-card3 .ivu-card-bordered {
        border:1px solid #149F9E;
        color:#149F9E;
        .card-img{
            background:#149F9E;
        }
    }
    .tumour-card5 .ivu-card-bordered {
        border:1px solid #D0514E;
        color:#D0514E;
        .card-img{
            background:#D0514E;
        }
    }
    .task-content {
        position:relative;
        margin-top: 20px;
        border-top:20px solid #ECF0F5;
    }
}

</style>
<template>
    <div class="tumour-task-details">
        <div class="task-title">
            <Row>
                <Col span="12">
                    <div class="title">
                        <span>{{url.samplecode}}</span><span></span>
                    </div>
                </Col>
                <!--<Col span="12">
                    <div class="task-right">
                        <Button type="primary"
                                @click="clickBtnTask('pre')">
                                查看/下载vcf文件
                        </Button>
                    </div>
                </Col>-->
            </Row>
        </div>
        <div class="details-nav">
            <Row type="flex" justify="space-between">
                <Col :lg="{span:6}">
                    <div class="tumour-card1 card-click" @click="currentView='quality'" :class="{'active':'quality'==currentView}" >
                        <div class="card-bg" >
                        </div><!-- 设置高亮 -->
                        <Card style="height:120px;">
                            <div class="card-cont">
                                <div class="card-img">
                                    <img src="./img/1.png" alt="">
                                </div>
                                <div class="card-name">
                                    <span>质控与统计</span>
                                </div>
                            </div>
                        </Card>
                    </div>      
                </Col>
                <Col :lg="{span:6}" >
                    <div class="tumour-card3 card-click" @click="currentView='visual'" :class="{'active':'visual'==currentView}" >
                        <div class="card-bg">
                        </div><!-- 设置高亮 -->
                        <Card style="height:120px;">
                            <div class="card-cont">
                                <div class="card-img">
                                    <img src="./img/3.png" height="50" width="50" alt="">
                                </div>
                                <div class="card-name">
                                    <span>变异位点可视化</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </Col>
                <Col :lg="{span:6}">
                    <div class="tumour-card5 card-click"  @click="currentView='nintdata'" :class="{'active':'nintdata'==currentView}" >
                        <div class="card-bg" >
                        </div><!-- 设置高亮 -->
                        <Card style="height:120px;">
                            <div class="card-cont">
                                <div class="card-img">
                                    <img src="./img/5.png" height="50" width="50" alt="">
                                </div>
                                <div class="card-name">
                                    <span>原始数据说明</span>
                                </div>
                            </div>
                        </Card>
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
                path: "/admin/task-details-tumour",
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