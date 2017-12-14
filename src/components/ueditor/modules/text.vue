<template>
    <Form :model="formData" :label-width="100">
        <FormItem label="元数据名称">
            <Input v-model="formData.name" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="宽度">
            <Input v-model="formData.width">
            <Select v-model="formData.widthUnit" slot="append" style="width: 80px">
                <Option value="%">百分比</Option>
                <Option value="px">像素</Option>
            </Select>
            </Input>
        </FormItem>
    </Form>
</template>

<script>
// 引入编辑器组件使用的变量、函数等资源
import { createBox, getAttr, setAttr } from '../mixins.js';

// 默认配置
const defaultFormData = {
    // 元数据名称
    name: "",
    // 宽度
    width: 200,
    // 宽度单位
    widthUnit: "px"
};

// 输出
export default {
    // 属性
    props: {
    },
    // 数据
    data() {
        return {
            // 表单数据
            formData: {},
        };
    },
    // 观察者
    watch: {
    },
    // 实例创建完成
    created() {
        // 进行初始化
        this.init();
    },
    // 方法
    methods: {
        // 初始化
        init() {
            // 初始化表单数据
            this.formData = M.clone(defaultFormData);
            // 根据已设计的DOM 生成表单配置
            this.setValue();
        },
        // 获得DOM 方法 提供给编辑器组件使用
        getValue() {
            // 表单模块配置参数
            let formData = this.formData,
                // 元数据名称
                name = formData.name;
            // 如果元数据名称存在
            if (name) {
                // 获得表单模块主容器
                let $box = createBox({
                        // 元数据变量
                        name,
                        // 模块类型
                        type: 'text',
                        // 宽度单位
                        widthUnit: formData.widthUnit
                    }),
                    // 输入框
                    $input = $('<input v-model="'+ name +'" type="text">'),
                    // 输入框宽度
                    width = M.toNumber(formData.width);

                // 处理宽度
                width = M.isNumber(width) && width >= 0 ? width : 200;
                // 设置宽度
                setAttr($box, { width });
                // 根据表单配置数据生成当前模块DOM
                $input.css({
                    width: width + formData.widthUnit
                });
                // 插入输入框
                $box.html($input);
                // 输出
                return $box.get(0);
            }
        },
        // 设置表单模块内容 根据当前选中的DOM 生成表单模块配置
        setValue() {
            // 获得编辑DOM
            let $el = $(UE.plugins.vueForm.editdom);
            // 如果DOM存在
            if ($el.length) {
                // 获得相关属性
                let attrs = getAttr($el, ["name", "width", "widthUnit"]);
                // 设置当前数据
                this.formData = attrs;
                console.log($el.get(0))
                console.log(attrs)
            }
        },
    }
};
</script>