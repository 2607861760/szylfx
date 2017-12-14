<style lang="scss" scoped>
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
    <div class="patient">
        <Col span="24" class="demo-tabs-style1">
          <Tabs type="card">
              <TabPane label="病人信息"></TabPane>
          </Tabs>
        </Col>
        <patientInfo @binfo="basicinfo"></patientInfo>
    </div>
</template>
<script>
  
import patientInfo from './patientinfo.vue'
export default{
    name: "patient",
    data(){
        return {
            newInfo:{}
        }
    },
    components: {
        patientInfo
    },
    methods: {
        basicinfo(val){
            this.newInfo=val;
        }
    },
    beforeRouteLeave(to, from, next) {     
        M.each(this.newInfo,(value,key)=>{           
            if(value == "" || value==" "){
                delete this.newInfo[key];
            }
        })
        if(to.path !="/admin/gene/newsample" && !M.isEmptyObject(this.newInfo) ){
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
  }
</script>
