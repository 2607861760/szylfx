<style lang="scss">
.filesup{
    background:#3C3F60;
    width:100%;
    height:50px;
    color:#fff;
    font-size:16px;
    line-height:50px;
    text-indent:1.5em;
}
.fileshow{
    padding:0px 20px 10px;
}
.allfile{
    margin-top:20px;
}
.total{
    border:1px solid #dfe6ec;
    height:30px;
    width:100%;
    line-height:30px;
    font-size:12px;
    color:#666;
    span{
        padding-left:5px;
        padding-right:5px;
    }
}
</style> 
<template>
<div>
    <div class="filesup">批量上传</div>
    <div>
        <div style="padding:20px;">选择文件</div>
        <div class="tabs-file">
            <Tabs type="card" v-model="tabsValue" @on-click="clickTabs">
                <TabPane label="服务器上传" name="local">
                    <div class="fileshow">
                        <tree-grid :columns="columns" v-loading="loading" :tree-structure="true" :data-source="localFileCategoryList" >
                        </tree-grid>
                            <!--<Button type="primary" style="float:right;margin-top:10px;" @click="next" >下一步</Button>-->
                    </div>
                </TabPane>
                <TabPane label="本地上传" name="server">
                    <div class="fileshow">
                        <tree-grid :columns="columns" v-loading="loading" :tree-structure="true" :data-source="fileCategoryList" >
                        </tree-grid>
                            <!--<Button type="primary" style="float:right;margin-top:10px;" @click="next" >下一步</Button>-->
                    </div>
                </TabPane>
            </Tabs>
        </div>
    </div>
</div>
</template>
<script>
import treeGrid from '@/components/treeTable/vue/TreeGrid';
import {getCookie} from '@/common/js/cookie.js'
import {data} from 'api/index.js'
    export default{
        name:'file',
        data(){
            return{
                tabsValue: 'local',
                loading:true,
                fileCategoryList: [],
                localFileCategoryList: [],
                url:M.url(),
                columns: [
                    {
                        text: '文件名称',
                        dataIndex: 'filename',
                        width:'20%'
                    }
                ],
            }
        },
        // 实例创建时
        created() {
            this._getForldList();      
        },
        methods:{
            // tab切换
            clickTabs(name) {
                if(name=="local") {
                    this._getForldList();
                }else if(name=="server"){
                    this._getServerList();
                }
            },
            // 获得服务上传列表
            _getForldList() {
                let obj={
                    "path":"/storage/serverData/",
                    // "path":"/opt/NfsDir/PublicDir/demo/",
                    // /opt/NfsDir/PublicDir/demo/  电信云
                    // /storage/serverData/   159
                    "userId":getCookie("userid"),
                    "productId":this.url.productId
                }
                console.log(obj)
                data.getForldList(obj).then((data)=>{
                    console.log(data)
                    if(data.returnCode==0 || data.returnCode==200){
                        if(data.data.length>0 && M.isArray(data.data)) {
                            this.localFileCategoryList=data.data;
                            this.loading=false;
                        }else {
                            this.$Message.error(data.data);
                            this.loading=false;
                        }
                    }else{
                        this.$Message.error(data.msg)
                        this.loading=false;
                    }
                    
                })
            },
            // 获得硬盘列表
            _getServerList() {
                let obj={
                    "path":"/storage/serverData/",
                    // "path":"/opt/NfsDir/PublicDir/demo/",
                    // /opt/NfsDir/PublicDir/demo/  电信云
                    // /storage/serverData/   159
                    "userId":getCookie("userid"),
                    "productId":this.url.productId
                }
                data.getForldList(obj).then((data)=>{
                    console.log(data)
                    if(data.returnCode==0 || data.returnCode==200){
                        if(data.data.length>0 && M.isArray(data.data)) {
                            this.fileCategoryList=data.data || [];
                            this.loading=false;
                        }else {
                            this.$Message.error(data.data);
                            this.loading=false;
                        }
                    }else{
                        this.$Message.error(data.msg)
                        this.loading=false;
                    }                    
                })
            }
        },
        components:{
            treeGrid
        },
    }
</script>