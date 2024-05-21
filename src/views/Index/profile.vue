<template>
    <div>
        <el-container>
            <el-main class="content">
                <el-form :rules="rules" ref="form" :model="formInfo" label-width="120px">
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="formInfo.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="formInfo.email"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="passwordHash">
                        <el-input type="password" v-model="formInfo.passwordHash"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleSubmit">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Api from '@/api/user'
import { ElMessage } from 'element-plus'
const formInfo = ref({
    userName: '',
    email: '',
    passwordHash: ''
})
const form = ref()
const rules = {
    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
    ],
    passwordHash: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在6到20位之间', trigger: 'blur' }
    ]
}
function getUserInfo() {
    Api.getUserInfo().then((res) => {
        formInfo.value = {
            userName: res.data.userName,
            email: res.data.email,
            id: res.data.id,
            passwordHash: ''
        }
    })
}
function handleSubmit() {
    form.value.validate((valid) => {
        if (!valid) return
        Api.changeUserInfo(formInfo.value).then(() => {
            ElMessage.success('修改成功')
            getUserInfo()
        })
    })
}
onMounted(() => {
    getUserInfo()
})
</script>
<style scoped lang="scss" type="text/scss">
.content {
    padding: 20px 70px;
}
</style>
