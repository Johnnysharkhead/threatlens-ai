# 构建AI Attack Vault站点

构建Astro静态站点，将 `data/events/` 中的分析数据渲染为可浏览的网页。

## 执行步骤

### 1. 检查数据

扫描 `data/events/` 目录，统计：
- 总事件数
- 已分析事件数（status: "analyzed"）
- 待分析事件数（status: "stub"）

如果没有已分析的事件，提示用户先运行 `/analyze`。

### 2. 构建站点

```bash
cd site && npm run build
```

### 3. 输出结果

报告：
- 构建是否成功
- 生成的页面数量
- 站点输出目录 (`site/dist/`)
- 本地预览命令: `cd site && npm run preview`

### 4. 可选：本地预览

如果用户传入 $ARGUMENTS 包含 "preview"，则执行：
```bash
cd site && npm run preview
```
