import { WorldStyle } from './index';

export interface WorldData {
  name: string;
  description: string;
  image: string;
  selectedGroups: string[];
  locations: string[];
  characters: string[];
  locationDescriptions: Record<string, string>;
  characteristicDescriptions: Record<string, string>;
  style: WorldStyle;
  characteristics: any; // This should match whatever structure is being used
} 