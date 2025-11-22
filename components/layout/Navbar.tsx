'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // 从 URL 查询参数获取用户名，默认为 'BNBUer'
  const userName = searchParams.get('user') || 'BNBUer';

  const navLinks = [
    { href: '/consultant', label: 'AI 选校顾问' },
    { href: '/planner', label: '学业战略规划' },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[#08090D]/80 border-b-[0.5px] border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* 左侧：品牌区 */}
          <Link href="/consultant" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <Image
                src="/Logo.png"
                alt="BNBU Logo"
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="font-serif text-xl text-[#EAEAEA] group-hover:text-[#D4AF37] transition-colors duration-300">
              BNBU 战略终端
            </span>
          </Link>

          {/* 中央：导航链接 */}
          <div className="flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      relative px-6 py-2.5
                      font-mono text-sm
                      backdrop-blur-md
                      border-[0.5px]
                      rounded-lg
                      transition-all duration-300
                      ${
                        isActive
                          ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37] shadow-lg shadow-[#D4AF37]/20'
                          : 'bg-white/[0.02] border-[#2A4B55] text-[#EAEAEA] hover:border-[#D4AF37]/50 hover:text-[#D4AF37]'
                      }
                    `}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 border-[0.5px] border-[#D4AF37] rounded-lg"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                </Link>
              );
            })}
          </div>

          {/* 右侧：用户信息 */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-[#D4AF37]/80">
              你好, {userName}
            </span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#2A4B55] flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-[#08090D]">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

