'use client';

import { motion } from 'framer-motion';
import { User, GraduationCap, MapPin } from 'lucide-react';

interface ProfileSidebarProps {
  userName: string;
  major: string;
  gpa: number;
  targetCountries: string[];
  onGpaChange: (gpa: number) => void;
}

const majorNames: Record<string, string> = {
  FIN: '金融学',
  ACCT: '会计学',
  CTV: '文化创意与传播',
  STAT: '统计学',
  FM: '金融数学',
  DS: '数据科学',
};

export function ProfileSidebar({ 
  userName, 
  major, 
  gpa, 
  targetCountries,
  onGpaChange 
}: ProfileSidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="
        backdrop-blur-lg bg-white/[0.02]
        border-[0.5px] border-[#2A4B55]
        rounded-lg p-6
        sticky top-6
      "
    >
      <div className="space-y-6">
        {/* 用户信息头 */}
        <div className="pb-6 border-b border-[#2A4B55]/50">
          <div className="flex items-center gap-3 mb-2">
            <User size={18} className="text-[#D4AF37]" />
            <h3 className="font-serif text-xl text-[#EAEAEA]">{userName}</h3>
          </div>
          <p className="font-mono text-xs text-[#888899] ml-[30px]">战略档案</p>
        </div>

        {/* 专业信息 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#888899]">
            <GraduationCap size={16} />
            <span className="font-mono text-xs">专业领域</span>
          </div>
          <div className="ml-6">
            <p className="font-mono text-sm text-[#EAEAEA]">{majorNames[major] || major}</p>
            <p className="font-mono text-xs text-[#888899] mt-1">{major}</p>
          </div>
        </div>

        {/* 目标国家/地区 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#888899]">
            <MapPin size={16} />
            <span className="font-mono text-xs">目标地区</span>
          </div>
          <div className="ml-6 flex flex-wrap gap-2">
            {targetCountries.map((country) => (
              <span
                key={country}
                className="
                  font-mono text-xs text-[#EAEAEA]
                  bg-[#2A4B55]/20 backdrop-blur-sm
                  border-[0.5px] border-[#2A4B55]
                  rounded px-2 py-1
                "
              >
                {country}
              </span>
            ))}
          </div>
        </div>

        {/* GPA 控制器 - 核心交互元素 */}
        <div className="pt-6 border-t border-[#2A4B55]/50">
          <div className="space-y-4">
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-xs text-[#888899]">当前 GPA</span>
                <span className="font-mono text-xs text-[#D4AF37]">实时调整</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-4xl font-bold text-[#D4AF37]">
                  {gpa.toFixed(2)}
                </span>
                <span className="font-mono text-sm text-[#888899]">/ 4.00</span>
              </div>
            </div>

            {/* 精密滑块 */}
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="4"
                step="0.01"
                value={gpa}
                onChange={(e) => onGpaChange(parseFloat(e.target.value))}
                className="
                  w-full h-[2px] 
                  bg-[#2A4B55]/30 
                  appearance-none 
                  cursor-pointer
                  rounded-full
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-[#D4AF37]
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:shadow-lg
                  [&::-webkit-slider-thumb]:shadow-[#D4AF37]/50
                  [&::-webkit-slider-thumb]:hover:scale-110
                  [&::-webkit-slider-thumb]:transition-transform
                  [&::-moz-range-thumb]:w-4
                  [&::-moz-range-thumb]:h-4
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-[#D4AF37]
                  [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:shadow-lg
                  [&::-moz-range-thumb]:shadow-[#D4AF37]/50
                "
                style={{
                  background: `linear-gradient(to right, #D4AF37 0%, #D4AF37 ${(gpa / 4) * 100}%, #2A4B5530 ${(gpa / 4) * 100}%, #2A4B5530 100%)`,
                }}
              />
              <div className="flex justify-between font-mono text-xs text-[#888899]">
                <span>0.0</span>
                <span>4.0</span>
              </div>
            </div>

            {/* 提示文本 */}
            <p className="font-mono text-xs text-[#888899] leading-relaxed">
              拖动滑块以实时查看不同 GPA 下的院校匹配状态变化
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

