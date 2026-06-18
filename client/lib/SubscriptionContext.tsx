import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SubscriptionState {
  phone: string | null;
  plan: 'weekly' | 'monthly' | null;
  subscribed: boolean;
}

export interface VideoItem {
  title: string;
  video: string;
  genre?: string;
}

interface SubscriptionContextValue extends SubscriptionState {
  openAuth: (onSuccess?: () => void) => void;
  closeAuth: () => void;
  isAuthOpen: boolean;
  onSuccessCallback: (() => void) | null;
  setSubscribed: (phone: string, plan: 'weekly' | 'monthly') => void;
  // Video player
  videoItem: VideoItem | null;
  openVideo: (item: VideoItem) => void;
  closeVideo: () => void;
  // Combined: auth check then play
  playVideo: (item: VideoItem) => void;
}

const SubscriptionContext = createContext<SubscriptionContextValue | null>(null);

const STORAGE_KEY = 'bharattv_user';

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState]           = useState<SubscriptionState>({ phone: null, plan: null, subscribed: false });
  const [isAuthOpen, setAuthOpen]   = useState(false);
  const [onSuccessCallback, setOnSuccessCallback] = useState<(() => void) | null>(null);
  const [videoItem, setVideoItem]   = useState<VideoItem | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.phone && parsed.plan) {
          setState({ phone: parsed.phone, plan: parsed.plan, subscribed: true });
        }
      }
    } catch {}
  }, []);

  const openAuth = (onSuccess?: () => void) => {
    if (state.subscribed && onSuccess) { onSuccess(); return; }
    setOnSuccessCallback(() => onSuccess ?? null);
    setAuthOpen(true);
  };

  const closeAuth = () => { setAuthOpen(false); setOnSuccessCallback(null); };

  const setSubscribed = (phone: string, plan: 'weekly' | 'monthly') => {
    const newState = { phone, plan, subscribed: true };
    setState(newState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  };

  const openVideo  = (item: VideoItem) => setVideoItem(item);
  const closeVideo = () => setVideoItem(null);

  // Main helper used everywhere — check auth then play
  const playVideo = (item: VideoItem) => {
    openAuth(() => openVideo(item));
  };

  return (
    <SubscriptionContext.Provider value={{
      ...state, openAuth, closeAuth, isAuthOpen, onSuccessCallback, setSubscribed,
      videoItem, openVideo, closeVideo, playVideo,
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error('useSubscription must be inside SubscriptionProvider');
  return ctx;
};
