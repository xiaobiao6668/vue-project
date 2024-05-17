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
        <el-result title="500" sub-title="系统繁忙,请稍后再试">
            <template #icon>
                <Image500 style="width: 252px; height: 292px"></Image500>
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
import Image500 from './Image500.vue'
import { useUserLoginStore } from '@/stores/userLogin'
const userLogin = useUserLoginStore()
</script>

<style lang="scss" scoped></style>
