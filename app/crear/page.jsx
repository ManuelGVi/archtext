'use client'
import React, { useState } from 'react';

const Crear = () => {
  const [texto, setTexto] = useState('');

  const handleTextoChange = (e) => {
    setTexto(e.target.value);
  };

  const handleGuardarClick = () => {
    const contenido = texto;
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(new Blob([contenido], { type: 'text/plain' }));
    enlace.download = 'archivo.txt';
    enlace.click();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Crear</h1>
      <textarea
        value={texto}
        onChange={handleTextoChange}
        placeholder="Escribe aquí..."
        style={{
          width: '80%', // Tamaño del textarea
          height: '300px', // Altura del textarea
          margin: '0 auto', // Centrar el textarea horizontalmente
          display: 'block', // Hacer que el textarea sea un bloque para centrarlo verticalmente
          background: 'white', // Fondo blanco
          color: 'black' // Texto negro
        }}
      />
      <button
        onClick={handleGuardarClick}
        style={{
          background: 'blue',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        Guardar en archivo
      </button>
    </div>
  );
};

export default Crear;

