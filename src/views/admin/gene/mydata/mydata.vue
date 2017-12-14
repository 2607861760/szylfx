<style lang="scss" scoped>
    .demo-tabs-style2{
        background-color: #fff;
    }
    .mydata {
        overflow-x: hidden;
    }
    .mydata-nav .mydata-cont{
        padding-top:20px;
    }
    .mydata-content {
        margin:20px;
    }
    .select-na {
        padding-top: 5px;
        padding-right: 10px;
        float:left;
    }
    .slot-footer {
        padding:10px;
    }
    .batch-btn {
        padding:6px 40px;
    }
    .pri-left-btn {
        margin-left: -30px;
    }
    .pri-right-btn {
        margin-left: 20px;
    }
</style>
<template>
    <div class="mydata">
        <!-- 增加/搜索/批次-->
        <div class="mydata-nav">
            <div class="mydata-cont">
                <Row>
                    <Col span="6">
                        <div class="mydata-add">
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
                        </div>
                    </Col>
                    <Col span="6" pull="3">
                        <div class="search-inp">查询：
                            <input type="text" style="margin-right:20px;height:30px;width:180px;"/>
                        </div>
                    </Col>
                    <Col span="6" push="5">
                        <div class="select-na">批次筛选:</div>
                        <Select style="float:left;width:120px;" v-model="selectPcId" @on-change="SelectChangeData">
                            <Option value="All">全部</Option>
                            <Option value="0">无批次</Option>
                            <Option v-for="(item, index) in piciList" :value="item.value" :label="item.label" :key="index">{{item.label}}</Option>
                        </Select>
                    </Col>
                    <Col span="6" push="4">
                        <Button type="primary" class="build" @click="clickSoltData">
                            分配数据
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
        
        <!-- 内容区域 -->
        <div class="mydata-content"> 
            <el-table :data="tableData3" border style="width: 100%;" :height="height" v-scroll="loadMore" @selection-change="handleSelectionChange">
                <el-table-column type="selection"width="55" v-if="showSelection" :disabled="disTableSelect">
                </el-table-column>
                <el-table-column label="病人编号">
                    <template slot-scope="scope">
                        <router-link :to="{path:'/admin/gene/edit?patientcode='+scope.row.dchPatient.patientcode+'&paid='+scope.row.dchPatient.patientid}" class="bian">
                        {{ scope.row.dchPatient.patientcode }}
                        </router-link> 
                    </template>
                </el-table-column>
                <el-table-column label="样本批次">
                    <template slot-scope="scope">
                        <div v-for="list in scope.row.dchSampleList" :key="list.sampleid" style="height:35px;line-height:35px;">{{list.samplebatch | foreignFlag}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="样本编号">
                    <template slot-scope="scope">
                        <div @click="addsample(scope.row)"style="font-size:12px;text-decoration:underline;color:#3c8dbc;cursor:pointer;" v-if="scope.row.dchSampleList.length==0">添加</div>
                        <div class="bian" style="cursor:pointer;" v-for="(list,index) in scope.row.dchSampleList"  :key="list.sampleid" @click="samcode(index,scope.row)">{{ list.samplecode }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="亲属关系"  prop="sample">
                    <template slot-scope="scope">
                        <div v-for="list in scope.row.dchSampleList" :key="list.sampleid" style="height:40px;line-height:40px;">{{list.designator}}</div>
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
                <el-table-column label="操作" min-width="150%">
                    <template slot-scope="scope">
                        <div v-for="(list,index) in scope.row.dchSampleList" class="handle">
                            <span class="bian" @click="run(index,scope.row)" v-if="list.isexecute==='0'">运行</span>
                            <span class="bian" @click="delet(index,scope.row)">删除</span>
                            <span class="bian" @click="edit(index,scope.row)">编辑</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="解读">
                <!-- 复旦儿科医院解读路径：http://dch-tgex.shmu.edu.cn/ -->
                <!-- 电信云/本地 解读路径：http://tgex-dev.dchgenecloud.com:88/ -->
                    <template slot-scope="scope">
                        <!--<a :href="'http://tgex-dev.dchgenecloud.com:88/?subject='+scope.row.dchPatient.patientcode" target="_blank">GDAP</a>-->
                        <a @click="jumpTgexPage(scope.row)"   target="_blank">GDAP</a>
                    </template>
                </el-table-column>
                <tr slot="append" style="height:50px;" v-if="more">
                    <td colspan="7" style="text-align:center;" v-loading="loading"></td>
                </tr>
            </el-table>
            <div style="padding:40px 0px;">
                <Row>
                    <Col span="12">
                        <div style="float:left;">当前显示1-{{pageIndex*pageSize}}条，共{{total}}条</div>
                    </Col>
                    <Col :lg="{span:12,push:7}" v-if="batchShowBtn">
                        <Button type="default" class="batch-btn pri-left-btn" @click="batchClickBtn">
                            返回
                        </Button>
                        <Button type="primary" class="batch-btn pri-right-btn" @click="bactnSubmmitBtn" :disabled="disShowNo">
                            分配
                        </Button>
                    </Col>
                </Row>
            </div>


        <!--样本信息-->
        <Modal width="835px" v-model="sampleEdit" :mask-closable="false" @on-cancel="clickCancel">
            <div class="sample-title">样本信息</div>
            <div class="sample-main">
                <div class="stitle">
                    <Icon type="clipboard" style="font-size:22px;"></Icon>
                    <span style="padding-left:5px;">样本信息（*为必填项）</span>
                </div>
                <div class="sample-inner">
                    <Form :model="sampleInfo" label-position="left" :label-width="100" inline ref="sampleInfo" :rules="ruleCustom">
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
                                    <DatePicker type="date" v-model="takendate" ></DatePicker>
                                </FormItem>
                            </Col>
                            <Col class="tables">
                                <FormItem label="收样日期" style="width:30%;">
                                    <DatePicker type="date" v-model="receivedate" ></DatePicker>
                                </FormItem>
                                <FormItem label="测序日期" style="width:30%;">
                                    <DatePicker type="date" v-model="seqdate" ></DatePicker>
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
                                    <Select v-model="sampleInfo.seqtype">
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
                            <Button type="primary" @click="uploadSample"  :disabled="uploadDisabled">上传</Button> 
                        </div>
                    </Col>
                </Row> 
            </div>
        </Modal>
        <!--样本文件信息-->
        <Modal width="835px" v-model="sampleshow" :mask-closable="false">
            <div class="sample-title">样本文件信息</div>
            <div class="sample-inner">
                <div style="padding:20px 10px;">
                    <el-table border align="center" :data="samplefile">
                    
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
        <!--删除提示-->
        <Modal v-model="removeModel" title="删除提示" width="300" :mask-closable="false">
            <p style="padding:20px;text-align:center;">您确定要删除这条信息吗？</p>
            <div class="fastq-footer">
                <Button size="small" type="primary" @click="saveInfoClick">确定</Button>
            </div>
        </Modal>
        <!-- 分配数据弹框 -->
        <Modal v-model="slotModel" title="分配数据" width="600" :mask-closable="false">   
            <div class="sample-main">
                <div class="sample-inner">
                    <Tree :data="groupMemberData" show-checkbox @on-check-change="clickCheckBtn"></Tree>
                </div>
            </div>
            <div class="slot-footer">
                <Row>
                    <Col span="6" push="6">
                        <Button type="default" @click="cancelBtn">取消</Button> 
                    </Col>
                    <Col span="6" push="6">
                        <Button type="primary" @click="handleSubmit">确定</Button> 
                    </Col>
                </Row>
            </div>
        </Modal>
        </div>
    </div>
</template>
<script>
// 数据操作方法
import {menuListToTree} from 'common/js/Base';
import {data,task} from 'api/index.js'
import {getCookie} from '@/common/js/cookie.js'
import treeGrid from '@/components/treeTable/vue2/TreeGrid'
  export default{
    name: "mydata",
    data(){
      return {
        parentId:'',
        disTableSelect:false,         // 禁用表格多选框
        disShowNo:true,               // 分配按钮禁用
        batchShowBtn:false,           // 右下角按钮的显示隐藏
        oldRow:{},
        showSelection:false,          // 默认不显示选择数据，点击右上角分配数据后显示
        slotModelData:[],             // 分配数据
        showTabHead:true,             // 是否显示表头
        slotModel:false,              // 分配数据弹层，默认隐藏
        selectPcId:"All",             // 批次默认选中项
        piciList:[],                  // 批次下拉数据
        patientidList: [],            // 选中病人信息id列表
        useridList: [],               // 选中组成员id列表
        groupMemberData:[],           // 组、成员数据
        loading:true,
        loadone:Boolean,
        tabledata: [],  
        more:false,    
        height:'500',  
        tableDatas:[],  
        uploadDisabled: true,
        platformId:'',
        enrichmentkitId:'',
        takendate:'',
        receivedate:'',
        seqdate:'',
        fastq:false,
        sampleshow:false,
        href:"",
        pageSize:20,
        total:100,
        pageIndex:1,
        patid:'',
        samid:'',
        removeModel:false,
        datashow: true,
        sampleEdit: false,
        upModal: false,
        value: '',
        sampleInfo: {},
        samplefile:[],
        fastlist:[],
        fileCategoryList: [],                // 本地
        fileServerCategoryList: [],          // 服务
        choice:[],
        choices:[],
        pipeline:'',
        ruleCustom: {
          samplecode: [
              { required: true, message: '样本编号不能为空', trigger: 'blur' }
          ],
          designator: [
              { required: true, message: '亲属关系不能为空', trigger: 'blur' }
          ],
          region:[
              {required: true, message: '测序区域不能为空', trigger: 'blur' }
          ]},
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
            // {
            //    text: '传输时间',
            //     dataIndex: 'transition',
            //     width:'10'
            // }
          ],
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
        enrichmentkit: [],
        seqtype: [{
            value: 'DNA-Seq',
            label: 'DNA-Seq'
            }, {
            value: 'RNA-Seq',
            label: 'RNA-Seq'
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
        userId:'',
        idList:[],

      }
    },
    directives: {
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
        // 点击树形结构复选框
        clickCheckBtn(value) {
            // 存放部门id
            let arr = [];
            // 获得勾选部门的id
            if(M.isArray(value)) {
                M.each(value,(item)=> {
                    arr.push(item.deptId)
                })
                this.queryUserByDeptId(arr);
            }
        },
        // 根据部门id获得user列表
        queryUserByDeptId(arr) {
            // 存放userId
            let userId = [];
            let obj = {
                // 去重复部门id
                "deptId":M.uniqueArray(arr)
            };
            console.log(obj)
            // 根据部门id获得部门成员
            data.queryUserByDeptId(obj).then((res)=> {
                console.log(res)
                if(res.returnCode==200 || res.returnCode==0) {
                    let deptIdArr = res.data;
                    if(M.isArray(deptIdArr)) {
                        // console.log(deptIdArr);
                        M.each(deptIdArr,(item)=> {
                            userId.push(item.dchUserId)
                        })
                        console.log(userId + 1111)
                    }
                    console.log(userId + 2222)
                    this.useridList = userId;
                    console.log(this.useridList)
                }else{
                    this.$Message.error(res.msg)
                }
            })
        },
        // 表格左侧选择事件
        handleSelectionChange(value) {
            // console.log(JSON.stringify(value));
            if(value.length>0) {
                this.disShowNo = false;
            }else {
                this.disShowNo = true;
            }
            // console.log(this.useridList);
            //调用方法
            this.orgTableSubmmitArr(value);
        },
        // 组织提交数据-表格"patientidList":[]
        orgTableSubmmitArr(arr) {
            let patientidList = [];
            if(M.isArray(arr) && !M.isEmptyArray(arr)) {
                M.each(arr,(item)=> {
                    let str = '';
                        str = item.dchPatient.patientid;
                    patientidList.push(str);
                })
            }
            // console.log(patientidList);
            this.patientidList = patientidList;
            return patientidList;
        },
        // 右下角取消按钮
        batchClickBtn() {
            this.showSelection = false;
            // 按钮隐藏
            this.batchShowBtn = false;
            // 设置批次选中项
            this.selectPcId = "All";
            // 返回列表
            this.load();
        },
        // 分配数据-弹层打开
        bactnSubmmitBtn() {
            // 调用组、成员接口
            this.getDeptAndUser();
            // 弹层打开
            this.slotModel = true;
        },
        // 分配数据-确定事件
        handleSubmit() {
            let obj = {
                "userId":getCookie('userid'),
                "patientidList":this.patientidList || [],
                "useridList":this.useridList || []
            }
            console.log(this.patientidList)
            console.log(this.useridList)
            console.log(obj);
            data.assignData(obj).then((res)=> {
                console.log(res);
                if(res.returnCode==0 || res.returnCode==200) {
                    this.$Message.success(res.msg);
                    this.slotModel = false;
                    this.patientidList= [];           // 置空
                    this.useridList=[];               // 置空
                }else{
                    this.$Message.error("请选择分配组成员");
                }
            })
        },
        // 取消点击
        cancelBtn() {
            this.slotModel = false;
            this.patientidList= [];           // 置空
            this.useridList=[];               // 置空
        },
        // 批次改变事件
        SelectChangeData(val) {
            this.selectPcId = val? val : "All";
            // console.log(this.selectPcId);
        },
        // 分配数据点击事件-切换成选择表格
        clickSoltData() {
            // 显示选项
            this.showSelection = true;
            // 右下角按钮显示
            this.batchShowBtn = true;
            // 根据样本获得病人信息参数
            let obj = {
                "productId":"1" ,
                "batchId":this.selectPcId,
                "pageSize":this.pageSize,
                "pageIndex":this.pageIndex
            }
            // 根据批次获得对应数据信息
            data.getProjectListByBatchId(obj).then((res)=> {
                // console.log(JSON.stringify(res))
                if((res.returnCode==200 || res.returnCode==0) && res.data!=null) {
                    this.tableData3 = res.data.projectList;
                    M.each(this.tableData3,(item)=> {
                        // console.log(item.dchSampleList);
                        if(item.dchSampleList.length==0) {
                            this.disTableSelect = true;
                        }
                    })
                }
            })
        },
        // 获得组成员列表
        getDeptAndUser() {
            let obj = {
                "userid": getCookie('userid')
            }
            data.queryDeptAndUser(obj).then((res)=> {
                // console.log(JSON.stringify(res.data));
                this.groupMemberData = res.data;
            })
        },
        // 获得批次信息
        getBatchList() {
            let obj = {
                userId: getCookie('userid'),
                productId:'1'
            }
            task.getBatchList(obj).then((res)=> {
                // console.log(res);
                if(res) {
                    this.piciList = this.transformToSelect(res.data);
                }
            })
        },
        // 转成select需要数据
        transformToSelect(arr) {
            // 返回值
            let array = [];
            if(M.isArray(arr)) {
                M.each(arr,(item,index)=> {
                    // console.log(item);
                    if(item && item !=0) {
                        let obj = {};
                        obj.value = item;
                        obj.label = item;
                        array.push(obj);
                    }
                })
            }
            return array;
        },
        //格式化表格数据（结束时间）
        foreignFlag(row,column,cellValue) {
            // console.log(typeof(cellValue));
            if(cellValue =='0'){
                return cellValue = "未执行"
            }else if(cellValue =='1') {
                return cellValue = "等待";
            }else if(cellValue =='2') {
                return cellValue = "正在执行";
            }else if(cellValue =='3') {
                return cellValue = "已完成";
            }else if(cellValue =='4') {
                return cellValue = "错误";
            }
        },
        // 解读跳转
        jumpTgexPage(row) {
            // console.log(row.dchPatient.patientid)
            let obj = {
                "userId":getCookie("userid"),
                paientId:row.dchPatient.patientid
            }
            // console.log(obj)
            data.createCaseByPaientId(obj).then((data)=> {
                console.log(data.data);
                if(data.returnCode=="200" || data.returnCode =="0"){
                    // this.href="http://tgex-dev.dchgenecloud.com:88/#/analyses/"+data.data.caseid
                    // setTimeout('window.open("http://tgex-dev.dchgenecloud.com:88/#/analyses/"'+data.data.caseid+');', 500);
                    // window.open("http://tgex-dev.dchgenecloud.com:88/#/analyses/"+data.data.caseid)

                    window.open("http://10.131.101.173:88/#/analyses/"+data.data.caseid)
                    // window.location.href="http://tgex-dev.dchgenecloud.com:88/#/analyses/"+data.data.caseid
                }else{
                    this.$Message.error(data.msg)
                }
            }).catch((error)=>{

            })
        },
        clearFiles(){
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        upsuccess(response, file, fileList){
            if(response.returnCode==0){
                this.$Message.success(response.msg)
            }else if(response.returnCode==217){
                this.$Message.error(response.msg)
            }
            this.$refs.upload.clearFiles();
        },
        uperror(error, file, fileList){
            this.$Message.error(error.msg)
        },
        // 弹层关闭
        clickCancel() {
            this.uploadDisabled = true;
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
                "productId":"1"
            }
            data.getForldList(obj).then((data)=>{
                // console.log(data)
                if(M.isArray(data.data)) {
                    this.fileCategoryList=data.data;
                }else {
                    this.$Message.error(data.data)
                } 
            }).catch((error)=>{

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
                "productId":"1"
            }
            data.getForldList(obj).then((data)=>{
                    // console.log(data)
                if(M.isArray(data.data)) {
                    this.fileServerCategoryList=data.data;
                }else {
                    this.$Message.error(data.data)
                } 
            }).catch((error)=>{

            })
        },
        pull(){  //获取下拉菜单
            let obj={
                "userId":getCookie("userid"),
                "productId":"1"
            }
            data.getTGexPara(obj).then((data)=>{
            // console.log(data.data)
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
            }).catch((error)=>{

            })
        },
        addsample(row){//点击添加
            console.log(row)
            this.uploadDisabled = true;
            this.patid=row.patientid;
            this.sampleEdit=true;
            this.sampleInfo={};
            this.pull();
        },
        // 上传
        uploadSample(){
            this.sampleEdit = false;
            this.upModal = true;
        },
        keep(name){  //点击保存
            let obj={
                userId:getCookie("userid"),
                patientid:this.patid,
                productId:"1",
                sampleid:this.samid,
                enrichmentkit:this.enrichmentkitId,
                platform:this.platformId,
                takendate:String(this.takendate),
                receivedate:String(this.receivedate),
                seqdate:String(this.seqdate)
            }
            M.extend(this.sampleInfo,obj);
            console.log(this.sampleInfo)
            this.$refs[name].validate((valid) => {
                if(valid){
                    if(this.sampleInfo.sampleid!=''){
                        data.updateSample(this.sampleInfo).then((data)=>{
                            if(data.data=="null"||data.data==null){
                                this.$Message.error("参数错误！");
                            }else{
                                this.$Message.success("样本修改成功！");
                                this.load();
                                this.uploadDisabled = false;
                            }
                        }).catch((error)=>{

                        })
                }else{
                    data.addSample(this.sampleInfo).then((data)=>{
                        console.log(1)
                        if(data.data=="null"||data.data==null){
                            this.$Message.error("参数错误！");
                        }else{
                            this.$Message.success("样本添加成功！");
                            this.load();
                            this.uploadDisabled = false;
                            this.samid=data.data.sampleid;
                        }
                    }).catch((error)=>{
                            
                    })
                }
            }
            })
        },
        saveInfoClick(){  //删除确定
            let obj={
                "idList":this.idList,
                "userId":getCookie("userid"),
                "productId":"1"
            }
            data.deleteSampleById(obj).then((data)=>{
                this.$Message.success(data.data);
                this.removeModel=false;
                this.load();
            }).catch((error)=>{
                            
            })
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
                "productId":"1"
            }
            console.log(obj.sampleid)
            let flag=true;
            if(flag){
                flag=false;
                data.getFileList(obj).then((data)=>{
                    console.log(data.data)
                    this.samplefile=data.data;
                    flag=true;
                }).catch((error)=>{
                            
                })
            }
        },
        files(){ //点击批量数据
            this.$router.push('/admin/fileup?productId=1')
        },
        single(){//点击单一数据
            this.datashow = false;
            this.$router.push('/admin/gene/info');
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
                "productId":"1",
                "pipeline": this.pipeline,
                "templateId": "0",
                "fileGroupId":"aa",
            }
            data.executeSample(obj).then((data)=>{
                if(data.returnCode==200){
                // 再次获取列表
                    this.load();
                    this.$Message.success("添加成功")
                }else if(data.returnCode !=200){
                    this.$Message.error(data.msg)
                }
            }).catch((error)=>{
                            
            }) 
        },
        //数据列表加载
        load(){ //数据列表加载
            let obj={
                "pageSize" : this.pageSize,
                "pageIndex" : this.pageIndex,
                "productId" : "1",
                "userId":getCookie('userid'),
            }
            if(this.pageIndex==1){
                this.tableData3.length=0;
                this.loadone=true;
            }
            this.loading=true;
            data.getProjectList(obj).then((data)=>{
                this.loadone=false;
                if(data.data!=null){
                    this.total=data.data.count;
                    if(this.pageIndex==1){
                        this.tabledata=data.data.projectList;
                    }else{
                        this.tabledata=this.tabledata.concat(data.data.projectList)
                    }
                    this.tableData3= this.tabledata;
                    // console.log(JSON.stringify(this.tableData3));
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
        loadMore() {
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
        //点击编辑
        edit(index,row){ 
            this.sampleEdit = true;
            this.upModal = false;
            this.pull();
            this.patid=row.dchPatient.patientid;
            this.enrichmentkitId=row.dchSampleList[index].enrichmentkit;
            this.platformId=row.dchSampleList[index].platform;
            this.samid=row.dchSampleList[index].sampleid;
            this.seqdate=row.dchSampleList[index].seqdate;
            this.takendate=row.dchSampleList[index].takendate;
            this.receivedate=row.dchSampleList[index].receivedate;
            this.sampleInfo=row.dchSampleList[index];
            this.userId=getCookie("userid");
        },
        //点击上传
        upload(){ 
            this.sampleEdit = false;
            this.upModal = true;
        },
    },
    components: {treeGrid},
    created(){
        this.load();
        // 获得批次列表
        this.getBatchList();
    },
    filters: {
        // 格式化数据
        foreignFlag(cellValue) {
            // console.log(cellValue)
            if(cellValue == '0'){
                return cellValue = ""
            }else if(cellValue){
                return cellValue
            }
        },
    },
  }
</script>
