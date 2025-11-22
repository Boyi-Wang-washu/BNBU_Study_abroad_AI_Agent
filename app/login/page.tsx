"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Lock, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    
    // 模拟网络请求延迟
    setTimeout(() => {
      // 使用用户输入的名字，如果为空则使用默认值 'BNBUer'
      const finalUsername = username.trim() || "BNBUer";
      router.push(`/consultant?user=${encodeURIComponent(finalUsername)}`);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#08090D]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Secure Access Terminal Container */}
        <div className="relative bg-[#141419]/70 backdrop-blur-xl border-[0.5px] border-[#2A4B55]/30 rounded-lg p-8 shadow-2xl">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-[#EAEAEA] mb-3 tracking-wide">
              BNBU 专属通道登录
            </h1>
            <p className="text-sm text-[#888899] font-light">
              解锁你的个性化留学档案
            </p>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            {/* 姓名输入框 */}
            <div className="space-y-2.5">
              <label 
                htmlFor="username" 
                className="text-xs font-mono font-medium text-[#EAEAEA]/80 flex items-center gap-2 tracking-wider uppercase"
              >
                <User className="w-3.5 h-3.5 text-[#D4AF37]/70" />
                你的名字 / 昵称
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="例如：博一"
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-md bg-black/20 backdrop-blur-sm 
                         text-[#EAEAEA] font-mono text-sm placeholder-[#888899]/40
                         border-[0.5px] border-[#2A4B55]/40 
                         focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/30 focus:bg-black/30
                         transition-all duration-300 outline-none 
                         disabled:opacity-40 disabled:cursor-not-allowed"
              />
            </div>

            {/* 密钥输入框 */}
            <div className="space-y-2.5">
              <label 
                htmlFor="accessKey" 
                className="text-xs font-mono font-medium text-[#EAEAEA]/80 flex items-center gap-2 tracking-wider uppercase"
              >
                <Lock className="w-3.5 h-3.5 text-[#D4AF37]/70" />
                访问密钥 (任意输入)
              </label>
              <input
                id="accessKey"
                type="password"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="••••••••"
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-md bg-black/20 backdrop-blur-sm 
                         text-[#EAEAEA] font-mono text-sm placeholder-[#888899]/40
                         border-[0.5px] border-[#2A4B55]/40 
                         focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/30 focus:bg-black/30
                         transition-all duration-300 outline-none 
                         disabled:opacity-40 disabled:cursor-not-allowed"
              />
            </div>

            {/* 登录按钮 - Tech Feel Style */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full mt-8 px-6 py-3.5 
                       bg-transparent border border-[#D4AF37] rounded-md
                       text-[#D4AF37] font-mono text-sm font-medium tracking-wide
                       hover:bg-[#D4AF37]/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:border-[#D4AF37]/80
                       active:bg-[#D4AF37]/20
                       disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:shadow-none
                       transition-all duration-300
                       flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>正在建立安全连接...</span>
                </>
              ) : (
                "验证身份并进入"
              )}
            </button>

            {/* 底部提示 */}
            <p className="text-[10px] text-center text-[#888899]/60 mt-6 font-mono tracking-wider">
              DEMO ENVIRONMENT — ANY INPUT ACCEPTED
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

