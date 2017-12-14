<template> 
<div> 
    <div>
        <div class="info-title" style="border-bottom:1px solid #ccc;padding-bottom:10px;">
            <Icon type="android-person" style="font-size:14px;"></Icon>
            <span style="margin-left:10px;">基本信息（*为必填项）</span>
            <div style="float:right;" v-if="routeshow">
                <Button type="primary" size="small" @click="upPatient">更新</Button>
                <Button type="primary" size="small" @click="delet">删除</Button>
            </div>
        </div>
        <div style="padding:0 20px 20px;">
            <Form :model="basicInfo" ref="basicInfo" label-position="left" :label-width="80" inline :rules="rulebasicInfo">
                <Col class="tables">
                    <FormItem label="病人姓名" style="width:30%;" prop="patientname">
                        <Input v-model="basicInfo.patientname"></Input>
                    </FormItem>
                    <FormItem label="病人编号" style="width:30%;" prop="patientcode">
                        <Input v-model="basicInfo.patientcode" :disabled="routeshow"></Input>
                    </FormItem>
                    <FormItem label="电话" style="width:30%;" prop="phone">
                        <Input v-model="basicInfo.phone"></Input>
                    </FormItem>
                </Col>
                <Col class="tables">
                    <FormItem label="出生日期" style="width:30%;">
                        <DatePicker type="date" placeholder="选择日期" v-model="birthday"></DatePicker>
                    </FormItem>
                    <FormItem label="性别" style="width:30%;" prop="gender">
                        <Select v-model="genderId" @on-change="changeGender">
                            <Option v-for="item in sexs" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="身份证" style="width:30%;" prop="idcard">
                        <Input v-model="basicInfo.idcard"></Input>
                    </FormItem>                  
                </Col>
                <Col class="tables">
                    <FormItem label="种族" style="width:30%;">
                        <Select v-model="basicInfo.nation" @on-change="changes">
                            <Option v-for="item in nations" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Form>
        </div>
    </div>
    <div>
        <div class="info-title" style="border-bottom:1px solid #ccc;padding-bottom:10px;">
            <Icon type="android-person" style="font-size:14px;"></Icon>
            <span style="margin-left:10px;">疾病信息</span>
        </div>
        <div style="padding:0 20px 20px;">
            <Form :model="basicInfo" ref="basicInfos" label-position="left" :label-width="80" inline :rules="rulebasicInfo">
                <Col class="tables">
                    <FormItem label="疾病名称" style="width:30%;" prop="diseasename">
                        <Select v-model="basicInfo.diseasename" style="width:100" @on-change="getProv">
                            <Option v-for="item in diseasename" :value="item.value" :key="item.value" >{{ item.label}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="病理类型" style="width:30%;" prop="diseasetype">
                        <Select v-model="basicInfo.diseasetype" style="width:100" @on-change="getdi">
                            <Option v-for="item in diseasetype" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="临床诊断" style="width:30%;">
                        <Input v-model="basicInfo.clinicalinf" :autosize="true" type="textarea" placeholder=""></Input>
                    </FormItem>
                </Col>
                <Col class="tables">
                    <FormItem label="现病史" style="width:30%;">
                        <Input v-model="basicInfo.history" type="textarea" :autosize="true"></Input>
                    </FormItem>
                    <FormItem label="既往史" style="width:30%;">
                        <Input v-model="basicInfo.pasthistory" type="textarea" :autosize="true"></Input>
                    </FormItem>
                </Col>
            </Form>
        </div>
    </div>
    <div>
        <div class="info-title" style="border-bottom:1px solid #ccc;padding-bottom:10px;">
            <Icon type="android-person" style="font-size:14px;"></Icon>
            <span style="margin-left:10px;">疾病风险因素</span>
        </div>
        <div style="padding:0 20px 20px;">
            <Form :model="basicInfo" label-position="left" :label-width="90" inline>
                <Col class="tables">
                    <FormItem label="吸烟史" style="width:30%;">
                        <Select v-model="basicInfo.smokehistory" @on-change="changea" :placement="placement">
                            <Option v-for="item in smokehistorys" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col class="tables">
                    <CheckboxGroup v-model="checks" @on-change="choice">
                        <Checkbox label="secondsmoke">二手烟</Checkbox>
                        <Checkbox label="chesthistory">胸部放射性治疗历史</Checkbox>
                        <Checkbox label="workenviroment">工作环境接触化学致癌物</Checkbox>
                        <Checkbox label="alcoholism">酗酒</Checkbox>
                        <Checkbox label="lackofexercise">缺乏运动</Checkbox>
                    </CheckboxGroup>
                </Col>
            </Form>
        </div>
    </div>
    <Button type="primary" @click="next('basicInfo','basicInfos')" v-if="!routeshow">下一步</Button>
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
import { data } from 'api/index.js'
import {getCookie} from '@/common/js/cookie.js'
import sampleList from './samplelist.vue'
export default{
    name: 'patientinfo',
    props:['routeshow'],
    data(){
        const validatePhone = (rule, value, callback) => {
            if(value==undefined){
                callback();
            }else{
                if (!(/^1[34578]\d{9}$/.test(value))) {
                    callback(new Error('手机号错误'));
                } else {
                    callback();
                }
            }
        };
        const validateID = (rule, value, callback) => {
            console.log(value)
            if(value==undefined){
                callback();
            }else{
                if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value))) {
                    callback(new Error('身份证号错误'));
                } else {
                    callback();
                }
            }
        };
        return {
          genderId:'',
          birthday:'',
          checks:[],
          check:{},
          paid:'',
          placement:"top",
          removeModel:false,
          url:M.url(),
          diseasetype:[],
          dchdiseaseid:0,
          selectProv:'',
          selectDis:'',
          smokehistorys:[{value:"无",label:"无"},{value:"1-10包年",label:"1-10包年"},{value:"10-20包年",label:"10-20包年"},{value:"20-30包年",label:"20-30包年"},{value:"30包年以上",label:"30包年以上"}],
          nations:[{value:"东亚",label:"东亚"},{value:"南亚",label:"南亚"},{value:"南亚",label:"南亚"},{value:"欧洲",label:"欧洲"},{value:"非洲",label:"非洲"},{value:"美洲",label:"美洲"}],
          sexs:[{value:"true",label:"男"},{value:"false",label:"女"}],
          diseasename:[],
          basicInfo: {},
          sign:true,
          oldInfo:{},
          rulebasicInfo: {
              phone: [
                  { validator: validatePhone, trigger: 'blur' }
              ],
              idcard: [
                  { validator: validateID, trigger: 'blur' }
              ],
              patientname:[
                { required: true, message: '病人姓名不能为空', trigger: 'blur' }
              ],
              patientcode:[
                { required: true, message: '病人编号不能为空', trigger: 'blur' }
              ],
              gender:[
                { required: true, message: '性别不能为空', trigger: 'blur' }
              ],
              diseasetype:[
                { required: true, message: '疾病类型不能为空', trigger: 'blur' }
              ],
              diseasename:[
                { required: true, message: '疾病名称不能为空', trigger: 'blur' }
              ]
            }
        }
    },
    beforeUpdate(){
        this.$emit("obinfo",this.oldInfo)
    },
    updated(){
        if(this.birthday!=""){
            this.basicInfo.birthday= String(this.birthday);
        }
        if(this.genderId !=""){
            this.basicInfo.gender=this.genderId;
        }
        M.extend(this.basicInfo,this.check);
        this.$emit("binfo",this.basicInfo)
    },
    components: {
       sampleList
    },
    methods: {
        choice(val){
            this.checks=val;
            let arr=[];
            M.each(this.checks,(item,index)=>{
                arr.push(true);
            })
            this.check=M.toObject(this.checks,arr);
        },
        saveInfoClick(){  //删除确定
            let obj={
                "userId":getCookie("userid"),
                "idList":this.idList,
                "productId":"1"
            }
            data.deletePatientById(obj).then((data)=>{
                if(data.data=="成功"){
                    this.$Message.success(data.data);
                    this.sign=false;
                    this.$emit('signs',this.sign)
                    this.$router.push('/admin/tumour')
                }else{
                    this.$Message.error(data.data);
                }
                this.removeModel=false;
            })
        },
        changeGender(val){  //性别改变
            this.genderId = val;
        },
        delet(){  //点击删除
            this.idList=[];
            this.idList.push(this.url.paid);
            this.removeModel=true;
        },
        upPatient(){
            let obj={
                gender:this.genderId,
                patientid:this.url.paid,
                userId:getCookie("userid"),
                productId:"2",
                birthday:String(this.birthday),
            }
            M.extend(this.basicInfo,this.check)
            M.extend(this.basicInfo,obj)
            console.log(JSON.stringify(this.basicInfo))
            data.updatePatient(this.basicInfo).then((data)=>{
                console.log(data)
                if(data.msg==null){
                    this.$Message.success(data.data);
                    this.sign=false;
                    this.$emit('signs',this.sign)
                    this.$router.push("/admin/tumour");
                }else{
                    this.$Message.error(data.data)
                }
            })
        },
        changes(val){  //改变种族
            this.basicInfo.nation=val;
        },
        changea(val){  //改变吸烟史
            this.basicInfo.smokehistory=val;
        },
        next(name,names){  //点击下一步
            M.extend(this.basicInfo,this.check);
            let obj={
                userId:getCookie("userid"),
                productname:"TGex",
                productId:"2",
                birthday:String(this.birthday),
                gender:this.genderId,
            }
            M.extend(this.basicInfo,obj);
            console.log(JSON.stringify(this.basicInfo))
            this.$refs[names].validate((valid)=>{
                this.$refs[name].validate((valid) => {
                    if(valid){
                        data.addProject(this.basicInfo).then((data)=>{
                            if(data.data=='null' || data.data==null){
                                // this.show = true;
                                this.$Message.error(data.msg);
                            }else if(data.msg=="null" || data.msg==null){
                                // this.show = true;
                                this.$Message.error(data.data)
                            }else{
                                this.paid=data.data.patient.patientid;
                                this.$router.push('/admin/tumour/newsample?paid='+this.paid)
                            }
                        }).catch((error)=>{
                        })
                    }
                })
            })
            
        },
        getProv(prov){   //二级联动菜单
            this.basicInfo.diseasename=prov;
            this.dchdiseaseid=prov; 
            this.getdisease();          
        },
        getdi(val){  //改变疾病类型
            this.basicInfo.diseasetype=val;
        },
        //获取疾病名称
        getdisease(){
            this.diseasetype=[];
            let obj={
                "userId":getCookie("userid"),
                "diseaseparentid":this.dchdiseaseid
            }
            data.getdiseaselist(obj).then((data)=>{
                M.each(data.data,(item,index)=>{
                    var result={};
                    if(item.diseaseparentid=='0'){
                        result.value=item.dchdiseaseid;
                        result.label=item.dchdiseasename;
                        this.diseasename.push(result)
                    }else{
                        result.value=item.dchdiseaseid;
                        result.label=item.dchdiseasename;
                        this.diseasetype.push(result)
                    }
                })
            }).catch((error)=>{
                console.log(error)
            })
        },
        //获取病人信息
        getpatientinfo(){
            let obj={
                "patientcode":this.url.patientcode,
                "patientid":this.url.paid,
                "userId":getCookie("userid"),
                "productId":'2'
            }
            data.getProjectDetail(obj).then((data)=>{
                console.log(JSON.stringify(data.data))
                this.basicInfo=data.data.dchPatient;
                this.genderId= String(data.data.dchPatient.gender);
                this.birthday=this.basicInfo.birthday;
                this.oldInfo=M.clone(this.basicInfo);
                this.oldInfo.gender=this.genderId;
                this.oldInfo.birthday=this.birthday;
                if(this.basicInfo.lackofexercise==true){
                    this.checks.push("lackofexercise")
                }
                if(this.basicInfo.secondsmoke==true){
                    this.checks.push("secondsmoke")
                }
                if(this.basicInfo.chesthistory==true){
                    this.checks.push("chesthistory")
                }
                if(this.basicInfo.workenviroment==true){
                    this.checks.push("workenviroment")
                }
                if(this.basicInfo.alcoholism==true){
                    this.checks.push("alcoholism")
                }
            })
        }
    },
    mounted(){
        this.getdisease();
        let baseURI=this.$refs.basicInfo.$el.baseURI;
        if(baseURI!="http://localhost:9090/admin/tumour/info"){
            this.getpatientinfo();
            this.placement="bottom"
        }
    }
}
</script>
