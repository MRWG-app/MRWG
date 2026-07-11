import { supabase } from './supabaseClient';
import { useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Biblia from './components/Biblia';

/* Funciones de navegación*/
function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
      <h1 className="text-3xl">MRWG Conectado</h1>
      <nav className="mt-4">
        <Link to="/biblia" className="mx-2 text-blue-400">Biblia</Link>
        <Link to="/notas" className="mx-2 text-blue-400">Notas</Link>
        <Link to="/perfil" className="mx-2 text-blue-400">Perfil</Link>
      </nav>
    </div>
  );
}

function Notas() { return <div className="text-white">Vista Notas</div>; }
function Perfil() { return <div className="text-white">Vista Perfil</div>; }


function App() {
  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase.from('profiles').select('*').limit(1);
      if (error) console.error("Error al conectar:", error.message);
      else console.log("¡Conexión exitosa! Datos:", data);
    }
    testConnection();
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/biblia" element={<Biblia />} />
        <Route path="/notas" element={<Notas />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </HashRouter>
  );
}
export default App;