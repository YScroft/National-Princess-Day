'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BouquetProps {
  onContinue: () => void;
}

interface FallingItem {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  symbol: string;
}

export default function Bouquet({ onContinue }: BouquetProps) {
  const [items, setItems] = useState<FallingItem[]>([]);

  useEffect(() => {
    // توليد عناصر متساقطة عشوائية في كامل الصفحة
    const symbols = ['💖', '🌸', '✨', '💕', '🌷'];
    const generated = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // نسبة مئوية عبر عرض الشاشة
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 5,
      size: 14 + Math.random() * 16,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
    }));
    setItems(generated);
  }, []);

  return (
    <div className="fixed inset-0 min-h-screen w-screen bg-gradient-to-b from-[#fff0f6] via-[#fff5f8] to-[#ffeef5] flex flex-col items-center justify-between py-10 px-4 select-none overflow-hidden z-40">
      
      {/* تساقط القلوب والبتلات على كامل الشاشة */}
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: -50, x: `${item.x}vw`, opacity: 0, rotate: 0 }}
          animate={{
            y: '110vh',
            opacity: [0, 1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'linear',
          }}
          style={{ fontSize: `${item.size}px` }}
          className="absolute top-0 left-0 pointer-events-none z-0"
        >
          {item.symbol}
        </motion.div>
      ))}

      {/* العنوان العلوي */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 mt-2"
      >
        <span className="text-3xl filter drop-shadow-sm">👑</span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#f04299] tracking-wide mt-2 font-display">
          A Rose for My Only Princess
        </h1>
        <p className="text-sm sm:text-base text-[#9a4c73] mt-1 font-medium">
          I Love You today, and forever 🌸
        </p>
      </motion.div>

      {/* الوردة الكبيرة في منتصف الشاشة */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'backOut' }}
        className="relative z-10 w-full max-w-sm sm:max-w-md aspect-square flex items-center justify-center my-auto"
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full filter drop-shadow-[0_15px_30px_rgba(240,66,153,0.25)]"
        >
          <defs>
            {/* تدرجات ألوان البتلات والظلال */}
            <radialGradient id="roseGradient" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#ff4d88" />
              <stop offset="60%" stopColor="#e6005c" />
              <stop offset="100%" stopColor="#990033" />
            </radialGradient>
            <radialGradient id="petalLight" cx="40%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#ff80aa" />
              <stop offset="70%" stopColor="#f04299" />
              <stop offset="100%" stopColor="#c71585" />
            </radialGradient>
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#99cc33" />
              <stop offset="100%" stopColor="#4d8000" />
            </linearGradient>
            <linearGradient id="stemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#558000" />
              <stop offset="100%" stopColor="#2e4d00" />
            </linearGradient>
          </defs>

          {/* ساق الوردة */}
          <path
            d="M200 240 Q195 310 205 380"
            stroke="url(#stemGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />

          {/* أوراق الشجر الجانبية */}
          <motion.path
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            d="M198 290 Q150 270 140 310 Q170 320 198 295"
            fill="url(#leafGrad)"
          />
          <motion.path
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            d="M202 330 Q250 310 265 345 Q230 360 202 335"
            fill="url(#leafGrad)"
          />

          {/* البتلات الخارجية المتفتحة */}
          <motion.path
            animate={{ scale: [0.97, 1.02, 0.97] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            d="M200 130 C120 110 90 200 140 240 C170 260 230 260 260 240 C310 200 280 110 200 130 Z"
            fill="url(#roseGradient)"
            opacity="0.95"
          />

          <path
            d="M150 160 C120 190 140 240 180 245 C150 220 140 180 150 160 Z"
            fill="url(#petalLight)"
            opacity="0.8"
          />
          <path
            d="M250 160 C280 190 260 240 220 245 C250 220 260 180 250 160 Z"
            fill="url(#petalLight)"
            opacity="0.8"
          />

          {/* قلب الوردة الملتف */}
          <motion.ellipse
            cx="200"
            cy="185"
            rx="45"
            ry="35"
            fill="url(#petalLight)"
          />
          <path
            d="M175 175 Q200 155 225 175 Q200 205 175 175 Z"
            fill="#ff1493"
          />
          <path
            d="M185 178 Q200 165 215 178 Q200 195 185 178 Z"
            fill="#b30047"
          />
          <circle cx="200" cy="180" r="10" fill="#80002a" />
        </svg>
      </motion.div>

      {/* زر المتابعة في الأسفل */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="z-10 mb-6"
      >
        <button
          onClick={onContinue}
          className="px-10 py-4 rounded-full bg-[#f04299] text-white text-base sm:text-lg font-bold shadow-lg hover:shadow-pink-400/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          Continue To Flip Cards ✨
        </button>
      </motion.div>
    </div>
  );
}
