'use client'
import React, { useState } from 'react';

function downloadFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
  
const Reservadas = () => {
  const [error, setError] = useState(null);
  const [palabras, setPalabras] = useState('');
  
  const reservadas = [
    "auto", "break", "case", "char", "const", "continue", "default",
    "do", "double", "else", "enum", "extern", "float", "for", "goto",
    "if", "int", "long", "register", "return", "short", "signed", "sizeof",
    "static", "struct", "switch", "typedef", "union", "unsigned", "void", "volatile", "while", "main"
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const words = content.split(/\s+/);

        // Procesa las palabras y crea el nuevo contenido del archivo
        const newContent = words.map(word => {
          if (reservadas.includes(word)) {
            return `${word} - PR`;
          } else {
            return `${word} - ID`;
          }
        }).join('\n');

        // Establece el nuevo contenido en el estado "palabras"
        setPalabras(newContent);

        // Descarga el nuevo archivo de texto
        downloadFile(newContent, 'nuevo_archivo.txt');
      };
      reader.onerror = (e) => {
        setError('Error al leer el archivo.');
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
        <strong>Palabras Reservadas Encontradas:</strong>
        <pre>{palabras}</pre>
      </div>
    </div>
  );
};

export default Reservadas;

