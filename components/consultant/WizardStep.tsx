'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface WizardStepProps {
  question: string;
  children: ReactNode;
  step: number;
}

export function WizardStep({ question, children, step }: WizardStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* 步骤指示器 */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
          <span className="font-mono text-[#D4AF37] text-sm">{step}</span>
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-[#D4AF37]/30 to-transparent" />
      </div>

      {/* 问题标题 */}
      <h2 className="font-serif text-3xl text-[#EAEAEA] mb-12 tracking-wide">
        {question}
      </h2>

      {/* 输入区域 */}
      <div className="space-y-6">
        {children}
      </div>
    </motion.div>
  );
}

