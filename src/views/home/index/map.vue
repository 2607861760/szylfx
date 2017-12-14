<template>
    <!--地图容器-->
    <div id='allmap'></div>
    
</template>
<script>
import {MP} from '../../../map.js'
    export default {
        name:'',
        data () {
            return {}
        },
        mounted(){  
            this.$nextTick(function(){  
            //   var _this = this;  
              MP().then(BMap => {  
                 var map = new BMap.Map("allmap");
				 map.centerAndZoom(new BMap.Point(116.313517,39.985676), 18);  // 初始化地图,设置中心点坐标和地图级别
				 map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
				 map.enableDoubleClickZoom(true);     //开启双击鼠标缩放
                 var point = new BMap.Point(116.31305,39.98561);//创建标注点    
				 var marker = new BMap.Marker(point);  // 创建标注
				 map.addOverlay(marker);               // 将标注添加到地图中 
    })
  })
}}
</script>
<style scoped>
    #allmap{
            width: 100%;
            height: 100%;
            overflow: hidden;
            margin: 0;
            font-family: "微软雅黑";
        }
</style>