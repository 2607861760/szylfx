<style lang="scss" scoped>
</style>
<template>
    <div :style="canvasStyle" ref="canvas"></div>
</template>

<script>
// 引入echarts
import echartsLib from 'echarts';
// 引入中国地图
import 'echarts/map/js/china.js';
// 引入自定义风格
import mcakeTheme from './theme/mcake.js';

export default {
    // 组件名称
    name: 'echarts',
    // 属性
    props: {
        // 画布宽度
        width: { type: String, default: '100%' },
        // 画布高度
        height: { type: String, default: '400px' },
        // 风格模板名称 
        themeName: String,
        // 模板配置项
        theme: Object,
        // echarts配置
        options: Object
    },
    data () {
        return {}
    },
    computed: {
        // 画布样式
        canvasStyle () {
            return {
                width: this.width,
                height: this.height,
                padding: "10px"
            }
        },
    },
    watch: {
        // 观察配置项
        options: {
            handler(val) {
                this.updateOptions(val);
            },
            deep: true
        },
    },
    created() {
        // 设置echarts构造函数 到实例中
        this.echartsLib = echartsLib;
        // 注册模板风格
        this.registerTheme();
    },
    mounted() {
        // 初始化
        this.init();
        // 添加窗口大小改变事件
        window.addEventListener('resize', this.echarts.resize)
    },
    methods: {
        // 初始化
        init() {
            // 获得模板名称
            const themeName = this.theme ? 'default-theme' : this.themeName;
            // 创建实例
            this.echarts = this.echartsLib.init(this.$refs.canvas, themeName);
            // 设置参数
            this.updateOptions(this.options);
        },
        // 设置和更新参数
        updateOptions(val) {
            // 打印当前值
            //console.log(JSON.stringify(val, null, 4));
            // 设置参数
            this.echarts.setOption(val);
        },
        // 注册模板风格
        registerTheme() {
            // 注册mcake模板风格
            echartsLib.registerTheme("mcake", mcakeTheme);
            // 如果模板存在
            if(this.theme) {
                // 注册风格样式
                echartsLib.registerTheme('default-theme', this.theme);
            }

        }
    }
};
</script>