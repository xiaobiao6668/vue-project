<template>
    <div
        style="
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        "
    >
        <el-result title="404" sub-title="您访问的页面不存在">
            <template #icon>
                <Image404 style="width: 252px; height: 292px"></Image404>
            </template>
            <template #extra>
                <el-button @click="$router.go(-1)">返回之前页面</el-button>
                <el-button @click="$router.replace(userLogin.firstMenuPath)" type="primary"
                    >返回首页</el-button
                >
            </template>
        </el-result>
    </div>
</template>

<script setup>
import Image404 from './Image404.vue'
import { useUserLoginStore } from '@/stores/userLogin'
const userLogin = useUserLoginStore()
</script>

<style lang="scss" scoped></style>
