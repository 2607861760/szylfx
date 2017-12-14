<style lang="scss" scoped>
.home{
    position: relative;
    min-height: 100%;
    font-family:"微软雅黑",Arial;
}
</style>
<template>
    <div class="home">
        <v-header></v-header>
        <router-view></router-view>
        <v-footer></v-footer>
    </div>
</template>
<script>
import vHeader from '@/views/home/header/header.vue';
import vFooter from '@/views/home/footer/footer.vue';
export default {
    name: "home",
    components: {
        vHeader,
        vFooter
    },
    mounted(){
        document.body.setAttribute("style","background:#fff")
    }
}
</script>
