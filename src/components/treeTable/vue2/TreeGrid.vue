<template>
    <div style='width:100%;border:1px solid #dfe6ec' class="tree">
        <el-table   :data="data" border style="width: 100%" :row-style="showTr" @row-click="rowClick" ref="treeTable" highlight-current-row>
            <el-table-column v-for="(column, index) in columns" :min-width="column.width" :key="column.dataIndex" :label="column.text">
                <template slot-scope="scope">
                    <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space"></span>
                    <!-- <span v-if="!scope.row.children.length" class="ms-tree-space">---</span> -->
                    <Button type="text" class="boult" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
                        <span v-if="!scope.row._expanded">
                    <Icon type="chevron-right"></Icon>
                    </span>
                        <span v-if="scope.row._expanded">
                    <Icon type="chevron-down"></Icon>
                    </span>
                    </Button>
                    <span v-else-if="index===0" class="ms-tree-space"></span> {{scope.row[column.dataIndex]}}
                </template>
            </el-table-column>
            <el-table-column label="操作" v-if="treeType === 'normal'" min-width="10%" >
                <template slot-scope="scope">
                    <div style="width:100%;text-align:center;">
                        <Button style="padding:2px 18px;font-size:12px;background:#4578ad;" type="primary" v-if="scope.row.type=='fastq'||scope.row.type=='vcf'" size="small" @click="copy(scope.row)">
                            添加
                        </Button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import Utils from '../utils/index.js'
import { data} from 'api/index.js'
import {getCookie} from '@/common/js/cookie.js'
//  import Vue from 'vue'
export default {
    name: 'tree-grid',
    props: {
        // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
        treeStructure: {
            type: Boolean,
            default: function() {
                return false
            }
        },
        // 这是相应的字段展示
        columns: {
            type: Array,
            default: function() {
                return []
            }
        },
        // 这是数据源
        dataSource: {
            type: Array,
            default: function() {
                return []
            }
        },
        // 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
        requestUrl: {
            type: String,
            default: function() {
                return ''
            }
        },
        // 这个是是否展示操作列
        treeType: {
            type: String,
            default: function() {
                return 'normal'
            }
        },
        // 是否默认展开所有树
        defaultExpandAll: {
            type: Boolean,
            default: function() {
                return true
            }
        }
    },
    data() {
        return {
            sids:"",
            copyname:[],  //已添加文件
        }
    },
    computed: {
        // 格式化数据源
        data: function() {
            let me = this
            if (me.treeStructure) {
                let data = Utils.MSDataTransfer.treeToArray(me.dataSource, null, null, me.defaultExpandAll)
                return data
            }
            return me.dataSource
        }
    },
    methods: {
        copy(row){
            this.sids=this.$refs.treeTable.$parent.requestUrl;
            let obj={
                "path":row.path,
                "fileName":row.filename,
                "userId":getCookie("userid"),
                "sampleid":this.sids,
                "productId":"1"
            }
            let flag=true;
            if(this.copyname.length=1 && this.copyname[0]==row.filename){
                this.$Message.error({
                    content:'<div class="prompt">该文件已添加</div>',
                    duration: 2
                })
            }else{
                if(flag){
                    flag=false;
                    data.addFastq(obj).then((data)=>{
                        if(data.returnCode=="0" || data.returnCode==0){
                            this.$Message.success({
                                content:'<div class="prompt">'+data.msg+'</div>',
                                duration: 2
                            })
                            this.copyname.push(row.filename)
                        }else {
                            this.$Message.error(data.msg);
                        }
                        flag=true;
                    })
                }
            }
        },
        setRow(row) {
            this.$refs.treeTable.setCurrentRow(row)
        },
        rowClick(row, event, column) {
            this.$emit("row-click", row, event, column)
        },
        // tableBtnClick(name, row) {
        //     this.$emit("operate", name, row)
        // },
        // 显示行
        showTr: function(row, index) {
            let show = (row._parent ? (row._parent._expanded && row._parent._show) : true)
            row._show = show
            return show ? '' : 'display:none;'
        },
        // 展开下级
        toggle: function(trIndex) {
            let me = this
            let record = me.data[trIndex]
            record._expanded = !record._expanded
        },
        // 显示层级关系的空格和图标
        spaceIconShow(index) {
            let me = this
            if (me.treeStructure && index === 0) {
                return true
            }
            return false
        },
        // 点击展开和关闭的时候，图标的切换
        toggleIconShow(index, record) {
            let me = this
            if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
                return true
            }
            return false
        },
        handleDelete() {
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        }
    }
}
</script>
<style scoped>
.ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
}

.ms-tree-space::before {
    content: ""
}

table td {
    line-height: 26px;
}
</style>
