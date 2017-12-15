<style lang="scss" scope>
// 引入公共变量及方法
@import '~common/scss/public/base-url.scss';
.clean-reads {
    .clean-pic  {
        text-align: center;
        border-bottom: 20px solid #ECF0F5;
        p {
            height:40px;
            background:#2B3245;
            padding-top: 10px;
            color: #fff;
        }
        img {
            &:hover {
                cursor:pointer;
            }
        }
    }
    .clean-cont {
        .tab-cont {
            border-bottom: 20px solid #ECF0F5;
            h5 {
                text-align: center;
                font-size: 20px;
                padding:10px;
                background:#fff;
            }
        }
    }
}
.clean-reads {
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
    <div class="clean-reads">
        <div class="clean-cont">
            <Row>
                <Col span="24">
                    <div class="clean-pic" v-if="cleanShow">
                        <P>{{picTitle}}标题</P> 
                        <div class="pic-cont" v-for="item in picList" :key="item.displayName" @click="clickLookPic">
                            <img :src="imgUrl+item.fileName" alt="点击查看大图" height="400" width="400">
                        </div>
                    </div> 
                </Col>
            </Row>
            <!-- 表格一 -->
            <Row>
                <Col span="24">
                    <div class="table-first">
                       <div class="tab-cont">
                            <h5>{{tableTitleFirst}}</h5>
                            <el-table :data="tableListFirst" border default-expand-al="true" height="300">
                                <el-table-column prop="fieldname" label="名称"></el-table-column>
                                <el-table-column prop="description" label="描述"></el-table-column>
                                <el-table-column prop="zd_1" label="数值"></el-table-column>
                            </el-table>
                        </div> 
                    </div>
                </Col>
            </Row>
            <!-- 表格二 -->
            <Row>
                <Col span="24">
                    <div class="table-second">
                       <div class="tab-cont">
                            <h5>{{tableTitleSecond}}</h5>
                            <el-table :data="tableListSecond" border default-expand-al="true" height="300">
                                <el-table-column prop="fieldname" label="名称"></el-table-column>
                                <el-table-column prop="description" label="描述"></el-table-column>
                                <el-table-column prop="zd_1" label="数值"></el-table-column>
                            </el-table>
                        </div> 
                    </div>
                </Col>
            </Row>
            <!-- 表格三 -->
            <Row>
                <Col span="24">
                    <div class="table-three">
                       <div class="tab-cont">
                            <h5>{{tableTitleThree}}</h5>
                            <el-table :data="tableListThree" border default-expand-al="true" height="300">
                                <el-table-column prop="fieldname" label="名称"></el-table-column>
                                <el-table-column prop="description" label="描述"></el-table-column>
                                <el-table-column prop="zd_1" label="数值"></el-table-column>
                            </el-table>
                        </div> 
                    </div>
                </Col>
            </Row>
        </div>
        <!-- 图片弹层 -->
        <Modal v-model="picCLeanShowModal" width="600" :mask-closable="false">
            <div class="pic-show" v-model="picModal">
                <img :src="src" width="600">
            </div>
        </Modal> 
    </div>
</template>
<script>
// 引入任务管理方法
import {
    task
} from 'api/index.js'
// 全局图片路径
import {imgUrl} from '@/common/js/Base.js'
export default {
    name:"quality-control",
    data() {
        return {
            imgUrl :imgUrl.imgurl,   // 图片路径前缀
            cleanShow:true,
            picCLeanShowModal:false,   // 图片大图弹层
            picModal:{},
            picTitle:null,             // 图片标题
            picList: [],               // 图片数据
            tableListFirst:[],
            tableTitleFirst: null,
            tableListSecond:[],
            tableTitleSecond: null,
            tableListThree:[],
            tableTitleThree: null,
            url:M.url(),
            src:"",
        }
    },
    // 实例创建时
    created() {
        this.getJobProgressInfoById();
    },
    watch: {

    },
    methods: {
        clickLookPic() {
            this.picModal = this.picList[0];
            this.picCLeanShowModal = true;
            this.src=this.imgUrl+this.picModal.fileName
        },
        getJobProgressInfoById() {
            let obj = {
                jobId:this.url.jobid,
                analysisStep:"13"
            }
            // console.log(obj); 
            task.getTaskInfoById(obj).then((res)=> {
                console.log(JSON.stringify(res));
                if(res.returnCode==0 || res.returnCode==200){
                    let obj = res.data.jobProcessDataList;
                    if(obj.length<=0) {
                        this.cleanShow = false;
                    }else {
                        M.each(obj,(item,index)=> {
                            if(item.tableType == '4') {
                                this.picTitle = item.tableName;
                                this.picList = item.files;
                            }else {
                                if(index==0) {
                                    this.tableListFirst = item.files[0].jsonData.data;
                                    this.tableTitleFirst = item.files[0].displayName; 
                                }else if(index==1) {
                                    // console.log(item);
                                    this.tableListSecond = item.files[0].jsonData.data;
                                    this.tableTitleSecond = item.files[0].displayName;
                                }else if(index==2) {
                                    console.log(item);
                                    this.tableListThree = item.files[0].jsonData.data;
                                    this.tableTitleThree = item.files[0].displayName;
                                }
                            }
                        }) 
                    }
                }else{
                    this.$Message.error(res.msg)
                }
                
            })
        },
    }
}
    
</script>