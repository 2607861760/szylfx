<style lang="scss">
  .patient-info {
      padding: 12px 15px;
      color: #333;
  }
</style>
<template>
<div class="patient-info">
    <div class="info-title" style="border-bottom:1px solid #ccc;padding-bottom:10px;">
        <span style="margin-left:10px;">病人信息</span>
    </div>
    <div>
        <div class="info-title" style="padding:10px 0 10px 10px;border-bottom:1px solid #ccc;">
            <Icon type="android-person" style="font-size:14px;"></Icon>
            <span style="margin-left:10px;">基本信息</span>
            <div style="float:right;">
                <Button type="primary" size="small" @click="upPatient">更新</Button>
                <Button type="primary" size="small" @click="delet">删除</Button>
            </div>
        </div>
        <div style="padding:0 20px 20px;">
            <Form :model="basicInfo" label-position="left" :label-width="80" inline>
                <Row>
                    <Col class="tables">
                        <FormItem label="病人编号 *" style="width:30%;">
                            <Input v-model="basicInfo.patientcode" disabled style="color:#666;"></Input>
                        </FormItem>
                        <FormItem label="病人姓名 " style="width:30%;">
                            <Input v-model="basicInfo.patientname"></Input>
                        </FormItem>
                    </Col>
                    <Col class="tables">
                        <FormItem label="出生日期" style="width:30%;">
                            <DatePicker type="date" v-model="birthday"></DatePicker>
                        </FormItem>
                        <FormItem label="性别" style="width:30%;">
                            <Select v-model="genderId" @on-change="changeGender">
                                <Option v-for="item in sexs" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col class="tables">
                        <FormItem label="血缘关系" style="width:30%;">
                            <Input v-model="basicInfo.consanguinity"></Input>
                        </FormItem>
                        <FormItem label="民族" style="width:30%;">
                            <Input v-model="basicInfo.nation"></Input>
                        </FormItem>
                    </Col>
                    <Col class="tables"> 
                        <FormItem label="临床信息" style="width:78%;">
                            <Input v-model="basicInfo.clinicalinf" type="textarea" :rows="3" :maxlength="100" placeholder="请输入不超过100个字"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
    </div>
    
    <div>
        <div class="info-title" style="padding:10px 0 10px 10px;border-bottom:1px solid #ccc;">
            <Icon type="android-person" style="font-size:14px;"></Icon>
            <span style="margin-left:10px;">样本信息</span>
        </div>
        <div style="padding-top:10px;">
            <sampleList flag="1"></sampleList>
        </div>
    </div>
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
import sampleList from './samplelist.vue'
import {getCookie} from '@/common/js/cookie.js'
export default{
    name: 'patientedit',
    data(){
        return {
            abandonModel:false,
            genderId:null,
            url:M.url(),
            show: true,
            sexs:[{value:"true",label:"男"},{value:"false",label:"女"}],
            birthday: '',        
            basicInfo: {},
            idList:[],
            removeModel:false,
            sign:false,
            oldInfo:{},
        }
    },  
    methods:{
        changeGender(val){  //改变性别
            this.genderId = val;
        },
        upPatient(){   //更新病人信息
            let obj={
                gender:this.genderId,
                patientid:this.url.paid,
                userId:getCookie("userid"),
                productId:"1",
                birthday:String(this.birthday)
            }
            M.extend(this.basicInfo,obj)
            data.updatePatient(this.basicInfo).then((data)=>{
                if(data.returnCode==0 || data.returnCode==200){
                    this.$Message.success(data.data)
                    this.sign=true;
                    this.$router.push("/admin");
                }else{
                    this.$Message.error(data.data)
                }
            }).catch((error)=>{
                this.$Message.error(error)
            })
        },
        saveInfoClick(){  //删除确定
            let obj={
                "userId":getCookie("userid"),
                "idList":this.idList,
                "productId":"1"
            }
            data.deletePatientById(obj).then((data)=>{
                if(data.returnCode==0 || data.returnCode==200){
                    this.$Message.success(data.data);
                    this.sign=true;
                    this.$router.push('/admin')
                }else{
                    this.$Message.error(data.msg);
                }
                this.removeModel=false;
            })
        },
        delet(){ //点击删除
            this.idList=[];
            this.idList.push(this.url.paid);
            this.removeModel=true;
        },
        // 获得详情信息
        getProjectDetail() {
            let obj={
                "patientcode":this.url.patientcode,
                "patientid":this.url.paid,
                "userId":getCookie("userid"),
                "productId":'1'
            }
            data.getProjectDetail(obj).then((data)=>{
                if(data.returnCode==0 || data.returnCode==200){
                    this.basicInfo=data.data.dchPatient;
                    this.birthday=this.basicInfo.birthday;
                    this.genderId= String(data.data.dchPatient.gender);
                    // 克隆一份数据
                    this.oldInfo = M.clone(this.basicInfo);
                }else{
                    this.$Message.error(data.msg)
                }
                
            })
        },
        // 替换对象中的null为""
        replaceToString(obj) {
            // 返回值
            let object = {};
            // 判断参数
            if(M.isObject(obj)) {
                // 遍历
                M.each(obj,(value,key)=>{
                    if(key) {
                        // 替换null或'null'为''
                        if(value=="null" || value == null){
                            value = '';
                        }
                        object[key] = value?value:''
                        if(key=="birthday"){
                            let dd=new Date(value);
                            value=this.formatDate(dd);
                            let res = value.toLocaleString();
                            object[key] = res;
                        }
                    }
                })
            }
            return object;
        },
        //格式时间
        formatDate(date){
            var y = date.getFullYear();  
            var m = date.getMonth() + 1;  
            m = m < 10 ? '0' + m : m;  
            var d = date.getDate();  
            d = d < 10 ? ('0' + d) : d;  
            return y + '-' + m + '-' + d;  
        },
        // 判断前后表单对象是否一致
        judgeObjEqual(obj1,obj2) {
            let value = false,       // 返回值
                data1,               // 处理后的旧数据
                data2;               // 处理后的新数据
            // 判断参数
            if(M.isObject(obj1) && M.isObject(obj2)) {
                //处理对象数据
                data1 = this.replaceToString(obj1);
                data2 = this.replaceToString(obj2);
                // 判断data1与data2 是否相等
                if(M.isEqual(data1,data2)) {
                    value = true;
                }
            }
            return value;
        },
    } ,
    mounted(){
        this.getProjectDetail();
    },
    beforeRouteLeave(to, from, next) {
        let obj={};
        if(this.birthday!=""){
            obj.birthday=this.birthday
        }
        if(this.gender!=""){
            obj.gender=this.gender
        }
        this.basicInfo = M.extend(this.basicInfo,obj) 
        console.log(JSON.stringify(this.basicInfo))
        let bool = this.judgeObjEqual(this.oldInfo,this.basicInfo);
        if(this.sign==false && bool==false){
            this.$Modal.confirm({
                title: '放弃提示',
                content: `<div class="modal-bd modal-bd2">
                        <p>确定放弃本次操作吗？</p><br>
                     </div>`,
                okText: '确定',
                cancelText: '取消',
                onOk:function(){
                  next();
                },
                onCancel:function(){
                  next(false);
                }
            })
        }else{
            next();
            
        } 
    },
    components: {
        sampleList
    }
  }
</script>
