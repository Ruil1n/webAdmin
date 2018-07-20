<template>
    <div class="dashboard">
        <div class="el-row" >
            <div class="el-col">
                <div class="el-row">
                        el-card展示 显示用户信息
                        <br>
                        {{user.username}}
                        <br>
                        {{user.email}}
                        <br>
                        {{user.phone}}
                        <br>
                        el-card展示 获取web服务器详情
                        <br>
                        先把接口模仿写到api目录下 然后import 进来 mounted里面调api 
                        <br>
                        el-card展示 EMQ服务器详情
                </div>
            </div>
            
            xxxxx 
        </div>
    </div>
</template>

<script>
import { getCurrentUserInfo } from '@/api/user'
    export default {
        data: function() {
            return {
                user:{}
            }
        },
        mounted() {
            getCurrentUserInfo().then((data) => {
                                this.user=data.data
                            })
        },
    }
</script>

<style scoped>
.user-avator{
    width: 120px;
    height: 120px;
    border-radius: 50%
}
</style>