'use client'
import React, { useState } from 'react';
import './style.css'; // Importa el archivo CSS

const Proyecto = () => {
  const [texto, setTexto] = useState('');
  const [textoLimpio, setTextoLimpio] = useState(''); // Para almacenar el texto sin comentarios

  const operadoresLogicos = ["||", "&&", "!"];
  const operadoresRelacionales = [">", "<", "==", "!="];
  const operadoresAgrupacion = ["(", ")", "{", "}", "[", "]"];
  const operadoresMatematicos = ["+", "-", "*", "/", "%"];
  const semi = [";"];
  const numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const reservadas = [
    "auto", "break", "case", "char", "const", "continue", "default",
    "do", "double", "else", "enum", "extern", "float", "for", "goto",
    "if", "int", "long", "register", "return", "short", "signed", "sizeof",
    "static", "struct", "switch", "typedef", "union", "unsigned", "void", "volatile", "while", "main"
  ];

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

  const handleCargarArchivo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTexto(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleAnalizarClick = () => {
    const contenido = texto;
    let contenidoLimpio = contenido;

    // Eliminar comentarios de bloque y comentarios de línea
    contenidoLimpio = contenidoLimpio.replace(/(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/gm, '');

    // Usar expresiones regulares para separar operadores y palabras, incluyendo comas
    contenidoLimpio = contenidoLimpio.replace(/(\|\||&&|!=|!|>|<|==|\(|\)|{|}|\[|\]|[-+*/%,;])/g, ' $1 ');

    const palabras = contenidoLimpio.split(/\s+/);

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
      } else if (semi.includes(palabra)) {
        nuevoContenido.push(`${palabra} - Semi`);
      } else if (numeros.includes(palabra)) {
        nuevoContenido.push(`${palabra} - Número`);
      } else if (reservadas.includes(palabra)) {
        nuevoContenido.push(`${palabra} - PR`);
      } else {
        nuevoContenido.push(`${palabra} - ID`);
      }
    }

    nuevoContenido = nuevoContenido.join('\n');

    // Descargar el nuevo archivo de texto
    descargarArchivo(nuevoContenido, 'archivo_sin_comentarios.txt');

    // Mostrar el resultado en la interfaz
    setTextoLimpio(nuevoContenido);
  };

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

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Analizador léxico</h1>
      <textarea
        value={texto}
        onChange={handleTextoChange}
        placeholder="Escribe aquí..."
        className="textarea" // Usa la clase CSS "textarea"
      />
      <input
        type="file"
        accept=".txt"
        onChange={handleCargarArchivo}
        style={{ display: 'none' }}
        id="cargarArchivoInput"
      />
      <label htmlFor="cargarArchivoInput" className="button">
        Cargar archivo
      </label>
      <button onClick={handleAnalizarClick} className="button">
        Analizar y Descargar
      </button>
      <button onClick={handleGuardarClick} className="button">
        Guardar en archivo
      </button>
    </div>
  );
};

export default Proyecto;
