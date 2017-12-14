<style lang="scss" scope>
// 引入公共变量及方法
@import '~common/scss/public/base-url.scss';
.init-data {
    .init-cont {
        padding:20px 20px;
        background:#fff;
        border-bottom: 320px solid #ECF0F5;
    }
}
</style>
<template>
    <div class="init-data">
        <div class="init-cont">
            <p>高通量测序仪(如Illumina HiSeq2000/HiSeq2500/Miseq)得到的原始图像数据文件经CASAVA碱基识别(Base Calling)分析转化为原始测序序列（Sequenced Reads），我们称之为 Raw Data或Raw Reads，结果以 FASTQ (简称为fq)文件格式存储，其中包含测序序列（reads）的序列信息以及其对应的测序质量信息。</p>
            <p>FASTQ格式文件中每个read由四行描述，如下：</p>
            <p>@HWI-ST1106:749:H0V1GADXX:2:1101:1213:2133 1:N:0:CTTGTA</p>
            <p>CGTTGTCAATGGTGTCAGAGGACTCCACCTCCAGGGTAATGGTCTTACCAGTGAGGGTCTTGACGAAGATCTGCATACCACCACGGAGGCG</p>
            <p>+</p>
            <p>@@@DDDDDF8CBDFFGIEHIFII3CFEIIIIIIGBFFFBFEFFICFEFIII0??BFF-=CD@FFFFBAEFFDBDDDDCBACCBBBBBBBB9</p>
            <p>其中第一行以“@”开头，随后为Illumina 测序标识别符(Sequence Identifiers)和描述文字(选择性部分)；</p>
            <p>第二行是碱基序列；</p>
            <p>第三行以“+”开头，随后为Illumina 测序标识别符(选择性部分)；</p>
            <p>第四行是对应碱基的测序质量，该行中每个字符对应的 ASCII 值减去 33，即为对应第二行碱基的测序质量值。</p>
        </div>
    </div>
</template>
<script>

export default {
    name:"initial-data",
    data() {
        return {
            
        }
    },
    // 实例创建时
    created() {
    },
    watch: {

    },
    methods: {
    
    }
}
    
</script>