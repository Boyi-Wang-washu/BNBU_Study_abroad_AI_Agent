// 模拟数据生成 - 真实的UIC学生申请场景

import { University, Course, StudentProfile } from '@/types';

/**
 * 模拟大学数据
 * 涵盖美国、英国、香港、新加坡的顶尖院校
 * 为假设的3.4 GPA学生提供Safety、Match、Reach的多样化选择
 */
export const mockUniversities: University[] = [
  // Reach Schools (冲刺校 - GPA要求 ≥ 3.6)
  {
    id: 'nyu',
    name: 'New York University',
    location: 'USA',
    logoUrl: '/logos/nyu.png',
    minGpaReq: 3.7,
    tags: ['QS Top 50', 'US News Top 30', 'STEM Friendly'],
    matchProbability: 'Reach'
  },
  {
    id: 'ucl',
    name: 'University College London',
    location: 'UK',
    logoUrl: '/logos/ucl.png',
    minGpaReq: 3.6,
    tags: ['QS Top 10', 'G5', 'Russell Group'],
    matchProbability: 'Reach'
  },
  {
    id: 'nus',
    name: 'National University of Singapore',
    location: 'Singapore',
    logoUrl: '/logos/nus.png',
    minGpaReq: 3.7,
    tags: ['QS Top 10', 'Asia No.1', 'Research Powerhouse'],
    matchProbability: 'Reach'
  },
  
  // Match Schools (匹配校 - GPA要求 3.3-3.5)
  {
    id: 'warwick',
    name: 'University of Warwick',
    location: 'UK',
    logoUrl: '/logos/warwick.png',
    minGpaReq: 3.4,
    tags: ['QS Top 100', 'WBS Ranked', 'Finance Strong'],
    matchProbability: 'Match'
  },
  {
    id: 'cuhk',
    name: 'The Chinese University of Hong Kong',
    location: 'Hong Kong',
    logoUrl: '/logos/cuhk.png',
    minGpaReq: 3.3,
    tags: ['QS Top 50', 'Asia Top 10', 'Finance Hub'],
    matchProbability: 'Match'
  },
  {
    id: 'bu',
    name: 'Boston University',
    location: 'USA',
    logoUrl: '/logos/bu.png',
    minGpaReq: 3.4,
    tags: ['US News Top 50', 'Urban Campus', 'Business Strong'],
    matchProbability: 'Match'
  },
  
  // Safety Schools (保底校 - GPA要求 ≤ 3.2)
  {
    id: 'cityu',
    name: 'City University of Hong Kong',
    location: 'Hong Kong',
    logoUrl: '/logos/cityu.png',
    minGpaReq: 3.0,
    tags: ['QS Top 100', 'Business Hub', 'Industry Links'],
    matchProbability: 'Safety'
  },
  {
    id: 'nottingham',
    name: 'University of Nottingham',
    location: 'UK',
    logoUrl: '/logos/nottingham.png',
    minGpaReq: 3.1,
    tags: ['Russell Group', 'Campus Beautiful', 'UIC Partner'],
    matchProbability: 'Safety'
  }
];

/**
 * 模拟课程数据
 * 为下学期大三/大四学生生成的真实UIC课程
 * 混合专业必修课和选修课，不同难度和保底成绩
 */
export const mockCourses: Course[] = [
  {
    code: 'FIN4002',
    name: '企业金融 (Corporate Finance)',
    credits: 4,
    difficulty: 'Hard',
    targetGrade: 'B+',
    baselineGrade: 'C+'
  },
  {
    code: 'MKT3005',
    name: '国际市场营销 (International Marketing)',
    credits: 3,
    difficulty: 'Medium',
    targetGrade: 'A-',
    baselineGrade: 'B-'
  },
  {
    code: 'STAT3002',
    name: '应用回归分析 (Applied Regression Analysis)',
    credits: 4,
    difficulty: 'Killer',
    targetGrade: 'B',
    baselineGrade: 'C'
  },
  {
    code: 'MGT3001',
    name: '组织行为学 (Organizational Behavior)',
    credits: 3,
    difficulty: 'Easy',
    targetGrade: 'A',
    baselineGrade: 'B'
  }
];

/**
 * 初始用户档案
 * 用于演示的默认配置 (GPA 3.4 金融专业学生)
 */
export const initialUserProfile: StudentProfile = {
  gpa: 3.4,
  major: 'FIN',
  targetCountry: ['USA', 'UK'],
  dreamSchoolId: 'nyu'
};

