<template>
    <div>
        <el-table
            :data="tableData"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
        >
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column label="原图">
                <template #default="scope">
                    <el-image
                        style="width: 320px; height: 180px"
                        :src="scope.row.beforeUrl"
                        fit="fit"
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
                        fit="fit"
                        :preview-src-list="[scope.row.afterUrl]"
                        :preview-z-index="10"
                    />
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { throttle } from 'lodash' // 导入throttle函数，用于控制滚动事件的执行频率
import Api from '@/api/history'
import api from '@/api/image'
const tableData = ref([])
const loading = ref(false)
function getHistory() {
    loading.value = true
    Api.list().then((res) => {
        loading.value = false
        if (res.data && res.data.length > 0) {
            Promise.all(
                res.data.map((item) => {
                    // 调用接口获取处理前和处理后的图片URL
                    const beforePromise = api.getImgPath(item.fileId_before)
                    const afterPromise = api.getImgPath(item.fileId_after)

                    // 将两个Promise进行合并，同时保存处理前和处理后的URL
                    return Promise.all([beforePromise, afterPromise]).then(
                        ([beforeUrl, afterUrl]) => {
                            item.beforeUrl = window.URL.createObjectURL(beforeUrl)
                            item.afterUrl = window.URL.createObjectURL(afterUrl)
                        }
                    )
                })
            ).then(() => {
                // 数据请求完成后将数据赋值给tableData
                tableData.value = res.data
            })
        }
    })
}
const loadMore = throttle(() => {
    if (!loading.value) {
        getHistory()
    }
}, 200)
onMounted(() => {
    getHistory()
})
</script>
<style scoped lang="scss" type="text/scss">
:deep(.el-table .el-table__cell) {
    position: initial;
}
</style>
