# AI 聊天助手功能文档

## 功能概述

这是一个集成了 DeepSeek API 的浮动 AI 聊天机器人，为用户提供专业的留学规划建议。

## 技术栈

- **前端**: React + Framer Motion + Vercel AI SDK (v3.4.33)
- **后端**: Next.js API Routes + OpenAI Edge
- **API**: DeepSeek Chat API (通过 OpenAI 兼容接口)

## 文件结构

```
components/chat/
├── ChatWidget.tsx       # 浮动聊天组件
└── README.md           # 本文档

app/api/chat/
└── route.ts            # 聊天 API 路由（Edge Runtime）
```

## 设计特点

### 视觉设计（遵循 Strategic Luxury 主题）
- **玻璃态效果**: 使用 `backdrop-blur-xl` 和低透明度背景
- **深色背景**: `#08090D` 主背景色
- **金色强调**: `#D4AF37` 用于按钮和交互元素
- **青色系统色**: `#2A4B55` 用于边框和辅助元素
- **字体**: 
  - 标题使用 `font-serif` (Playfair Display)
  - UI 文本使用 `font-mono` (JetBrains Mono)

### 交互特性
- 平滑的打开/关闭动画（Framer Motion）
- 自动滚动到最新消息
- 加载状态指示器（动画点）
- 流式响应显示

## 使用方法

### 前端使用

聊天组件已经集成到全局布局中（`app/(app)/layout.tsx`），会自动显示在所有应用页面的右下角。

用户只需：
1. 点击右下角的金色消息图标
2. 在聊天窗口中输入问题
3. 按 Enter 或点击发送按钮
4. 等待 AI 回复（流式显示）

### API 使用

如果需要在其他地方使用聊天 API：

```typescript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: '你好，请帮我规划留学方案' }
    ]
  })
});

// 处理流式响应
const reader = response.body?.getReader();
// ... 读取流数据
```

## 环境配置

确保在 `.env` 文件中设置以下环境变量：

```bash
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

## AI 顾问角色定位

系统提示词定义了 AI 的角色：
- **名称**: BNBU 战略顾问 AI
- **定位**: 专业、鼓励、战略性的留学规划顾问
- **特点**:
  - 简洁专业的回答
  - 主要使用简体中文
  - 提供战略性建议而非具体数据
  - 提醒用户查询官方信息源

## 已知限制

1. **数据访问**: AI 目前没有访问实时数据库的权限，无法提供具体的录取要求数据
2. **语言**: 主要支持简体中文，但可以根据用户输入语言自适应
3. **上下文**: 聊天历史仅在当前会话中保持，刷新页面会清空

## 未来改进方向

- [ ] 集成实时数据库查询功能
- [ ] 添加对话历史持久化
- [ ] 支持多语言切换
- [ ] 添加语音输入功能
- [ ] 集成文件上传（如简历分析）
- [ ] 添加推荐院校卡片快速展示

## 调试

如果遇到问题，检查：
1. 浏览器控制台是否有错误
2. 服务器终端是否显示 API 错误
3. `.env` 文件中的 API 密钥是否正确
4. DeepSeek API 配额是否充足

## 性能优化

- 使用 Edge Runtime 以获得更快的响应时间
- 流式响应减少用户等待时间
- Framer Motion 动画使用 GPU 加速

---

**创建日期**: 2025-11-22  
**版本**: 1.0.0  
**维护者**: BNBU Study Agent Team

