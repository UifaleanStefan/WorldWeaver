import React, { useState } from 'react';
import { theme } from '../../styles/theme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  style,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.md,
    fontWeight: theme.typography.weights.medium,
    transition: 'all 0.2s ease',
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    opacity: props.disabled ? 0.7 : 1,
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: isHovered ? '#7A9E44' : theme.colors.accent1,
      color: theme.colors.text.onAccent,
      border: 'none',
    },
    secondary: {
      backgroundColor: isHovered ? '#98B4C6' : theme.colors.accent2,
      color: theme.colors.text.onAccent,
      border: 'none',
    },
    outline: {
      backgroundColor: isHovered ? theme.colors.accent1 : 'transparent',
      color: isHovered ? theme.colors.text.onAccent : theme.colors.text.primary,
      border: `2px solid ${theme.colors.accent1}`,
    },
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    small: {
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      fontSize: theme.typography.sizes.small,
    },
    medium: {
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: theme.typography.sizes.body,
    },
    large: {
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      fontSize: theme.typography.sizes.h3,
    },
  };

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...sizeStyles[size],
        width: fullWidth ? '100%' : 'auto',
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}; 