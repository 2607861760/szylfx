<style lang="scss">
.upload {
    padding: 10px 10px 30px;
    background: #fff;
    border-radius: 3px;
    .ivu-btn {
        background: #767cc3;
        padding: 6px 20px;
        color: #fff;
    }
}

.fun {
    span {
        color: #3c8dbc;
        padding-right: 10px;
        font-size: 12px;
        cursor: pointer;
    }
}
</style>
<template>
<div class="sample-info">
    <Dropdown style="margin-left:20px;">
        <Button type="primary" class="build" @click="found">
            <Icon type="android-add"></Icon>
            添加样本
        </Button>
    </Dropdown>
    <div style="width:100%;padding:15px 20px;box-sizing:border-box;">
        <el-table :data="samplelist" border style="width: 100%;" height="250" v-loading="listload">
            <el-table-column label="样本编号" min-width="10%">
                <template slot-scope="scope">
                    <span style="color:#3c8dbc" @click="clickSample(scope.row)">{{ scope.row.samplecode }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="sampletype" label="样本类型" min-width="10%"></el-table-column>
            <el-table-column prop="region" label="测序区域" min-width="10%"></el-table-column>
            <el-table-column prop="designator" label="亲属关系" min-width="10%"></el-table-column>
            <el-table-column label="状态" min-width="10%">
                <template slot-scope="scope">
                    <div class="handle">
                        <span class="status" v-if="scope.row.isexecute==1">等待</span>
                        <span class="status" v-else-if="scope.row.isexecute==0">未执行</span>
                        <span class="status" v-else-if="scope.row.isexecute==2">正在执行</span>
                        <span class="status" v-else-if="scope.row.isexecute==3">已完成</span>
                        <span class="status" v-else-if="scope.row.isexecute==4">错误</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="20%">
              <template slot-scope="scope">
                  <div class="handle">
                      <span class="bian" @click="run(scope.$index,scope.row)" v-if="scope.row.isexecute==0">运行</span>
                      <span class="bian" @click="delet(scope.$index,scope.row)">删除</span>
                      <span class="bian" @click="edit(scope.$index,scope.row)">编辑</span>
                  </div>
              </template>
            </el-table-column>
        </el-table>
        <div>当前显示1-{{total}}条，共{{total}}条</div>
    </div>
    <!--新建样本/编辑-->
    <Modal width="835px" v-model="sampleModal" :mask-closable="false" @on-cancel="closeModal">
        <div class="sample-title">样本信息</div>
        <div class="sample-main">
            <div class="stitle">
                <Icon type="clipboard" style="font-size:22px;"></Icon>
                <span style="padding-left:5px;">样本信息（*为必填项）</span>
            </div>
            <div class="sample-inner">
                <Form :model="sampleInfo" ref="sampleInfo" label-position="left" :label-width="100" inline :rules="ruleCustom">
                    <Row>
                        <Col class="tables">
                            <FormItem label="样本编号" style="width:30%;" prop="samplecode">
                                <Input v-model="sampleInfo.samplecode"></Input>
                            </FormItem>
                            <FormItem label="样本类型" style="width:30%;">
                                <Select v-model="sampleInfo.sampletype">
                                    <Option v-for="item in sampletype" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col class="tables">
                            <FormItem label="亲属关系" style="width:30%;" prop="designator">
                                <Select v-model="sampleInfo.designator">
                                    <Option v-for="item in designator" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
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
                            <FormItem label="测序区域" style="width:30%;" prop="region">
                                <Select v-model="sampleInfo.region">
                                    <Option v-for="item in region" :value="item.value" :key="item.value" :disabled="item.disabled">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="测序平台" style="width:30%;">
                                <Select v-model="platformId">
                                    <Option v-for="item in platform" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col class="tables">
                            <FormItem label="Enrichment Kit" style="width:30%;">
                                <Select v-model="enrichmentkitId">
                                    <Option v-for="item in enrichmentkit" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="测序类型" style="width:30%;">
                                <Select v-model="sampleInfo.seqtype" >
                                    <Option v-for="item in seqtype" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col class="tables">
                            <FormItem label="备注" style="width:30%;">
                                <Input v-model="sampleInfo.notes"></Input>
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
    <!--文件上传-->
    <Modal width="835px" v-model="upModal" :mask-closable="false">
        <div class="sample-title">文件上传</div>
        <div class="upload">
            <Col span="24" class="demo-tabs-style2">
                <Tabs type="card" @on-click="serverlocal" value="upload">
                    <TabPane label="upload" name="upload">
                        <div>
                            <Upload multiple action="/dchealth-platform/1.0/upload/fileUpload" show-upload-list :data="{'sampleid':this.samid,'userId':userId,'type':'vcf'}" 
                                :on-success="upsuccess" :on-error="uperror"> 
                                <Button type="ghost" style="background:#4578ad;">上传文件</Button>
                            </Upload>
                        </div>
                    </TabPane>
                    <TabPane label="harddisk" name="local">
                        <div style="width:100%;">
                            <tree-grid :columns="columns" v-loading="loading" ref="tree" :tree-structure="true" :data-source="fileCategoryList" :requestUrl="samid">
                            </tree-grid>
                        </div>
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
    <!--样本文件信息-->
    <Modal width="835px" v-model="sampleshow" :mask-closable="false">
        <div class="sample-title">样本文件信息</div>
        <div class="sample-inner">
            <div style="padding:20px 10px;">
                <el-table border aligin="left" :data="sampleDataList">
                    <el-table-column label="文件名称" prop="filename" min-width="30%"></el-table-column>
                    <el-table-column label="文件大小" prop="size" min-width="10%"></el-table-column>
                    <el-table-column label="上传时间" min-width="10%"></el-table-column> 
                </el-table>
            </div>
        </div>
    </Modal>
    <!--删除提示-->
    <Modal v-model="removeModel" title="删除提示" width="300" :mask-closable="false">
        <p style="padding:20px;text-align:center;">您确定要删除这条信息吗？</p>
        <div class="fastq-footer">
            <Button size="small" type="primary" @click="saveInfoClick">确定</Button>
        </div>
    </Modal>
</div>
</template>
<script>
import {data} from 'api/index.js'
import treeGrid from '@/components/treeTable/vue2/TreeGrid'
import {getCookie} from '@/common/js/cookie.js'
export default{
    name: "samplelist",
    data(){
        return {
            userId:getCookie("userid"),
            sampleDataList: [],        // 样本列表弹层
            uploadDisabled:true,
            enrichmentkitId:'',        // ek
            platformId:'',             // 测序平台
            takendate:'',    //取样日期
            receivedate: '',  //收样日期
            seqdate: '',   //测序日期
            listload:true,
            ptid:'',
            total:10,
            loading:true,
            sampleid:"",
            samid:'',
            sampleModal:false,
            change: true,
            url:M.url(),
            sampleshow:false,
            samplelist: [],
            upModal: false,
            upshow:false,
            fastq:false,
            sampleModal: false,
            choice:[],
            choices:[],
            fileCategoryList: [],
            fileServerCategoryList:[],            // 服务上传
            columns: [
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
            sampleInfo: {},
            sampletype: [{
                value: '血样',
                label: '血样'
              }, {
                  value: '肿瘤活检',
                  label: '肿瘤活检'
              }, {
                  value: '口腔',
                  label: '口腔'
            }],
            designator: [{
                  value: '先证者',
                  label: '先证者'
              }, {
                  value: '父亲',
                  label: '父亲'
              }, {
                  value: '母亲',
                  label: '母亲'
              }, {
                  value: '兄弟',
                  label: '兄弟'
              }, {
                  value: '姐妹',
                  label: '姐妹'
              }, {
                  value: '祖父',
                  label: '祖父'
              }, {
                  value: '祖母',
                  label: '祖母'
              }, {
                  value: '外祖父',
                  label: '外祖父'
              }, {
                  value: '外祖母',
                  label: '外祖母'
              }, {
                  value: '舅舅',
                  label: '舅舅'
              }, {
                  value: '姨妈',
                  label: '姨妈'
              }, {
                  value: '叔叔',
                  label: '叔叔'
              }, {
                  value: '姑姑',
                  label: '姑姑'
              }, {
                  value: '同卵双胞胎',
                  label: '同卵双胞胎'
              }, {
                  value: '异卵双胞胎',
                  label: '异卵双胞胎'
              }, {
                  value: '其他',
                  label: '其他'
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
            platform: [],
            pipeline:'',
            enrichmentkit: [],
            seqtype: [{
                value: 'DNA-Seq',
                label: 'DNA-Seq'
              }, {
                value: 'RNA-Seq',
                label: 'RNA-Seq'
            }],
            ruleCustom: {
              samplecode: [
                  { required: true, message: '样本编号不能为空', trigger: 'blur' }
              ],
              designator: [
                  { required: true, message: '亲属关系不能为空', trigger: 'blur' }
              ],
              region:[
                  {required: true, message: '测序区域不能为空', trigger: 'blur' }
              ]
            },
            idList:[],
            removeModel:false,
        }
    },
    methods: {
        //关闭新建样本模态框
        closeModal(){
            //重置表单
            // this.$refs["sampleInfo"].resetFields();
            this.takendate="";
            this.receivedate="";
            this.seqdate="";
            this.platformId="";
            this.enrichmentkitId="";
        },
        // 上传成功
        upsuccess(response, file, fileList) {
            if(response.returnCode==0){
                this.$Message.success(response.msg)
            }else if(response.returnCode==217){
                this.$Message.error(response.msg)
            }
        },
        // 上传失败
        uperror(error, file, fileList) {
            this.$Message.error(error.msg)
        },
        handleChecked(value){
            this.choice=value;
        },
        saveInfoClick(){  //删除确定
            let obj={
                "idList":this.idList,
                "userId":getCookie('userid'),
                "productId":"1"
            }
            data.deleteSampleById(obj).then((data)=>{
                this.$Message.success(data.data);
                this.removeModel=false;
                this.getList();
            })
        },
        delet(index,row){  //删除样本 
            this.idList=[];
            this.idList.push(row.sampleid);
            this.removeModel=true;
            console.log(this.idList)
        },
        run(index,row){  //点击运行
            // this.fastq=true;
            this.samid=row.sampleid;
            this.pipeline=row.region;
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
            let obj={
                "sampleId":this.samid,
                "userId":getCookie("userid"),
                "productId":"1",
                "pipeline": this.pipeline,
                "templateId": "0",
                "fileGroupId":"aa",
            }
            console.log(obj)
            data.executeSample(obj).then((data)=>{
                if(data.returnCode==200){
                    this.$Message.success("添加成功")
                }else if(data.returnCode !=200){
                    this.$Message.error(data.msg)
                }
            }) 
        },
        pull(){ //获取下拉列表
            let obj={
                "userId":getCookie("userid"),
                "productId":"1"
            }
            data.getTGexPara(obj).then((data)=>{
                if(data.returnCode==0 || data.returnCode==200){
                    let eklen=data.data.enrichmentkit.length;
                    M.each(data.data.enrichmentkit,(item,index)=>{
                        var result={};
                        result.value=item;
                        result.label=item;
                        this.enrichmentkit.push(result)
                    })
                    M.each(data.data.platform,(item,index)=>{
                        var result={};
                        result.value=item;
                        result.label=item;
                        this.platform.push(result)
                    }) 
                }
            })
        },
        found(){ //点击新建样本
            this.upshow = false;
            this.sampleModal=true;
            this.sampleInfo={};
            this.pull();
        },
        //点击样本编号
        clickSample(row){  
            // console.log(row);
            this.sampleshow=true; 
            // 调用方法
            this.getSampleList(row);
        },
        // 根据sampleId 获得对应数据
        getSampleList(row) {
            let obj = {
                userId: getCookie("userid"),
                sampleid:row.sampleid,
                productId: '1'
            }
            console.log(obj);
            data.getFileList(obj).then((res)=> {
                console.log(res);
                this.sampleDataList = res.data;
            })
        },
        keep(name){  //点击保存
            let obj={
                userId:getCookie("userid"),
                patientid:this.ptid,
                productId:"1",
                enrichmentkit:this.enrichmentkitId,
                platform:this.platformId,
                takendate:String(this.takendate),
                receivedate:String(this.receivedate),
                seqdate:String(this.seqdate)
            }
            M.extend(this.sampleInfo,obj)
            this.$refs[name].validate((valid) => {
                if(valid){
                    if(M.has(this.sampleInfo,'sampleid')==true){
                        data.updateSample(this.sampleInfo).then((data)=>{
                            if(data.data=="null"||data.data==null){
                                this.$Message.error("参数错误！");
                            }else{
                                this.$Message.success("样本修改成功！");
                              // this.sampleModal=false;
                                this.uploadDisabled = false;
                                this.getList();
                            }
                            
                        })
                    }else{
                        data.addSample(this.sampleInfo).then((data)=>{                 
                            if(data.data=="null"||data.data==null){
                                this.$Message.error("参数错误！");
                            }else{
                                this.$Message.success("样本添加成功！");
                                this.uploadDisabled = false;
                                this.getList();
                                this.samid=data.data.sampleid;
                            }
                        })
                    }           
                }
            })
        },
        edit(index,row){  //点击编辑
            // console.log(row);
            this.pull();
            // this.sampleid=row.sampleid;
            this.samid=row.sampleid;
            this.enrichmentkitId= row.enrichmentkit,       
            this.platformId= row.platform;
            this.sampleModal = true;
            this.upshow = true;
            this.sampleInfo=row;
            this.takendate=row.takendate;
            this.receivedate=row.receivedate;
            this.seqdate=row.seqdate;
            // console.log(this.sampleInfo)
        },
        // tabs切换事件
        serverlocal(name){  //serverlocal
            if(name=='local') {
                this._getLocalDataList();
            }else if(name=='server') {
                this._getServerDataList();
            }
        },
        //上传点击
        uploadSample(){  
            this.sampleModal = false;
            this.upModal = true;
            this.loading=true;
        },
        // 获得服务
        _getServerDataList() {
            let obj={
                "path":"/storage/serverData/",
                // "path":"/opt/NfsDir/PublicDir/demo/",
                            // /opt/NfsDir/PublicDir/demo/  电信云
                            // /storage/serverData/   159
                "userId":getCookie("userid"),
                "productId":"1"
            }
            data.getForldList(obj).then((data)=>{
                if(M.isArray(data.data)) {
                    this.fileServerCategoryList=data.data;
                }else {
                    this.$Message.error(data.data)
                } 
            })
        },
        // 获得本地
        _getLocalDataList(){
            let obj={
                "path":"/storage/serverData/",
                // "path":"/opt/NfsDir/PublicDir/demo/",
                            // /opt/NfsDir/PublicDir/demo/  电信云
                            // /storage/serverData/   159
                "userId":getCookie("userid"),
                "productId":"1"
            }
            data.getForldList(obj).then((data)=>{
                // console.log(data)
                if(M.isArray(data.data)) {
                    this.fileCategoryList=data.data;
                    this.loading=false;
                }else {
                    this.$Message.error(data.data)
                } 
            })
        },
        getList(){   //获取样本列表
            this.enrichmentkit=[]
            this.platform=[]
            this.listload=true;
            this.ptid=this.url.paid;
            this.samplelist=[]
            let obj={
                "patientid":this.ptid,
                "userId":getCookie("userid"),
                "productId":"1"
            }
            data.getSampleList(obj).then((data)=>{
                console.log(data)
                if(data.data=="null"||data.data==null){
                    this.listload=false;
                }else{
                    this.samplelist=data.data;
                    this.total=this.samplelist.length;
                    console.log(this.samplelist);
                    this.listload=false;
                }
            })
        }
    },
    mounted(){
      this.getList();
    },
    components:{
        treeGrid,
        // creatsample
    }
}
</script>