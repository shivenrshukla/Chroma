// App.jsx - Updated with Team Features
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import Layout from './components/layout/Layout';

// Page Components  
import HomePage from './pages/HomePage';
import GeneratorPage from './pages/GeneratorPage';
import EditorPage from './pages/EditorPage';
import LibraryPage from './pages/LibraryPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';

function App() {
  const [currentPalette, setCurrentPalette] = useState([]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/generator" 
            element={
              <GeneratorPage 
                currentPalette={currentPalette}
                onPaletteGenerated={setCurrentPalette}
              />
            } 
          />
          <Route 
            path="/editor" 
            element={
              <EditorPage 
                palette={currentPalette}
                onPaletteChange={setCurrentPalette}
              />
            } 
          />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
