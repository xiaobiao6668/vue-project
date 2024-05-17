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
        <el-result title="403" sub-title="您没有权限访问该页面">
            <template #icon>
                <Image403 style="width: 252px; height: 292px"></Image403>
            </template>
            <template #extra>
                <el-button @click="$router.replace(userLogin.firstMenuPath)" type="primary"
                    >返回首页</el-button
                >
            </template>
        </el-result>
    </div>
</template>

<script setup>
import Image403 from './Image403.vue'
import { useUserLoginStore } from '@/stores/userLogin'
const userLogin = useUserLoginStore()
</script>

<style lang="scss" scoped></style>
