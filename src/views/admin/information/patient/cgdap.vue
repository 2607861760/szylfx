<style scpoed>
    .error{
        width:100%;
        min-height:700px;
        text-align:center;
        line-height:50px;
        padding-top:200px;
        color:#ccc;
        font-size:30px;
    }
</style>
<template>
    <div v-loading="loading">
        <iframe :src="urlSrc" style="width:100%;min-height:700px;" frameborder="0" v-if="show"></iframe>
        <div class="error" v-else>加载失败...</div>
    </div>
</template>
<script>
    import {getCookie} from '@/common/js/cookie.js'
    import {data} from 'api/index.js'
    export default{
        name:'cgdap',
        data(){
            return{
                urlSrc:'',
                url:M.url(),
                show:true,
                loading:true,
            }
        },
        methods:{
            vishuourls(){
                let obj={
                    "userId":getCookie("userid"),
                    "sampleid":this.url.samid
                }
                console.log(obj)
                data.vishuourl(obj).then((data)=>{
                    console.log(data)
                    this.loading=false;
                    if(data.returnCode==0 || data.returnCode==200){
                        if(data.data=="null" || data.data==null){
                            // this.$Message.error(data.msg)
                            this.show=false;
                        }else{
                            this.urlSrc=data.data;
                            console.log(this.urlSrc)
                        }
                    }else{
                        this.$Message.error(data.msg)
                    }
                }).catch((error)=>{
                    this.loading=false;
                    this.show=false;
                    console.log(error)
                })
            }
        },
        created(){
            this.vishuourls();
        }
    }
</script>