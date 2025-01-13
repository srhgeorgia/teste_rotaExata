// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import NovoCadastro from './pages/NovoCadastro';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/novo-cadastro" element={<NovoCadastro />} />
      </Routes>
    </Router>
  );
}

export default App;
