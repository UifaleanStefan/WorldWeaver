import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon, ChevronUpIcon, DeleteIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface Characteristic {
  name: string;
  location: string;
  description?: string;
}

interface WorldData {
  name: string;
  description: string;
  image: string;
  selectedGroups: string[];
  locations: string[];
  characters: string[];
  locationDescriptions?: Record<string, string>;
  characteristicDescriptions?: Record<string, string>;
  characteristics: Record<string, Characteristic[]>;
  [key: string]: any;
}

interface WorldSidebarProps {
  worldData: WorldData;
  onEntityClick: (entityType: string) => void;
  onDeleteCharacter?: (name: string) => void;
  onDeleteLocation?: (name: string) => void;
  onLocationClick?: (locationName: string) => void;
  onCharacteristicClick?: (characteristicType: string, characteristicName: string) => void;
}

const formatGroupName = (name: string): string => {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const showToast = (message: string) => {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.top = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = '#4B342A';
  toast.style.color = '#D9CBB5';
  toast.style.padding = '16px 24px';
  toast.style.borderRadius = '8px';
  toast.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
  toast.style.zIndex = '1000';
  toast.style.fontSize = '16px';
  toast.style.fontWeight = '500';
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 500);
  }, 5000);
};

export const WorldSidebar: React.FC<WorldSidebarProps> = ({ 
  worldData, 
  onEntityClick,
  onDeleteCharacter,
  onDeleteLocation,
  onLocationClick,
  onCharacteristicClick
}) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const navigate = useNavigate();

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLocationClick = (locationName: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // If external handler is provided, use it
    if (onLocationClick) {
      onLocationClick(locationName);
      return;
    }
    
    // Otherwise use the default navigation behavior
    navigate(`/location/${encodeURIComponent(locationName)}`, {
      state: {
        locationName: locationName,
        locationDescription: worldData.locationDescriptions?.[locationName] || '',
        worldData: worldData
      }
    });
  };

  const handleWorldNameClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/world-overview', { state: { worldData } });
  };

  const handleDelete = (type: string, name: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (type === 'location') {
      const { [name]: deletedDescription, ...remainingDescriptions } = worldData.locationDescriptions || {};
      const updatedWorldData = {
        ...worldData,
        locations: worldData.locations.filter(loc => loc !== name),
        locationDescriptions: remainingDescriptions
      };
      onDeleteLocation?.(name);
      showToast(`${name} has been removed`);
      navigate('/world-overview', { 
        state: { 
          worldData: updatedWorldData
        },
        replace: true
      });
    } else if (type === 'character') {
      onDeleteCharacter?.(name);
      showToast(`${name} has been removed`);
      navigate('/world-overview', { 
        state: { 
          worldData: {
            ...worldData,
            characters: worldData.characters.filter(char => char !== name)
          }
        },
        replace: true
      });
    }
  };

  const handleEntityClick = (type: string) => {
    if (type === 'character' && worldData.locations.length < 3) {
      showToast(`You need to create at least 3 locations before you can create a character. You currently have ${worldData.locations.length} location(s).`);
      return;
    }
    if (type === 'location') {
      navigate('/create-location', { state: { worldData } });
      return;
    }
    onEntityClick(type);
  };

  return (
    <>
      {/* Toggle Button - Outside of sidebar */}
      <div
        style={{
          position: 'fixed',
          right: isSidebarOpen ? '300px' : '0',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: '#D9CBB5',
          color: '#4B342A',
          width: '24px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
          cursor: 'pointer',
          boxShadow: '-2px 0px 4px rgba(0,0,0,0.2)',
          zIndex: 1000,
          transition: 'right 0.3s ease'
        }}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </div>

      {/* Main Sidebar */}
      <div
        className="world-sidebar"
        style={{
          width: '300px',
          backgroundColor: '#D9CBB5',
          color: '#4B342A',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          height: 'calc(100vh - 60px)',
          position: 'fixed',
          right: isSidebarOpen ? '0' : '-300px',
          top: '60px',
          transition: 'right 0.3s ease',
          overflowY: 'scroll',
          overflowX: 'hidden',
          paddingBottom: '50px'
        }}
      >
        <style>
          {`
            .world-sidebar::-webkit-scrollbar {
              display: none;
            }
            .world-sidebar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}
        </style>

        {/* World Image */}
        <div>
          <img 
            src={worldData.image}
            alt={worldData.name}
            style={{
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              width: '100%',
              height: '200px',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* World Name */}
        <div style={{ textAlign: 'center' }}>
          <h1 
            style={{
              fontSize: '24px',
              color: '#4B342A',
              marginBottom: '8px',
              fontWeight: 'bold',
              textShadow: '0 1px 2px rgba(0,0,0,0.2)',
              cursor: 'pointer'
            }}
            onClick={handleWorldNameClick}
          >
            {worldData.name}
          </h1>
        </div>

        {/* Locations */}
        <div 
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #D9CBB5',
            backgroundColor: 'rgba(217, 203, 181, 0.1)'
          }}
        >
          <div 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => toggleCategory('locations')}
          >
            <h2 
              style={{
                fontSize: '18px',
                color: '#4B342A',
                marginBottom: '8px',
                fontWeight: 'bold',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                borderBottom: '2px solid #4B342A',
                paddingBottom: '8px'
              }}
            >
              Locations
            </h2>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#4B342A',
                cursor: 'pointer'
              }}
            >
              {openCategory === 'locations' ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </button>
          </div>
          {openCategory === 'locations' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              {worldData.locations.map((location) => (
                <div 
                  key={location}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(217, 203, 181, 0.1)'
                  }}
                >
                  <span 
                    style={{
                      fontSize: '16px',
                      color: '#4B342A',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleLocationClick(location)}
                  >
                    {location}
                  </span>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#FF453A',
                      cursor: 'pointer',
                      opacity: 0.6
                    }}
                    onClick={() => handleDelete('location', location)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              ))}
              <button
                style={{
                  padding: '8px 16px',
                  border: '1px solid #4B342A',
                  borderRadius: '4px',
                  color: '#4B342A',
                  background: 'none',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onClick={() => handleEntityClick('location')}
              >
                Create New Location
              </button>
            </div>
          )}
        </div>

        {/* Characters */}
        <div 
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #D9CBB5',
            backgroundColor: 'rgba(217, 203, 181, 0.1)'
          }}
        >
          <div 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => toggleCategory('characters')}
          >
            <h2 
              style={{
                fontSize: '18px',
                color: '#4B342A',
                marginBottom: '8px',
                fontWeight: 'bold',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                borderBottom: '2px solid #4B342A',
                paddingBottom: '8px'
              }}
            >
              Characters
            </h2>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#4B342A',
                cursor: 'pointer'
              }}
            >
              {openCategory === 'characters' ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </button>
          </div>
          {openCategory === 'characters' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              {worldData.characters.map((character: any) => {
                const charName = typeof character === 'string' ? character : character.name;
                return (
                <div 
                    key={charName}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(217, 203, 181, 0.1)'
                  }}
                >
                  <span 
                    style={{
                      fontSize: '16px',
                        color: '#4B342A',
                      cursor: 'pointer'
                    }}
                      onClick={() => navigate(`/character/${encodeURIComponent(charName)}`, {
                      state: {
                        character,
                        worldData
                      }
                    })}
                  >
                      {charName}
                  </span>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#FF453A',
                      cursor: 'pointer',
                      opacity: 0.6
                    }}
                      onClick={() => handleDelete('character', charName)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
                );
              })}
              <button
                style={{
                  padding: '8px 16px',
                  border: '1px solid #4B342A',
                  borderRadius: '4px',
                  color: '#4B342A',
                  background: 'none',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onClick={() => handleEntityClick('character')}
              >
                Create New Character
              </button>
            </div>
          )}
        </div>

        {/* Selected Groups */}
        {worldData.selectedGroups.map((group) => {
          // Remove 'low-fantasy-', 'high-fantasy-', or 'historical-' prefix if present
          const cleanGroup = group
            .replace(/^low-fantasy-/, '')
            .replace(/^high-fantasy-/, '')
            .replace(/^historical-/, '');
          return (
            <div 
              key={group}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #D9CBB5',
                backgroundColor: 'rgba(217, 203, 181, 0.1)'
              }}
            >
              <div 
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => toggleCategory(group)}
              >
                <h2 
                  style={{
                    fontSize: '18px',
                    color: '#4B342A',
                    marginBottom: '8px',
                    fontWeight: 'bold',
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                    borderBottom: '2px solid #4B342A',
                    paddingBottom: '8px'
                  }}
                >
                  {formatGroupName(cleanGroup)}
                </h2>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#4B342A',
                    cursor: 'pointer'
                  }}
                >
                  {openCategory === group ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </button>
              </div>
              {openCategory === group && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                  {/* Group entities from worldData[group] - these might not exist */}
                  {worldData[group]?.map((entity: string) => (
                    <div 
                      key={entity}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '8px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(217, 203, 181, 0.1)'
                      }}
                    >
                      <span 
                        style={{
                          fontSize: '16px',
                          color: '#4B342A'
                        }}
                      >
                        {entity}
                      </span>
                      <button
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#FF453A',
                          cursor: 'pointer',
                          opacity: 0.6
                        }}
                        onClick={() => handleDelete(group, entity)}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  ))}
                  
                  {/* Group entities from characteristics[group] */}
                  {(worldData.characteristics?.[group] || []).map((characteristic: Characteristic, index: number) => (
                    <div 
                      key={`${group}-characteristic-${index}`}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '8px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(217, 203, 181, 0.1)'
                      }}
                    >
                      <span 
                        style={{
                          fontSize: '16px',
                          color: '#4B342A',
                          cursor: 'pointer'
                        }}
                        onClick={() => navigate(`/characteristic/${group}/${encodeURIComponent(characteristic.name)}`, {
                          state: {
                            characteristicType: group,
                            characteristic: characteristic,
                            worldData: worldData
                          }
                        })}
                      >
                        {characteristic.name}
                      </span>
                      <button
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#FF453A',
                          cursor: 'pointer',
                          opacity: 0.6
                        }}
                        onClick={() => {
                          // Remove the characteristic
                          const characteristics = [...(worldData.characteristics?.[group] || [])];
                          characteristics.splice(index, 1);
                          
                          const updatedCharacteristics = {
                            ...worldData.characteristics,
                          };
                          
                          // Also remove from characteristicDescriptions
                          const { [`${group}-${characteristic.name}`]: _, ...remainingDescriptions } = 
                            worldData.characteristicDescriptions || {};
                          
                          // If the array is now empty, remove the key entirely
                          if (characteristics.length === 0) {
                            delete updatedCharacteristics[group];
                          } else {
                            updatedCharacteristics[group] = characteristics;
                          }
                          
                          // Calculate new selectedGroups - remove the group if it has no items and no characteristics
                          let updatedSelectedGroups = [...worldData.selectedGroups];
                          if (
                            (!worldData[group] || worldData[group]?.length === 0) && 
                            characteristics.length === 0
                          ) {
                            updatedSelectedGroups = updatedSelectedGroups.filter(g => g !== group);
                          }
                          
                          // Create updated world data
                          const updatedWorldData = {
                            ...worldData,
                            selectedGroups: updatedSelectedGroups,
                            characteristics: updatedCharacteristics,
                            characteristicDescriptions: remainingDescriptions
                          };
                          
                          // Navigate to update the state
                          navigate('/world-overview', {
                            state: { worldData: updatedWorldData },
                            replace: true
                          });
                        }}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  ))}
                  
                  <button
                    style={{
                      padding: '8px 16px',
                      border: '1px solid #4B342A',
                      borderRadius: '4px',
                      color: '#4B342A',
                      background: 'none',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                    onClick={() => onEntityClick(group)}
                  >
                    Create New {formatGroupName(cleanGroup).slice(0, -1)}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}; 