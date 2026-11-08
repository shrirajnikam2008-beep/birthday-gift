import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

export interface AudioTrack {
  id: 'mukhda' | 'climax' | 'full';
  title: string;
  marathiTitle: string;
  subtitle: string;
  lyricsHighlight: string;
  durationLabel: string;
  src: string;
  badge: string;
  emoji: string;
}

const resolveAudioUrl = (src: string): string => {
  if (!src || src.startsWith('http://') || src.startsWith('https://')) return src;
  const clean = src.startsWith('/') ? src.slice(1) : src;
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${clean}`;
};

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'mukhda',
    title: 'Iconic Birthday Blessing & Hook',
    marathiTitle: 'गाण्याची सुरुवात (मुखडा)',
    subtitle: 'The warm, melodic opening of the classic Marathi birthday song ❤️',
    lyricsHighlight: 'गोड सुरावट आणि प्रेमळ शुभेच्छांची सुरुवात — मम्मासाठी खास!',
    durationLabel: '1:06',
    src: resolveAudioUrl('/audio/marathi_birthday_mukhda.mp3'),
    badge: 'Classic Hook',
    emoji: '🎵',
  },
  {
    id: 'climax',
    title: 'Celebration Climax Chorus',
    marathiTitle: 'उत्सवाचा सोहळा (क्लायमॅक्स)',
    subtitle: 'High-energy chorus, trumpet fanfares, rhythmic clapping & party cheers 🎉',
    lyricsHighlight: 'उत्साही सोहळा, टाळ्यांचा गजर आणि आनंदाचा जल्लोष!',
    durationLabel: '0:45',
    src: resolveAudioUrl('/audio/marathi_birthday_climax.mp3'),
    badge: 'Cake Cutting',
    emoji: '🎉',
  },
  {
    id: 'full',
    title: 'Complete Classic Marathi Song',
    marathiTitle: 'संपूर्ण गाणं (रंगत संगत - १९८९)',
    subtitle: 'अशोक पत्की • प्रवीण दवणे • विनय मांडके, रवींद्र साठे, सुदेश भोसले',
    lyricsHighlight: 'संपूर्ण गाणं ऐका — आठवणींच्या सुरांतून वाढदिवसाची गोड मैफल.',
    durationLabel: '5:03',
    src: resolveAudioUrl('/audio/marathi_birthday_full.mp3'),
    badge: 'Full Album',
    emoji: '📻',
  },
];

interface AudioContextValue {
  tracks: AudioTrack[];
  activeTrack: AudioTrack;
  isPlaying: boolean;
  isLooping: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isDrawerOpen: boolean;
  playTrack: (trackId: 'mukhda' | 'climax' | 'full') => Promise<void>;
  togglePlay: () => Promise<void>;
  toggleLoop: () => void;
  pause: () => void;
  setVolume: (val: number) => void;
  toggleMute: () => void;
  seek: (time: number) => void;
  setIsDrawerOpen: (open: boolean) => void;
  toggleDrawer: () => void;
}

const AudioContext = createContext<AudioContextValue | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTrackId, setActiveTrackId] = useState<'mukhda' | 'climax' | 'full'>('mukhda');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isLoopingRef = useRef<boolean>(true);

  const activeTrack = AUDIO_TRACKS.find((t) => t.id === activeTrackId) || AUDIO_TRACKS[0];

  // Initialize Audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.loop = true;
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const onEnded = () => {
      if (isLoopingRef.current || audio.loop) {
        audio.currentTime = 0;
        audio.play().catch(() => setIsPlaying(false));
        return;
      }
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    // Initial source
    audio.src = activeTrack.src;
    audio.volume = volume;

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.src = '';
    };
  }, []);

  const toggleLoop = useCallback(() => {
    setIsLooping((prev) => {
      const next = !prev;
      isLoopingRef.current = next;
      if (audioRef.current) {
        audioRef.current.loop = next;
      }
      return next;
    });
  }, []);

  // Update volume
  const setVolume = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
      if (clamped > 0 && isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioRef.current.muted = nextMuted;
  }, [isMuted]);

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const playTrack = useCallback(async (trackId: 'mukhda' | 'climax' | 'full') => {
    if (!audioRef.current) return;
    const track = AUDIO_TRACKS.find((t) => t.id === trackId) || AUDIO_TRACKS[0];
    setActiveTrackId(trackId);
    audioRef.current.loop = isLoopingRef.current;

    // If source differs, load new source
    if (audioRef.current.src !== window.location.origin + track.src && !audioRef.current.src.endsWith(track.src)) {
      audioRef.current.src = track.src;
      audioRef.current.load();
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = useCallback(async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        audioRef.current.loop = isLoopingRef.current;
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  }, [isPlaying]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((prev) => !prev);
  }, []);

  return (
    <AudioContext.Provider
      value={{
        tracks: AUDIO_TRACKS,
        activeTrack,
        isPlaying,
        isLooping,
        currentTime,
        duration,
        volume,
        isMuted,
        isDrawerOpen,
        playTrack,
        togglePlay,
        toggleLoop,
        pause,
        setVolume,
        toggleMute,
        seek,
        setIsDrawerOpen,
        toggleDrawer,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextValue => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
