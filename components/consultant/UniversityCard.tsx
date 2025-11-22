'use client';

import { University } from '@/types';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Target, Shield } from 'lucide-react';

interface UniversityCardProps {
  university: University;
  matchStatus: 'Reach' | 'Match' | 'Safety';
}

const statusConfig = {
  Reach: {
    label: '冲刺校',
    color: '#D4AF37',
    bgColor: 'bg-[#D4AF37]/5',
    borderColor: 'border-[#D4AF37]/40',
    icon: TrendingUp,
  },
  Match: {
    label: '匹配校',
    color: '#2A9D8F',
    bgColor: 'bg-[#2A9D8F]/5',
    borderColor: 'border-[#2A9D8F]/40',
    icon: Target,
  },
  Safety: {
    label: '保底校',
    color: '#4ECDC4',
    bgColor: 'bg-[#4ECDC4]/5',
    borderColor: 'border-[#4ECDC4]/40',
    icon: Shield,
  },
};

export function UniversityCard({ university, matchStatus }: UniversityCardProps) {
  const config = statusConfig[matchStatus];
  const StatusIcon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        borderColor: config.color,
      }}
      transition={{ 
        duration: 0.4,
        layout: { duration: 0.3 }
      }}
      className={`
        relative group
        backdrop-blur-lg ${config.bgColor}
        border-[0.5px] ${config.borderColor}
        rounded-lg p-6
        hover:shadow-lg hover:shadow-${matchStatus.toLowerCase()}/10
        transition-all duration-300
      `}
      style={{
        boxShadow: `0 0 20px ${config.color}10`,
      }}
    >
      {/* 状态标签 */}
      <div className="absolute -top-3 -right-3">
        <div 
          className={`
            ${config.bgColor} 
            backdrop-blur-md
            border-[0.5px] ${config.borderColor}
            rounded-full px-3 py-1
            flex items-center gap-1.5
          `}
        >
          <StatusIcon size={12} style={{ color: config.color }} />
          <span className="font-mono text-xs" style={{ color: config.color }}>
            {config.label}
          </span>
        </div>
      </div>

      {/* 大学信息 */}
      <div className="space-y-4">
        {/* 大学名称 */}
        <div>
          <h3 className="font-serif text-xl text-[#EAEAEA] mb-1">
            {university.name}
          </h3>
          <div className="flex items-center gap-1.5 text-[#888899]">
            <MapPin size={14} />
            <span className="font-mono text-xs">{university.location}</span>
          </div>
        </div>

        {/* GPA 要求 */}
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-xs text-[#888899]">MIN GPA:</span>
          <span className="font-mono text-2xl font-bold" style={{ color: config.color }}>
            {university.minGpaReq.toFixed(1)}
          </span>
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2">
          {university.tags.map((tag, idx) => (
            <span
              key={idx}
              className="
                font-mono text-xs text-[#888899]
                bg-white/[0.02] backdrop-blur-sm
                border-[0.5px] border-[#2A4B55]
                rounded px-2 py-1
              "
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover 光效 */}
      <div 
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${config.color}08, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

