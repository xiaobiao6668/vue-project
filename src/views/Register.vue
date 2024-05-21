<template>
    <el-container style="height: 100%" class="login">
        <el-header class="header">
            <div class="logo">
                <span>细胞图像处理系统</span>
            </div>
        </el-header>
        <el-main class="content">
            <div class="form">
                <el-form
                    label-position="top"
                    label-width="auto"
                    :model="userInfo"
                    style="max-width: 500px; margin: auto"
                >
                    <el-form-item label="账号">
                        <el-input v-model="userInfo.account" maxLength="20" />
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="userInfo.email" maxLength="20" />
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input
                            v-model="userInfo.pwd"
                            type="password"
                            show-password
                            maxlength="20"
                        />
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input
                            v-model="userInfo.confirmPwd"
                            type="password"
                            show-password
                            maxlength="20"
                        />
                    </el-form-item>
                    <el-form-item></el-form-item>
                    <div style="display: flex; justify-content: space-around">
                        <el-button @click="backLogin" style="width: 100px; margin-right: 10px"
                            >返回登陆</el-button
                        >
                        <el-button type="primary" @click="registerHandler" style="width: 100px"
                            >注册账号</el-button
                        >
                    </div>
                </el-form>
            </div>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import Api from '@/api/login'
const router = useRouter()
const userInfo = reactive({
    account: '',
    email: '',
    pwd: '',
    confirmPwd: ''
})
function backLogin() {
    router.go(-1)
}
function registerHandler() {
    if (checkInput(userInfo)) {
        const params = {
            userName: userInfo.account,
            email: userInfo.email,
            passwordHash: userInfo.pwd
        }
        Api.register(params).then(() => {
            ElMessage.success('注册成功')
            router.push('/login')
        })
    }
}
function checkInput(userInfo: { account: string; email: string; pwd: string; confirmPwd: string }) {
    if (!userInfo.account) {
        ElMessage.error('请输入账号')
        return false
    }
    if (!userInfo.email) {
        ElMessage.error('请输入邮箱')
        return false
    }
    if (userInfo.email) {
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!reg.test(userInfo.email)) {
            ElMessage.error('邮箱格式不正确')
            return false
        }
    }
    if (!userInfo.pwd) {
        ElMessage.error('请输入密码')
        return false
    }
    if (userInfo.pwd !== userInfo.confirmPwd) {
        ElMessage.error('两次密码输入不一致')
        return false
    }
    return true
}
onMounted(() => {})
</script>

<style lang="scss">
.login {
    background-image: url('@/assets/loginbg.jpg');
    background-size: 100% 100%;
}
.logo {
    height: 57px;
    line-height: 57px;
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    color: #fff;
}
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(76, 178, 117, 0.65);
    // background: url('@/assets/headerbg.png') no-repeat;
    // background-size: 100% 100%;
    height: 57px;
    // border-bottom: var(--el-border);
    .header-left {
        display: flex;
        align-items: center;
        .menu-btn {
            cursor: pointer;
            &:active {
                opacity: 0.5;
            }
        }
        .main-title {
            margin-left: 8px;
            font-size: 18px;
            line-height: 1;
            font-weight: 600;
        }
    }
    .header-right {
        line-height: 1;
        .el-dropdown-link {
            cursor: pointer;
            color: var(--el-color-primary);
            display: flex;
            align-items: center;
        }
    }
}
.content {
    width: 100%;
    display: flex;
}
.form {
    width: 600px;
    // height: 600px;
    border-radius: 14px;
    margin: auto;
    padding: 100px 80px;
    background-color: rgba(76, 178, 117, 0.65);
}
</style>
