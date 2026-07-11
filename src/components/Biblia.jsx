/*
Componente encargado de cargar los archivos de la Biblia y gestionar la vista del
capítulo actual.
*/

import { useState, useEffect } from 'react';

const modulosRV60 = import.meta.glob('../data/RV60/*.js');
const modulosKJV = import.meta.glob('../data/KJV/*.json');

const librosRV60 = Object.keys(modulosRV60).map(path => path.split('/').pop().replace('.js', ''));
const librosKJV = Object.keys(modulosKJV).map(path => path.split('/').pop().replace('.json', ''));

export default function Biblia() {
    const [version, setVersion] = useState("RV60");
    const [libro, setLibro] = useState("genesis");
    const [capituloIndex, setCapituloIndex] = useState(0);
    const [selectedVerseIndex, setSelectedVerseIndex] = useState(0);
    const [versiculos, setVersiculos] = useState([]);

    useEffect(() => {
        const librosDisponibles = version === "RV60" ? librosRV60 : librosKJV;
        if (!librosDisponibles.includes(libro)) {
            setLibro(librosDisponibles[0] || "");
        }
        setCapituloIndex(0);
        setSelectedVerseIndex(0);
    }, [version]);

    useEffect(() => {
        setSelectedVerseIndex(0);
    }, [capituloIndex, libro, version]);

    useEffect(() => {
        const cargarDatos = async () => {
            let datos = [];

            if (version === "RV60") {
                const ruta = `../data/RV60/${libro.toLowerCase()}.js`;
                if (modulosRV60[ruta]) {
                    try {
                        const modulo = await modulosRV60[ruta]();
                        datos = modulo.default ? modulo.default[capituloIndex] || [] : [];
                    } catch (error) {
                        console.error("Error cargando RV60:", error);
                    }
                }
            } else if (version === "KJV") {
                const rutaBusqueda = Object.keys(modulosKJV).find(r => 
                    r.toLowerCase().endsWith(`/${libro.toLowerCase()}.json`)
                );
                
                if (rutaBusqueda) {
                    try {
                        const json = await modulosKJV[rutaBusqueda]();
                        console.log("KJV JSON Cargado para", libro, ":", json);
                        
                        const capNum = capituloIndex + 1;
                        const capObj = json.chapters?.find(c => parseInt(c.chapter) === capNum);
                        
                        datos = capObj ? capObj.verses.map(v => v.text) : [];
                        console.log("KJV Versículos procesados:", datos);
                    } catch (error) {
                        console.error("Error cargando KJV:", error);
                    }
                } else {
                    console.warn("No se encontró archivo KJV para:", libro);
                }
            }
            
            setVersiculos(datos);
        };

        cargarDatos();
    }, [version, libro, capituloIndex]);

    return (
        <div className="p-4 text-white">
            <div className="mb-4">
                <select onChange={(e) => setVersion(e.target.value)} value={version} className="text-black mb-2 p-1 mr-2">
                    <option value="RV60">RV60</option>
                    <option value="KJV">KJV</option>
                </select>

                <select onChange={(e) => { setLibro(e.target.value); setCapituloIndex(0); }} value={libro} className="text-black mb-2 p-1">
                    {(version === "RV60" ? librosRV60 : librosKJV).map(l => (
                        <option key={l} value={l}>{l.toUpperCase()}</option>
                    ))}
                </select>
            </div>

            <h2 className="text-2xl my-4">{version} - {libro.toUpperCase()} - Cap {capituloIndex + 1}</h2>
            
            <div className="mb-4">
                <button onClick={() => setCapituloIndex(p => Math.max(0, p - 1))} className="p-2 bg-blue-600 rounded">Anterior</button>
                <button onClick={() => setCapituloIndex(p => p + 1)} className="p-2 bg-blue-600 rounded ml-2">Siguiente</button>
            </div>

            <div className="mb-4">
                <label className="mr-2">Versículo:</label>
                <select 
                    onChange={(e) => setSelectedVerseIndex(parseInt(e.target.value))} 
                    value={selectedVerseIndex} 
                    className="text-black p-1"
                >
                    {versiculos.map((_, i) => (
                        <option key={i} value={i}>{i + 1}</option>
                    ))}
                </select>
            </div>

            <div className="p-4 bg-gray-800 border-l-4 border-blue-500 rounded shadow-md">
                <h3 className="font-bold mb-2">Versículo {selectedVerseIndex + 1}</h3>
                <p className="text-lg italic">
                    {versiculos[selectedVerseIndex] || "Selecciona un versículo"}
                </p>
            </div>

            <div className="space-y-2 mt-6">
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