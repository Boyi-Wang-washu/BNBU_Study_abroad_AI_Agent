// API模拟层 - 带延迟的后端数据获取模拟

import { University, Course, StudentProfile } from '@/types';
import { mockUniversities, mockCourses } from './mock-data';

/**
 * 模拟网络延迟
 */
const simulateDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * 获取大学列表 (基于用户档案)
 * 
 * @param profile - 学生档案信息
 * @returns 匹配的大学列表
 */
export async function fetchUniversities(profile: StudentProfile): Promise<University[]> {
  await simulateDelay(1000);
  
  // 未来可以根据 profile 进行过滤和排序
  // 例如：根据 targetCountry 筛选，根据 GPA 重新计算 matchProbability
  return mockUniversities;
}

/**
 * 获取课程路线图 (基于用户档案和目标学校)
 * 
 * @param profile - 学生档案信息
 * @param targetSchoolId - 目标学校ID
 * @returns 推荐的课程列表
 */
export async function fetchRoadmapCourses(
  profile: StudentProfile,
  targetSchoolId: string
): Promise<Course[]> {
  await simulateDelay(1200);
  
  // 未来可以根据 targetSchoolId 和 profile.major 返回定制化课程
  // 例如：针对冲刺校推荐更多高难度课程，针对专业推荐核心课程
  return mockCourses;
}

/**
 * 更新用户档案 (模拟保存操作)
 * 
 * @param profile - 要保存的学生档案
 * @returns 更新后的档案
 */
export async function updateUserProfile(profile: StudentProfile): Promise<StudentProfile> {
  await simulateDelay(800);
  
  // 未来连接到真实后端API
  return profile;
}

