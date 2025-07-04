import { createContext, useContext, useState } from 'react';

interface TimelineContextType {
  isTimelineAnimated: boolean;
  setTimelineAnimated: (value: boolean) => void;
}

const TimelineContext = createContext<TimelineContextType | null>(null);

export const TimelineProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTimelineAnimated, setTimelineAnimated] = useState(false);

  return (
    <TimelineContext.Provider value={{ isTimelineAnimated, setTimelineAnimated }}>
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimeline = () => {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error('useTimeline must be used within a TimelineProvider');
  }
  return context;
}; 