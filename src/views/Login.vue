<template>
    <el-container style="height: 100%" class="login">
        <el-header class="header">
            <div class="logo">
                <span>细胞图像分割系统</span>
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
                    <el-form-item label="账号" v-if="loginType === 'account'">
                        <el-input v-model="userInfo.account" maxlength="20" />
                    </el-form-item>
                    <el-form-item label="邮箱" v-else>
                        <el-input v-model="userInfo.email" maxlength="20"/>
                    </el-form-item>
                    <el-form-item label="密码" maxlength="20">
                        <el-input v-model="userInfo.pwd" type="password" show-password />
                    </el-form-item>
                    <el-form-item></el-form-item>
                    <div style="display: flex; justify-content: space-between">
                        <div><el-checkbox v-model="remember">记住账号</el-checkbox></div>
                        <div>
                            <el-button @click="register" style="width: 100px; margin-right: 10px"
                                >注册</el-button
                            >
                            <el-button type="primary" @click="loginHandler" style="width: 100px"
                                >登陆</el-button
                            >
                        </div>
                    </div>
                </el-form>
            </div>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import Api from '@/api/login'
const router = useRouter()
const remember = ref(false)
const loginType = ref('account')
const userInfo = reactive({
    account: '',
    email: '',
    pwd: ''
})
function register() {
    router.push('/register')
}
function loginHandler() {
    checkInput(userInfo)
    if (remember.value) {
        localStorage.setItem('account', userInfo.account)
        localStorage.setItem('pwd', userInfo.pwd)
    }
    const params = {
        userName: userInfo.account,
        password: userInfo.pwd
    }
    Api.login(params).then((res) => {
        ElMessage.success('登陆成功')
        if (res.data && res.data.id) {
            sessionStorage.setItem('id', res.data.id)
            sessionStorage.setItem('userName', res.data.userName)
            if (res.data.role) {
                sessionStorage.setItem('role', 'admin')
                router.push('/comments')
            } else {
                sessionStorage.setItem('role', 'user')
                router.push('/cellSplit')
            }
        }
    })
}
function checkInput(userInfo: { account: string; pwd: string }) {
    if (!userInfo.account) {
        ElMessage.error('请输入账号')
        return false
    }
    if (!userInfo.pwd) {
        ElMessage.error('请输入密码')
        return false
    }
    return true
}
onMounted(() => {
    const account = localStorage.getItem('account')
    const pwd = localStorage.getItem('pwd')
    if (account && pwd) {
        userInfo.account = account
        userInfo.pwd = pwd
    }
})
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
