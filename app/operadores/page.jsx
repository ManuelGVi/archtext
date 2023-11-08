'use client'
import React, { useState } from 'react';

function descargarArchivo(contenido, nombreArchivo) {
  // Crea un objeto Blob con el contenido del archivo
  const blob = new Blob([contenido], { type: 'text/plain' });

  // Crea una URL para el Blob
  const url = window.URL.createObjectURL(blob);

  // Crea un elemento <a> para descargar el archivo
  const a = document.createElement('a');
  a.href = url;
  a.download = nombreArchivo;
  a.click();

  // Libera la URL del objeto Blob
  window.URL.revokeObjectURL(url);
}

const Operadores = () => {
  const [error, setError] = useState(null);
  const [resultado, setResultado] = useState('');

  // Definir listas de operadores y símbolos
  const operadoresLogicos = ["||", "&&", "!"];
  const operadoresRelacionales = [">", "<", "==", "!="];
  const operadoresAgrupacion = ["(", ")", "{", "}", "[", "]"];
  const operadoresMatematicos = ["+", "-", "*", "/", "%"];
  const semi=[";"];
  const num=["0","1","2","3","4","5","6","7","8","9"];

  const manejarCambioArchivo = (event) => {
    const archivo = event.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onload = (e) => {
        let contenido = e.target.result;

        // Eliminar comentarios de línea
        contenido = contenido.replace(/\/\/[^\n]*\n/g, '');

        // Eliminar comentarios de bloque
        contenido = contenido.replace(/\/\*[\s\S]*?\*\//g, '');

        // Usar expresiones regulares para separar operadores y palabras, incluyendo comas
        contenido = contenido.replace(/(\|\||&&|!=|!|>|<|==|\(|\)|{|}|\[|\]|[-+*/%,;])/g, ' $1 ');

        const palabras = contenido.split(/\s+/);

        // Procesar los operadores y crear el nuevo contenido del archivo
        let nuevoContenido = [];
        for (const palabra of palabras) {
          if (palabra === '') {
            continue;
          }
          if (palabra === ',') {
            continue; // Saltar las comas
          }
          if (operadoresLogicos.includes(palabra)) {
            nuevoContenido.push(`${palabra} - OL`);
          } else if (operadoresRelacionales.includes(palabra)) {
            nuevoContenido.push(`${palabra} - OR`);
          } else if (operadoresAgrupacion.includes(palabra)) {
            nuevoContenido.push(`${palabra} - OA`);
          } else if (operadoresMatematicos.includes(palabra)) {
            nuevoContenido.push(`${palabra} - OM`);
          } 
          else if (semi.includes(palabra)) {
            nuevoContenido.push(`${palabra} - Semi`);
          }
          else {
            nuevoContenido.push(`${palabra} - ID`);
          }
        }

        nuevoContenido = nuevoContenido.join('\n');

        // Descargar el nuevo archivo de texto
        descargarArchivo(nuevoContenido, 'nuevo_archivo.txt');

        // Mostrar el resultado en la interfaz
        setResultado(nuevoContenido);
      };
      lector.onerror = (e) => {
        setError('Error al leer el archivo.');
      };
      lector.readAsText(archivo);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Analizar Texto</h1>
      <input
        type="file"
        accept=".txt"
        onChange={manejarCambioArchivo}
        style={{ display: 'none' }}
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        style={{
          background: 'blue',
          color: 'white',
          padding: '10px 10px',
          cursor: 'pointer',
          marginBottom: '15px',
          display: 'block',
        }}
      >
        Seleccionar archivo
      </label>
      <div style={{ marginBottom: '20px' }}>
        <strong>Operadores:</strong>
        <pre>{resultado}</pre>
      </div>
    </div>
  );
};

export default Operadores;
