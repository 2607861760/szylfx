<style lang="scss" scoped>

</style>
<template>
	<div>
		<!-- 编辑器 -->
		<div :id="id" :style="ueditorStyle" ref="ueditor"></div>
		<!-- 表单设计控件 -->
		<div v-if="formDesign">
			<!-- 表单项目组件弹出框 -->
			<Modal v-model="vueFormModal" title="表单设计弹框">
				<!-- 表单模块配置 -->
				<component ref="moduleForm" :is="nowFormModule"></component>
				<div class="foot-btn" slot="footer">
					<Button type="primary" shape="circle" :loading="okLoading" @click="saveFormItem">确定</Button>
				</div>
			</Modal>
		</div>
	</div>
</template>



<script>
// 引入编辑器配置
import 'static/ueditor/ueditor.config.js';
// 编辑器程序
import 'static/ueditor/ueditor.all.js';
// 编辑器语言
import 'static/ueditor/lang/zh-cn/zh-cn.js';
// 引入编辑器组件使用的变量、函数等资源
import { toolbars, pluginName, installPlugin, formModulePrefix, formModules } from './mixins.js';

// 安装百度编辑器控件-vueForm 用于表单设计
installPlugin(pluginName);

// 表单控件组件路径
let formPluginPaths = {},
	// 表单控件名称
	formPluginNames = [];

// 处理表单设计控件
function handleFormPlugins() {
	// 遍历数组
	M.each(formModules, function(item) {

		// 获得控件名称
		let name = item.name;
		// 放入路径
		if (name) {
			// 设置组件加载路径
			formPluginPaths[formModulePrefix + name] = resolve => require(['./modules/' + name], resolve);
		}
	})
}
// 调用函数
handleFormPlugins();
// console.log(formPluginPaths)
// console.log(formPluginNames)

// 配置项
const options = {
	// 自定义操作工具
	toolbars,
	// 关闭elementPath
	elementPathEnabled: false,
	// 关闭DIV转换
	allowDivTransToP: false,
	// 自动清除空节点
	autoClearEmptyNode: false,
	// 关闭字数统计
	wordCount: false,
	// css文件组
	iframeCssUrls: [
		// 自定义表单样式
		'/static/ueditor/vue-form/vue-form.css'
	],
};

// 输出
export default {
	// 组件名称
	name: 'ueditor',
	// 属性
	props: {
		// 画布宽度
		width: { type: String, default: '100%' },
		// 画布高度
		height: { type: String, default: '300px' },
		// 初始化参数配置
		options: Object,
		// 工具配置 
		toolbars: Array,
		// 内容
		content: String,
		// 是否启动表单设计功能
		formDesign: { type: String, default: false },
	},
	data() {
		return {
			// 百度编辑器实例
			ueditor: null,
			// 控制表单组件弹框打开状态
			vueFormModal: false,
			// 表单模块
			formModules,
			// 表单模块弹框确定按钮等待动画
			okLoading: false,
			// 当前打开的表单模块
			nowFormModule: null,
			// 当前编辑的DOM
			editdom: null
		}
	},
	// 计算属性
	computed: {
		// 动态生成ID
		id() {
			return "ueditor_" + M.now()
		},
		// 画布样式
		ueditorStyle() {
			return {
				width: this.width,
				height: this.height
			}
		},
		// 是否渲染表单设计控件
		isRenderForm() {
			return this.ueditor && this.formDesign;
		},
		// 表单项目模块查询地图 使用模块名称
		formModulesMap() {
			return M.indexBy(this.formModules, "value");
		}
	},
	watch: {
		// 数据发生改变时
		content(val) {
			this.setContent(val);
		}
	},
	// 实例创建完成
	mounted() {
		// 初始化编辑器
		this.init();
	},
	// 方法
	methods: {
		init() {
			// 获得配置项
			let opts = this.options || options,
				// 获得工具配置
				tools = this.toolbars || toolbars;
			// 设置工具配置
			opts.toolbars = tools;

			// 获得编辑器对象
			this.ueditor = UE.getEditor(this.id, opts);
			// 暴露表单设计弹出框打开方法
			if (this.formDesign) {
				this.ueditor.open = this.open;
			}
			// 设置默认内容
			if (this.content) {
				this.setContent(this.content);
			}
		},
		// 获取内容
		getContent() {
			return this.ueditor.getContent();
		},
		// 设置内容
		setContent(val) {
			if (this.ueditor) {
				// 编辑器渲染完毕
				this.ueditor.ready(() => {
					// 设置默认内容
					this.ueditor.setContent(val);
				});
			}
		},
		// 保存表单项目组件内容
		saveFormItem() {
			// 获得模块生成的DOM
			let dom = this.$refs.moduleForm.getValue();
			// 放入DOM
			if (M.isElement(dom)) {
				// 插入DOM
				this.ueditor.execCommand('insertHtml', dom.outerHTML);
				// 关闭弹框
				this.vueFormModal = false;
			}
			else {
				this.$Message.error("获取DOM失败!");
			}
		},
		// 打开表单模块弹框
		open(type) {
			// 如果模块类型
			if (type) {
				// 设置弹框显示内容 根据表单模块类型决定
				this.nowFormModule = formModulePrefix + type;
				// 如果组件已经存在 调用设置表单模块配置的组件
				if (this.$refs.moduleForm) {
					this.$refs.moduleForm.init();
				}
				// 打开弹框
				this.vueFormModal = true;
				// 当前操作类型
				// console.log("当前表单模块类型为：" + type);
			}
			else {
				this.$Message.error("没有指定表单模块类型");
			}
		}
	},
	// 组件
	components: {
		// 表单设计控件
		...formPluginPaths
	}
};
</script>