<style lang="scss" scope>
// 引入公共变量及方法
@import '~common/scss/public/base-url.scss';
.visual {
   .visual-cont {
        position:absolute;
        width: 100%;
        background:#fff;
        .cont-iframe {
            position:relative;
            width:100%;
            _height:700px;
            min-height:700px;
        }
        .vis-cont {
            position: absolute;
            margin-top: 40px;
            font-size: 18px;
            margin-left: 48%;
        }
    } 
}
</style>
<template>
    <div class="visual">
        <div class="visual-cont" v-loading="loading">
            <div class="vis-cont" v-if="dataShow">
                没有文件
            </div>
            <iframe :src="urlSrc" class="cont-iframe" frameborder="0"></iframe>
        </div>
    </div>
</template>
<script>
// 引入任务管理方法
import {task} from 'api/index.js'
import {getCookie} from '@/common/js/cookie.js'
export default {
    name:"visualization",
    data() {
        return {
            cookies:getCookie('userid'), 
            url:M.url(),
            urlSrc:"",
            dataShow:false,
            loading:true
        }
    },
    // 实例创建时
    created() {
        
        this.getJobRowse();
    },
    watch: {

    },
    methods: {
        getJobRowse() {
            let obj = {
                jobid:this.url.jobid,
                userId:this.cookies
            }
            // console.log(obj);
            task.getJobRowse(obj).then((res)=> {
                console.log(res);
                if(res.returnCode==0 ||res.returnCode==200){
                    if(res.data=="成功") {
                        this.urlSrc = "http://42.123.124.204:8081/jbrowse/JBrowse-1.11.5/index.html?data=file"
                        // this.urlSrc = "http://10.131.101.159:8080/jbrowse/JBrowse-1.11.5/index.html?data=file"
                        this.loading = false;
                    }else {
                        this.dataShow = true;
                        this.$Message.success("路径下没有文件");
                        this.loading = false;
                    }
                }else{
                    this.$Message.error(res.msg)
                }
                
            })
        },
    }
}
    
</script>