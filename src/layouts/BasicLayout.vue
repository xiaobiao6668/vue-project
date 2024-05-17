<template>
    <el-container style="height: 100%">
        <el-header class="header">
            <div class="logo">
                <span>细胞图像分割系统</span>
            </div>
            <div class="header-right">
                <el-space :size="14">
                    <el-button style="margin-right: 20px" link @click="logout">
                        <el-icon :size="20">退出登录</el-icon>
                    </el-button>
                </el-space>
            </div>
        </el-header>
        <el-main class="content">
            <el-aside class="demo-tabs">
                <div v-for="(item, index) in tabs" :key="item">
                    <el-button
                        :class="['tabs', item === activeTab ? 'active' : 'disactive']"
                        @click="handleClick(item, index)"
                        >{{ item }}</el-button
                    >
                </div>
            </el-aside>
            <el-container class="worpBox">
                <el-main style="background-color: rgba(225, 225, 225, 0); --el-main-padding: 4px">
                    <div
                        style="
                            background: #fff;
                            width: 96%;
                            height: 90%;
                            padding: 14px;
                            margin: 15px auto;
                            border-radius: 10px;
                        "
                    >
                        <router-view v-slot="{ Component }">
                            <keep-alive>
                                <component :is="Component" v-if="$route.meta.keepAlive" />
                            </keep-alive>
                            <component v-if="!$route.meta.keepAlive" :is="Component" />
                        </router-view>
                    </div>
                </el-main>
            </el-container>
        </el-main>
    </el-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import router from '@/router'

const tabs = ref(['细胞分割', '细胞检测', '反馈', '历史记录', '用户信息'])
const paths = ref(['cellSplit', 'cellTest', 'comments', 'history', 'users'])
const activeTab = ref('')
function logout() {
    router.push('/login')
}
function handleClick(pane, index) {
    activeTab.value = pane
    router.push(paths.value[index])
}
onMounted(() => {
    activeTab.value = tabs.value[paths.value.indexOf(window.location.pathname.substring(1))]
    if (sessionStorage.getItem('role') === 'admin') {
        tabs.value = ['反馈', '用户信息']
        paths.value = ['comments', 'users']
    } else {
        tabs.value = ['细胞分割', '细胞检测', '反馈', '历史记录']
        paths.value = ['cellSplit', 'cellTest', 'comments', 'history']
    }
})
</script>

<style lang="scss" scoped>
.worpBox {
    background: url('@/assets/bg.png') no-repeat;
    background-size: 100% 100%;
}
.content {
    display: flex;
    flex-direction: row;
    height: 100%;
}
.demo-tabs {
    padding: 30px 4px;
}
.tabs {
    border: none;
    border-top: 1px solid #dddbdb;
    margin-top: 8px;
    width: 100%;
    height: 40px;
}
.active {
    background: rgba(76, 178, 117, 0.65);
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
    background-color: #4cb275;
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
.footer {
    height: 20px;
    text-align: center;
    overflow: hidden;
    line-height: 20px;
    color: var(--el-text-color-secondary);
    font-size: var(--el-font-size-extra-small);
}
</style>
