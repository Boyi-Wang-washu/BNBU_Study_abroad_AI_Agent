"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  // 获取当前 UTC 时间
  const currentUTC = new Date().toISOString().slice(11, 19);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      {/* 背景层 - 增强深度和透视 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* 1. 增强的地面平面效果 */}
        <div 
          className="absolute inset-0"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            className="absolute inset-0 origin-bottom"
            style={{
              transform: "rotateX(60deg) translateZ(-100px)",
              transformStyle: "preserve-3d",
            }}
            animate={{
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* 增强的网格地面 - 使用线性渐变创建精确的网格线 */}
            <div
              className="absolute inset-0 w-[200%] h-[200%]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(42, 75, 85, 0.08) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(42, 75, 85, 0.08) 1px, transparent 1px)
                `,
                backgroundSize: "80px 80px",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 60%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 60%, transparent 100%)",
              }}
            />
            
            {/* SVG 等高线叠加 - 降低透明度以增强细腻感 */}
            <svg
              className="absolute top-0 left-0 w-[200%] h-[200%]"
              style={{
                maskImage: "linear-gradient(to bottom, transparent 0%, black 35%, black 65%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 35%, black 65%, transparent 100%)",
              }}
            >
              <defs>
                <pattern
                  id="topo-pattern"
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="15"
                    fill="none"
                    stroke="var(--secondary)"
                    strokeWidth="0.3"
                    opacity="0.06"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="var(--secondary)"
                    strokeWidth="0.3"
                    opacity="0.05"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="var(--secondary)"
                    strokeWidth="0.3"
                    opacity="0.04"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#topo-pattern)" />
            </svg>
          </motion.div>
        </div>

        {/* 2. 右上角体积光效果 - 平衡构图 */}
        <div 
          className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(42, 75, 85, 0.03) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />

        {/* 细微的环境光晕 */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      </div>

      {/* 主内容区域 */}
      <div className="relative z-10 h-screen flex items-center pl-[10%] pr-[10%]">
        <div className="max-w-4xl">
          {/* 顶部状态标签 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-primary">
              SYSTEM STATUS: ONLINE // BNBU NETWORK DETECTED
            </p>
          </motion.div>

          {/* 主标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6"
          >
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.1] tracking-tight">
              Charting the Unknown
              <br />
              <span className="text-primary">Design Your Future.</span>
            </h1>
          </motion.div>

          {/* 副标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Data-driven strategy for the ambitious student. Less noise, more signal.
            </p>
          </motion.div>

          {/* 命令栏输入框 - 3. 优化玻璃态效果 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-2xl"
          >
            <div
              className={`group relative flex items-center backdrop-blur-lg bg-white/[0.02] border-[0.5px] rounded-lg transition-all duration-300 ${
                isInputFocused ? "border-primary shadow-[0_0_20px_rgba(212,175,55,0.2)]" : "border-[#333]"
              }`}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder='Type your target (e.g., "Ivy League Strategy")...'
                className="flex-1 bg-transparent px-6 py-5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
              />
              <Link href="/login">
                <button
                  className="mr-2 p-3 text-primary hover:bg-primary/10 rounded-md transition-colors duration-200"
                  aria-label="Submit"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>

            {/* 输入提示 */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-3 font-mono text-xs text-muted-foreground/60"
            >
              Press ENTER or click → to begin navigation
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* HUD 角落细节 */}
      {/* 左下角 - 版本号 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-8 z-20"
      >
        <p className="font-mono text-xs text-muted-foreground/40">
          v2.0.4 Stable
        </p>
      </motion.div>

      {/* 右上角 - UTC 时间 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute top-8 right-8 z-20"
      >
        <p className="font-mono text-xs text-muted-foreground/40">
          UTC {currentUTC}
        </p>
      </motion.div>

      {/* 右下角 - 导航指示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 right-8 z-20"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <p className="font-mono text-xs text-muted-foreground/40">
            READY
          </p>
        </div>
      </motion.div>

      {/* 左上角 - 品牌标识 - 4. 增强品牌显示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute top-8 left-8 z-20"
      >
        <p className="font-serif text-sm font-medium text-foreground/70 tracking-wide">
          可遇可求
        </p>
      </motion.div>
    </main>
  );
}
