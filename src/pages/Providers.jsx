import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const Providers = () => {
  const [formData, setFormData] = useState({ nombre: '', producto: '', precio: '' });
  const [proveedores, setProveedores] = useState(() => {
    const data = localStorage.getItem('proveedores');
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem('proveedores', JSON.stringify(proveedores));
  }, [proveedores]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProveedores([...proveedores, formData]);
    setFormData({ nombre: '', producto: '', precio: '' });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Gestión de Proveedores</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre del proveedor"
          className="w-full p-3 rounded-xl border"
          required
        />
        <input
          type="text"
          name="producto"
          value={formData.producto}
          onChange={handleChange}
          placeholder="Producto que ofrece"
          className="w-full p-3 rounded-xl border"
          required
        />
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          placeholder="Precio unitario"
          className="w-full p-3 rounded-xl border"
          required
        />
        <Button type="submit">Agregar Proveedor</Button>
      </form>

      <div className="space-y-2">
        <h2 className="text-xl font-medium">Lista de Proveedores</h2>
        {proveedores.map((p, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="font-semibold text-blue-600">{p.nombre}</div>
              <div>{p.producto} - ${p.precio}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Providers;
