import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // modification 1: 必须添加 base 属性
  // 请将 '你的仓库名' 替换为你实际的 GitHub 仓库名，前后斜杠不能少
  // 例如：如果你仓库叫 optical-sim，这里就填 '/optical-sim/'
  base: '/你的仓库名/',

  plugins: [react()],

  server: {
    port: 3000,
    host: '0.0.0.0',
  },

  resolve: {
    alias: {
      // modification 2: 规范化 alias
      // 通常 @ 都是指向 src 目录的，这样写更标准
      '@': path.resolve(__dirname, './src'),
    },
  },

  // modification 3: 删除了 define 和 loadEnv 部分
  // 原因：Vite 原生支持 .env 文件，不需要手动解析。
  // 只要你的变量名以 VITE_ 开头（比如 VITE_API_KEY），
  // 在代码里直接用 import.meta.env.VITE_API_KEY 就能取到。
});
