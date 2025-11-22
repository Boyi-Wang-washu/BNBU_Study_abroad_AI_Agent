# 战略规划页面 (Strategic Planner)

## 页面概述

**Page C - 战略规划器** 是 BNBU Study Agent MVP 的核心功能之一，为学生提供交互式的 GPA 规划和目标达成模拟工具。

## 访问方式

- **直接访问**: `http://localhost:3020/planner`
- **从战略地图页面**: 点击右上角的"战略规划器"按钮

## 核心功能

### 1. 战略目标可视化
- **目标学校**: 纽约大学 (NYU) - 要求 GPA 3.70
- **当前状态**: 累计 GPA 3.40 (90 学分)
- **视觉进度条**: 清晰展示当前进度与目标之间的差距
- **绩点差距**: 实时显示需要提升的绩点数值 (0.30)

### 2. 交互式成绩平衡器 (核心"Wow"因素)

#### 课程卡片
每门下学期课程都有独立的交互卡片：
- **课程信息**: 课程代码 (Mono 字体)、中文名称 (Serif 字体)、学分、难度标签
- **难度等级**: 
  - 🟢 Easy - 绿色标签
  - 🟡 Medium - 黄色标签
  - 🟠 Hard - 橙色标签
  - 🔴 Killer - 红色标签

#### 滑块交互
- **成绩范围**: C (2.0) 到 A (4.0)
- **步进**: 支持精确到 0.1 的绩点调整
- **实时反馈**: 拖动滑块时，字母成绩和颜色即时更新
- **颜色编码**:
  - A/A-: 金色 (#D4AF37)
  - B 系列: 青色 (#2A9D8F)
  - C 系列: 橙红色 (#E76F51)

### 3. 实时 GPA 计算引擎

**计算公式**:
```
新累计 GPA = (当前GPA × 已修学分 + Σ(目标成绩 × 课程学分)) / 总学分
```

**参数**:
- 当前 GPA: 3.40
- 已修学分: 90
- 下学期课程: 4 门 (共 14 学分)

### 4. 底部粘性反馈栏

实时显示模拟结果，包含条件式反馈：

#### ✅ 达标状态 (GPA ≥ 3.70)
- 模拟 GPA 显示为**金色**
- 显示 "✓ 战略可行" 消息
- 提示: "保持此状态即可冲击梦校"

#### ⚠️ 未达标状态 (GPA < 3.70)
- 模拟 GPA 显示为**红色**
- 显示 "⚠️ 警告：战略存在风险" 消息
- 显示具体差距值
- 提示: "请提高关键课程目标成绩"

### 5. 资源锁定功能

#### 触发条件
- 仅在 **Hard** 或 **Killer** 难度课程上显示
- 显示 "🔒 获取复习锦囊" 按钮

#### 锁定内容
点击后弹出对话框，展示：
- 往届 A 等笔记
- 考试重点标注
- 教授答疑录音

#### 当前状态
- MVP 阶段显示 "功能即将上线" 提示
- 记录用户需求，承诺优先通知

## 设计规范

### Strategic Luxury 主题
- **背景**: Deep Void (#08090D)
- **主色调**: Signal Gold (#D4AF37)
- **辅助色**: System Teal (#2A4B55)
- **文本**: Warm White (#EAEAEA) / Muted Grey (#888899)

### 玻璃态效果 (Glassmorphism)
- 高模糊度背景 (`backdrop-blur-lg`)
- 超低透明度背景 (`bg-white/[0.02]`)
- 细边框 (`border-[0.5px]`)

### 字体使用
- **标题**: Playfair Display (Serif)
- **数据/代码**: JetBrains Mono (Mono)
- **正文**: Inter (Sans)

## 技术实现

### 状态管理
```typescript
const [courseGrades, setCourseGrades] = useState<Record<string, number>>({});
```

### GPA 计算
```typescript
const simulatedGPA = useMemo(() => {
  const pastPoints = CURRENT_GPA * TOTAL_PAST_CREDITS;
  const newPoints = courses.reduce((sum, course) => {
    return sum + (courseGrades[course.code] * course.credits);
  }, 0);
  return (pastPoints + newPoints) / (TOTAL_PAST_CREDITS + totalNewCredits);
}, [courses, courseGrades, totalNewCredits]);
```

### 成绩映射
```typescript
const gradeMap = {
  'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0,
  'B-': 2.7, 'C+': 2.3, 'C': 2.0
};
```

## 数据源

- **课程数据**: `fetchRoadmapCourses()` from `@lib/api.ts`
- **用户档案**: `initialUserProfile` from `@lib/mock-data.ts`
- **类型定义**: `Course` from `@types/index.ts`

## 用户体验亮点

1. **即时反馈**: 所有滑块调整立即反映在底部反馈栏
2. **视觉引导**: 通过颜色编码引导用户理解成绩影响
3. **战略思维**: 帮助学生在多门课程间平衡投入
4. **风险预警**: 清晰的达标/未达标状态提示
5. **资源整合**: 将复习资料需求与课程规划结合

## 下一步优化方向

- [ ] 支持多目标学校切换
- [ ] 增加课程难度权重算法
- [ ] 集成历史成绩数据分析
- [ ] 添加学期间 GPA 趋势图
- [ ] 实现复习资料预约系统
- [ ] 支持自定义课程添加

---

**构建日期**: 2025-11-22  
**版本**: MVP v1.0  
**框架**: Next.js 14 + TypeScript + Tailwind CSS

