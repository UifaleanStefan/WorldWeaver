import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WorldData } from '../types/WorldData';
import { WorldStyle } from '../types';

// Default empty world data
const defaultWorldData: WorldData = {
  name: '',
  description: '',
  image: '',
  selectedGroups: [],
  locations: [],
  characters: [],
  locationDescriptions: {},
  characteristicDescriptions: {},
  style: WorldStyle.MedievalFantasy,
  characteristics: {}
};

interface WorldContextType {
  worldData: WorldData;
  updateWorldData: (data: WorldData) => Promise<void>;
}

const WorldContext = createContext<WorldContextType | undefined>(undefined);

export const useWorld = (): WorldContextType => {
  const context = useContext(WorldContext);
  if (!context) {
    throw new Error('useWorld must be used within a WorldProvider');
  }
  return context;
};

interface WorldProviderProps {
  children: ReactNode;
}

export const WorldProvider: React.FC<WorldProviderProps> = ({ children }) => {
  const [worldData, setWorldData] = useState<WorldData>(defaultWorldData);

  const updateWorldData = async (data: WorldData): Promise<void> => {
    setWorldData(data);
  };

  return (
    <WorldContext.Provider value={{ worldData, updateWorldData }}>
      {children}
    </WorldContext.Provider>
  );
};

// Re-export the WorldData interface for convenience
export type { WorldData }; 