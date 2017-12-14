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
    <div style="padding-top:5px;">
        <patientInfo :routeshow="show" @obinfo="oldInfo" @signs="onSelectType" @binfo="basicinfo"></patientInfo>
    </div>
    <div>
        <div class="info-title" style="padding:10px 0 10px 10px;border-bottom:1px solid #ccc;">
            <Icon type="android-person" style="font-size:14px;"></Icon>
            <span style="margin-left:10px;">样本信息</span>
        </div>
        <div style="padding-top:10px;">
            <sampleList></sampleList>
        </div>
    </div>
</div>
</template>
<script>
import sampleList from './samplelist.vue'
import patientInfo from './patientinfo.vue'
import {data} from 'api/index.js'
import {getCookie} from '@/common/js/cookie.js'
export default{
    name: 'patientedit',
    data(){
        return {
            show:true,
            sign:true,
            oldinfo:{},
        }
    },  
    methods:{
        onSelectType (type) {
            this.sign = type
        },
        basicinfo(val){
            this.newInfo=val;
        },
        oldInfo(val){
            this.oldinfo=val;
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
    },
    beforeRouteLeave(to, from, next) {
        let bool = this.judgeObjEqual(this.oldinfo,this.newInfo);
        if((to.path !="/admin/tumour" && bool==false) || (to.path=="/admin/tumour" && this.sign && bool==false)){
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
        sampleList,patientInfo
    }
}
</script>
