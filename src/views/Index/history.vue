<template>
    <el-radio-group v-model="type" @change="changeType">
        <el-radio value="1">细胞分割</el-radio>
        <el-radio value="2">细胞检测</el-radio>
    </el-radio-group>
    <div ref="history" style="height: calc(100% - 32px); overflow: auto">
        <el-table
            :data="tableData"
            v-infinite-scroll="loadMore"
            :infinite-scroll-disabled="loading"
            infinite-scroll-distance="0"
            v-loading="loading"
        >
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="creator" label="上传用户"></el-table-column>
            <el-table-column label="原图">
                <template #default="scope">
                    <el-image
                        style="width: 320px; height: 180px"
                        :src="scope.row.beforeUrl"
                        fit="contain"
                        :preview-src-list="[scope.row.beforeUrl]"
                        :preview-z-index="10"
                    />
                </template>
            </el-table-column>
            <el-table-column label="处理后的图">
                <template #default="scope">
                    <el-image
                        style="width: 320px; height: 180px"
                        :src="scope.row.afterUrl"
                        fit="contain"
                        :preview-src-list="[scope.row.afterUrl]"
                        :preview-z-index="10"
                    />
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template #default="scope">
                    <el-button type="primary" @click="addNote(scope.row)"> 备注 </el-button>
                </template>
            </el-table-column>
        </el-table>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多记录了</p>
        <el-drawer v-model="drawer" title="备注信息" direction="rtl">
            <el-input type="textarea" v-model="drawerInfo.note"></el-input>
            <div style="display: flex; justify-content: center; margin-top: 20px">
                <el-button type="primary" @click="saveNote">保存</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount, computed } from 'vue'
import { throttle } from 'lodash' // 导入throttle函数，用于控制滚动事件的执行频率
import Api from '@/api/history'
import api from '@/api/image'
const drawer = ref(false)
const drawerInfo = ref({})
const type = ref('1')
const tableData = ref([])
const loading = ref(false)
const pageIndex = ref(1)
const allData = ref([])
const history = ref()
const noMore = computed(() => tableData.value.length >= allData.value.length)
function changeType() {
    getHistory()
}
async function getHistory() {
    loading.value = true
    try {
        const res = await Api.list(type.value)
        if (res.data) {
            allData.value = res.data
            let preData = allData.value.slice(0, 10)
            await Promise.all(
                preData.map(async (item) => {
                    const beforeData = await api.getImgPath(item.imageIdBefore)
                    const afterData = await api.getImgPath(item.imageIdAfter)
                    item.beforeUrl = URL.createObjectURL(beforeData)
                    item.afterUrl = URL.createObjectURL(afterData)
                })
            )
            tableData.value = preData
        }
    } finally {
        loading.value = false
    }
}
const loadMore = throttle(async () => {
    if (!loading.value && !noMore.value) {
        loading.value = true
        pageIndex.value = pageIndex.value + 1
        let newData = allData.value.slice((pageIndex.value - 1) * 10, pageIndex.value * 10)
        await Promise.all(
            newData.map(async (item) => {
                const beforeData = await api.getImgPath(item.imageIdBefore)
                const afterData = await api.getImgPath(item.imageIdAfter)
                item.beforeUrl = URL.createObjectURL(beforeData)
                item.afterUrl = URL.createObjectURL(afterData)
            })
        )
        tableData.value = tableData.value.concat(newData)
        history.value.scrollTop =
            history.value.scrollHeight * (pageIndex.value / (pageIndex.value + 1))
        loading.value = false
    }
}, 1000)
function addNote(row) {
    drawerInfo.value = row
    drawer.value = true
}
function saveNote() {
    const params = {
        historyId: drawerInfo.value.id,
        note: drawerInfo.value.note
    }
    Api.note(params).then(() => {
        drawer.value = false
        getHistory()
    })
}
onMounted(() => {
    getHistory()
})
onBeforeUnmount(() => {
    tableData.value.forEach((item) => {
        URL.revokeObjectURL(item.beforeUrl)
        URL.revokeObjectURL(item.afterUrl)
    })
})
</script>
<style scoped lang="scss" type="text/scss">
:deep(.el-table .el-table__cell) {
    position: initial;
}
:deep(.mainPage) {
    background: rgba(0, 0, 0, 0) !important;
}
</style>
