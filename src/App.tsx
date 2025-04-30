import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { StyleSelector } from './components/pages/StyleSelector';
import { WorldInput } from './pages/WorldInput';
import { WorldWorkspace } from './components/pages/WorldWorkspace';
import { WorldBuilder } from './pages/WorldBuilder';
import WorldOverview from './components/pages/WorldOverview';
import { CreateLocationPage } from './components/pages/CreateLocationPage';
import { CreateCharacterPage } from './components/pages/CreateCharacterPage';
import { MainLayout } from './components/layout/MainLayout';
import './styles/global.css';
import { LocationView } from './components/pages/LocationView';
import { ScrollToTop } from './components/ScrollToTop';
import { CharacteristicCreation } from './components/pages/CharacteristicCreation';
import { WorldProvider } from './contexts/WorldContext';
import { CharacteristicView } from './components/pages/CharacteristicView';
import { CharacterView } from './components/pages/CharacterView';
import WorldLoreView from './components/pages/WorldLoreView';

const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <Routes>
      <Route path="/" element={<LandingPage key={location.pathname} />} />
      <Route path="/style-selector" element={<MainLayout><StyleSelector key={location.pathname} /></MainLayout>} />
      <Route path="/world-input" element={<MainLayout><WorldInput key={location.pathname} /></MainLayout>} />
      <Route path="/world-builder" element={<MainLayout><WorldBuilder key={location.pathname} /></MainLayout>} />
      <Route path="/world-workspace/:worldId" element={<MainLayout><WorldWorkspace key={location.pathname} /></MainLayout>} />
      <Route path="/world-overview" element={<MainLayout><WorldOverview key={location.pathname} /></MainLayout>} />
      <Route path="/create-location" element={<MainLayout><CreateLocationPage key={location.pathname} /></MainLayout>} />
      <Route path="/create/character" element={<MainLayout><CreateCharacterPage key={location.pathname} /></MainLayout>} />
      <Route path="/location/:locationName" element={<LocationView />} />
      <Route path="/character/:characterName" element={<CharacterView />} />
      <Route path="/characteristic/:characteristicType/:characteristicName" element={<CharacteristicView />} />
      <Route path="/create/:characteristicType" element={<MainLayout><CharacteristicCreation key={location.pathname} /></MainLayout>} />
      <Route path="/world-lore" element={<WorldLoreView />} />
    </Routes>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <WorldProvider>
        <ScrollToTop />
      <AppRoutes />
      </WorldProvider>
    </Router>
  );
}; 