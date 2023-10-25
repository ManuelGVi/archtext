'use client'
import React, { useState } from 'react';

const Leerpalabras = () => {
  const [palabras, setPalabras] = useState(''); // Para almacenar las palabras separadas por coma
  const [contador, setContador] = useState(0); // Para contar las palabras

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;

        // Procesar el contenido del archivo para extraer solo las palabras y separarlas por coma
        const palabrasExtraidas = fileContent.match(/[A-Z a-z 0-9]+/g); // Extraer solo las palabras
        if (palabrasExtraidas) {
          const palabrasSeparadasPorComa = palabrasExtraidas.join(','); // Separar las palabras por coma
          setPalabras(palabrasSeparadasPorComa);
          setContador(palabrasExtraidas.length); // Contar las palabras
        } else {
          setPalabras('No se encontraron palabras en el archivo.');
          setContador(0);
        }
      };

      reader.readAsText(file);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Leer palabras</h1>
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
          marginBottom: '20px',
          display: 'block',
        }}
      >
        Seleccionar archivo
      </label>
      <div style={{ marginBottom: '20px' }}>
        <strong>Palabras del archivo:</strong>
        <p>{palabras}</p>
      </div>
      <div>
        <strong>Contador de palabras:</strong>
        <p>{contador}</p>
      </div>
    </div>
  );
};

export default Leerpalabras;
