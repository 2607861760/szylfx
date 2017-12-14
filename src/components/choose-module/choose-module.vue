<style lang="scss" scoped>
@import '~common/scss/public/base-variable';
.module-item {
    transition: all .4s linear;
    .content {
        border: 1px solid #EEEFF1;
        padding: 25px 5px;
    }
}

.module-item:hover {
    cursor: pointer;
    background: $home-blue;
    color: #fff;
}
</style>
<template>
    <!-- 模块选择弹窗 -->
    <Modal v-model="moduleModal" width="700">
        <p slot="header" style="text-align:left">
            <span>模块选择</span>
        </p>
        <div style="text-align:center;height:270px;">
            <!-- getMoudlesInfo为绑定点击事件，用于选择模块 -->
            <div class="table-view-cont" key="table-module">
                <Row :gutter="16">
                    <!-- 遍历模块列表moduleList -->
                    <Col v-for="(module, i) in moduleList" span="6" :key="i" style="margin:12px 0;">
                    <div class="module-item" @click="getMoudlesInfo(module)">
                        <div class="module-item-cont content">
                            <Icon class="module-icon" :type="module.icon" size=40></Icon>
                            <h5 v-text="module.moduleName"></h5>
                        </div>
                    </div>
                    </Col>
                </Row>
            </div>
        </div>
        <div slot="footer"></div>
    </Modal>
    <!-- 模块选择弹窗 end-->
</template>
<script>
// 状态
import {
    mapState,
    mapMutations
} from 'vuex';
export default {
    name: "choose-module",

    props: {
        moduleModal: {
            type: Boolean,
            default: false,
        },
        moduleList: {
            type: Array,
        },
        reload: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        // 选择模块信息
        getMoudlesInfo(module) {
            this.setCurrentModule(module);
            // 根据用户选择的模块，取出模块id，作为参数传到跳转页面
            this.$router.push('/admin');
            if (this.reload) {
                window.location.reload()
            }
        },
        ...mapMutations({
            setCurrentModule: 'setCurrentModule',
        })
    }
}
</script>
