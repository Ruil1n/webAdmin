<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="loginParam">
                    <el-input v-model="ruleForm.loginParam" placeholder="loginParam"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { login, getCurrentUserInfo } from '@/api/user'
    export default {
        data: function(){
            return {
                ruleForm: {
                    loginParam: '',
                    password: ''
                },
                rules: {
                    loginParam: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        login(self.ruleForm).then((res) => {
                            getCurrentUserInfo().then((data) => {
                                window.localStorage.setItem('username',data.data.username);
                                // console.log(JSON.stringify(data.data.username));
                                // window.localStorage.setItem('UID',data.data.UID);
                                // window.localStorage.setItem('authorities',data.data.authorities);
                                // window.localStorage.setItem('avatar',data.data.avatar);
                                // window.localStorage.setItem('email',data.data.email);
                                // window.localStorage.setItem('phone',data.data.phone);
                                self.$router.replace({ path: '/dashboard' })
                            })
                    }).catch(() => {
                    })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>