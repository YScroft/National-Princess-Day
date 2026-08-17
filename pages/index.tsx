import React, { useState } from 'react';
import Passcode from '../components/Passcode';
import Hero from '../components/Hero';
import MessageCard from '../components/MessageCard';
import Playlist from '../components/Playlist';
import FlipCards from '../components/FlipCards';
import FinalLetter from '../components/FinalLetter';

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [isGiftOpened, setIsGiftOpened] = useState(false);

  if (!unlocked) {
    return <Passcode onSuccess={() => setUnlocked(true)} />;
  }

  return (
    <main className="min-h-screen bg-[#fff9ff] text-[#2d2d2d] flex flex-col items-center">
      <Hero isGiftOpened={isGiftOpened} onOpenGift={() => setIsGiftOpened(true)} />
      <MessageCard />
      <Playlist />
      <FlipCards />
      <FinalLetter />
    </main>
  );
}
