// 核心类型定义 - KeyuKeqiu MVP 数据层

/**
 * 大学信息接口
 */
export interface University {
  id: string;
  name: string;
  location: string;
  logoUrl: string;
  minGpaReq: number;
  tags: string[];
  // 基于用户统计数据计算的匹配概率
  matchProbability: 'Safety' | 'Match' | 'Reach';
}

/**
 * 课程信息接口 (用于规划页面)
 */
export interface Course {
  code: string;
  name: string;
  credits: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Killer';
  // 用于交互式滑块演示
  targetGrade: string;
  // 不挂科/保底所需的最低成绩
  baselineGrade: string;
}

/**
 * 学生档案接口
 */
export interface StudentProfile {
  gpa: number;
  major: string; // UIC 专业代码: 'FIN', 'ACCT', 'CTV', 'STAT', 'FM', 'DS'
  targetCountry: string[];
  dreamSchoolId?: string; // 可选的梦校ID引用
}

