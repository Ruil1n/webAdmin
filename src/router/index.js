import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/dashboard',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve)
                },
                {
                    path: '/basetable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    path: '/vueeditor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
                },
                {
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/device',
                    component: resolve => require(['../components/page/DeviceManage.vue'], resolve) //设备管理
                },
                {
                    path: '/Test',
                    component: resolve => require(['../components/page/Test.vue'], resolve) //测试页面
                },
                {
                    path: '/group',
                    component: resolve => require(['../components/page/GroupManage.vue'], resolve) //测试页面

                },
                {
                    path: '/admin/device',
                    component: resolve => require(['../components/page/admin/DeviceManage.vue'], resolve) //测试页面

                },
                {
                    path: '/admin/group',
                    component: resolve => require(['../components/page/admin/GroupManage.vue'], resolve) //测试页面

                },
                {
                    path: '/admin/power',
                    component: resolve => require(['../components/page/admin/Power.vue'], resolve) //测试页面

                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
