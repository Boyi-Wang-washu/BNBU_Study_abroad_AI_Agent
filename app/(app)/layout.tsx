import Navbar from '@/components/layout/Navbar';
import ChatWidget from '@/components/chat/ChatWidget';
import { AIContextProvider } from '@/components/chat/AIContext';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AIContextProvider>
      <div className="min-h-screen">
        {/* 顶部导航栏 */}
        <Navbar />

        {/* 主内容区 */}
        <main>{children}</main>

        {/* 浮动 AI 聊天助手 */}
        <ChatWidget />
      </div>
    </AIContextProvider>
  );
}

