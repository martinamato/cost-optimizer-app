import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/expenses', label: 'Gastos' },
  { to: '/optimizer', label: 'Optimizar' },
  { to: '/providers', label: 'Proveedores' },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow sticky top-0 z-10 p-4 flex justify-around border-b">
      {links.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          className={`font-medium transition-colors duration-200 ${
            location.pathname === to ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;