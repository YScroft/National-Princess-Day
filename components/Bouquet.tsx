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
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-pink-200 shadow-2xl flex flex-col items-center text-center relative overflow-hidden"
      >
        {/* خلفية جمالية */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50/50 to-transparent pointer-events-none" />

        {/* تاج علوي */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="text-3xl mb-2"
        >
          👑
        </motion.div>

        <h2 className="text-2xl font-bold text-[#f04299] mb-1">
          Flowers for My Princess
        </h2>
        <p className="text-xs text-[#9a4c73] mb-6">
          Because real flowers fade, but these will stay forever 🌸
        </p>

        {/* أنميشن باقة الورد */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative my-4 flex items-center justify-center"
        >
          <div className="text-8xl select-none filter drop-shadow-xl animate-bounce-slow">
            💐
          </div>
        </motion.div>

        {/* بطاقة الرسالة الصغيرة المرفقة بالباقة */}
        <div className="mt-4 p-4 bg-[#FFF8E7] rounded-2xl border border-pink-100 shadow-sm w-full">
          <p className="handwriting text-sm text-[#5c243e] leading-relaxed">
            &ldquo;A bouquet of endless roses and peonies for the one who brightens every single day.&rdquo;
          </p>
        </div>

        {/* زر المتابعة للقسم التالي */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="mt-8 px-8 py-3 rounded-full bg-[#f04299] text-white font-semibold shadow-md hover:shadow-pink-300/50 transition-all cursor-pointer"
        >
          Continue ✨
        </motion.button>
      </motion.div>
    </div>
  );
}
