import Vue from 'vue';
import {
    Message
  } from 'element-ui'
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/dashboard',
            meta: {
                requireAuth: true,
            },
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    meta: {
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve)
                },
                {
                    path: '/basetable',
                    meta: {
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/vuetable',
                    meta: {
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/baseform',
                    meta: {
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    path: '/vueeditor',
                    meta: {
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/markdown',
                    meta: {
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/upload',
                    meta: {
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/basecharts',
                    meta: {
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
                },
                {
                    path: '/drag',
                    meta: {
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/device',
                    meta: {
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/DeviceManage.vue'], resolve) //设备管理
                },
                {
                    path: '/Test',
                    meta: {
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/Test.vue'], resolve) //测试页面
                },
                {
                    path: '/group',
                    meta: {
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/GroupManage.vue'], resolve) //测试页面

                },
                {
                    path: '/admin/device',
                    meta: {
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/admin/DeviceManage.vue'], resolve) //测试页面

                },
                {
                    path: '/admin/group',
                    meta: {
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/admin/GroupManage.vue'], resolve) //测试页面

                },
                {
                    path: '/admin/alluser',
                    meta: {
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/admin/AllUser.vue'], resolve) //全部用户

                },
                {
                    path: '/admin/alllog',
                    meta: {
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/admin/AllLog.vue'], resolve) //全部用户

                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
//检查是否登陆
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (window.localStorage.getItem('username')===null) {
            Message.error({
                message: '请登陆!'
                })
                next({
                    path: '/login',
                })
        }
        else {
            next();
        }
    }
    else {
        next();
    }
})
export default router