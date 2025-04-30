import React, { useState, useEffect, useCallback } from 'react';
import { theme } from '../styles/theme';

interface Slide {
  url: string;
  caption: string;
}

const slides: Slide[] = [
  { url: '/medieval-landscape.png', caption: 'Medieval Fantasy' },
  { url: '/steampunk-city.png', caption: 'Steampunk' },
  { url: '/cyberpunk-noir.png', caption: 'Post-Apocalyptic' },
  { url: '/medieval-battle.png', caption: 'Historical Fiction' },
  { url: '/magic-battle.png', caption: 'Modern Supernatural' },
  { url: '/medieval-blacksmith.png', caption: 'Sci-fi' },
  { url: '/medieval-battle-2.png', caption: 'Mythological' },
  { url: '/cyberpunk-city.png', caption: 'Cyberpunk' },
  { url: '/LowFantasy.png', caption: 'Low Fantasy' },
  { url: '/dwarf-door.png', caption: 'High Fantasy' }
];

const TRANSITION_DURATION = 1000;
const SLIDE_INTERVAL = 5000;

export const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const preloadImages = useCallback(() => {
    slides.forEach(slide => {
      const img = new Image();
      img.src = slide.url;
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, slide.url]));
      };
      img.onerror = () => {
        setError(`Failed to load image: ${slide.url}`);
      };
    });
  }, []);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, [isTransitioning]);

  const goToNextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % slides.length);
  }, [currentIndex, goToSlide]);

  const goToPrevSlide = useCallback(() => {
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        goToNextSlide();
      }
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [isTransitioning, goToNextSlide]);

  if (error) {
    return (
      <div style={{ 
        padding: theme.spacing.lg,
        color: theme.colors.text.primary,
        textAlign: 'center',
        backgroundColor: theme.colors.surfaces.tertiary,
        borderRadius: theme.borderRadius.md,
        border: `1px solid ${theme.colors.borders.light}`,
      }}>
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.url}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${slide.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: index === currentIndex ? 1 : 0,
            transition: `opacity ${TRANSITION_DURATION}ms ease-in-out`,
            zIndex: index === currentIndex ? 1 : 0,
            filter: loadedImages.has(slide.url) ? 'none' : 'blur(5px)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: '0px',
              left: 0,
              right: 0,
              padding: theme.spacing.xl,
              background: 'linear-gradient(transparent 0%, rgba(0, 0, 0, 0.8) 40%)',
              color: theme.colors.text.onAccent,
              paddingTop: '120px',
            }}
          >
            <h3
              style={{
                fontSize: theme.typography.sizes.h3,
                margin: 0,
                textAlign: 'center',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                position: 'relative',
                bottom: '100px',
              }}
            >
              {slide.caption}
            </h3>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={goToPrevSlide}
        style={{
          position: 'absolute',
          left: theme.spacing.md,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
          background: 'rgba(0, 0, 0, 0.5)',
          border: 'none',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          color: theme.colors.text.onAccent,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        }}
      >
        ←
      </button>

      <button
        onClick={goToNextSlide}
        style={{
          position: 'absolute',
          right: theme.spacing.md,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
          background: 'rgba(0, 0, 0, 0.5)',
          border: 'none',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          color: theme.colors.text.onAccent,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        }}
      >
        →
      </button>

      {/* Navigation dots */}
      <div
        style={{
          position: 'absolute',
          bottom: theme.spacing.xl,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: theme.spacing.sm,
          zIndex: 2,
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor:
                index === currentIndex
                  ? theme.colors.accent1
                  : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
            onMouseEnter={(e) => {
              if (index !== currentIndex) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
              }
            }}
            onMouseLeave={(e) => {
              if (index !== currentIndex) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};
