'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { University, StudentProfile } from '@/types';
import { fetchUniversities } from '@/lib/api';
import { WizardStep } from '@/components/consultant/WizardStep';
import { UniversityCard } from '@/components/consultant/UniversityCard';
import { ProfileSidebar } from '@/components/consultant/ProfileSidebar';
import { Loader2, ChevronRight, Target } from 'lucide-react';
import { useAIContext } from '@/components/chat/AIContext';

type WizardStepType = 'major' | 'gpa' | 'country' | 'finished';
type Major = 'FIN' | 'ACCT' | 'CTV' | 'STAT' | 'FM' | 'DS';

const majorOptions: { value: Major; label: string }[] = [
  { value: 'FIN', label: '金融学 (FIN)' },
  { value: 'ACCT', label: '会计学 (ACCT)' },
  { value: 'CTV', label: '文化创意与传播 (CTV)' },
  { value: 'STAT', label: '统计学 (STAT)' },
  { value: 'FM', label: '金融数学 (FM)' },
  { value: 'DS', label: '数据科学 (DS)' },
];

const countryOptions = ['USA', 'UK', 'Hong Kong', 'Singapore', 'Australia'];

export default function ConsultantPage() {
  const searchParams = useSearchParams();
  const userName = searchParams.get('user') || '同学';
  const { setPageContextSummary } = useAIContext();

  // 状态管理
  const [currentStep, setCurrentStep] = useState<WizardStepType>('major');
  const [isLoading, setIsLoading] = useState(false);
  const [universities, setUniversities] = useState<University[]>([]);

  // 用户档案数据
  const [profile, setProfile] = useState<StudentProfile>({
    gpa: 3.4,
    major: 'FIN',
    targetCountry: [],
    dreamSchoolId: undefined,
  });

  // 动态匹配逻辑 - 根据当前GPA重新计算每所大学的匹配状态
  const universitiesWithDynamicMatch = useMemo(() => {
    return universities.map((uni) => {
      let matchStatus: 'Reach' | 'Match' | 'Safety';
      
      if (profile.gpa < uni.minGpaReq - 0.2) {
        matchStatus = 'Reach';
      } else if (profile.gpa > uni.minGpaReq + 0.2) {
        matchStatus = 'Safety';
      } else {
        matchStatus = 'Match';
      }

      return { ...uni, dynamicMatch: matchStatus };
    });
  }, [universities, profile.gpa]);

  // 广播页面状态到 AI 上下文
  useEffect(() => {
    const majorLabel = majorOptions.find(m => m.value === profile.major)?.label || profile.major;
    const countriesList = profile.targetCountry.join(', ') || '未选择';
    const stepLabel = currentStep === 'finished' ? '已完成向导，正在查看战略地图' : `正在第 ${currentStep === 'major' ? '1' : currentStep === 'gpa' ? '2' : '3'} 步`;
    
    const summary = `用户在顾问页面。${stepLabel}。已选专业: ${majorLabel}。当前 GPA: ${profile.gpa.toFixed(2)}。目标国家/地区: ${countriesList}。${universities.length > 0 ? `已加载 ${universities.length} 所匹配大学。` : ''}`;
    
    setPageContextSummary(summary);
  }, [profile, currentStep, universities, setPageContextSummary]);

  // 加载大学数据（Stage 1 -> Stage 2 过渡时触发）
  const loadUniversities = async () => {
    setIsLoading(true);
    try {
      const data = await fetchUniversities(profile);
      setUniversities(data);
      setTimeout(() => {
        setCurrentStep('finished');
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Failed to fetch universities:', error);
      setIsLoading(false);
    }
  };

  // Step 导航逻辑
  const handleNextStep = () => {
    if (currentStep === 'major') {
      setCurrentStep('gpa');
    } else if (currentStep === 'gpa') {
      setCurrentStep('country');
    } else if (currentStep === 'country') {
      loadUniversities();
    }
  };

  const canProceed = () => {
    if (currentStep === 'major') return profile.major !== '';
    if (currentStep === 'gpa') return profile.gpa >= 0 && profile.gpa <= 4;
    if (currentStep === 'country') return profile.targetCountry.length > 0;
    return false;
  };

  // Stage 1: 对话式向导
  const renderWizard = () => (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* 个性化欢迎头 */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="font-serif text-5xl text-[#EAEAEA] mb-4">
          你好, {userName}.
        </h1>
        <p className="font-mono text-sm text-[#888899] max-w-2xl">
          我是你的 BNBU 专属战略顾问。让我们开始规划你的全球版图。
        </p>
      </motion.div>

      {/* 步骤流程 */}
      <AnimatePresence mode="wait">
        {currentStep === 'major' && (
          <WizardStep key="major" question="首先，确认你的专业领域？" step={1}>
            <div className="grid grid-cols-2 gap-3">
              {majorOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setProfile({ ...profile, major: option.value })}
                  className={`
                    font-mono text-sm text-left
                    backdrop-blur-lg
                    border-[0.5px]
                    rounded-lg p-4
                    transition-all duration-300
                    ${
                      profile.major === option.value
                        ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]'
                        : 'bg-white/[0.02] border-[#2A4B55] text-[#EAEAEA] hover:border-[#D4AF37]/50'
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </WizardStep>
        )}

        {currentStep === 'gpa' && (
          <WizardStep key="gpa" question="你目前的累计 GPA 是多少？" step={2}>
            <div className="space-y-8">
              {/* GPA 显示 */}
              <div className="text-center">
                <div className="font-mono text-7xl font-bold text-[#D4AF37] mb-2">
                  {profile.gpa.toFixed(2)}
                </div>
                <div className="font-mono text-sm text-[#888899]">/ 4.00</div>
              </div>

              {/* 精密滑块 */}
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="0.1"
                  value={profile.gpa}
                  onChange={(e) =>
                    setProfile({ ...profile, gpa: parseFloat(e.target.value) })
                  }
                  className="
                    w-full h-1
                    bg-[#2A4B55]/30
                    appearance-none
                    cursor-pointer
                    rounded-full
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-6
                    [&::-webkit-slider-thumb]:h-6
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-[#D4AF37]
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:shadow-2xl
                    [&::-webkit-slider-thumb]:shadow-[#D4AF37]/50
                    [&::-webkit-slider-thumb]:hover:scale-125
                    [&::-webkit-slider-thumb]:transition-transform
                    [&::-moz-range-thumb]:w-6
                    [&::-moz-range-thumb]:h-6
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-[#D4AF37]
                    [&::-moz-range-thumb]:border-0
                    [&::-moz-range-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:shadow-2xl
                  "
                  style={{
                    background: `linear-gradient(to right, #D4AF37 0%, #D4AF37 ${
                      (profile.gpa / 4) * 100
                    }%, #2A4B5530 ${(profile.gpa / 4) * 100}%, #2A4B5530 100%)`,
                  }}
                />
                <div className="flex justify-between font-mono text-xs text-[#888899]">
                  <span>0.0</span>
                  <span>1.0</span>
                  <span>2.0</span>
                  <span>3.0</span>
                  <span>4.0</span>
                </div>
              </div>
            </div>
          </WizardStep>
        )}

        {currentStep === 'country' && (
          <WizardStep key="country" question="你的战略目标国家/地区是？(多选)" step={3}>
            <div className="grid grid-cols-2 gap-3">
              {countryOptions.map((country) => {
                const isSelected = profile.targetCountry.includes(country);
                return (
                  <button
                    key={country}
                    onClick={() => {
                      const newCountries = isSelected
                        ? profile.targetCountry.filter((c) => c !== country)
                        : [...profile.targetCountry, country];
                      setProfile({ ...profile, targetCountry: newCountries });
                    }}
                    className={`
                      font-mono text-sm
                      backdrop-blur-lg
                      border-[0.5px]
                      rounded-lg p-4
                      transition-all duration-300
                      ${
                        isSelected
                          ? 'bg-[#2A9D8F]/10 border-[#2A9D8F] text-[#2A9D8F]'
                          : 'bg-white/[0.02] border-[#2A4B55] text-[#EAEAEA] hover:border-[#2A9D8F]/50'
                      }
                    `}
                  >
                    {country}
                  </button>
                );
              })}
            </div>
          </WizardStep>
        )}
      </AnimatePresence>

      {/* 导航按钮 */}
      {!isLoading && currentStep !== 'finished' && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={handleNextStep}
          disabled={!canProceed()}
          className={`
            mt-12 px-8 py-3
            font-mono text-sm
            backdrop-blur-lg
            border-[0.5px]
            rounded-lg
            flex items-center gap-2
            transition-all duration-300
            ${
              canProceed()
                ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/20 hover:shadow-lg hover:shadow-[#D4AF37]/30'
                : 'bg-white/[0.02] border-[#2A4B55]/50 text-[#888899] cursor-not-allowed'
            }
          `}
        >
          {currentStep === 'country' ? '生成战略地图' : '下一步'}
          <ChevronRight size={16} />
        </motion.button>
      )}

      {/* 加载状态 */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4 mt-12"
        >
          <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
          <p className="font-mono text-sm text-[#888899]">
            正在分析数据 / 生成战略地图...
          </p>
        </motion.div>
      )}
    </div>
  );

  // Stage 2: 动态仪表板
  const renderDashboard = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen px-6 py-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="font-serif text-4xl text-[#EAEAEA] mb-2">
              {userName} 的战略地图
            </h1>
            <p className="font-mono text-sm text-[#888899]">
              实时调整 GPA 滑块以查看院校匹配状态变化
            </p>
          </div>
          <Link href="/planner">
            <button className="flex items-center gap-2 px-4 py-3 font-mono text-sm backdrop-blur-lg bg-[#D4AF37]/10 border-[0.5px] border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/20 rounded-lg transition-all">
              <Target size={16} />
              战略规划器
            </button>
          </Link>
        </motion.div>

        {/* 主布局：左侧控制面板 + 右侧大学网格 */}
        <div className="grid grid-cols-12 gap-6">
          {/* 左侧控制面板 */}
          <div className="col-span-3">
            <ProfileSidebar
              userName={userName}
              major={profile.major}
              gpa={profile.gpa}
              targetCountries={profile.targetCountry}
              onGpaChange={(newGpa) => setProfile({ ...profile, gpa: newGpa })}
            />
          </div>

          {/* 右侧大学网格 */}
          <div className="col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              {universitiesWithDynamicMatch.map((uni) => (
                <UniversityCard
                  key={uni.id}
                  university={uni}
                  matchStatus={uni.dynamicMatch}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-[#08090D] min-h-screen">
      {currentStep === 'finished' ? renderDashboard() : renderWizard()}
    </div>
  );
}

