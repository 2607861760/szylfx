import Vue from 'vue';
// 引入vue-router
import VueRouter from 'vue-router';

// 注册路由组件
Vue.use(VueRouter);

const router=new VueRouter({
    mode: 'history',
    // history: false,
    // hashbang:true,
    // 路由配置
    routes: [
        {
            path: '/',
            component: resolve => require(['@/views/home/home/home.vue'], resolve),
            redirect: '/home',
            children:[
                {
                    path: '/home',
                    component: resolve => require(['@/views/home/index/index.vue'], resolve),
                }
            ]
        },
        {
            path: '/register',
            component: resolve => require(['@/views/home/register/register.vue'], resolve)
        },
        {
            path:'/login',
            component: resolve => require(['@/views/home/login/login.vue'], resolve)
        },
        {
            path: '/admin',
            name: "后台主页",
            component: resolve => require(['@/views/admin/index/index.vue'], resolve),
            children: [{
                path: '/admin/tumour',
                component: resolve => require(['@/views/admin/information/mydata/mydata.vue'], resolve)
            },{
                path: '/admin',
                component: resolve => require(['@/views/admin/gene/mydata/mydata.vue'], resolve)
            },{
                name:"editgene",
                path: '/admin/gene/edit',
                component: resolve => require(['@/views/admin/gene/patient/patientedit.vue'], resolve) 
            },{
                name:"patientgene",
                path: '/admin/gene/info',
                component: resolve => require(['@/views/admin/gene/patient/patient.vue'], resolve) 
            },{
                name:"patienttumour",
                path: '/admin/tumour/info',
                component: resolve => require(['@/views/admin/information/patient/patient.vue'], resolve) 
            },{
                name:"patientedittumour",
                path: '/admin/tumour/edit',
                component: resolve => require(['@/views/admin/information/patient/patientedit.vue'], resolve) 
            },{
                name:"newsample",
                path: '/admin/tumour/newsample',
                component: resolve => require(['@/views/admin/information/patient/newsample.vue'], resolve) 
            },{
                name:"newsamplegene",
                path: '/admin/gene/newsample',
                component: resolve => require(['@/views/admin/gene/patient/newsample.vue'], resolve) 
            },{
                name:"fileup",
                path: '/admin/fileup',
                component: resolve => require(['@/views/admin/file/file.vue'], resolve) 
            },{
                name:"fileup",
                path: '/admin/addfile',
                component: resolve => require(['@/views/admin/file/addfile.vue'], resolve) 
            },{
                name:"task",
                path: '/admin/task-management',
                component: resolve => require(['@/views/admin/task/task-management.vue'], resolve) 
            },{
                name:"details",
                path: '/admin/task-details',
                component: resolve => require(['@/views/admin/task/task-details.vue'], resolve) 
            },{
                name:"detailstumour",
                path: '/admin/task-details-tumour',
                component: resolve => require(['@/views/admin/task/task-details-tumour.vue'], resolve) 
            },{
                name:"userinfo",
                path: '/admin/userinfo',
                component: resolve => require(['@/views/admin/index/userinfo.vue'], resolve) 
            },{
                name:"process",
                path: '/admin/process',
                component: resolve => require(['@/views/admin/task/process.vue'], resolve) 
            },{
                name:"cgdap",
                path: '/admin/tumour/cgdap',
                component: resolve => require(['@/views/admin/information/patient/cgdap.vue'], resolve) 
            }]
        },
        {
            path: '/test',
            name: "测试",
            component: resolve => require(['@/views/test/test.vue'], resolve)
        }
    ]
});
export default router;
