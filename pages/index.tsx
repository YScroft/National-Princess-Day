import React, { useState } from 'react';
import Passcode from '../components/Passcode';
import Hero from '../components/Hero';
import MessageCard from '../components/MessageCard';
import FinalLetter from '../components/FinalLetter';

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [isGiftOpened, setIsGiftOpened] = useState(false);

  // 1. شاشة الرمز السري
  if (!unlocked) {
    return <Passcode onSuccess={() => setUnlocked(true)} />;
  }

  // 2. شاشة الترحيب والهدية (Hero)
  if (!isGiftOpened) {
    return (
      <main className="min-h-screen bg-[#fff9ff] text-[#2d2d2d] flex flex-col items-center justify-center overflow-hidden">
        <Hero isGiftOpened={isGiftOpened} onOpenGift={() => setIsGiftOpened(true)} />
      </main>
    );
  }

  // 3. تسلسل الرسائل والأغاني والوردة والبطاقات (تتحكم به MessageCard داخلياً)
  return (
    <main className="min-h-screen bg-[#fff9ff] text-[#2d2d2d] flex flex-col items-center justify-center">
      <MessageCard isRevealed={true} />
    </main>
  );
}
