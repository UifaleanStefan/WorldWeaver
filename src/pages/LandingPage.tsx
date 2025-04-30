import React from 'react';
import { theme } from '../styles/theme';
import { Button as ChakraButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ImageSlider } from '../components/ImageSlider';
import { Navigation } from '../components/Navigation';
import styles from './LandingPage.module.css';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: theme.colors.gradients.content,
        paddingTop: '60px',
        position: 'relative',
        zIndex: 0,
      }}
    >
      <Navigation />

      {/* Hero Section with Full-Width Slider */}
      <div style={{ 
        width: '100%', 
        height: '100vh',
        position: 'relative',
        marginBottom: theme.spacing.xxl,
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}>
          <ImageSlider />
        </div>
        
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: theme.colors.text.onAccent,
            zIndex: 2,
            width: '90%',
            maxWidth: '800px',
            padding: theme.spacing.xxl,
            background: 'rgba(0, 0, 0, 0.7)',
            borderRadius: theme.borderRadius.lg,
            backdropFilter: 'blur(8px)',
          }}
        >
          <h1
            style={{
              fontSize: '4.5rem',
              margin: 0,
              fontWeight: theme.typography.weights.bold,
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              marginBottom: theme.spacing.lg,
            }}
          >
            WorldWeaver AI
          </h1>
          <p
            style={{
              fontSize: theme.typography.sizes.h3,
              lineHeight: 1.6,
              margin: `${theme.spacing.lg} 0`,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
            }}
          >
            Create rich, immersive fictional worlds powered by AI. Perfect for writers, game designers,
            and creators looking to build cohesive universes with deep lore and compelling characters.
          </p>
          <ChakraButton
            size="lg"
            px={12}
            py={8}
            fontSize="xl"
            fontWeight="bold"
            bg={theme.colors.accent1}
            color={theme.colors.text.onAccent}
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.2)"
            transform="translateY(0)"
            transition="all 0.3s ease"
            _hover={{
              bg: '#4B342A',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 8px rgba(0, 0, 0, 0.3)',
            }}
            onClick={() => navigate('/style-selector')}
          >
            Start Creating Your World
          </ChakraButton>
        </div>
      </div>

      {/* Project Description Section */}
      <div
        style={{
          padding: `${theme.spacing.xxl} ${theme.spacing.xl}`,
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Images */}
        <div style={{
          position: 'fixed',
          left: '-50px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '500px',
          height: '500px',
          opacity: 0.3,
          backgroundImage: 'url(/KnightSwingingSword.png)',
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
          backgroundImage: 'url(/DragonFire.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          zIndex: 0,
          pointerEvents: 'none',
        }} />

        <h2
          style={{
            fontSize: theme.typography.sizes.h1,
            color: theme.colors.text.primary,
            textAlign: 'center',
            marginBottom: theme.spacing.xxl,
            position: 'relative',
            zIndex: 1,
          }}
        >
          About WorldWeaver AI
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: theme.spacing.xl,
            marginBottom: theme.spacing.xxl,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              padding: theme.spacing.xl,
              background: theme.colors.surfaces.primary,
              borderRadius: theme.borderRadius.lg,
              boxShadow: theme.shadows.md,
            }}
          >
            <h3
              style={{
                fontSize: theme.typography.sizes.h2,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.lg,
              }}
            >
              Advanced AI Technology
            </h3>
            <p
              style={{
                fontSize: theme.typography.sizes.body,
                color: theme.colors.text.secondary,
                lineHeight: 1.8,
              }}
            >
              Our platform is powered by a fine-tuned LLaMA 3 model, trained on over 25,000 books from the Gutenberg Project. This extensive training enables our AI to understand and generate rich, coherent narratives and worldbuilding elements.
            </p>
          </div>

          <div
            style={{
              padding: theme.spacing.xl,
              background: theme.colors.surfaces.primary,
              borderRadius: theme.borderRadius.lg,
              boxShadow: theme.shadows.md,
            }}
          >
            <h3
              style={{
                fontSize: theme.typography.sizes.h2,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.lg,
              }}
            >
              Comprehensive Worldbuilding
            </h3>
            <p
              style={{
                fontSize: theme.typography.sizes.body,
                color: theme.colors.text.secondary,
                lineHeight: 1.8,
              }}
            >
              The model has been further fine-tuned using data from comprehensive online wikis of expansive fictional universes, ensuring it can generate detailed and consistent worldbuilding elements.
            </p>
          </div>

          <div
            style={{
              padding: theme.spacing.xl,
              background: theme.colors.surfaces.primary,
              borderRadius: theme.borderRadius.lg,
              boxShadow: theme.shadows.md,
            }}
          >
            <h3
              style={{
                fontSize: theme.typography.sizes.h2,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.lg,
              }}
            >
              Persistent Storage
            </h3>
            <p
              style={{
                fontSize: theme.typography.sizes.body,
                color: theme.colors.text.secondary,
                lineHeight: 1.8,
              }}
            >
              All your created worlds, characters, and locations are stored securely and can be accessed anytime. The platform maintains consistency across your worldbuilding elements.
            </p>
          </div>
        </div>

        {/* Large Logo Section */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: `${theme.spacing.xxl} 0`,
          padding: `${theme.spacing.xl} 0`,
        }}>
          <img
            src="/WorldWeaverLogo.png"
            alt="WorldWeaver AI Logo"
            style={{
              width: '400px',
              height: 'auto',
              filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))',
            }}
          />
        </div>

        <div
          style={{
            background: theme.colors.surfaces.secondary,
            padding: theme.spacing.xxl,
            borderRadius: theme.borderRadius.lg,
            marginBottom: theme.spacing.xxl,
          }}
        >
          <h3
            style={{
              fontSize: theme.typography.sizes.h2,
              color: theme.colors.text.primary,
              textAlign: 'center',
              marginBottom: theme.spacing.xl,
            }}
          >
            How It Works
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: theme.spacing.xl,
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  background: theme.colors.accent1,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  marginBottom: theme.spacing.lg,
                }}
              >
                <span style={{ color: theme.colors.text.onAccent, fontSize: '24px' }}>1</span>
              </div>
              <h4 style={{ marginBottom: theme.spacing.sm }}>Choose Your Style</h4>
              <p style={{ color: theme.colors.text.secondary }}>
                Select from various world styles and genres to start your creation.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  background: theme.colors.accent1,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  marginBottom: theme.spacing.lg,
                }}
              >
                <span style={{ color: theme.colors.text.onAccent, fontSize: '24px' }}>2</span>
              </div>
              <h4 style={{ marginBottom: theme.spacing.sm }}>Define Your World</h4>
              <p style={{ color: theme.colors.text.secondary }}>
                Provide initial details and let our AI generate rich worldbuilding elements.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  background: theme.colors.accent1,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  marginBottom: theme.spacing.lg,
                }}
              >
                <span style={{ color: theme.colors.text.onAccent, fontSize: '24px' }}>3</span>
              </div>
              <h4 style={{ marginBottom: theme.spacing.sm }}>Expand and Refine</h4>
              <p style={{ color: theme.colors.text.secondary }}>
                Add more details, characters, and locations to build your complete world.
              </p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <ChakraButton
            size="lg"
            px={12}
            py={8}
            fontSize="xl"
            fontWeight="bold"
            bg={theme.colors.accent1}
            color={theme.colors.text.onAccent}
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.2)"
            transform="translateY(0)"
            transition="all 0.3s ease"
            _hover={{
              bg: '#4B342A',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 8px rgba(0, 0, 0, 0.3)',
            }}
            onClick={() => navigate('/style-selector')}
          >
            Start Your Worldbuilding Journey
          </ChakraButton>
        </div>
      </div>
    </div>
  );
}; 