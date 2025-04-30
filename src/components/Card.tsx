import React, { useState } from 'react';
import { theme } from '../styles/theme';

interface CardProps {
  selected?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  imageUrl?: string;
  title?: string;
  description?: string;
}

export const Card: React.FC<CardProps> = ({ 
  selected, 
  onClick, 
  style, 
  children,
  imageUrl,
  title,
  description 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : theme.colors.surfaces.card,
        borderRadius: theme.borderRadius.md,
        overflow: 'hidden',
        border: `2px solid ${selected ? theme.colors.accent1 : theme.colors.borders.light}`,
        transition: 'all 0.2s ease',
        cursor: onClick ? 'pointer' : 'default',
        transform: isHovered ? 'translateY(-2px)' : 'none',
        boxShadow: isHovered ? theme.shadows.lg : theme.shadows.md,
        ...style,
      }}
    >
      {imageUrl && (
        <div
          style={{
            width: '100%',
            height: '200px',
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderBottom: `1px solid ${theme.colors.borders.light}`,
          }}
        />
      )}
      <div style={{ padding: theme.spacing.lg }}>
        {title && (
          <h3 style={{
            fontSize: theme.typography.sizes.h3,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.sm,
          }}>
            {title}
          </h3>
        )}
        {description && (
          <p style={{
            fontSize: theme.typography.sizes.body,
            color: theme.colors.text.secondary,
            lineHeight: 1.5,
            margin: 0,
          }}>
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}; 