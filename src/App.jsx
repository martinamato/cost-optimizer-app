import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Optimizer from './pages/Optimizer';
import Providers from './pages/Providers';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <Navbar />
        <div className="p-4 max-w-xl mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/optimizer" element={<Optimizer />} />
            <Route path="/providers" element={<Providers />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;