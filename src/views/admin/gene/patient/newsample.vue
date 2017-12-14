<style lang="scss">

    .demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
        border-radius: 0;
        background: #fff;
    }

    .demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
        border-top: 1px solid #3399ff;
    }

    .demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #3399ff;
        position: absolute;
        top: 0;
        left: 0;
    }
  
</style>
<template>
    <div class="sample-info">
        <Col span="24" class="demo-tabs-style1">
            <Tabs type="card" value="sam" @on-click="pat">
                <TabPane label="病人信息" ></TabPane>
                <TabPane label="样本信息" name="sam"></TabPane>
            </Tabs>
        </Col>
        <sampleList></sampleList>
    </div>
</template>
<script>
    import sampleList from './samplelist.vue'
    export default{
        name:'newsample',
        data(){
            return{}
        },
        methods:{
            pat(){  //点击病人信息
                this.$router.push("/admin/gene/info")
            },
        },
        components:{
            sampleList
        }
    }
</script>
