'use client'
import React, { useState } from 'react';

const Comentarios = () => {
  const [palabras, setPalabras] = useState(''); // Para almacenar las palabras separadas por salto de línea
  const [error, setError] = useState(''); // Para mostrar errores

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;

        try {
          // Eliminar comentarios de línea
          const contenidoLimpio = fileContent.replace(/\/\/[^\n]*\n/g, '');

          // Eliminar comentarios de bloque
          const contenidoSinComentarios = contenidoLimpio.replace(/\/\*[\s\S]*?\*\//g, '');

          // Eliminar espacios, tabulaciones y saltos de línea
          const contenidoSinEspacios = contenidoSinComentarios.replace(/[\s\n\r\t]+/g, ' ');

          // Verificar caracteres inválidos
          if (/[^01 ]/.test(contenidoSinEspacios)) {
            throw new Error('Caracteres inválidos encontrados fuera de los comentarios.');
          }

          // Filtrar y separar las palabras aceptadas y agregar saltos de línea
          const palabrasExtraidas = contenidoSinEspacios.match(/[01]+/g); // Extraer palabras de 0 y 1

          if (palabrasExtraidas) {
            const palabrasSeparadasPorEnter = palabrasExtraidas.join('\n'); // Separar las palabras aceptadas por saltos de línea
            setPalabras(palabrasSeparadasPorEnter);
          } else {
            setError('No se encontraron palabras de 0s ni 1s en el archivo.');
            setPalabras('');
          }
        } catch (error) {
          setError(error.message);
          setPalabras('');
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginBottom: '20px' }}>
        <strong>Palabras Aceptadas:</strong>
        <pre>{palabras}</pre>
      </div>
    </div>
  );
};

export default Comentarios;
