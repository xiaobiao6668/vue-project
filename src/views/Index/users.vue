<template>
    <div>
        <el-table :data="tableData">
            <el-table-column prop="userName" label="用户名"></el-table-column>
            <el-table-column prop="createdTime" label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="danger" size="small" @click="handleDelete(scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            @current-change="handleCurrentChange"
        ></el-pagination>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Api from '@/api/user'
import { ElMessage } from 'element-plus'
const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(tableData.value.length)

function handleDelete(row) {
    Api.delete(row.id).then((res) => {
        if (res.code == 200) {
            ElMessage.success('删除成功')
        }
        getUser()
    })
}

function handleCurrentChange(page) {
    currentPage.value = page
    getUser()
}
function getUser() {
    const params = {
        pageNum: currentPage.value,
        pageSize: pageSize.value,
        usePage: true
    }
    Api.list(params).then((res) => {
        if (res.data.records && res.data.records.length > 0) {
            tableData.value = res.data.records
            total.value = res.data.total
        }
    })
}
onMounted(() => {
    getUser()
})
</script>
<style scoped lang="scss" type="text/scss"></style>
