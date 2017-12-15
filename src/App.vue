<style lang="scss">
// 引入全局样式
@import 'common/scss/base-style';

/* 主容器 */

html,
body,
#app {
    width: 100%;
}

body {
    font-size: 14px;
    color: #333;
}


/* 后台主容器 */
html.admin {
    &,
    body,
    #app {
        height: 100%;
        overflow: hidden;
    }
}

// 前台页面
html.home {
    &,
    body,
    #app {
        height: 100%;
    }
}
</style>
<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
import {delCookie} from '@/common/js/cookie.js'
export default {
    data() {
            return {
                nowUrl: M.url()
            }
        },
        created() {
            let search=window.location.search.slice(1,6);
            console.log(search)
            if(search=="code="){
                let code=window.location.search.substr(6).split("&")[0];
                console.log(code) 
                this.$router.push({path:"/admin?code="+code})
                this.initAppStyle();
            }
        },
        watch: {
            // 页面发生跳转时事件
            $route: function() {
                this.initAppStyle();
            }
        },
        methods: {
            // //初始化主容器样式
            initAppStyle() {
                // 获得当前路径
                let path = this.$route.path,
                    // 获得html对象
                    $html = document.getElementsByTagName("html")[0],
                    // 当前body的class
                    htmlClassName = $html.className;

                // 判断是否为后台页面
                if (path && path.includes("admin")) {
                    // 如果之前不是admin
                    if (htmlClassName != "admin") $html.className = "admin";
                } else {
                    // 如果之前不是 home
                    if (htmlClassName != "home") $html.className = "home";
                }
            }
        }
}
</script>
