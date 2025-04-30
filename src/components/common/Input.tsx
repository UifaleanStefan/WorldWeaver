import React from 'react';
import { theme } from '../../styles/theme';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth,
  ...props
}) => {
  return (
    <div style={{ width: fullWidth ? '100%' : 'auto' }}>
      {label && (
        <label
          style={{
            display: 'block',
            marginBottom: theme.spacing.xs,
            color: theme.colors.text.primary,
            fontSize: theme.typography.sizes.small,
          }}
        >
          {label}
        </label>
      )}
      <input
        {...props}
        style={{
          width: '100%',
          padding: theme.spacing.sm,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: `1px solid ${error ? theme.colors.accent1 : 'rgba(255, 255, 255, 0.2)'}`,
          borderRadius: theme.borderRadius.md,
          color: theme.colors.text.primary,
          fontSize: theme.typography.sizes.body,
          outline: 'none',
          transition: 'border-color 0.2s ease',
          ...props.style,
        }}
      />
      {error && (
        <span
          style={{
            color: theme.colors.accent1,
            fontSize: theme.typography.sizes.small,
            marginTop: theme.spacing.xs,
            display: 'block',
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}; 