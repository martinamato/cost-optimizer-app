import React, { useState } from 'react';
import { Button } from '../components/ui/button';

const Optimizer = () => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState('');

  const handleOptimize = async () => {
    setLoading(true);
    setSuggestions('');

    // Cargar datos desde localStorage o estado global
    const gastos = JSON.parse(localStorage.getItem('gastos') || '[]');
    const proveedores = JSON.parse(localStorage.getItem('proveedores') || '[]');

    try {
      const response = await fetch("http://localhost:3000/api/generate", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gastos }),
      });

      const data = await response.json();
      if (data?.result) {
        setSuggestions(data.result);
      } else {
        setSuggestions('No se obtuvieron sugerencias');
      }
    } catch (error) {
      setSuggestions('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Optimización de Costos</h1>
      <p className="text-gray-600">
        Al hacer clic, analizaremos tus datos para ofrecerte sugerencias de ahorro.
      </p>
      <Button onClick={handleOptimize} disabled={loading}>
        {loading ? 'Analizando...' : 'Optimizar con IA'}
      </Button>
      {suggestions && (
        <div className="mt-4 p-4 bg-white rounded-xl shadow">
          <h2 className="font-semibold text-lg mb-2">Sugerencias:</h2>
          <pre className="whitespace-pre-wrap">{suggestions}</pre>
        </div>
      )}
    </div>
  );
};

export default Optimizer;