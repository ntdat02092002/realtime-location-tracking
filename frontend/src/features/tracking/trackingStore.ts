import { create } from 'zustand';

interface TrackingState {
  driverLocation: { lat: number; lng: number } | null;
  setDriverLocation: (location: { lat: number; lng: number }) => void;
}

export const useTrackingStore = create<TrackingState>((set) => ({
  driverLocation: null,
  setDriverLocation: (location) => set({ driverLocation: location }),
}));
