// 工具按钮配置
export const toolbars = [
    [
        'bold',                  // 加粗
        'italic',                // 斜体
        'underline',             // 下划线
        'justifyleft',           // 居左对齐
        'justifyright',          // 居右对齐
        'justifycenter',         // 居中对齐
        'justifyjustify',        // 两端对齐
        'insertorderedlist',     // 有序列表
        'insertunorderedlist',   // 无序列表
        'lineheight',            // 行间距
        'forecolor',             // 字体颜色
        'backcolor',             // 背景色
        'strikethrough',         // 删除线
        'link',                  // 超链接
        'indent',                // 首行缩进
        'touppercase',           // 字母大写
        'tolowercase',           // 字母小写
        'subscript',             // 下标
        'superscript',           // 上标
        'horizontal',            // 分隔线
        'paragraph',             // 段落格式
        'fontsize',              // 字号
        'formatmatch',           // 格式刷
        'selectall',             // 全选
        'preview',               // 预览
        'pasteplain',            // 纯文本粘贴模式
        'removeformat',          // 清除格式
        'inserttable',           // 插入表格
        'mergecells',            // 合并多个单元格
        'insertrow',             // 前插入行
        'insertcol',             // 前插入列
        'deleterow',             // 删除行
        'deletecol',             // 删除列
        'splittorows',           // 拆分成行
        'splittocols',           // 拆分成列
        'splittocells',          // 完全拆分单元格
        'deletecaption',         // 删除表格标题
        'inserttitle',           // 插入标题
        'deletetable',           // 删除表格
        'simpleupload',          // 单图上传
        'insertimage',           // 多图上传
        'edittable',             // 表格属性
        'edittd',                // 单元格属性
        'spechars',              // 特殊字符
        'fullscreen',            // 全屏
        'edittip ',              // 编辑提示
        'template',              // 模板
        'source',                // 源代码
    ]
];


/**
 * 表单设计相关
 */

// 百度编辑器控件名称
export const pluginName = "vueForm";

// 安装百度编辑器控件方法
export function installPlugin(name) {
    // 安装表单设计控件
    UE.plugins[name] = function() {
        // 当前编辑器实例 注意是实例
        let self = this;
        // 百度的弹出框组件
        let popup = new UE.ui.Popup( {
            // 当前编辑器实例
            editor: self,
            // 弹出框内容
            content: '',
            // 弹出框class名称
            // className: 'edui-bubble',
            // 编辑表单模块
            edit: function () {
                ///设置当前编辑的DOM对象
                UE.plugins[name].editdom = this.editdom;
                // 打开表单组件的弹出框
                self.open(this.type);
                // 关闭弹框
                this.hide();
            },
            // 删除表单模块
            delete:function(){
                if( window.confirm('确认删除该控件吗？') ) {
                    UE.dom.domUtils.remove(this.editdom,false);
                }
                this.hide();
            }
        } );
        // 渲染弹出框
        popup.render();
        // 添加数据移动事件 
        this.addListener( 'mouseover', function( t, evt ) {
            // event事件对象
            evt = evt || window.event;
            // 获得操作DOM 对象
            let $el = $(evt.target || evt.srcElement);

            // 如果当前目标不是表单模块 查找父级
            if (!$el.hasClass("form-module")) {
                $el = $el.parents(".form-module").eq(0);
            }
            // 表单设计控件名称
            let moduleClass = $el.attr(formModulePrefix + 'class'),
                // 表单模块名称
                type = $el.attr(formModulePrefix + 'type');

            // 如果是属于表单设计控件 并类型存在
            if (moduleClass === "form-module" && type) {
                // 弹出框渲染内容
                let html = popup.formatHtml(
                    '<nobr>表单控件: <span onclick=$$.edit() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$.delete() class="edui-clickable">删除</span></nobr>' );
                if (html) {
                    // 渲染编辑器弹出层内容
                    popup.getDom( 'content' ).innerHTML = html;
                    // 设置弹出层的操作DOM
                    popup.editdom = $el.get(0);
                    // 设置模块类型
                    popup.type = type;
                    // 显示弹出框 传入显示DOM 根据DOM控制位置
                    popup.showAnchor( $el.get(0) );
                } else {
                    popup.hide();
                }
            }
        });
    };
}

// 表单模块前缀 用于创建VUE组件和模块属性前缀
export const formModulePrefix = 'module_';
// 表单模块唯一标识
export const formModuleClass = 'form-module';

// 表单模块列表
export const formModules = [
    {
        title: "文本",
        name: "text"
    },
    {
        title: "单选",
        name: "radio"
    }
];

/**
 * 创建一个主容器
 * @param   {String/Object} opts [
 *     如果为字符串，则代表类型 
 *     如果多个参数，必须用对象：
 *     class: 模块唯一标识 自动生成 vueForm
 *     title：模块中文名称
 *     name: 模块变量名称
 *     type: 模块类型
 * ]
 * @return  {Object}        $box [jQuery对象]
 */
export function createBox(opts) {
    // 创建主容器
    let $box = $('<span class="form-module"></span>');
    // 默认配置项
    let config = {
        // 唯一标识
        "class": formModuleClass
    };
    // 获得配置参数
    opts = M.isObject(opts) ? opts : { "type": opts } ;
    // 合并参数
    M.extend(config, opts);
    // 生成属性
    M.each(config, function(value, key) {
        $box.attr(formModulePrefix + key, value || "");
    });
    return $box;
}


/**
 * 设置表单模块上的属性
 * @param {Object} $obj   [jQuery对象]
 * @param {Object} attrs  [属性集合,为对象类型]
 */
export function setAttr($obj, attrs) {
    // 如果为空
    if (!M.isObject($obj)) return;
    // 遍历所有属性
    M.each(attrs, function (value, key) {
        $obj.attr(formModulePrefix + key, value || "");
    })
}
/**
 * 获得表单模块上的属性
 * @param {Object}       $obj   [jQuery对象]
 * @param {String/Array} attrs [属性名称或者包含多个属性名称的数组]
 */
export function getAttr($obj, attrs) {
    // 如果为空
    if (M.isNull(attrs)) return;
    // 判断是否为数组
    let isArray = M.isArray(attrs),
        // 结果
        res = {};
    //处理参数
    attrs = isArray ? attrs : [attrs];
    // 遍历参数
    M.each(attrs, function (key) {
        res[key] = $obj.attr(formModulePrefix + key) || "";
    });
    // 返回结果
    return isArray ? res : res[attrs];
}
