import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PasscodeProps {
  onSuccess: () => void;
}

export default function Passcode({ onSuccess }: PasscodeProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const correctCode = '0603';

  const handleDigit = (digit: string) => {
    if (code.length < 4) {
      const newCode = code + digit;
      setCode(newCode);
      if (newCode.length === 4) {
        if (newCode === correctCode) {
          setTimeout(() => onSuccess(), 300);
        } else {
          setError(true);
          setTimeout(() => {
            setCode('');
            setError(false);
          }, 800);
        }
      }
    }
  };

  const handleDelete = () => {
    setCode((prev) => prev.slice(0, -1));
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fff9ff] px-4 font-sans select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xs flex flex-col items-center"
      >
        <div className="text-4xl mb-3">👑</div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">Enter Passcode</h2>
        <p className="text-sm text-gray-500 mb-8">A date we will never forget ✨</p>

        {/* دوائر عرض الرمز */}
        <motion.div
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex gap-4 mb-10"
        >
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={idx}
              className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                code.length > idx
                  ? error
                    ? 'bg-red-400 border-red-400'
                    : 'bg-[#ff94d2] border-[#ff94d2] scale-110'
                  : 'border-pink-300 bg-transparent'
              }`}
            />
          ))}
        </motion.div>

        {/* لوحة الأرقام */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-[260px]">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleDigit(num)}
              className="h-16 rounded-full bg-white shadow-sm border border-pink-100 text-xl font-semibold text-gray-700 active:bg-pink-100 active:scale-95 transition-all flex items-center justify-center"
            >
              {num}
            </button>
          ))}
          <div />
          <button
            onClick={() => handleDigit('0')}
            className="h-16 rounded-full bg-white shadow-sm border border-pink-100 text-xl font-semibold text-gray-700 active:bg-pink-100 active:scale-95 transition-all flex items-center justify-center"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="h-16 rounded-full bg-transparent text-sm font-medium text-pink-500 active:scale-95 transition-all flex items-center justify-center"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}
