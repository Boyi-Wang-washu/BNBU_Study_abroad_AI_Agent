"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Sparkles } from "lucide-react";
import { useAIContext } from './AIContext';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Capture current page context
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const userName = searchParams.get('user') || 'BNBUer';
  const { pageContextSummary } = useAIContext();
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          {/* Glow Effect (subtle) */}
          <div className="absolute inset-0 rounded-full bg-[#D4AF37]/20 blur-xl group-hover:bg-[#D4AF37]/30 transition-all duration-300" />
          
          {/* Button */}
          <div className="relative w-14 h-14 rounded-full bg-[#08090D] border-[0.5px] border-[#D4AF37]/50 backdrop-blur-md flex items-center justify-center group-hover:border-[#D4AF37] transition-all duration-300">
            <MessageSquare className="w-6 h-6 text-[#D4AF37]" />
          </div>
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] h-[600px] flex flex-col"
          >
            {/* Glassmorphism Card */}
            <div className="h-full rounded-lg bg-[#08090D]/95 backdrop-blur-xl border-[0.5px] border-[#D4AF37]/30 shadow-2xl flex flex-col overflow-hidden">
              
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A4B55]/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-serif text-[#EAEAEA] font-semibold">
                      BNBU 战略顾问 AI
                    </h3>
                    <p className="text-xs font-mono text-[#888899]">
                      Strategic Advisor
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-[#888899]" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-[#2A4B55] scrollbar-track-transparent">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center px-6">
                    <div className="w-16 h-16 rounded-full bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center mb-4">
                      <Sparkles className="w-8 h-8 text-[#D4AF37]/50" />
                    </div>
                    <p className="text-sm font-serif text-[#EAEAEA] mb-2">
                      你好，我是 BNBU 战略顾问 AI
                    </p>
                    <p className="text-xs font-mono text-[#888899] leading-relaxed">
                      我可以为你提供专业的留学规划建议和策略指导
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg px-4 py-3 ${
                          message.role === "user"
                            ? "bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#EAEAEA]"
                            : "bg-white/[0.02] border border-[#2A4B55]/30 text-[#EAEAEA]"
                        }`}
                      >
                        <p className="text-sm font-mono leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-lg px-4 py-3 bg-white/[0.02] border border-[#2A4B55]/30">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37]/50 animate-pulse" />
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37]/50 animate-pulse delay-75" />
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37]/50 animate-pulse delay-150" />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-[#2A4B55]/30">
                <form 
                  onSubmit={(e) => {
                    handleSubmit(e, {
                      data: {
                        context: `当前用户: ${userName}。页面上下文状态: ${pageContextSummary || '正在浏览页面 ' + pathname}`,
                      },
                    });
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="输入您的问题..."
                    className="flex-1 px-4 py-3 rounded-lg bg-white/[0.02] border-[0.5px] border-[#2A4B55]/30 text-[#EAEAEA] text-sm font-mono placeholder:text-[#888899] focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="w-11 h-11 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center hover:bg-[#D4AF37]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

