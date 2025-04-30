import React, { useState } from 'react';
import { theme } from '../styles/theme';
import { useNavigate, Link } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Top Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: '#4B342A',
        boxShadow: theme.shadows.md,
        display: 'flex',
        alignItems: 'center',
        padding: `0 ${theme.spacing.xl}`,
        zIndex: 1000,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.md,
          width: '100%',
          justifyContent: 'center',
        }}>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: theme.spacing.sm,
              position: 'absolute',
              left: theme.spacing.xl,
              color: '#FFFFFF',
            }}
          >
            <span style={{
              fontSize: '24px',
            }}>☰</span>
          </button>
          <img 
            src="/WorldWeaverLogo.png" 
            alt="WorldWeaver AI"
            style={{
              height: '50px',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          />
        </div>
      </div>

      {/* Side Bar */}
      <div style={{
        position: 'fixed',
        top: '60px',
        left: 0,
        bottom: 0,
        width: '250px',
        background: '#4B342A',
        boxShadow: theme.shadows.md,
        transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out, visibility 0.3s ease-in-out',
        zIndex: 1001,
        padding: theme.spacing.lg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        visibility: isSidebarOpen ? 'visible' : 'hidden',
        overflow: 'hidden',
      }}>
        <nav>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            opacity: isSidebarOpen ? 1 : 0,
            transition: 'opacity 0.2s ease-in-out',
          }}>
            <li style={{ marginBottom: theme.spacing.md }}>
              <Link 
                to="/style-selector"
                style={{
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: theme.typography.sizes.large,
                  display: 'block',
                  padding: theme.spacing.md,
                  borderRadius: theme.borderRadius.sm,
                  transition: 'all 0.3s ease',
                  pointerEvents: isSidebarOpen ? 'auto' : 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#88B04B';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Create New World
              </Link>
            </li>
            <li style={{ marginBottom: theme.spacing.md }}>
              <Link 
                to="/my-worlds"
                style={{
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: theme.typography.sizes.large,
                  display: 'block',
                  padding: theme.spacing.md,
                  borderRadius: theme.borderRadius.sm,
                  transition: 'all 0.3s ease',
                  pointerEvents: isSidebarOpen ? 'auto' : 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#88B04B';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                My Worlds
              </Link>
            </li>
          </ul>
        </nav>
        {/* Dragon Image at Bottom */}
        <div style={{
          width: '100%',
          height: '200px',
          backgroundImage: 'url(/sidebar_img.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          opacity: isSidebarOpen ? 0.7 : 0,
          marginTop: 'auto',
          transition: 'opacity 0.2s ease-in-out',
        }} />
      </div>
    </>
  );
}; 