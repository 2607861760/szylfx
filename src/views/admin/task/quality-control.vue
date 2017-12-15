<style lang="scss" scope>
// 引入公共变量及方法
@import '~common/scss/public/base-url.scss';

.quality-control {
    .quality-pic {
        background:#ECF0F5;
    }
    .pic-left,.pic-right {
        text-align: center;
        background:#fff;
        p {
            background: #2B3245;
            color: #fff;
            text-align: center;
            height: 40px;
            padding-top: 10px;
        }
    }
    .pic-cont .pic-item {
        img {
            padding-top: 10px;
            &:hover {
                cursor:pointer;
            }
        }
    }
    .quality-tab {
        border-bottom: 40px solid #ECF0F5;
        h5 {
            text-align: center;
            font-size: 20px;
            padding:10px;
            background: #ECF0F5;
        }
    }
}
.quality-control {
    .el-table th.is-leaf {
        background:#2B3245;
    }
    .el-table th .cell {
        background:#2B3245;
        color:#fff;
    }
}


</style>
<template>
    <div class="quality-control">
        <div class="quality-pic">
            <Row type="flex" justify="space-between">
                <Col span="16">
                     <div class="pic-left" v-if="qualityShow">
                        <P>{{picLeftTitle}}</P>
                        <Row>
                           <Col>
                                <div class="pic-cont" v-model="picLeftList">
                                    <div class="pic-item" v-for="(item,index) in picLeftList" :key="item.displayName" @click="mouseCoverLeft(index)">
                                        <!-- <div class="pic-tit">
                                            {{item.displayName}}
                                        </div> -->
                                        <img :src="imgUrl+item.fileName" height="300" width="715" title="点击查看大图"> 
                                    </div>
                                    <!-- 左侧弹层 -->
                                </div>
                                <Modal v-model="picShowLeft" width="1200" :mask-closable="false">
                                    <div class="pic-show" v-model="picLeftModal">
                                        <img :src="src" width="1200">
                                        <!--<img src="./img/clean.jpg" width="1200px;"/> -->
                                    </div>
                                </Modal>
                            </Col>
                        </Row> 
                    </div>
                </Col>
                <Col span="7">
                    <div class="pic-right" v-if="qualityShow">
                        <P>{{picRightTitle}}</P>
                        <Row>
                            <Col>
                                <div class="pic-cont" v-model="picRightList">
                                    <div class="pic-item" v-for="(item,index) in picRightList" :key="item.displayName" @click="mouseCoverRight(index)">
                                        <!-- <div class="pic-tit">
                                            {{item.displayName}}
                                        </div> -->
                                        <img :src="imgUrl+item.fileName" height="300" width="300" title="点击查看大图">
                                    </div>
                                    
                                </div>
                                <Modal v-model="picShowRight" width="500" :mask-closable="false">
                                    <div class="pic-show" v-model="picRightModal">
                                        <img :src="src" width="500">
                                    </div>
                                </Modal>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
         
        <div class="quality-tab" v-if="show">
            <div class="tab-cont">
                <h5>{{tableTitle}}</h5>
                <el-table :data="tableList" border default-expand-al="true" height="300">
                    <el-table-column prop="fieldname" label="项目名称"></el-table-column>
                    <el-table-column prop="description" label="描述"></el-table-column>
                    <el-table-column prop="zd_1" label="数值"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
// 引入任务管理方法
import {task} from 'api/index.js'
// 全局图片路径
import {imgUrl} from '@/common/js/Base.js'
export default {
    name:"quality-control",
    data() {
        return { 
            imgUrl :imgUrl.imgurl,   // 图片路径前缀
            qualityShow: true,
            url:M.url(),
            picShowLeft:false,       // 大图盒子隐藏
            picShowRight:false,
            picLeftList: [],        // 左侧图标
            picLeftTitle: null,     // 左侧图片标题
            picRightList: [],       // 右侧图标
            picRightTitle: null,    // 右侧图片标题
            tableList:[],           // 表格数据
            tableTitle:null,        // 表格标题
            picLeftModal:{},
            picRightModal:{},
            show:true,
            src:""
        }
    },
    // 实例创建时
    created() {
        this.getJobProgressInfoById();
        if(this.url.productId==1){
            this.show=true;
        }else if(this.url.productId==2){
            this.show=false;
        }
    },
    watch: {

    },
    methods: {
        getJobProgressInfoById() {
            let obj = {
                jobId:this.url.jobid,
                analysisStep:"1"
            }
            task.getTaskInfoById(obj).then((res)=> {
                if(res.returnCode==0 || res.returnCode==200){
                    let obj = res.data.jobProcessDataList;
                    // console.log(res);
                    if(obj.length<=0) {
                        this.qualityShow = false;
                    }else {
                        M.each(obj,(item) =>{
                            if(item.tableType=='1') {
                                // console.log(item);
                                // 表格数据
                                this.tableTitle = obj.displayName;
                                this.tableList = obj[2].files[0].jsonData.data;
                            }
                            // 左图内容
                            else if(item.tableType=='2') {
                                this.picLeftTitle = item.tableName;
                                this.picLeftList = item.files;
                                // console.log(this.picLeftList);
                            }
                            // 右图内容
                            else if (item.tableType=='3') {
                                this.picRightTitle = item.tableName;
                                this.picRightList = item.files;
                            }
                        }) 
                    }
                }else{
                    this.$Message.error(res.msg)
                }
               
                           
            })
        },
        mouseCoverLeft(index) {
            this.picLeftModal = this.picLeftList[index];
            // console.log(this.picLeftModal);
            this.picShowLeft = true;
            this.src=this.imgUrl+this.picLeftModal.fileName;
        },
        mouseCoverRight(index) {
            this.picRightModal = this.picRightList[index];
            this.picShowRight = true;
            this.src=this.imgUrl+this.picRightModal.fileName
        }
    }
}
    
</script>