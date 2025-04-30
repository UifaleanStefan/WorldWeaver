import React from 'react';
import { WorldStyle } from '../../types';

interface BackgroundImagesProps {
  style?: WorldStyle;
}

// Define background image pairs for each style
const backgroundImagePairs: Record<WorldStyle, [string, string]> = {
  [WorldStyle.MedievalFantasy]: ['/medieval-fantasy1.png', '/medieval-fantasy2.png'],
  [WorldStyle.Steampunk]: ['/steampunk1.png', '/steampunk2.png'],
  [WorldStyle.PostApocalyptic]: ['/post-apocalyptic1.png', '/post-apocalyptic2.png'],
  [WorldStyle.HistoricalFiction]: ['/historical-fiction1.png', '/historical-fiction2.png'],
  [WorldStyle.ModernSupernatural]: ['/modern-supernatural1.png', '/modern-supernatural2.png'],
  [WorldStyle.SciFi]: ['/sci-fi1.png', '/sci-fi2.png'],
  [WorldStyle.Mythological]: ['/mythological1.png', '/mythological2.png'],
  [WorldStyle.Cyberpunk]: ['/cyberpunk1.png', '/cyberpunk2.png'],
  [WorldStyle.LowFantasy]: ['/low-fantasy1.png', '/low-fantasy2.png'],
  [WorldStyle.HighFantasy]: ['/high-fantasy1.png', '/high-fantasy2.png'],
};

// Default images to use when no style is provided
const defaultImages: [string, string] = ['/KnightSwingingSword.png', '/DragonFire.png'];

export const BackgroundImages: React.FC<BackgroundImagesProps> = ({ style }) => {
  const [leftImage, rightImage] = style ? backgroundImagePairs[style] : defaultImages;

  return (
    <>
      <div style={{
        position: 'fixed',
        left: '-50px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '500px',
        height: '500px',
        opacity: 0.3,
        backgroundImage: `url(${leftImage})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        zIndex: 0,
        pointerEvents: 'none',
      }} />
      
      <div style={{
        position: 'fixed',
        right: '-50px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '500px',
        height: '500px',
        opacity: 0.3,
        backgroundImage: `url(${rightImage})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        zIndex: 0,
        pointerEvents: 'none',
      }} />
    </>
  );
}; 