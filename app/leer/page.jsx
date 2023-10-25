'use client'
import React, { useState } from 'react';

const Leer = () => {
  const [letras, setLetras] = useState(''); // Para almacenar las letras separadas por coma
  const [contador, setContador] = useState(0); // Para contar las letras

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;

        // Procesar el contenido del archivo para extraer solo las letras y separarlas por coma
        const letrasExtraidas = fileContent.match(/[a-zA-Z]/g); // Extraer solo las letras
        if (letrasExtraidas) {
          const letrasSeparadasPorComa = letrasExtraidas.join(','); // Separar las letras por coma
          setLetras(letrasSeparadasPorComa);
          setContador(letrasExtraidas.length); // Contar las letras
        } else {
          setLetras('No se encontraron letras en el archivo.');
          setContador(0);
        }
      };

      reader.readAsText(file);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Leer</h1>
      <input
        type="file"
        accept=".txt"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        style={{
          background: 'blue',
          color: 'white',
          padding: '10px 20px',
          cursor: 'pointer',
          marginBottom: '20px', // Espacio vertical debajo del botón
          display: 'block', // Asegura que el botón se muestre en una línea separada
        }}
      >
        Seleccionar archivo
      </label>
      <div style={{ marginBottom: '20px' }}>
        <strong>Letras del archivo:</strong>
        <p>{letras}</p>
      </div>
      <div>
        <strong>Contador de letras:</strong>
        <p>{contador}</p>
      </div>
    </div>
  );
};

export default Leer;

