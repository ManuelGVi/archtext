import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='p-8 bg-blue-500 text-center'>
      <h1>Archivos de texto</h1>
      <nav>
        <ul className='list flex justify-center items-center space-x-4'>
        <div className="list-item">
            <li className='cursor-pointer hover:text-white hover:bg-yellow-600'><Link href={'/'}>Inicio</Link></li>
          </div>
          <div className="list-item">
            <li className='cursor-pointer hover:text-white hover:bg-yellow-600'><Link href={'/crear'}>Crear archivo</Link></li>
          </div>
          <div className="list-item">
          <li className='cursor-pointer hover:text-white hover:bg-yellow-600'><Link href={'/leer'}>Leer archivo</Link></li>
          </div>

        </ul>
      </nav>
    </header>
  );
};

export default Header;