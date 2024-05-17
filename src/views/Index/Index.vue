<template>
    <div id="indexContent" class="system-index"></div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {})
</script>
<style scoped lang="scss" type="text/scss">
.system-index {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    .lengnd-box {
        position: absolute;
        left: 20px;
        bottom: 10px;
        z-index: 10;
        transition: all ease 0.3s;
    }
    .card-box {
        box-sizing: border-box;
        position: absolute;
        width: 382px;
        right: 20px;
        top: 20px;
        z-index: 10;
        border-radius: 4px;
        backdrop-filter: blur(10px);
        background: rgba(225, 237, 244, 1);
        transition: all ease 0.3s;
        padding: 0 10px;
    }
    .map-legend-box {
        position: absolute;
        left: 360px;
        top: 70px;
        z-index: 11;
        transition: all ease 0.3s;
    }
    .search-box {
        position: absolute;
        width: 382px;
        height: 126px;
        left: 20px;
        top: 20px;
        z-index: 10;
        border-radius: 8px;
        backdrop-filter: blur(10px);
        background: var(--panelbackground);
        // transition: all ease 0.3s;
        padding: 20px;
        box-sizing: border-box;
    }
}
</style>
