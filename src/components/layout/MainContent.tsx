import React from 'react';
import { theme } from '../../styles/theme';
import { World, Location, Character } from '../../types';

interface MainContentProps {
  world: World;
  selectedLocation?: Location;
  selectedCharacter?: Character;
}

export const MainContent: React.FC<MainContentProps> = ({
  world,
  selectedLocation,
  selectedCharacter,
}) => {
  return (
    <div
      style={{
        flex: 1,
        padding: theme.spacing.lg,
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing.lg,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          padding: theme.spacing.lg,
          borderRadius: theme.borderRadius.lg,
        }}
      >
        <h1
          style={{
            fontSize: theme.typography.sizes.h1,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.md,
          }}
        >
          {world.name}
        </h1>
        <p
          style={{
            fontSize: theme.typography.sizes.body,
            color: theme.colors.text.secondary,
            lineHeight: 1.6,
          }}
        >
          {world.description}
        </p>
      </div>

      {(selectedLocation || selectedCharacter) && (
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            padding: theme.spacing.lg,
            borderRadius: theme.borderRadius.lg,
            flex: 1,
          }}
        >
          <h2
            style={{
              fontSize: theme.typography.sizes.h2,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md,
            }}
          >
            {selectedLocation ? selectedLocation.name : selectedCharacter?.name}
          </h2>
          <p
            style={{
              fontSize: theme.typography.sizes.body,
              color: theme.colors.text.secondary,
              lineHeight: 1.6,
            }}
          >
            {selectedLocation
              ? selectedLocation.description
              : selectedCharacter?.description}
          </p>
        </div>
      )}

      {!selectedLocation && !selectedCharacter && (
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            padding: theme.spacing.lg,
            borderRadius: theme.borderRadius.lg,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.colors.text.secondary,
            fontSize: theme.typography.sizes.h3,
            textAlign: 'center',
          }}
        >
          Select a location or character from the sidebar to view its details
        </div>
      )}
    </div>
  );
}; 