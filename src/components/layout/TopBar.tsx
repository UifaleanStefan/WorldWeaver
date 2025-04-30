import React from 'react';
import { theme } from '../../styles/theme';
import { useNavigate } from 'react-router-dom';

export const TopBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: '60px',
        background: theme.colors.gradients.primary,
        borderBottom: `1px solid ${theme.colors.accent1}`,
        padding: `0 ${theme.spacing.lg}`,
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: theme.shadows.md,
      }}
    >
      <div
        onClick={() => navigate('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.sm,
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: theme.colors.accent1,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            color: theme.colors.text.onAccent,
            fontWeight: 'bold',
            boxShadow: theme.shadows.md,
            border: `2px solid ${theme.colors.accent2}`,
          }}
        >
          W
        </div>
        <h1
          style={{
            fontSize: theme.typography.sizes.h2,
            color: theme.colors.text.onAccent,
            margin: 0,
            fontWeight: theme.typography.weights.bold,
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          }}
        >
          WorldWeaver
        </h1>
      </div>
    </div>
  );
}; 