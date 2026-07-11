import { supabase } from './supabaseClient';
import { useEffect } from 'react';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
      <h1 className="text-3xl">MRWG Conectado</h1>
    </div>
  );
}
export default App;