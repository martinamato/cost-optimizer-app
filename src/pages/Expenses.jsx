import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const Expenses = () => {
  const [formData, setFormData] = useState({ tipo: '', descripcion: '', monto: '' });
  const [gastos, setGastos] = useState(() => {
    const data = localStorage.getItem('gastos');
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos));
  }, [gastos]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGastos([...gastos, formData]);
    setFormData({ tipo: '', descripcion: '', monto: '' });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Gestión de Gastos</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border"
          required
        >
          <option value="">Seleccione tipo de gasto</option>
          <option value="compra">Compra</option>
          <option value="servicio">Servicio</option>
          <option value="otro">Otro</option>
        </select>
        <input
          type="text"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          className="w-full p-3 rounded-xl border"
          required
        />
        <input
          type="number"
          name="monto"
          value={formData.monto}
          onChange={handleChange}
          placeholder="Monto"
          className="w-full p-3 rounded-xl border"
          required
        />
        <Button type="submit">Agregar Gasto</Button>
      </form>

      <div className="space-y-2">
        <h2 className="text-xl font-medium">Lista de Gastos</h2>
        {gastos.map((g, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="font-semibold text-blue-600">{g.tipo}</div>
              <div>{g.descripcion} - ${g.monto}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Expenses;