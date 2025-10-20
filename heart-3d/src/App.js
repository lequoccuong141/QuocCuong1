import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EnvelopeCard from './EnvelopeCard';
import Heart3D from './Heart3D';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnvelopeCard />} />
        <Route path="/heart" element={<Heart3D />} />
      </Routes>
    </Router>
  );
}

export default App;