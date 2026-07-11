/*
Componente encargado de cargar los archivos de la Biblia y gestionar la vista del
capítulo actual.
*/

import { useState, useEffect } from 'react';

const modulosRV60 = import.meta.glob('../data/RV60/*.js');
const modulosKJV = import.meta.glob('../data/KJV/*.json');

export default function Biblia() {
    const [version, setVersion] = useState("RV60");
    const [libro, setLibro] = useState("genesis");
    const [capituloIndex, setCapituloIndex] = useState(0);
    const [versiculos, setVersiculos] = useState([]);

    useEffect(() => {
        const cargarDatos = async () => {
            let datos = [];

            if (version === "RV60") {
                const ruta = `../data/RV60/${libro}.js`;
                if (modulosRV60[ruta]) {
                    try {
                        const modulo = await modulosRV60[ruta]();
                        // Asumimos que RV60 es un array de arrays: [capIndex][versIndex]
                        datos = modulo.default ? modulo.default[capituloIndex] || [] : [];
                    } catch (error) {
                        console.error("Error cargando RV60:", error);
                    }
                }
            } else if (version === "KJV") {
                const ruta = `../data/KJV/${libro}.json`;
                if (modulosKJV[ruta]) {
                    try {
                        const json = await modulosKJV[ruta]();
                        // Buscamos el capítulo. capituloIndex empieza en 0, 
                        // por lo que el capítulo 1 es (0+1) = '1'
                        const capObj = json.chapters?.find(c => c.chapter === (capituloIndex + 1).toString());
                        // Transformamos array de objetos {verse, text} a array de strings
                        datos = capObj ? capObj.verses.map(v => v.text) : [];
                    } catch (error) {
                        console.error("Error cargando KJV:", error);
                    }
                }
            }
            
            // LOGS DE DEPURACIÓN
            console.log("Intentando cargar:", version, libro, "Capítulo índice:", capituloIndex);
            console.log("Datos obtenidos:", datos);
            
            setVersiculos(datos);
        };

        cargarDatos();
    }, [version, libro, capituloIndex]);

    return (
        <div className="p-4 text-white">
            <div className="mb-4">
                <select onChange={(e) => { setVersion(e.target.value); setCapituloIndex(0); }} value={version} className="text-black mb-2 p-1">
                    <option value="RV60">RV60</option>
                    <option value="KJV">KJV</option>
                </select>

                <input 
                    type="text" 
                    value={libro} 
                    onChange={(e) => { setLibro(e.target.value.toLowerCase()); setCapituloIndex(0); }} 
                    placeholder="Nombre del libro (ej: genesis)"
                    className="text-black ml-2 p-1"
                />
            </div>

            <h2 className="text-2xl my-4">{version} - {libro.toUpperCase()} - Cap {capituloIndex + 1}</h2>
            
            <div className="mb-4">
                <button onClick={() => setCapituloIndex(p => Math.max(0, p - 1))} className="p-2 bg-blue-600 rounded">Anterior</button>
                <button onClick={() => setCapituloIndex(p => p + 1)} className="p-2 bg-blue-600 rounded ml-2">Siguiente</button>
            </div>

            <div className="space-y-2">
                {versiculos.length > 0 ? (
                    versiculos.map((texto, i) => (
                        <p key={i}><span className="font-bold">{i + 1}.</span> {texto}</p>
                    ))
                ) : (
                    <p>No se encontraron versículos o el capítulo no existe.</p>
                )}
            </div>
        </div>
    );
}