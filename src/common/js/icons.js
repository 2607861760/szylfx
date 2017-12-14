/*
 * @Author: jaxQin
 * @Date:   2017-07-28 10:21:32
 * @Last Modified by:   anchen
 * @Last Modified time: 2017-09-25 16:00:14
 */

// 基础公共图标
const basic = [{
    value: "ionic"
}, {
    value: "navicon-round"
}, {
    value: "navicon-round"
}, {
    value: "navicon-round"
}];

// 数据库，工具专用图标
const tool = [
{
    value: require("../images/index-icon/image.png"),
    name: "image",
    title: "影像资料数据库"
},
{
    value: require("../images/index-icon/export.png"),
    name: "export",
    title: "报告生成"
},
{
    value: require("../images/index-icon/file.png"),
    name: "file",
    title: "文件数据库"
},
{
    value: require("../images/index-icon/illness.png"),
    name: "illness",
    title: "疾病诊疗数据库"
},
{
    value: require("../images/index-icon/database.png"),
    name: "database",
    title: "科研数据数据库"
},
{
    value: require("../images/index-icon/medicine.png"),
    name: "medicine",
    title: "药物循征数据库"
},{
    value: require("../images/index-icon/project.png"),
    name: "project",
    title: "科研项目库"
},{
    value: require("../images/index-icon/slow.png"),
    name: "slow",
    title: "慢病管理数据库"
},{
    value: require("../images/index-icon/term.png"),
    name: "term",
    title: "术语库"
}];


// 文件相关图标
const file = [{
    value: "ionic",
    name: "word"
}, {
    value: "navicon-round",
    name: "pdf"
}, {
    value: "navicon-round",
    name: "excel"
}, {
    value: "navicon-round",
    name: "txt"
}];

// 输出图标
export const icons = {
    basic,
    file,
    tool
}
