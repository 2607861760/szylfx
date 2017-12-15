<style lang="scss" scope>
// 引入公共变量及方法
@import '~common/scss/public/base-url.scss';
.note {
    background: #ECF0F5;
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
}
.tab-cont {
    border-bottom: 20px solid #ECF0F5;
    h5 {
        text-align: center;
        font-size: 20px;
        padding:10px;
        background:#fff;
    }
}
.table-first {
    border-top:20px solid #ECF0F5;
}
.note {
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
    <div class="note">
        <div class="note-cont">
            <Row type="flex" justify="space-between">
                <Col span="11">
                     <div class="pic-left" v-if="noteShow">
                        <P>{{picLeftTitle1}}</P>
                        <Row>
                           <Col>
                                <div class="pic-cont" v-model="picLeftList1">
                                    <div class="pic-item" v-for="(item,index) in picLeftList1" :key="item.displayName" @click="mouseCoverLeft(index)">
                                        <!-- <div class="pic-tit">
                                            {{item.displayName}}
                                        </div> -->
                                        <img :src="imgUrl+item.fileName" height="450" width="500"> 
                                    </div>
                                    <!-- 左侧弹层 -->
                                    <!-- <Modal v-model="picShowLeft" width="1200">
                                        <div class="pic-show">
                                            <img :src="imgUrl+item.fileName" width="1200">
                                        </div>
                                    </Modal> -->
                                </div>
                            </Col>
                        </Row> 
                    </div>
                </Col>
                <Col span="12">
                    <div class="pic-right" v-if="noteShow">
                        <P>{{picRightTitle2}}</P>
                        <Row>
                            <Col>
                                <div class="pic-cont" v-model="picRightList2" @click="mouseCoverRight">
                                    <div class="pic-item" v-for="(item,index) in picRightList2" :key="item.displayName">
                                        <!-- <div class="pic-tit">
                                            {{item.displayName}}
                                        </div> -->
                                        <img :src="imgUrl+item.fileName" height="450" width="500">
                                        <!-- <Modal v-model="picShowRight" width="500">
                                            <div class="pic-show" >
                                                <img :src="imgUrl+item.fileName" width="500">
                                            </div>
                                        </Modal>  -->
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
        <div class="note-cont">
            <Row type="flex" justify="space-between">
                <Col span="11">
                     <div class="pic-left" v-if="noteShow">
                        <P>{{picLeftTitle3}}</P>
                        <Row>
                           <Col>
                                <div class="pic-cont" v-model="picLeftList3">
                                    <div class="pic-item" v-for="(item,index) in picLeftList3" :key="item.displayName" @click="mouseCoverLeft(index)">
                                        <!-- <div class="pic-tit">
                                            {{item.displayName}}
                                        </div> -->
                                        <img :src="imgUrl+item.fileName" height="450" width="500"> 
                                    </div>
                                    <!-- 左侧弹层 -->
                                    <!-- <Modal v-model="picShowLeft" width="1200">
                                        <div class="pic-show">
                                            <img :src="imgUrl+item.fileName" width="1200">
                                        </div>
                                    </Modal> -->
                                </div>
                            </Col>
                        </Row> 
                    </div>
                </Col>
                <Col span="12">
                    <div class="pic-right" v-if="noteShow">
                        <P>{{picRightTitle4}}</P>
                        <Row>
                            <Col>
                                <div class="pic-cont" v-model="picRightList4" @click="mouseCoverRight">
                                    <div class="pic-item" v-for="(item,index) in picRightList4" :key="item.displayName">
                                        <!-- <div class="pic-tit">
                                            {{item.displayName}}
                                        </div> -->
                                        <img :src="imgUrl+item.fileName" height="450" width="500">
                                        <!-- <Modal v-model="picShowRight" width="500">
                                            <div class="pic-show" >
                                                <img :src="imgUrl+item.fileName" width="500">
                                            </div>
                                        </Modal>  -->
                                    </div>
                                </div>
                            </Col>
                        </Row>
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
        </div>
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
    name:"note",
    data() {
        return {
            imgUrl :imgUrl.imgurl,   // 图片路径前缀
            noteShow: true,
            picLeftList1:[],
            picLeftTitle1:null,
            picRightList2:[],
            picRightTitle2:null,
            picLeftList3: [],
            picLeftTitle3:null,
            picRightList4: [],
            picRightTitle4: null,
            tableListFirst:[],
            tableTitleFirst: null,
            tableListSecond: [],
            tableTitleSecond:null,
            url:M.url()
        }
    },
    // 实例创建时
    created() {
        this.getJobProgressInfoById();
    },
    watch: {

    },
    methods: {
        mouseCoverLeft(){

        },
        mouseCoverRight() {

        },
        getJobProgressInfoById() {
            let obj = {
                jobId:this.url.jobid,
                analysisStep:"22"
            }
            // console.log(obj); 
            task.getTaskInfoById(obj).then((res)=> {
                // console.log(JSON.stringify(res));
                if(res.returnCOde==0 || res.returnCode==200){
                    let obj = res.data.jobProcessDataList;
                    if(obj.length<=0) {
                        this.noteShow = false;
                    }
                    else {
                        M.each(obj,(item,index)=> {
                            if(item.tableType == '5') {
                                this.picLeftTitle1 = item.tableName;
                                this.picLeftList1 = item.files;
                            }else if(item.tableType == '6') {
                                this.picRightTitle2 = item.tableName;
                                this.picRightList2 = item.files;
                            }else if(item.tableType == '7') {
                                this.picLeftTitle3 = item.tableName;
                                this.picLeftList3 = item.files;
                            }else if(item.tableType == '8') {
                                this.picRightTitle4 = item.tableName;
                                this.picRightList4 = item.files;
                            }else if(item.tableType == '1'){
                                if(index==0) {
                                    this.tableListFirst = item.files[0].jsonData.data;
                                    this.tableTitleFirst = item.files[0].displayName;
                                }else if (index==2) {
                                    
                                    this.tableListSecond = item.files[0].jsonData.data;
                                    this.tableTitleSecond = item.files[0].displayName;
                                }
                            }
                        })
                    }
                }
            })
        },
    }
}
    
</script>