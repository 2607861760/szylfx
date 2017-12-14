<style lang="scss" scoped>

.mol-view-head {
}
.tools {
    padding-bottom: 20px;
}
.tool-item {
    float: left;
    margin: 10px 20px 10px 0;

    &.right {
        float: right;
    }
}
// 画布容器
.mol-view-canvas {
    position: relative;
    border: 1px solid #ccc;
}
</style>
<template>
    <div class="mol-view">
        <!-- 操作工具 -->
        <div class="mol-view-head clear">
            <div class="tool-item">
                <strong>背景颜色：</strong>
                <ColorPicker v-model="backgroundColor" recommend />
            </div>
            <div class="tool-item">
                <strong>形状：</strong>
                <Select v-model="type" style="width:120px">
                    <Option value="sphere">球状</Option>
                    <Option value="line">线状</Option>
                    <Option value="stick">柱状</Option>
                    <Option value="cross">交叉</Option>
                    <Option value="cartoon">带状</Option>
                </Select>
            </div>
            <div class="tool-item">
                <strong>文件类型：</strong>
                <Select v-model="fileType" @on-change="fileTypeChange" style="width:120px">
                    <Option v-for="(value, index) in fileTypes" :value="value" :key="index">{{value}}</Option>
                </Select>
            </div>
            <div class="tool-item">
                <Button type="primary" icon="ios-download-outline" @click="download">保存图片</Button>
            </div>
        </div> <!-- mol-view-head 结束 -->
        <div class="mol-view-body">
            <div class="mol-view-canvas" v-show="data" :style="contentStyle" ref="molView"></div>
        </div> <!-- mol-view-body 结束 -->
    </div> <!-- mol-view 结束 -->
</template>

<script>
// 引入mol解析框架
import $3Dmol from 'static/jsmol/3Dmol-nojquery-min.js';
// 引入公共方法
import { download } from 'common/js/Base.js';

// 支持文件类型
const fileTypes = ["cdjson", "json", "cube", "gro", "mcif", "cif", "mmtf", "mol2", "pdb", "pqr", "prmtop", "sdf", "vasp", "xyz"];
// 默认展示形状配置
const defaultTypeConfig = { color: 'spectrum' };

// 输出
export default {
    // 组件名称
    name: 'mol-view',
    // 属性
    props: {
        // 渲染数据
        data: String,
        // 画布宽度
        width: { type: String, default: '100%' },
        // 画布高度
        height: { type: String, default: '400px' },
        // 文件类型
        defaultFileType: String,
        // 画布背景颜色
        defaultBackgroundColor: String,
        // 展示形状类型
        defaultType: String
    },
    data () {
        return {
            // 支持的文件类型
            fileTypes,
            // 背景颜色
            backgroundColor: "#f2f2f2",
            // 展示类型 line、cross、stick、sphere、cartoon
            type: "sphere",
            // 文件类型
            fileType: "sdf"
        }
    },
    computed: {
        // 画布容器样式
        contentStyle () {
            return {
                // 宽度
                width: this.width,
                // 高度
                height: this.height
            }
        },
    },
    watch: {
        // 观察显示数据
        data(val) {
            console.log(val)
            // this.initViewer();
        },
        // 背景颜色发生改变
        backgroundColor(val) {
            this.setBackgroundColor(val);
        },
        // 形状类型发生改变
        type() {
            // 调用方法
            this.setStyle(true);
        }
    },
    mounted() {
        // 如果存在背景颜色
        if(this.defaultBackgroundColor) {
            this.backgroundColor = this.defaultBackgroundColor;
        }
        // 如果存在默认文件类型
        if(this.defaultFileType) {
            this.fileType = this.defaultFileType;
        }
        // 如果存在展示类型
        if(this.defaultType) {
            this.type = this.defaultType;
        }
        // 初始化渲染
        this.initViewer();
    },
    methods: {
        // 初始化渲染对象
        initViewer() {
            // 如果之前没有初始化
            if(!this.$viewer) {
                // 获得对象
                let $box = $(this.$refs.molView);
                // 获得渲染对象
                this.$viewer = $3Dmol.createViewer($box, { backgroundColor: this.backgroundColor });
            } else {
                this.$viewer.clear();
            }
            // 设置数据
            this.$viewer.addModel(this.data, this.fileType); 
            // 设置显示风格
            this.setStyle();
            // 缩放
            this.$viewer.zoomTo();
            // 渲染画布
            this.$viewer.render();
            // 缩放
            this.$viewer.zoom(0.9, 1000); 
        },
        // 设置样式
        setStyle(isRender) {
            // 样式配置
            let obj = {};
            
            // 设置展示类型及样式
            obj[this.type] = defaultTypeConfig;
            // 设置到实例中
            this.$viewer.setStyle({}, obj);
            // 是否需要渲染
            if(isRender) {
                // 渲染
                this.$viewer.render();
            }
        },
        // 设置背景颜色
        setBackgroundColor(val) {
            this.$viewer.setBackgroundColor(val || this.backgroundColor);
        },
        // 获得图片地址 用于保存图片
        getImageUrl() {
            return this.$viewer.pngURI();
        },
        // 文件类型改变事件
        fileTypeChange() {
            // 重新渲染
            this.initViewer();
        },
        // 保存图片
        download() {
            // 获得导出数据
            let imgData = this.getImageUrl();
            // 如果图片存在
            if(imgData) {
                download("图片", imgData);
            }
            else {
                this.$Message.error("获取图片数据失败！");
            }
        }
    }
};
</script>