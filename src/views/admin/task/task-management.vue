<style lang="scss" scope>
// 引入公共变量及方法
@import '~common/scss/public/base-url.scss';
.cont-main{
    width:100%;
    padding:15px 20px 30px;
    box-sizing:border-box;
    .table-btn{
        width:60px;
        height:28px;
    }
    .download,.dis-download{
        display: inline-block;
    }
    .el-button--primary{
        background:#4578ad;
    }
}
.cont-head {
    width:100%;
    padding:15px 20px;
    box-sizing:border-box;
    border-bottom: 20px solid #ECF0F5;
    .head {
        padding:10px;
        background:#f5f5f5;
        color:#666;
        &:hover {
            color:#3C8DBC;
        }
    }
}
.per-page {
    margin-top: 40px;
}
.cont-research {
    padding-bottom: 35px;
    padding-top:20px;
    .build {
        margin-left: 20px;
        padding:6px 20px;
    }
}

</style>
<template>
    <div calss="task">

        <Tabs type="card" @on-click="choice" class="">
            <TabPane label="罕见病"></TabPane>
            <TabPane label="癌症" class="tabcard"></TabPane>
        </Tabs>

        <div class="cont-research">
            <div style="float:left;">
                <Button type="primary" size="small" class="build" @click="build">
                  <Icon type="android-add"></Icon>
                  新建任务
                </Button>
            </div>
            <div style="float:right;">
                查询：
                <input type="text" style="margin-right:20px;height:30px;width:180px;"/>
            </div>
        </div>

        <div class="cont-main">
            <el-table :data="tableList" border default-expand-al="true" :height="height" v-scroll="loadMore">
                <el-table-column type="index" min-width="5%"></el-table-column>
                <el-table-column prop="samplecode" label="样本编号" min-width="10%">
                    <template slot-scope="scope">
                        <div style="color:#2D8cF0;cursor:pointer;" @click="routeChange(scope.row)">{{ scope.row.samplecode}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="file" label="文件名称" min-width="15%">
                    <template slot-scope="scope">
                       <tr style="white-space: nowrap; text-align: center;display:block;" v-for="list in scope.row.file" :key="list.id">{{list}}</tr>
                    </template>
                </el-table-column>
                <el-table-column prop="pipeline" label="流程" min-width="8%">
                </el-table-column>
                <el-table-column prop="createtime" label="创建时间" min-width="11%"></el-table-column>
                <el-table-column prop="spendtime" :formatter="foreignFlag" label="结束时间" min-width="10%"></el-table-column>
                <el-table-column prop="status" label="状态" min-width="10%"> 
                     <template slot-scope="scope">
                        <router-link :to="{path:'/admin/process?jobid='+scope.row.jobid+'&pip='+scope.row.pipeline+'&file='+scope.row.file}" class="bian">{{ scope.row.status | foreignFlag}}
                        </router-link>
                        </span>
                    </template>           
                </el-table-column>
                <el-table-column prop="path" label="vcf文件下载" min-width="10%" v-if="productId==1">
                    <template slot-scope="scope">
                        <!--<el-button size="small" v-if="scope.row.status==99">下载</el-button>-->
                        <!--<a :href="'http://42.123.124.204:8081/dchealth-platform/1.0/data/vcfdownload?jobid='+scope.row.jobid" download class="download" v-if="scope.row.status==99">下载</a>-->
                        <a :href="'http://10.131.101.159:8080/dchealth-platform/1.0/data/vcfdownload?jobid='+scope.row.jobid" download class="download" v-if="scope.row.status==99">下载</a>
                        <a class="dis-download" href="javascript:;" download  disabled v-else>下载</a>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width='15%'>
                    <template slot-scope="scope" @click="handlerBtn($event, scope.row)">
                        <Row>
                            <Col span="12" push="2">
                                <el-button size="small" type="primary" name="stop"  @click="handlerBtn('stop', scope.row)">终止</el-button>
                            </Col>
                            <Col span="12" pull="2">
                                <el-button size="small" type="primary" name="remove"  @click="handlerBtn('remove', scope.row)">删除</el-button>
                            </Col>
                        </Row>
                    </template>
                </el-table-column>
                <tr slot="append" style="height:50px;" v-if="more">
                    <td colspan="7" style="text-align:center;" v-loading="loading"></td>
                </tr>
            </el-table>
            <!-- 分页 -->
            <div class="per-page">
                <div style="float:left;">当前显示1-{{pageIndex*pageSize}}条，共{{total}}条
                </div>
            </div>
        </div>
        <!-- 删除模块提示框 -->
        <Modal v-model="removeModel" title="删除提示" width="300" :mask-closable="false">
            <p style="padding:20px;text-align:center;">您确定要删除这条任务吗？</p>
            <div class="fastq-footer">
                <Button size="small" type="primary" @click="saveInfoClick">确定</Button>
            </div>
        </Modal>

        <!-- 终止模块提示框 -->
        <Modal
            v-model="stopModel"
            title="终止提示" width="300" :mask-closable="false">
            <p style="padding:20px;text-align:center;">您确定要终止这条任务吗？</p>
            <div class="fastq-footer">
                <Button size="small" type="primary" @click="saveStopInfo">确定</Button>
            </div>
        </Modal>

        <!-- 新建任务 -->
        <Modal v-model="newModel" width="835px" :mask-closable="false" @on-cancel="closeModel">
            <div class="sample-title">新建任务</div>
            <div class="sample-main">
                <div class="stitle">
                    <span>请选择需要运行的样本批次：</span>
                    <Select style="width:50%;display:inline-block;" v-model="batchId" @on-change="changeSelect">
                        <Option v-for="item in batchlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="sample-inner">
                    <el-table :data="sampleList" @select="handleselect" @select-all="handleselectAll">
                        <el-table-column type="selection" width="55" :selectable="selectable"></el-table-column>
                        <el-table-column label="样本编号" prop="samplecode"></el-table-column>
                        <el-table-column label="流程" prop="region"></el-table-column>
                    </el-table>
                    <div class="per-page" style="margin-top:10px;height:30px;">
                        <div style="float:left;">当前显示{{pageIndex*pageSize-19}}-{{pageIndex*pageSize}}条，共{{jobTotal}}条
                        </div>
                        <div style="float:right;">
                            <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleChangPage"
                            :current-page="pageIndexModel"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="pageSize"
                            layout="sizes, prev, pager, next"
                            :total="jobTotal">
                            </el-pagination> 
                        </div> 
                    </div>
                </div>
                <div class="sample-footer">
                    <Button type="ghost" style="margin-left:205px;" @click="onCanel">取消</Button>
                    <Button type="primary" style="margin-left:0px;" @click="submitFormData">提交</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
// 引入任务管理方法
import {
    task
} from 'api/index.js'
import {getCookie} from '@/common/js/cookie.js'
// 引入公共操作函数
import { editArrayRow, removeArrayRow } from 'common/js/Base.js';
// 组件实例
export default {
    name:"task",
    data() {
        return {
            height:'500',
            more:'',
            routes:'',
            path:'',
            loading:true,
            tableList: [],            // 表格数组
            openEditModel:false,      // 弹层显隐
            formInfo:{},              // 表单数据
            cookies:getCookie('userid'),             // cookies
            nowEditInfo:null,
            removeModel:false,        // 删除弹层
            stopModel: false,         // 终止
            btnType:null,
            pageIndexModel:1,   // 弹层当前页
            pageSize:20,
            pageIndex:1,
            jobTotal:null,      // 新建总数
            total:null,
            count:null,
            newModel:false,    //新建任务弹层
            batchlist:[],      // 样本批次列表
            batchId:'',        // 批次选中项
            sampleList:[],     // 样本列表
            selectList:[],     // 样本选中项
            tabledata:[],
            productId:1,
        }
    },
    directives: {  //监听滚动
        scroll: {
            bind: function (el, binding){
                var ele=el.querySelector('.el-table__body-wrapper');
                ele.addEventListener('scroll', function(){
                    if(this.scrollTop + this.clientHeight >= this.scrollHeight) {
                        let fnc = binding.value; 
                        fnc();
                    }
                })
            }
        }
    },
    watch: {
    },
    filters: {
        // 格式化数据
        foreignFlag(cellValue) {
            if(cellValue=='1'){
                return cellValue = "等待"
            }else if(cellValue=='2' || cellValue=='3') {
                return cellValue = "正在运行"
            }else if(cellValue=='99') {
                return cellValue = "运行完成"
            }else if(cellValue=='98') {
                return cellValue = "运行出错"
            }
        },
    },
    // 实例创建时
    created() {
        this._getTaskList();      
    },
    methods: {
        // tabs切换
        choice(name){
            this.productId=name+1;
            this._getTaskList(); 
        },
        //点击样本编号
        routeChange(row){
            if(row.status==99){
                if(this.productId==1){
                    this.$router.push({path:'/admin/task-details?type=quality&jobid='+row.jobid+'&productId='+this.productId+'&samplecode='+row.samplecode})
                }else if(this.productId==2){
                    this.$router.push({path:'/admin/task-details-tumour?type=quality&jobid='+row.jobid+'&productId='+this.productId+'&samplecode='+row.samplecode})
                }
            }else{
                this.$Message.warning("该样本正在运行")
            }
            
        },
        //加载更多
        loadMore() {  
            if(this.total%20==0){
                if(this.pageIndex<this.total/20){
                    this.pageIndex++;
                    setTimeout(()=>{
                        this._getTaskList(); 
                    },2000);
                }else{
                    this.pageIndex=this.total/20;
                    setTimeout(()=>{
                        this._getTaskList(); 
                    },2000);
                }
        }else{
            if(this.pageIndex<(Math.ceil(this.total/20))){
                this.pageIndex++;
                setTimeout(()=>{
                    this._getTaskList(); 
                },2000);
                }
            }
        },
        //获取样本批次
        _getBatchList(){
            let obj={
                "userid":getCookie("userid"),
                "productId":this.productId
            }
            // 置空批次列表
            this.batchlist = [];
            task.getBatchList(obj).then((data)=> {
                // console.log(data)
                if(data.returnCode==0 || data.returnCode==200){
                    M.each(data.data,(item,index)=>{
                        var result={};
                        if(item){
                            result.value=item;
                            result.label=item;
                            this.batchlist.push(result); 
                        }
                    })
                }else{
                    this.$Message.error(data.msg)
                }
            }).catch((error)=>{
                this.$Message.error(data.msg)
            })
        },
        // 样本批次改变
        changeSelect(val) {
            this.batchId = val;
            // 获得样本列表
            this.getSampleList();
        },
        //根据样本批次，获取样本列表
        getSampleList(pageIndexModel=1){
            this.pageIndexModel = pageIndexModel;
            let obj={
                batchId:this.batchId,
                pageSize:this.pageSize,
                pageIndex:pageIndexModel,
                userid:getCookie('userid'),
                productId:this.productId
            }
            // console.log(obj);
            task.getSampleByBatchId(obj).then((data)=>{
                if(data.returnCode==0 || data.returnCode==200){
                    if(data.data.sampleList.length>0){
                        this.sampleList=data.data.sampleList;
                    }else{
                        this.$Message.error("无数据")
                    } 
                }else{
                    this.$Message.eeror(data.msg)
                }           
                this.jobTotal = data.data.count?data.data.count:0;
            })
        },
        //是否可以勾选
        selectable(row,index){
            if(row.isexecute==='0'){
                return 1;
            }else{
                return 0;
            }
        },
        //选择
        handleselect(val){
            console.log(val);
            M.each(val,(item,index)=>{
                this.selectList.push(item.sampleid);
            })
        },
        // 全选
        handleselectAll(val){
            M.each(val,(item,index)=>{
                this.selectList.push(item.sampleid);
            })
        },
        // 弹层关闭
        closeModel() {
            // 弹层关闭重置批次列表
            this.batchlist = [];
            this.sampleList = [];
            this.jobTotal = 0;
        },
        // 取消
        onCanel() {
            this.newModel = false;
            // 取消-弹层关闭重置批次列表
            this.batchlist = [];
            this.sampleList = [];
            this.jobTotal = 0;
        },
        //提交-成功后提交过得样本不可选
        submitFormData(){
            let obj={
                "sampleIds":this.selectList,
                'userId':getCookie('userid'),
                "productId":this.productId
            }
            console.log(obj);
            task.executeJobBySampleIds(obj).then((data)=>{
                // console.log(data)
                if(data.returnCode==0 || data.returnCode==200){
                    if(data.msg==null){
                        // this.newModel=false;
                        // 提交完成清空数组
                        this.selectList = [];
                        // 提示信息
                        this.$Message.success(data.data);
                        // 重新渲染样本列表
                        // this.getSampleList(this.pageIndex);
                        // 重新渲染列表
                        this._getTaskList();
                    }else{
                        this.$Message.error(data.msg)
                    }
                }else{
                    this.$Message.error(data.msg)
                }
                
            })
        },
        //新建任务
        build(){
            this.newModel=true;
            this._getBatchList();
        },
        // 表格操作按钮
        handlerBtn(type,row) {
            this.nowEditInfo = M.clone(row) || {};
            // 设置当前操作类型
            this.btnType = type;
            if(type=="stop") {
                this.stopModel = true;
            }else if(type=="remove") {
                this.removeModel = true;
            }
        },
        // 删除
        saveInfoClick() {
            let isRemove = this.btnType === 'remove';
            // 需要删除的数据
            let idList = [];
            idList.push(this.nowEditInfo.jobid);
            let obj = {
                userId:this.cookies,
                idList:idList,
                productId:this.productId
            }; 
            // console.log(obj);  
            task.mergeJobById(obj).then((res)=> {
                if(res.returnCode==0 || res.returnCode==200){
                    if(isRemove) {
                        this._getTaskList();
                        this.removeModel = false;
                        this.$Message.success("删除成功！");
                    }
                }else{
                    this.$Message.error(res.msg)
                }
            })
        },
        // 终止
        saveStopInfo() {
            let isStop = this.btnType === 'stop';
            let idList = [];
            idList.push(this.nowEditInfo.jobid);
            let obj = {
                userId:this.cookies,
                idList:idList,
                productId:this.productId
            }; 
            task.mergeStopJob(obj).then((res)=> {
                if(res.returnCode==0 || res.returnCode==200){
                    if(isStop) {
                        this._getTaskList();
                        this.stopModel = false;
                        this.$Message.success("终止任务成功！");
                    }
                }else{
                    this.$Message.error(res.msg)
                }
            })
        },
        // 每页显示条数改变
        handleSizeChange(val){ 
            this.pageSize=val;
            this._getTaskList();
            // 每页显示条数改变
            this.getSampleList();
        },
        // 页码改变
        handleCurrentChange(val){ 
            this.pageIndex=val;
            console.log(this.pageIndex);
            this._getTaskList(val);
        },
        // 弹层页面改变
        handleChangPage(val) {
            this.pageIndexModel = val;
            console.log(this.pageIndexModel);
            // 页码改变后调用方法
            this.getSampleList(val);
        },
        // 获得表格数据
        _getTaskList(pageIndex=1) {
            this.pageIndex = pageIndex;
            let obj = {
                "pageIndex": pageIndex,
                "pageSize": this.pageSize,
                "userId":this.cookies,
                "productId":this.productId
            }
            console.log(obj)
            task.getTaskList(obj).then((res)=> {
                console.log(res);
                if(res.returnCode==0 || res.returnCode==200){
                    if(res.data == "null" || res.data == null) {
                        this.loading=false;
                        this.tableList = [];
                    }else {
                        this.total = res.data.count;
                        if(this.pageIndex==1){
                            this.tabledata=res.data.jobList;
                        }else{
                            this.tabledata=this.tabledata.concat(res.data.jobList)
                        }
                        this.tableList=this.tabledata;
                    }
                }else{
                    this.$Message.error(data.msg)
                }
            }).catch((error)=> {
                this.$Message.success(error.msg);
            })
        },
        //格式化表格数据（结束时间）
        foreignFlag(row,column,cellValue) {
            console.log(typeof(cellValue));
            if(cellValue=='0'){
                return cellValue = "— —"
            }else if(cellValue !='0') {
                return cellValue = cellValue;
            }
        },
    }
}
    
</script>