<template>
    <div class="box">
        <div class="left">
            <el-upload
                class="upload-demo"
                action="/api/image/upload"
                accept="image/png, image/jpeg"
                name="multipartFile"
                :data="{ userId: userId, type: '2' }"
                :on-success="handleSuccess"
                :before-upload="beforeUpload"
            >
                <template #trigger>
                    <div class="el-text">点击上传原图</div>
                </template>
            </el-upload>
            <div style="height: calc(100% - 56px); max-width: '100%'">
                <el-image v-show="showPreImg" :src="preImg" fit="contain" />
            </div>
        </div>
        <div class="right">
            <div class="el-text-right">处理后的图</div>
            <div style="height: calc(100% - 56px); max-width: '100%'" v-loading="loading">
                <el-image v-show="showImg" :src="imgData" fit="contain" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Api from '@/api/image'
const showImg = ref(false)
const showPreImg = ref(false)
const preImg = ref('')
const imgData = ref('')
const userId = sessionStorage.getItem('id')
const loading = ref(false)
async function handleSuccess(res) {
    loading.value = false
    showImg.value = true
    const imgId = res.data
    const blob = await Api.getImgPath(imgId)
    imgData.value = window.URL.createObjectURL(blob)
}
function beforeUpload(file) {
    loading.value = true
    const reader = new FileReader()
    reader.onload = (e) => {
        // 获取文件的二进制流
        const binaryData = e.target.result
        // 将二进制流转换为Base64编码
        const base64Data = btoa(binaryData)
        // 设置预览图片的Base64编码
        showPreImg.value = true
        preImg.value = `data:${file.type};base64,${base64Data}`
    }
    reader.readAsBinaryString(file) // 以二进制字符串形式读取文件
}
onMounted(() => {})
</script>
<style scoped lang="scss" type="text/scss">
.box {
    border: 1px solid #666;
    height: 100%;
    display: flex;
    .left {
        width: 50%;
        height: 100%;
        border: 1px solid #666;
    }
    .right {
        width: 50%;
        height: 100%;
        border: 1px solid #666;
    }
}
:deep(.el-upload--text) {
    width: 100%;
    height: 5%;
    border-bottom: 1px dashed #666;
    display: flex;
    justify-content: center;
    align-items: center;
}
.el-text-right {
    width: 100%;
    // height: 5%;
    line-height: 56px;
    font-size: 16px;
    background: rgba($color: #aad8ac, $alpha: 1);
    border-bottom: 1px dashed #666;
    display: flex;
    justify-content: center;
    align-items: center;
}
.el-text {
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 16px;
    background: rgba($color: #aad8ac, $alpha: 1);
    line-height: 56px;
    // border-bottom: 1px dashed #666;
}
:deep(.el-upload-dragger) {
    padding: 43.46% 0;
    height: 100% !important;
    border: none;
}
:deep(.el-upload .el-upload--text .is-drag) {
    height: 100%;
}
:deep(.el-upload-list) {
    display: none;
}
:deep(.el-image) {
    width: 100%;
    height: 100%;
}
</style>
: { code: number; data: { savePath: any; saveName: any; url: any; }; }: { name: any; }: any: any:
any: any: { data: { content: any; }; }: string: HTMLImageElement: { data: { content: any; }; }:
string: HTMLImageElement: { data: { content: any; }; }: string: HTMLImageElement
