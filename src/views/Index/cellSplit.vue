<template>
    <div class="box">
        <div class="left">
            <el-upload
                class="upload-demo"
                action="/api/image/upload"
                accept="image/png, image/jpeg"
                name="multipartFile"
                :data="{ userId: userId, type: '1' }"
                :on-success="handleSuccess"
            >
                <template #trigger>
                    <div class="el-text">点击上传原图</div>
                </template>
            </el-upload>
            <el-image
                v-show="showPreImg"
                :src="preImg"
                style="width: 100%; height: 90%; object-fit: fill"
            />
        </div>
        <div class="right">
            <div class="el-text-right">处理后的图</div>
            <el-image
                v-show="showImg"
                :src="imgData"
                style="width: 100%; height: 90%; object-fit: fill"
            />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const showImg = ref(false)
const showPreImg = ref(false)
const preImg = ref('')
const imgData = ref('')
const userId = sessionStorage.getItem('id')
function handleSuccess(res) {
    showPreImg.value = true
    showImg.value = true
    preImg.value = 'data:image/png;base64,' + res.data[0].content
    imgData.value = 'data:image/png;base64,' + res.data[1].content
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
    height: 5%;
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
:deep(.upload-demo) {
    // height: 100%;
}
:deep(.el-upload .el-upload--text .is-drag) {
    height: 100%;
}
:deep(.el-upload-list) {
    display: none;
}
</style>
: { code: number; data: { savePath: any; saveName: any; url: any; }; }: { name: any; }: any: any:
any: any: { data: { content: any; }; }: string: HTMLImageElement: { data: { content: any; }; }:
string: HTMLImageElement: { data: { content: any; }; }: string: HTMLImageElement
