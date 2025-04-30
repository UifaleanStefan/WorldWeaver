import React from 'react';
import { theme } from '../../styles/theme';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.xl,
        background: `linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.accent4} 100%)`,
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.xl,
        }}
      >
        <h1
          style={{
            fontSize: '4rem',
            color: theme.colors.text.primary,
            margin: 0,
            fontWeight: theme.typography.weights.bold,
          }}
        >
          WorldWeaver AI
        </h1>

        <p
          style={{
            fontSize: theme.typography.sizes.h3,
            color: theme.colors.text.secondary,
            lineHeight: 1.6,
          }}
        >
          Create rich, immersive fictional worlds powered by AI. Perfect for writers, game designers,
          and creators looking to build cohesive universes with deep lore and compelling characters.
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing.md,
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          <Button
            size="large"
            fullWidth
            onClick={() => navigate('/style-selector')}
          >
            Create Your World
          </Button>

          <p
            style={{
              fontSize: theme.typography.sizes.small,
              color: theme.colors.text.secondary,
            }}
          >
            Powered by a fine-tuned LLaMA model trained on thousands of fiction and historical books
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: theme.spacing.lg,
            marginTop: theme.spacing.xl,
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              padding: theme.spacing.lg,
              borderRadius: theme.borderRadius.lg,
            }}
          >
            <h3
              style={{
                fontSize: theme.typography.sizes.h3,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.md,
              }}
            >
              Rich Worldbuilding
            </h3>
            <p
              style={{
                fontSize: theme.typography.sizes.body,
                color: theme.colors.text.secondary,
              }}
            >
              Generate detailed settings, cultures, and histories that feel authentic and immersive.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              padding: theme.spacing.lg,
              borderRadius: theme.borderRadius.lg,
            }}
          >
            <h3
              style={{
                fontSize: theme.typography.sizes.h3,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.md,
              }}
            >
              Dynamic Characters
            </h3>
            <p
              style={{
                fontSize: theme.typography.sizes.body,
                color: theme.colors.text.secondary,
              }}
            >
              Create complex characters with unique personalities, backgrounds, and motivations.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              padding: theme.spacing.lg,
              borderRadius: theme.borderRadius.lg,
            }}
          >
            <h3
              style={{
                fontSize: theme.typography.sizes.h3,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.md,
              }}
            >
              Cohesive Lore
            </h3>
            <p
              style={{
                fontSize: theme.typography.sizes.body,
                color: theme.colors.text.secondary,
              }}
            >
              Build interconnected stories and lore that maintain consistency across your world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 