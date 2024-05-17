import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslint from 'vite-plugin-eslint'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
    // eslint-disable-next-line no-undef
    plugins: [
        Components({
            // 指定组件所在文件夹的位置，默认是src/components
            dirs: ['src/components'],
            extensions: ['vue'], //文件扩展名
            dts: 'components.d.ts'
        }),
        vue(),
        vueJsx(),
        eslint()
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://47.109.33.12:8000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})
