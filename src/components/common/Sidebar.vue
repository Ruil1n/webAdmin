<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
// 如果需要分权限显示不同的目录再改 目前默认都显示这些
    import { getCurrentUserInfo } from '@/api/user'
    export default {
        data() {
            return {
                userItems: [
                    {
                        icon: 'el-icon-setting',
                        index: '/dashboard',
                        title: '系统首页'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: '表格',
                        subs: [
                            {
                                index: '/basetable',
                                title: '基础表格'
                            },
                            {
                                index: '/vuetable',
                                title: 'Vue表格组件'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: '3',
                        title: '表单',
                        subs: [
                            {
                                index: '/baseform',
                                title: '基本表单'
                            },
                            {
                                index: '/vueeditor',
                                title: '编辑器'
                            },
                            {
                                index: '/markdown',
                                title: 'markdown'
                            },
                            {
                                index: '/upload',
                                title: '文件上传'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: '/basecharts',
                        title: '图表'
                    },
                    {   icon:'el-icon-star-on',
                        index:'/device',
                        title:'设备管理'

                    },
                    {   icon: 'el-icon-upload2',
                        index: '/Test',
                        title: '测试'
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: '/group',
                        title: '群组管理'
                    }
                    ],
                adminItems:
                    {
                    icon: 'el-icon-star-on',
                    index: '1',
                    title: '系统管理',
                        subs:[
                            {
                                index: '/admin/device',
                                title: '设备管理'
                            },
                            {
                                index: '/admin/alllog',
                                title: '设备日志'
                            },
                            {
                                index: '/admin/group',
                                title: '群组管理'
                            },
                            {
                                index: '/admin/alluser',
                                title: '所有用户'
                            }
                        ]
                    },
                items: []
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created() {
            getCurrentUserInfo().then((data) => {
                // console.log(data.data.authorities.indexOf("ROLE_ADMIN"))
                if(data.data.authorities.indexOf("ROLE_ADMIN")=== -1){
                    this.items=this.userItems;
                }else{
                    this.items=this.userItems;
                    this.items.push(this.adminItems);
                }
                
            })
        },
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
