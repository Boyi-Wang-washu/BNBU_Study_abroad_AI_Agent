'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// 定义 AI 上下文类型
interface AIContextType {
  pageContextSummary: string;
  setPageContextSummary: (summary: string) => void;
}

// 创建上下文
const AIContext = createContext<AIContextType | undefined>(undefined);

// 提供者组件
export function AIContextProvider({ children }: { children: ReactNode }) {
  const [pageContextSummary, setPageContextSummary] = useState<string>('');

  return (
    <AIContext.Provider value={{ pageContextSummary, setPageContextSummary }}>
      {children}
    </AIContext.Provider>
  );
}

// 自定义 Hook 用于消费上下文
export function useAIContext() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAIContext 必须在 AIContextProvider 内部使用');
  }
  return context;
}

