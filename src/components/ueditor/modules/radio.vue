<template>
    <Form :model="formData" :label-width="80">
        <FormItem label="输入框">
            <Input v-model="formData.input" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="选择器">
            <Select v-model="formData.select" placeholder="请选择">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select>
        </FormItem>
    </Form>
</template>

<script>

// 输出
export default {
    // 属性
    props: {
    },
    // 数据
    data () {
        return {
            // 表单数据
            formData: {}
        };
    },
    // 实例创建完成
    created() {
        // 安装编辑器插件
        this.install();
    },
    // 方法
    methods: {
        getDom() {

        },
        setDom(dom) {
            console.log(dom);
        }
    }
};
</script>