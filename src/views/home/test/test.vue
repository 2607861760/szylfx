<style lang="scss" scoped>
.wrap {
    width: 90%;
    margin: 0 auto;
    background: #fff;
}
.box{
    margin-bottom: 20px;
    padding: 20px;
    text-align: right;
}
.canvas {
    margin-bottom: 50px;
}
</style>

<template>
    <div class="wrap">
        <div class="box">
            <molView :data="molData"></molView>
            <molView></molView>
        </div>
    </div>
</template>

<script>
import molView from 'components/mol-view/mol-view.vue';


export default {
    data () {
        return {
            molData: ""
        }
    },
    mounted() {
        
    },
    methods: {
        
    },
    components: {
        molView
    },
};

</script>