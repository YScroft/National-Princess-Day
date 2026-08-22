'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BouquetProps {
  onContinue: () => void;
}

export default function Bouquet({ onContinue }: BouquetProps) {
  return (
    <div className="page-container min-h-screen flex flex-col items-center justify-center px-4 py-8 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-md w-full bg-[#fffbfd] rounded-3xl p-8 border border-pink-200 shadow-2xl flex flex-col items-center text-center relative overflow-hidden"
      >
        {/* خلفية ناعمة */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-100/40 via-transparent to-pink-50/30 pointer-events-none" />

        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="text-2xl mb-1"
        >
          👑
        </motion.div>

        <h2 className="text-2xl font-bold text-[#f04299] mb-1 font-display">
          A Bouquet Just For You
        </h2>
        <p className="text-xs text-[#9a4c73] mb-6">
          Everlasting flowers for my favorite princess 🌸
        </p>

        {/* رسم باقة الورود التفاعلية */}
        <div className="relative w-64 h-64 my-2 flex items-center justify-center">
          {/* بتلات متطايرة في الخلفية */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 0, x: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                y: [-20, -80 - i * 10],
                x: [(i % 2 === 0 ? 1 : -1) * (20 + i * 15)],
                rotate: [0, 180],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.6,
                ease: 'easeOut',
              }}
              className="absolute text-pink-300 text-sm select-none pointer-events-none"
            >
              🌸
            </motion.div>
          ))}

          {/* باقة الورد SVG */}
          <motion.svg
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-xl"
            initial={{ scale: 0.7, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: 'backOut' }}
          >
            {/* أوراق الشجر الخضراء */}
            <motion.path
              d="M70 120 C 50 100, 40 80, 55 65 C 70 80, 80 100, 70 120 Z"
              fill="#88b04b"
              opacity="0.85"
            />
            <motion.path
              d="M130 120 C 150 100, 160 80, 145 65 C 130 80, 120 100, 130 120 Z"
              fill="#88b04b"
              opacity="0.85"
            />
            <motion.path
              d="M100 110 C 100 80, 100 60, 100 50 C 110 70, 110 90, 100 110 Z"
              fill="#7ca242"
              opacity="0.9"
            />

            {/* سيقان الزهور */}
            <path
              d="M100 130 L90 190 M100 130 L100 195 M100 130 L110 190"
              stroke="#6b8e23"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* شريط الستان (Ribbon) */}
            <path
              d="M85 145 Q100 152 115 145 Q100 138 85 145 Z"
              fill="#ff4d94"
            />
            <path
              d="M93 148 Q85 170 80 180 M107 148 Q115 170 120 180"
              stroke="#ff4d94"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* الوردة الجانبية اليسرى (وردية فاتحة) */}
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <circle cx="75" cy="95" r="22" fill="#ffccd5" />
              <circle cx="75" cy="95" r="16" fill="#ff99ac" />
              <path
                d="M65 95 Q75 85 85 95 Q75 105 65 95 Z"
                fill="#ff4d6d"
                opacity="0.7"
              />
            </motion.g>

            {/* الوردة الجانبية اليمنى (بيضاء مائلة للوردي) */}
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <circle cx="125" cy="95" r="22" fill="#ffe5ec" />
              <circle cx="125" cy="95" r="16" fill="#ffb3c1" />
              <path
                d="M115 95 Q125 85 135 95 Q125 105 115 95 Z"
                fill="#ff758f"
                opacity="0.7"
              />
            </motion.g>

            {/* الوردة المركزية الكبيرة (فوشيا / روز ملكي) */}
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7, type: 'spring' }}
            >
              <circle cx="100" cy="80" r="26" fill="#ff758f" />
              <circle cx="100" cy="80" r="20" fill="#ff4d6d" />
              <circle cx="100" cy="80" r="14" fill="#c9184a" />
              <path
                d="M92 78 Q100 70 108 78 Q100 88 92 78 Z"
                fill="#ffb3c1"
                opacity="0.8"
              />
            </motion.g>

            {/* براعم زهور صغيرة إضافية */}
            <circle cx="60" cy="75" r="7" fill="#ffb703" />
            <circle cx="140" cy="75" r="7" fill="#ffb703" />
            <circle cx="100" cy="50" r="6" fill="#ffb703" />
          </motion.svg>
        </div>

        {/* بطاقة التهنئة المرفقة */}
        <div className="mt-4 p-4 bg-[#FFF8E7] rounded-2xl border border-pink-100 shadow-sm w-full">
          <p className="handwriting text-sm text-[#5c243e] leading-relaxed">
            &ldquo;A bouquet of endless roses and peonies for the one who brightens every single day.&rdquo;
          </p>
        </div>

        {/* زر المتابعة */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="mt-6 px-8 py-3 rounded-full bg-[#f04299] text-white font-semibold shadow-md hover:shadow-pink-300/50 transition-all cursor-pointer"
        >
          Continue ✨
        </motion.button>
      </motion.div>
    </div>
  );
}
