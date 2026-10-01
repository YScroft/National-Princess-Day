'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { showToast } from '@/lib/toast';

interface PlaylistProps {
  onContinue?: () => void;
}

interface Track {
  id: number;
  title: string;
  description: string;
  image: string;
  audio: string;
}

const tracks: Track[] = [
  {
    id: 1,
    title: 'I am Sorry',
    description: "I wish we could forget what I said that day and all the tension and discussions it triggered. Let's leave all that impact behind and give ourselves a fresh start: 💞",
    image: '/assets/music1.png',
    audio: '/assets/music1-Bpgt1BZ5.mp3',
  },
  {
    id: 2,
    title: 'If the world was ending',
    description: "Even if the world ends, I'd still find you 🤍",
    image: '/assets/music2.png',
    audio: '/assets/music2-mdcMq3L1.mp3',
  },
  {
    id: 3,
    title: 'You are the love my life',
    description: 'No matter when, where, or what happens, I will be there for you. I am completely yours. 💞',
    image: '/assets/music3.png',
    audio: '/assets/music3-ClPh4k2q.mp3',
  },
];

export default function Playlist({ onContinue }: PlaylistProps) {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({});

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  useEffect(() => {
    if (currentTrack) {
      const audio = audioRefs.current[currentTrack];
      if (audio) {
        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);

        return () => {
          audio.removeEventListener('timeupdate', updateTime);
          audio.removeEventListener('loadedmetadata', updateDuration);
          audio.removeEventListener('play', handlePlay);
          audio.removeEventListener('pause', handlePause);
        };
      }
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    }
  }, [currentTrack]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    }
  };

  const handleTrackClick = async (trackId: number) => {
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio && audio !== audioRefs.current[trackId]) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    const audio = audioRefs.current[trackId];
    if (audio) {
      try {
        if (currentTrack === trackId && !audio.paused) {
          audio.pause();
          setIsPlaying(false);
        } else {
          await audio.play();
          setCurrentTrack(trackId);
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Error playing audio:', error);
        if (error instanceof Error && error.name === 'NotAllowedError') {
          showToast.error('Please click the play button to start the music');
        }
      }
    }
  };

  const handlePlayPause = async () => {
    if (currentTrack) {
      const audio = audioRefs.current[currentTrack];
      if (audio) {
        try {
          if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
          } else {
            await audio.play();
            setIsPlaying(true);
          }
        } catch (error) {
          console.error('Error playing audio:', error);
          showToast.error('Failed to play audio');
        }
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentTrack) {
      const audio = audioRefs.current[currentTrack];
      if (audio) {
        const newTime = parseFloat(e.target.value);
        audio.currentTime = newTime;
        setCurrentTime(newTime);
      }
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTrackData = currentTrack
    ? tracks.find((t) => t.id === currentTrack)
    : null;

  return (
    <div className="page-container font-display relative min-h-screen flex flex-col items-center justify-center px-2 sm:px-6 md:px-8 py-6">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="text-center">
            <h2 className="text-[#f04299] text-lg font-bold leading-tight">
              A Dedicated Playlist For You
            </h2>
            <div className="text-xs text-[#9a4c73]">
              I Hope You&apos;ll Like It
            </div>
          </div>
        </div>

        {/* Playlist Container */}
        <div className="bg-[#FFF8E7] rounded-2xl p-2 sm:p-5 md:p-6 border border-pink-200 shadow-md animate-fadeIn mx-auto overflow-hidden">
          {/* Music Player */}
          {currentTrackData ? (
            <div className="mb-6 flex items-center gap-3 sm:gap-4 p-3 rounded-lg bg-white/70 border border-pink-100 shadow-sm max-w-lg w-full mx-auto">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm">
                <Image
                  src={currentTrackData.image}
                  alt={currentTrackData.title}
                  fill
                  className="object-cover"
                  sizes="48px"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-[#1b0d14] truncate">
                  {currentTrackData.title}
                </div>
                <div className="text-xs text-[#9a4c73] mb-2 whitespace-normal break-words leading-snug">
                  {currentTrackData.description}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#9a4c73] w-8 text-left">
                    {formatTime(currentTime)}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 h-1 accent-[#f04299] appearance-none bg-pink-100 rounded-full cursor-pointer"
                  />
                  <span className="text-xs text-[#9a4c73] w-8 text-right">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>
              <button
                onClick={handlePlayPause}
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-md bg-white text-[#f04299] border border-pink-200 flex-shrink-0"
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
            </div>
          ) : (
            <div className="mb-6 h-16 sm:h-20 flex items-center justify-center">
              <div className="text-sm sm:text-base text-[#9a4c73] font-medium text-center">
                Choose a track to start vibing ✨
              </div>
            </div>
          )}

          {/* Carousel */}
          <div className="relative max-w-full mx-auto">
            {/* Scroll Buttons */}
            {canScrollLeft && (
              <button
                onClick={scrollLeft}
                className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md text-[#f04299] flex items-center justify-center"
              >
                ‹
              </button>
            )}
            {canScrollRight && (
              <button
                onClick={scrollRight}
                className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md text-[#f04299] flex items-center justify-center"
              >
                ›
              </button>
            )}

            {/* Tracks Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-3 overflow-x-auto py-2 px-2"
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
              }}
            >
              {tracks.map((track) => (
                <div
                  key={track.id}
                  onClick={() => handleTrackClick(track.id)}
                  style={{
                    flex: '0 0 78%',
                    maxWidth: '240px',
                    scrollSnapAlign: 'center',
                  }}
                  className={`cursor-pointer transition-transform ${
                    currentTrack === track.id ? 'scale-105' : ''
                  }`}
                >
                  <div className="bg-white rounded-xl p-3 border-2 border-pink-100 shadow-md h-full flex flex-col items-center text-center">
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2 bg-pink-100">
                      <Image
                        src={track.image}
                        alt={track.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="font-bold text-[#1b0d14] text-xs mb-1">
                      {track.title}
                    </div>
                    <div className="text-[11px] text-[#9a4c73] leading-relaxed whitespace-normal break-words">
                      {track.description}
                    </div>
                  </div>
                  <audio
                    ref={(el) => {
                      audioRefs.current[track.id] = el;
                    }}
                    src={track.audio}
                    preload="metadata"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        {onContinue && (
          <div className="text-center mt-6">
            <button
              onClick={onContinue}
              className="px-8 py-3 rounded-full bg-[#f04299] text-white font-semibold shadow-md text-sm sm:text-base"
            >
              Continue to Next ✨
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
