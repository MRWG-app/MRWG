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
                    const modulo = await modulosRV60[ruta]();
                    datos = modulo.default[capituloIndex] || [];
                }
            } else if (version === "KJV") {
                const ruta = `../data/KJV/${libro}.json`;
                if (modulosKJV[ruta]) {
                    const json = await modulosKJV[ruta]();
                    // Buscamos el capítulo (usamos string para coincidir con el JSON)
                    const capObj = json.chapters?.find(c => c.chapter === (capituloIndex + 1).toString());
                    // Transformamos array de objetos {verse, text} a array de strings
                    datos = capObj ? capObj.verses.map(v => v.text) : [];
                }
            }
            setVersiculos(datos);
        };

        cargarDatos();
    }, [version, libro, capituloIndex]);

    return (
        <div className="p-4 text-white">
            <select onChange={(e) => setVersion(e.target.value)} value={version} className="text-black mb-2">
                <option value="RV60">RV60</option>
                <option value="KJV">KJV</option>
            </select>

            <input 
                type="text" 
                value={libro} 
                onChange={(e) => setLibro(e.target.value.toLowerCase())} 
                placeholder="Nombre del libro"
                className="text-black ml-2"
            />

            <h2 className="text-2xl my-4">{version} - {libro} Cap {capituloIndex + 1}</h2>
            
            <div className="space-y-2">
                {versiculos.length > 0 ? (
                    versiculos.map((texto, i) => (
                        <p key={i}><span className="font-bold">{i + 1}.</span> {texto}</p>
                    ))
                ) : (
                    <p>No se encontraron versículos.</p>
                )}
            </div>
        </div>
    );
}