import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  X,
  Music,
  Sparkles,
  Heart,
  Disc,
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const AudioPlayerDrawer: React.FC = () => {
  const {
    tracks,
    activeTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isDrawerOpen,
    playTrack,
    togglePlay,
    setVolume,
    toggleMute,
    seek,
    setIsDrawerOpen,
  } = useAudio();

  if (!isDrawerOpen) return null;

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-cocoa/40 backdrop-blur-sm">
        {/* Backdrop Click Dismiss */}
        <div
          className="absolute inset-0"
          onClick={() => setIsDrawerOpen(false)}
        />

        {/* Modal Player Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-cream-paper rounded-3xl p-5 sm:p-7 border-3 border-cocoa shadow-polaroid z-10 flex flex-col gap-4 text-cocoa"
          style={{ borderWidth: '3px' }}
        >
          {/* Scrapbook Washi Tape */}
          <div className="washi-tape washi-tape-pink -top-3 left-1/2 -translate-x-1/2 scale-90" />

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close music player"
            className="absolute top-3.5 right-3.5 p-2 rounded-full bg-cream-warm hover:bg-blush border-2 border-cocoa text-cocoa transition-colors cursor-pointer shadow-xs"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 pr-8">
            <div className={`p-3 rounded-2xl border-2 border-cocoa shadow-sticker ${isPlaying ? 'bg-sunshine animate-pulse' : 'bg-cream-warm'}`}>
              <Disc className={`w-6 h-6 text-cocoa ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sunshine border border-cocoa text-[10px] font-black uppercase tracking-wider text-cocoa mb-1 shadow-2xs">
                <Music className="w-3 h-3" />
                <span>MARATHI BIRTHDAY SPECIAL</span>
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-cocoa leading-tight">
                हॅपी बर्थडे • रंगत संगत (१९८९)
              </h3>
              <p className="text-[11px] font-bold text-cocoa-light">
                संगीत: अशोक पत्की • बोल: प्रवीण दवणे • गायक: विनय मांडके, रवींद्र साठे, सुदेश भोसले
              </p>
            </div>
          </div>

          {/* Track Selection Tabs (Crisp Parts) */}
          <div className="flex flex-col gap-2 mt-1">
            <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-cocoa-light px-0.5">
              <span>Choose Song Part / Segment:</span>
              <span className="text-sunshine-deep flex items-center gap-1 font-black">
                <Sparkles className="w-3 h-3" /> Crisp Clips
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {tracks.map((track) => {
                const isSelected = activeTrack.id === track.id;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => playTrack(track.id)}
                    className={`text-left p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-sunshine/40 border-cocoa shadow-sticker -translate-y-0.5'
                        : 'bg-cream-warm/70 border-cocoa/25 hover:border-cocoa hover:bg-cream-warm'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-lg">{track.emoji}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm text-cocoa truncate">
                            {track.title}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-cream-paper border border-cocoa/30 text-[9px] font-black uppercase tracking-wider text-cocoa shrink-0">
                            {track.badge}
                          </span>
                        </div>
                        <p className="font-marathi text-xs font-bold text-cocoa/80 truncate mt-0.5">
                          {track.marathiTitle}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-black text-cocoa bg-cream-paper px-2 py-1 rounded-lg border border-cocoa/25">
                        {track.durationLabel}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Lyrics Quote Highlight */}
          <div className="p-3.5 rounded-2xl bg-sunshine-soft/60 border-2 border-dashed border-cocoa/30 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] font-black uppercase tracking-wider text-cocoa-light mb-1">
              <Heart className="w-3 h-3 fill-blush-deep text-cocoa" />
              <span>या भागाबद्दल</span>
            </div>
            <p className="font-marathi text-sm sm:text-base font-bold text-cocoa leading-relaxed">
              &ldquo;{activeTrack.lyricsHighlight}&rdquo;
            </p>
          </div>

          {/* Scrubber Progress Bar */}
          <div className="flex flex-col gap-1 mt-1">
            <div className="relative w-full h-2.5 bg-cream-warm rounded-full border border-cocoa/30 overflow-hidden cursor-pointer">
              <div
                className="h-full bg-sunshine transition-all duration-150 rounded-full border-r border-cocoa"
                style={{ width: `${progressPercent}%` }}
              />
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={(e) => seek(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold text-cocoa-light">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Player Controls (Play/Pause, Dancing Equalizer, Volume) */}
          <div className="flex items-center justify-between gap-3 pt-1 border-t border-dashed border-cocoa/20">
            {/* Animated Equalizer Wave */}
            <div className="flex items-end gap-1 h-6 w-16">
              {[40, 85, 60, 100, 70, 90].map((h, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-200 ${
                    isPlaying ? 'bg-sunshine-deep animate-pulse' : 'bg-cocoa/25'
                  }`}
                  style={{
                    height: isPlaying ? `${h}%` : '20%',
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>

            {/* Main Play/Pause Button */}
            <button
              type="button"
              onClick={togglePlay}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-sunshine hover:bg-sunshine-deep border-3 border-cocoa shadow-sticker hover:shadow-stickerHover hover:scale-105 active:scale-95 transition-all text-sm font-black text-cocoa cursor-pointer"
              style={{ borderWidth: '3px' }}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-cocoa text-cocoa" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-cocoa text-cocoa" />
                  <span>Play {activeTrack.badge}</span>
                </>
              )}
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="p-1.5 rounded-xl text-cocoa hover:bg-cream-warm transition-colors cursor-pointer"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-blush-deep" />
                ) : (
                  <Volume2 className="w-4 h-4 text-cocoa" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-16 sm:w-20 accent-sunshine cursor-pointer"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
