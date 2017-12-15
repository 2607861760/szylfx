<script lang="scss" scoped>
    tb{
        height:35px;ling-height:35px;
    }
    
    .upload{
        padding:10px 10px 30px;
        background:#fff;
    }
    
</script>
<template>
    <div>
        <!--<div class="cont-head">
            <div class="head">
                <Row>
                    <Col span="24"><span>当前位置：</span>癌症/我的数据</Col>
                </Row>
            </div>
        </div>-->
        <div>
            <Col span="24" class="demo-tabs-style2" v-if="datashow" style="background:#fff;">
                <Tabs type="card">
                    <TabPane label="我的数据"></TabPane>
                    <!--<TabPane label="公共数据"></TabPane>-->
                </Tabs>
                <div class="mydata">
                    <Dropdown style="margin-left:20px;position:relative;">
                        <Button type="primary" class="build">
                            <Icon type="android-add"></Icon>
                            新建数据
                        </Button>
                        <div class="data">
                            <div @click="single">单个数据</div>
                            <div @click="files">批量数据</div>
                        </div>
                    </Dropdown>
        
                    <div style="float:right;">
                        查询：
                        <input type="text" style="margin-right:20px;height:30px;width:180px;"/>
                    </div>
        
                    <div style="width:100%;padding:15px 20px;box-sizing:border-box;">
                        <el-table :data="tableData3" border style="width: 100%;" :height="height" v-scroll="loadMore" v-loading="loadone">
                            <el-table-column label="病人编号">
                                <template slot-scope="scope">
                                    <router-link :to="{path:'/admin/tumour/edit?patientcode='+scope.row.dchPatient.patientcode+'&paid='+scope.row.dchPatient.patientid}" class="bian">{{ scope.row.dchPatient.patientcode }}
                                    </router-link>
                                </template>
                            </el-table-column>
                            <el-table-column label="姓名">
                                <template slot-scope="scope">{{scope.row.dchPatient.patientname}}
                                </template>
                            </el-table-column>
                            <el-table-column label="样本类型" prop="sample" >
                                <template slot-scope="scope">
                                    <div v-for="list in scope.row.dchSampleList" :key="list.id" class="handle" style="height:40px;">{{list.sampletype}}</div>
                                </template>
                            </el-table-column>          
                            <el-table-column label="样本编号">
                                <template slot-scope="scope">
                                    <div @click="addsample(scope.row)"style="font-size:12px;text-decoration:underline;color:#3c8dbc;cursor:pointer;" v-if="scope.row.dchSampleList.length==0">添加</div>
                                    <div class="bian"v-for="(list,index) in scope.row.dchSampleList" style="cursor:pointer;height:40px;"  :key="list.id" @click="samcode(index,scope.row)">{{ list.samplecode }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="状态">
                                <template slot-scope="scope">
                                    <div v-for="(list,index) in scope.row.dchSampleList" class="handle" style="height:40px;">
                                        <span class="status" v-if="list.isexecute=='1'">等待</span>
                                        <span class="status" v-else-if="list.isexecute=='0'">未执行</span>
                                        <span class="status" v-else-if="list.isexecute=='2'">正在执行</span>
                                        <span class="status" v-else-if="list.isexecute=='3'">已完成</span>
                                        <span class="status" v-else-if="list.isexecute=='4'">错误</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" min-width="100%">
                                <template slot-scope="scope">
                                    <div v-for="(list,index) in scope.row.dchSampleList" class="handle">
                                        <span class="bian" @click="run(index,scope.row)" v-if="list.isexecute==='0'">运行</span>
                                        <span class="bian" @click="delet(index,scope.row)">删除</span>
                                        <span class="bian" @click="edit(index,scope.row)">编辑</span>
                                        </div>
                                    </template>
                            </el-table-column>
                            <el-table-column label="解读">
                                <template slot-scope="scope">
                                    <div v-for="(list,index) in scope.row.dchSampleList" class="handle" style="height:40px;">
                                        <router-link :to="{path:'/admin/tumour/cgdap?samid='+list.sampleid}">C GDAP</router-link>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="报告下载">
                                <template slot-scope="scope">
                                    <div v-for="(list,index) in scope.row.dchSampleList" class="handle" style="height:40px;">
                                        <a class="download" :href="'http://42.123.124.204:8081/dchealth-platform/1.0/data/ftpupdate?jobid='+list.jobid" download v-if="list.jobtype=='Y'">下载</a>
                                        <!--<a class="download" :href="'http://10.131.101.159:8080/dchealth-platform/1.0/data/ftpupdate?jobid='+list.jobid" download  v-if="list.jobtype=='Y'">下载</a>-->
                                        <a class="dis-download" href="javascript:;" download  disabled v-else>下载</a>
                                        
                                    </div>
                                </template>
                            </el-table-column>
                            <tr slot="append" style="height:50px;" v-if="more">
                                <td colspan="7" style="text-align:center;" v-loading="loading"></td>
                            </tr>
                        </el-table>
                        <div style="padding:40px 0px;">
                            <div>当前显示1-{{pageIndex*pagesize}}条，共{{total}}条</div>
                        </div>
                    </div>
                </div>
            </Col>
            <router-view v-else></router-view>
        </div>
        
<!--新建样本/编辑样本-->
            <Modal width="835px" v-model="sampleEdit" :mask-closable="false" >
                <div class="sample-title">样本信息</div>
                    <div class="sample-main">
                        <div class="stitle">
                            <Icon type="clipboard" style="font-size:22px;"></Icon>
                            <span style="padding-left:5px;">样本信息（*为必填项）</span>
                        </div>
                        <div class="sample-inner">
                            <Form :model="sampleInfo" ref="sampleInfo" :rules="ruleCustom" label-position="left" :label-width="110" inline>
                                <Row>
                                    <Col class="tables">
                                        <FormItem label="样本编号" style="width:30%;" prop="samplecode">
                                            <Input v-model="sampleInfo.samplecode"></Input>
                                        </FormItem>
                                        <FormItem label="取样日期" style="width:30%;">
                                            <DatePicker type="date" v-model="takendate"></DatePicker>
                                        </FormItem>
                                    </Col>
                                    <Col class="tables">
                                        <FormItem label="收样日期" style="width:30%;">
                                            <DatePicker type="date" v-model="receivedate"></DatePicker>
                                        </FormItem>
                                        <FormItem label="测序日期" style="width:30%;">
                                            <DatePicker type="date" v-model="seqdate"></DatePicker>
                                        </FormItem>
                                    </Col>
                                    <Col class="tables">
                                        <FormItem label="样本来源" style="width:30%;" prop="sampletype">
                                            <Select v-model="sampleInfo.sampletype">
                                              <Option v-for="item in sampletype" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem label="样本类型" style="width:30%;" prop="samplesource">
                                            <Select v-model="sampleInfo.samplesource">
                                              <Option v-for="item in samplesource" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col class="tables">
                                        <FormItem label="测序平台" style="width:30%;">
                                            <Select v-model="sampleInfo.platform">
                                                <Option v-for="item in platform" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem label="测序区域" style="width:30%;" prop="region">
                                            <Select v-model="sampleInfo.region">
                                                <Option v-for="item in region" :value="item.value" :key="item.value" :disabled="item.disabled">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col class="tables">
                                        <FormItem label="测序类型" style="width:30%;">
                                            <Select v-model="sampleInfo.seqtype">
                                                <Option v-for="item in seqtype" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem label="变异类型检测" style="width:30%;" prop="seqtarget">
                                            <Select v-model="sampleInfo.seqtarget">
                                                <Option v-for="item in seqtarget" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                              </Row>
                          </Form>
                      </div>
                  </div>
                  <div class="sample-footer">
                      <Row :gutter="16">
                          <Col span="8" pull="7">
                              <div class="add-save">
                                  <Button type="primary" @click="keep('sampleInfo')">保存</Button> 
                              </div>
                          </Col>
                          <Col span="8" pull="1">
                              <div class="add-upload">
                                  <Button type="primary" @click="uploadSample" :disabled="uploadDisabled">上传</Button> 
                              </div>
                          </Col>
                     </Row> 
                  </div>
              </Modal>

<!--样本文件信息-->
            <Modal width="835px" v-model="sampleshow" :mask-closable="false">
                <div class="sample-title">测序文件</div>
                <div class="sample-inner">
                    <div style="padding:20px 10px;">
                        <el-table border aligin="left" :data="samplefile">
                            <el-table-column label="文件名称" min-width="30%" prop="filename"></el-table-column>
                            <el-table-column label="文件大小" min-width="10%" prop="size"></el-table-column>
                            <el-table-column label="上传时间" min-width="10%" prop="uploaddate"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </Modal>

<!--文件上传-->
            <Modal width="835px" v-model="upModal" :mask-closable="false">
                <div class="sample-title">文件上传</div>
                <div class="upload">
                    <Col span="24" class="demo-tabs-style2">
                        <Tabs type="card"  @on-click="serverlocal" value="upload">
                            <TabPane label="upload" name="upload">
                                <div>
                                    <Upload ref="upload" multiple action="/dchealth-platform/1.0/upload/fileUpload" show-upload-list :data="{'sampleid':this.samid,'userId':this.userId,'type':'vcf'}" 
                                    :on-success="upsuccess" :on-error="uperror" @clearFiles="clearFiles"> 
                                        <Button type="ghost" style="background:#4578ad;">上传文件</Button>
                                    </Upload>
                                </div>
                            </TabPane>
                            <TabPane label="harddisk" name="local">
                                <tree-grid :columns="columns"  ref="tree" :tree-structure="true" :data-source="fileCategoryList" :requestUrl="samid">
                                </tree-grid>
                            </TabPane>

                            <!-- 服务器上传tab -->
                            <TabPane label="server" name="server">
                                <div class="fun"></div>
                                <tree-grid :columns="columns"  ref="tree" :tree-structure="true" :data-source="fileServerCategoryList" :requestUrl="samid">
                                </tree-grid>
                            </TabPane>
                            <!-- 服务器上传tab结束 -->
                        </Tabs>
                    </Col>
                </div>
            </Modal>

<!--删除确定-->
            <Modal v-model="removeModel" title="删除提示" width="300" :mask-closable="false">
                <p style="padding:20px;text-align:center;">您确定要删除这条任务吗？</p>
                <div class="fastq-footer">
                    <Button size="small" type="primary" @click="saveInfoClick">确定</Button>
                </div>
            </Modal>
       
        
    </div>
</template>
<script>
import {data} from 'api/index.js'
import {getCookie} from '@/common/js/cookie.js'
import treeGrid from '@/components/treeTable/vue2/TreeGrid'
  export default{
    name: "mydata",
    data(){
      return {
        more:false,
        height:'500',
        takendate:'',
        receivedate:'',
        seqdate:'',
        loadone:'',
        uploadDisabled: true,
        removeModel:false,//删除确定
        fastq:false,   //点击运行 fastq弹窗
        loading:true,  //加载loading
        sampleshow:false,   //点击样本编号 弹窗
        pagesize:20,  //页数
        total:100,  //总条数
        pageIndex:1,  //页码
        patid:'',  //存储patientid
        samid:'',  //存储sampleid
        datashow: true,  //显示我的数据部分
        sampleEdit: false,  //点击编辑 弹窗
        upModal: false,   //点击上传 弹窗
        value: '',
        sampleInfo: {},  //样本信息弹窗信息
        samplefile:[],  //样本文件信息弹窗信息
        fastlist:[],
        fileCategoryList: [],                // 本地
        fileServerCategoryList: [],          // 服务
        choice:[], //fastq文件数据
        choices:[],  //fastq文件数据
        pipeline:'',  
        ruleCustom: {
          samplecode: [
              {required: true, message: '样本编号不能为空', trigger: 'blur' }
          ],
          sampletype: [
              { required: true, message: '样本来源不能为空', trigger: 'blur' }
          ],
          samplesource: [
              { required: true, message: '样本类型不能为空', trigger: 'blur' }
          ],
          region:[
              {required: true, message: '测序区域不能为空', trigger: 'blur' }
          ],
          seqtarget:[
              { required: true, message: '变异类型检测不能为空', trigger: 'blur' }
          ]
        },
        columns: [  //树形图label
                {
                    text: '文件名称',
                    dataIndex: 'filename',
                    width:'40%'
                },
                {
                    text: '文件大小',
                    dataIndex: 'size',
                    width:'10'
                },
                {
                    text: '传输时间',
                    dataIndex: 'transition',
                    width:'10'
                }
            ],
        samplesource: [{
            value: '对照样本',
            label: '对照样本'
          }, {
            value: '肿瘤样本',
            label: '肿瘤样本'
        }],
        sampletype: [{
            value: '石蜡切片',
            label: '石蜡切片'
          }, {
            value: '手术/穿刺组织',
            label: '手术/穿刺组织'
          }, {
            value: '胸水',
            label: '胸水'
          }, {
            value: '腹水',
            label: '腹水'
          }, {
            value: '静脉血',
            label: '静脉血'
          }, {
            value: '淋巴',
            label: '淋巴'
          }, {
            value: '冰冻组织',
            label: '冰冻组织'
          }, {
            value: '全血',
            label: '全血'
          }, {
            value: '口腔拭子',
            label: '口腔拭子'
          }, {
            value: '唾液',
            label: '唾液'
        }],
        region: [{
            value: 'WES',
            label: 'WES',
            disabled:false
            }, {
            value: 'WGS',
            label: 'WGS',
            disabled:true
            }, {
            value: 'Panel',
            label: 'Panel',
            disabled:true
        }],
        platform: [{
            value: 'Illumina',
            label: 'Illumina'
          }, {
            value: 'Ion Torrent',
            label: 'Ion Torrent'
          }],
        seqtarget: [{
            value: '点突变+插入缺失',
            label: '点突变+插入缺失'
            }, {
            value: '基因融合',
            label: '基因融合'
        }],
        userId:'',
        seqtype: [{
            value: 'DNA',
            label: 'DNA'
          }, {
            value: 'RNA',
            label: 'RNA'
          }],
          options: [{
            value: "5",
            label: "5"
          }, {
            value: "10",
            label: "10"
          }, {
            value: "15",
            label: "15"
        }],
        tableData3: [],
        tabledata:[]
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
    methods: {
        clearFiles(){
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        upsuccess(response, file, fileList){  //本地上传成功
            if(response.returnCode==0){
                this.$Message.success(response.msg)
            }else if(response.returnCode==217){
                this.$Message.error(response.msg)
            }
            this.$refs.upload.clearFiles();
        },
        uperror(error, file, fileList){  //本地上传失败
            console.log(error);
            this.$Message.error(error.msg)
        },
        saveInfoClick(){  //删除确定
            let obj={
                "idList":this.idList,
                "userId":getCookie('userid'),
                "productId":"2"
            }
            data.deleteSampleById(obj).then((data)=>{
                if(data.returnCode==0 || data.returnCode==200){
                    this.$Message.success(data.data);
                    this.removeModel=false;
                    this.load();
                }else{
                    this.$Message.error(data.msg);
                    this.removeModel=false;
                    this.load();
                }
            })
        },
        // 上传
        uploadSample(){
            this.sampleEdit = false;
            this.upModal = true;
        },
        loadMore() {  //加载更多
            if(this.total%20==0){
                if(this.pageIndex<this.total/20){
                    this.pageIndex++;
                    setTimeout(()=>{
                        this.load();
                    },2000);
                }else{
                    this.pageIndex=this.total/20;
                    setTimeout(()=>{
                        this.load();
                    },2000);
                }
        }else{
            if(this.pageIndex<(Math.ceil(this.total/20))){
                this.pageIndex++;
                setTimeout(()=>{
                    this.load();
                },2000);
                }
            }
        },
        keep(name){  //点击保存
            let obj={
                userId:getCookie("userid"),
                patientid:this.patid,
                productId:"2",
                sampleid:this.samid,
                takendate:String(this.takendate),
                receivedate:String(this.receivedate),
                seqdate:String(this.seqdate),
            }
            M.extend(this.sampleInfo,obj)
            this.$refs[name].validate((valid) => {
                if(valid){
                    if(this.sampleInfo.sampleid!=''){
                        data.updateSample(this.sampleInfo).then((data)=>{
                            if(data.returnCode==0 || data.returnCode==200){
                                if(data.data=="null"||data.data==null){
                                    this.$Message.error("参数错误！");
                                }else{
                                    this.$Message.success("样本修改成功！");
                                    this.load();
                                    this.uploadDisabled = false;
                                }
                            }else{
                                this.$Message.error(data.msg);
                            }
                            
                        })
                }else{
                    data.addSample(this.sampleInfo).then((data)=>{
                        if(data.returnCode==0 || data.returnCode==200){
                            if(data.data=="null"||data.data==null){
                                this.$Message.error("参数错误！");
                            }else{
                                this.$Message.success("样本添加成功！");
                                this.load();
                                this.uploadDisabled = false;
                                this.samid=data.data.sampleid;
                            }
                        }else{
                            this.$Message.eeror(data.msg)
                        }
                    })
                }
            }
            })
        },
        // tabs切换事件
        serverlocal(name){  //serverlocal
            if(name=='local') {
                this._getLocalDataList();
            }else if(name=='server') {
                this._getServerDataList();
            }
        },
        // 获得本地/storage/serverData/
        _getLocalDataList() {
            let obj={
                "path":"/storage/serverData/",
                // "path":"/opt/NfsDir/PublicDir/demo/",
                        // /opt/NfsDir/PublicDir/demo/  电信云
                        // /storage/serverData/   159
                "userId":getCookie("userid"),
                "productId":"2"
            }
            data.getForldList(obj).then((data)=>{
                if(data.returnCode==0 || data.returnCode==200){
                    if(M.isArray(data.data)) {
                        this.fileCategoryList=data.data;
                    }else {
                        this.$Message.error(data.data)
                    } 
                }else{
                    this.$Message.error(data.msg)
                }
            })
        },
        // 获得服务列表 /opt/NfsDir/PublicDir/demo/
        // /storage/serverData/
        _getServerDataList() {
            let obj={
                "path":"/storage/serverData/",
                // "path":"/opt/NfsDir/PublicDir/demo/",
                        // /opt/NfsDir/PublicDir/demo/  电信云
                        // /storage/serverData/   159
                "userId":getCookie("userid"),
                "productId":"2"
            }
            data.getForldList(obj).then((data)=>{
                    // console.log(data)
                if(data.returnCode==0 || data.returnCode==200){
                    if(M.isArray(data.data)) {
                        this.fileServerCategoryList=data.data;
                    }else {
                        this.$Message.error(data.data)
                    } 
                }else{
                    this.$Message.error(data.msg)
                }
            })
        },
        addsample(row){//点击添加
            console.log(row)
            this.patid=row.dchPatient.patientid;
            this.sampleEdit=true;
            this.samid='';
            this.uploadDisabled = true;
            this.sampleInfo={};
        },
        delet(index,row){  //删除样本
            this.removeModel=true;
            this.idList=[];
            if(row.dchSampleList.length==1){
                index=0;
            }
            this.idList.push(row.dchSampleList[index].sampleid)
        },
        samcode(index,row){ //点击样本编号
            this.sampleshow=true;
            let obj={
                "userId":getCookie("userid"),
                "sampleid":row.dchSampleList[index].sampleid,
                "productId":"2"
            }
            console.log(obj)
            data.getFileList(obj).then((data)=>{
                if(data.returnCode || data.returnCode==200){
                    if(data.data==null||data.data=="null"){
                        this.$Message.error(data.msg);
                    }else{
                        this.samplefile=data.data;
                    }
                }else{
                    this.$Message.error(data.msg)
                }
            })
            // }
            
        },
        handleSizeChange(val){
            this.pagesize=val;
            this.load();
        },
        handleCurrentChange(val){
            this.pageIndex=val;
            this.load();
        },
        files(){
            this.$router.push('/admin/fileup?productId=2')
        },
        single(){
            this.datashow = false;
            this.$router.push('/admin/tumour/info');
        },
        run(index,row){  //点击运行
            this.samid=row.dchSampleList[index].sampleid;
            this.pipeline=row.dchSampleList[index].region;
            this.pipeline=this.pipeline.toUpperCase();
            if(this.pipeline=="WES"){
                this.pipeline='1'
            }else if(this.pipeline=="WGS"){
                this.pipeline='2'
            }else if(this.pipeline=="PANEL"){
                this.pipeline='3'
            }else if(this.pipeline=="NONE"){
                this.pipeline='0'
            }
            let obj={//只能是wes 其他的禁用   不会 iview的下拉框可以这么干？

                "sampleId":this.samid,
                "userId":getCookie("userid"),
                "productId":"2",
                "pipeline": this.pipeline,
                "templateId": "0",
                "fileGroupId":"aa",
            }
            data.executeSample(obj).then((data)=>{
                console.log(data)
                if(data.returnCode==200 || data.returnCode==0){
                    // 再次获取列表
                    this.load();
                    this.$Message.success("添加成功")
                }else{
                    this.$Message.error(data.msg)
                }
            }) 
        },
        
        load(){
            let obj={
                "pageSize" : this.pagesize,
                "pageIndex" : this.pageIndex,
                "productId" : "2",
                "userId":getCookie("userid")
            }
            this.loading=true;
            if(this.pageIndex==1){
                this.tableData3.length=0;
                this.loadone=true;
            }
            data.getProjectList(obj).then((data)=>{
                this.loadone=false;
                if(data.returnCode==0 || data.returnCode==200){
                    if(data.data!=null){
                        this.total=data.data.count;
                        if(this.pageIndex==1){
                            this.tabledata=data.data.projectList
                        }else{
                            this.tabledata=this.tabledata.concat(data.data.projectList)
                        }
                        this.tableData3=this.tabledata;
                    }
                }
                this.more=true;
                if(this.total<=20){
                    this.more=false;
                }
                if(this.pageIndex==this.total/20 || this.pageIndex==(Math.ceil(this.total/20))){
                    this.more=false;
                }
            }).catch((error)=>{
                this.$Message.error(error.statusText);
                this.loading=false;
            })
            
        },
        edit(index,row){ //点击编辑
            this.uploadDisabled = false;
            this.sampleEdit = true;
            this.upModal = false;
            this.patid=row.dchPatient.patientid;
            this.samid=row.dchSampleList[index].sampleid;
            this.sampleInfo=row.dchSampleList[index];
            this.seqdate=row.dchSampleList[index].seqdate;
            this.takendate=row.dchSampleList[index].takendate;
            this.receivedate=row.dchSampleList[index].receivedate;
            console.log(JSON.stringify(this.sampleInfo))
            },
        },
        components: {treeGrid},
        mounted(){
            this.load();
        },

  }





</script>
