<template>
    <div>
        <el-table :data="tableData">
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column label="原图">
                <template #default="scope">
                    <el-image
                        style="width: 320px; height: 180px"
                        :src="scope.row.base64_before"
                        fit="fit"
                        :preview-src-list="[scope.row.base64_before]"
                        :preview-z-index="10"
                    />
                </template>
            </el-table-column>
            <el-table-column label="处理后的图">
                <template #default="scope">
                    <el-image
                        style="width: 320px; height: 180px"
                        :src="scope.row.base64_after"
                        fit="fit"
                        :preview-src-list="[scope.row.base64_before]"
                        :preview-z-index="10"
                    />
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Api from '@/api/history'
const tableData = ref([])
function getHistory() {
    const params = {
        userId: sessionStorage.getItem('id')
    }
    Api.list(params).then((res) => {
        if (res.data && res.data.length > 0) {
            res.data.forEach((item) => {
                item.base64_before = 'data:image/png;base64,' + item.base64_before
                item.base64_after = 'data:image/png;base64,' + item.base64_after
            })
            tableData.value = res.data
        }
    })
}
onMounted(() => {
    getHistory()
})
</script>
<style scoped lang="scss" type="text/scss">
:deep(.el-table .el-table__cell){
    position:initial;
}
</style>
