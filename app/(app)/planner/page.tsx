'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Course } from '@/types';
import { fetchRoadmapCourses } from '@/lib/api';
import { initialUserProfile } from '@/lib/mock-data';
import { Slider } from '@/components/ui/Slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/Dialog';
import { Card } from '@/components/ui/Card';
import { Loader2, Lock, AlertTriangle, CheckCircle2, Target, ArrowLeft } from 'lucide-react';
import { useAIContext } from '@/components/chat/AIContext';

// 成绩映射：字母成绩 -> 绩点值
const gradeMap = {
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
} as const;

type GradeKey = keyof typeof gradeMap;
const gradeValues = Object.values(gradeMap);
const gradeKeys = Object.keys(gradeMap) as GradeKey[];

// 根据成绩值获取字母成绩
const getGradeLetter = (value: number): GradeKey => {
  const index = gradeValues.findIndex(v => Math.abs(v - value) < 0.01);
  return index !== -1 ? gradeKeys[index] : 'B';
};

// 根据成绩获取颜色
const getGradeColor = (grade: GradeKey): string => {
  if (grade === 'A' || grade === 'A-') return 'text-[#D4AF37]';
  if (grade.startsWith('B')) return 'text-[#2A9D8F]';
  return 'text-[#E76F51]';
};

// 难度标签样式
const getDifficultyBadge = (difficulty: string) => {
  const styles = {
    'Easy': 'bg-[#2A9D8F]/20 text-[#2A9D8F] border-[#2A9D8F]/50',
    'Medium': 'bg-[#F4A261]/20 text-[#F4A261] border-[#F4A261]/50',
    'Hard': 'bg-[#E76F51]/20 text-[#E76F51] border-[#E76F51]/50',
    'Killer': 'bg-[#D62828]/20 text-[#D62828] border-[#D62828]/50',
  };
  return styles[difficulty as keyof typeof styles] || styles.Medium;
};

export default function PlannerPage() {
  const { setPageContextSummary } = useAIContext();

  // 用户上下文 (硬编码 MVP 演示数据)
  const CURRENT_GPA = 3.4;
  const TOTAL_PAST_CREDITS = 90;
  const TARGET_GPA = 3.7;
  const TARGET_SCHOOL = '纽约大学 (NYU)';

  // 状态管理
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseGrades, setCourseGrades] = useState<Record<string, number>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // 加载课程数据
  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      try {
        const data = await fetchRoadmapCourses(initialUserProfile, 'nyu');
        setCourses(data);
        
        // 初始化每门课程的默认目标成绩
        const initialGrades: Record<string, number> = {};
        data.forEach(course => {
          initialGrades[course.code] = gradeMap[course.targetGrade as GradeKey] || 3.0;
        });
        setCourseGrades(initialGrades);
      } catch (error) {
        console.error('Failed to load courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  // 计算总学分 (下学期新课程)
  const totalNewCredits = useMemo(() => {
    return courses.reduce((sum, course) => sum + course.credits, 0);
  }, [courses]);

  // 实时计算模拟累计 GPA
  const simulatedGPA = useMemo(() => {
    if (courses.length === 0) return CURRENT_GPA;

    const pastPoints = CURRENT_GPA * TOTAL_PAST_CREDITS;
    const newPoints = courses.reduce((sum, course) => {
      const grade = courseGrades[course.code] || 3.0;
      return sum + (grade * course.credits);
    }, 0);

    const totalCredits = TOTAL_PAST_CREDITS + totalNewCredits;
    return totalCredits > 0 ? (pastPoints + newPoints) / totalCredits : CURRENT_GPA;
  }, [courses, courseGrades, totalNewCredits]);

  // 广播页面状态到 AI 上下文
  useEffect(() => {
    const gapValue = TARGET_GPA - CURRENT_GPA;
    const statusInfo = simulatedGPA >= TARGET_GPA ? '战略可行' : '存在风险';
    const simulatedGapValue = TARGET_GPA - simulatedGPA;
    
    const summary = `用户在规划器页面。目标学校: ${TARGET_SCHOOL}。当前 GPA: ${CURRENT_GPA.toFixed(2)}，目标 GPA: ${TARGET_GPA.toFixed(2)}，差距: ${gapValue.toFixed(2)}。模拟期末后 GPA: ${simulatedGPA.toFixed(2)}。${statusInfo}。${simulatedGPA < TARGET_GPA ? `仍差 ${simulatedGapValue.toFixed(2)} 绩点。` : ''}正在规划 ${courses.length} 门下学期课程。`;
    
    setPageContextSummary(summary);
  }, [simulatedGPA, courses.length, setPageContextSummary, TARGET_GPA, TARGET_SCHOOL, CURRENT_GPA]);

  // 成绩变化处理
  const handleGradeChange = (courseCode: string, gradeValue: number) => {
    setCourseGrades(prev => ({
      ...prev,
      [courseCode]: gradeValue
    }));
  };

  // 资源锁定弹窗
  const handleResourceLock = (course: Course) => {
    setSelectedCourse(course);
    setDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#08090D] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-[#D4AF37] animate-spin" />
          <p className="font-mono text-sm text-[#888899]">加载战略规划数据...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090D] pb-32">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* 导航按钮 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Link href="/consultant">
            <button className="flex items-center gap-2 px-4 py-2 font-mono text-sm text-[#888899] hover:text-[#D4AF37] backdrop-blur-lg bg-white/[0.02] border-[0.5px] border-[#2A4B55] hover:border-[#D4AF37]/50 rounded-lg transition-all">
              <ArrowLeft size={16} />
              返回战略地图
            </button>
          </Link>
        </motion.div>

        {/* 1. 战略目标头部 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="mb-8 border-[0.5px] border-[#D4AF37]/30">
            <div className="space-y-6">
              {/* 标题区 */}
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-[#D4AF37]" />
                <div>
                  <h1 className="font-serif text-3xl text-[#D4AF37]">
                    战略目标：{TARGET_SCHOOL}
                  </h1>
                  <p className="font-mono text-sm text-[#888899] mt-1">
                    目标 GPA: {TARGET_GPA.toFixed(2)} | 当前 GPA: {CURRENT_GPA.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* 大型进度条 */}
              <div className="space-y-3">
                <div className="relative h-8 bg-[#2A4B55]/20 rounded-full overflow-hidden backdrop-blur-sm">
                  {/* 当前进度 (Teal) */}
                  <div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#2A9D8F] to-[#2A9D8F]/80 transition-all duration-500"
                    style={{ width: `${(CURRENT_GPA / 4.0) * 100}%` }}
                  />
                  
                  {/* 目标标记线 */}
                  <div
                    className="absolute top-0 h-full w-1 bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/50"
                    style={{ left: `${(TARGET_GPA / 4.0) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs text-[#D4AF37]">
                      目标 {TARGET_GPA}
                    </div>
                  </div>
                </div>

                {/* 刻度标签 */}
                <div className="flex justify-between font-mono text-xs text-[#888899]">
                  <span>0.0</span>
                  <span>1.0</span>
                  <span>2.0</span>
                  <span>3.0</span>
                  <span>4.0</span>
                </div>
              </div>

              {/* 战略提示 */}
              <div className="pt-4 border-t border-[#2A4B55]/30">
                <p className="font-serif text-lg text-[#EAEAEA]">
                  距离梦校还需提升{' '}
                  <span className="font-mono text-2xl text-[#D4AF37] font-bold">
                    {(TARGET_GPA - CURRENT_GPA).toFixed(2)}
                  </span>{' '}
                  绩点。下学期是关键战役。
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 2. 核心交互：成绩策略平衡器 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mb-6">
            <h2 className="font-serif text-2xl text-[#EAEAEA] mb-2">
              下学期核心课程战略推演
            </h2>
            <p className="font-mono text-sm text-[#888899]">
              调整每门课程的目标成绩，实时查看累计 GPA 变化
            </p>
          </div>

          {/* 课程卡片列表 */}
          <div className="space-y-4">
            {courses.map((course, index) => {
              const currentGradeValue = courseGrades[course.code] || 3.0;
              const currentGradeLetter = getGradeLetter(currentGradeValue);
              const isHardCourse = course.difficulty === 'Hard' || course.difficulty === 'Killer';

              return (
                <motion.div
                  key={course.code}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <Card className="border-[0.5px] border-[#2A4B55] hover:border-[#D4AF37]/30 transition-all">
                    <div className="space-y-4">
                      {/* 课程信息头部 */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono text-lg text-[#D4AF37]">
                              {course.code}
                            </span>
                            <span
                              className={`px-2 py-1 rounded text-xs font-mono border-[0.5px] ${getDifficultyBadge(course.difficulty)}`}
                            >
                              {course.difficulty}
                            </span>
                          </div>
                          <h3 className="font-serif text-xl text-[#EAEAEA] mb-1">
                            {course.name}
                          </h3>
                          <p className="font-mono text-sm text-[#888899]">
                            学分: {course.credits}
                          </p>
                        </div>

                        {/* 资源锁定按钮 */}
                        {isHardCourse && (
                          <button
                            onClick={() => handleResourceLock(course)}
                            className="flex items-center gap-2 px-3 py-2 font-mono text-xs text-[#888899] hover:text-[#D4AF37] backdrop-blur-lg bg-white/[0.02] border-[0.5px] border-[#2A4B55] hover:border-[#D4AF37]/50 rounded-lg transition-all"
                          >
                            <Lock size={14} />
                            <span>获取复习锦囊</span>
                          </button>
                        )}
                      </div>

                      {/* 成绩滑块交互 */}
                      <div className="space-y-3 pt-4 border-t border-[#2A4B55]/30">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm text-[#888899]">
                            目标成绩
                          </span>
                          <div
                            className={`font-mono text-4xl font-bold ${getGradeColor(currentGradeLetter)} drop-shadow-lg`}
                          >
                            {currentGradeLetter}
                          </div>
                        </div>

                        <Slider
                          min={2.0}
                          max={4.0}
                          step={0.1}
                          value={currentGradeValue}
                          onValueChange={(value) => handleGradeChange(course.code, value)}
                        />

                        <div className="flex justify-between font-mono text-xs text-[#888899]">
                          <span>C (2.0)</span>
                          <span>B (3.0)</span>
                          <span>A (4.0)</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* 3. 底部粘性反馈栏 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="fixed bottom-0 left-0 right-0 backdrop-blur-lg bg-[#08090D]/90 border-t-[0.5px] border-[#2A4B55] z-40"
      >
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <p className="font-mono text-xs text-[#888899] mb-1">
                  模拟期末后累计 GPA
                </p>
                <div
                  className={`font-mono text-5xl font-bold ${
                    simulatedGPA >= TARGET_GPA ? 'text-[#D4AF37]' : 'text-[#E76F51]'
                  } drop-shadow-2xl`}
                >
                  {simulatedGPA.toFixed(2)}
                </div>
              </div>

              <div className="h-16 w-[1px] bg-[#2A4B55]" />

              <div className="flex items-start gap-3">
                {simulatedGPA >= TARGET_GPA ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-serif text-lg text-[#D4AF37] mb-1">
                        ✓ 战略可行
                      </p>
                      <p className="font-mono text-sm text-[#888899] max-w-md">
                        保持此状态即可冲击梦校。建议锁定关键课程资源以确保执行。
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-6 h-6 text-[#E76F51] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-serif text-lg text-[#E76F51] mb-1">
                        ⚠️ 警告：战略存在风险
                      </p>
                      <p className="font-mono text-sm text-[#888899] max-w-md">
                        当前策略无法达成 {TARGET_SCHOOL} 要求 (差距: {(TARGET_GPA - simulatedGPA).toFixed(2)})。请提高关键课程目标成绩。
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4. 资源锁定对话框 */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent onClose={() => setDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>获取复习锦囊</DialogTitle>
            <DialogDescription>
              {selectedCourse?.code} - {selectedCourse?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-6">
            <div className="flex items-start gap-3 p-4 backdrop-blur-lg bg-[#D4AF37]/5 border-[0.5px] border-[#D4AF37]/30 rounded-lg">
              <Lock className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-mono text-sm text-[#EAEAEA] mb-2">
                  包含往届 A 等笔记、考试重点标注、教授答疑录音
                </p>
                <p className="font-mono text-xs text-[#888899]">
                  功能即将上线。已记录您的需求，资料准备好后将优先通知您。
                </p>
              </div>
            </div>
            <button
              onClick={() => setDialogOpen(false)}
              className="w-full px-4 py-3 font-mono text-sm backdrop-blur-lg bg-[#D4AF37]/10 border-[0.5px] border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/20 rounded-lg transition-all"
            >
              知道了
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

