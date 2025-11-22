# AI Consultant 页面 - 使用指南

## 概述

这是一个高端的交互式顾问页面，包含两个阶段：对话式输入向导和动态仪表板。

## 访问方式

```
http://localhost:3020/consultant?user=博一
```

URL参数：
- `user`: 用户名称，将显示在欢迎语和仪表板中

## 功能特性

### Stage 1: 对话式输入向导

1. **个性化欢迎** - 使用URL参数中的用户名
2. **三步输入流程**：
   - Step 1: 选择专业（FIN, ACCT, CTV, STAT, FM, DS）
   - Step 2: 调整 GPA（0.0 - 4.0，步进 0.1）
   - Step 3: 选择目标国家/地区（多选）
3. **平滑过渡动画** - 使用 framer-motion

### Stage 2: 动态仪表板

1. **左侧控制面板**：
   - 显示用户档案摘要
   - **核心功能**：实时 GPA 滑块
   - 拖动滑块可立即更新右侧大学匹配状态

2. **右侧大学网格**：
   - 显示匹配的大学列表
   - 每个卡片根据当前 GPA 动态显示匹配状态：
     - 🥇 **冲刺校** (Reach): GPA < minGpaReq - 0.2
     - 🎯 **匹配校** (Match): minGpaReq - 0.2 ≤ GPA ≤ minGpaReq + 0.2
     - 🛡️ **保底校** (Safety): GPA > minGpaReq + 0.2
   - 卡片边框和颜色随状态动态变化

## 技术实现

- **框架**: Next.js 14 (App Router)
- **动画**: Framer Motion
- **样式**: Tailwind CSS + Glassmorphism
- **类型**: TypeScript
- **状态管理**: React Hooks (useState, useMemo)

## 组件结构

```
/components/consultant/
  ├── WizardStep.tsx       # 向导步骤容器
  ├── UniversityCard.tsx   # 大学卡片（支持动态状态）
  ├── ProfileSidebar.tsx   # 左侧控制面板
  └── index.ts             # 导出文件
```

## 设计原则

严格遵循 `project-rules.md`：
- 🌌 深空主题背景 (#08090D)
- 🥇 金色主要装饰 (#D4AF37)
- 🔷 青色次要装饰 (#2A4B55)
- 📝 Serif 字体用于标题
- 🔢 Mono 字体用于数据

## 演示流程

1. 访问 `/consultant?user=你的名字`
2. 按步骤完成专业、GPA、目标国家的选择
3. 等待数据加载动画
4. 进入仪表板后，尝试拖动左侧的 GPA 滑块
5. 观察右侧大学卡片的匹配状态实时变化（颜色、边框、标签）

## 下一步优化建议

- [ ] 添加更多大学数据
- [ ] 实现筛选和排序功能
- [ ] 添加大学详情弹窗
- [ ] 保存用户档案到 localStorage
- [ ] 添加导出功能（PDF/PNG）

