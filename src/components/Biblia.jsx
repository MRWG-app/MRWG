/*
Componente encargado de cargar los json  de la Biblia y gestionar la vista del
Capítulo actual
*/

import {useState } from 'react';
import rv60Data from 'src/data/biblia/RV60.json';

export default function Biblia() {
    // Inicializa y actualiza estado del capítulo actual
    const [capitulo, setCapitulo] = useState(1);

    // Busca en el array del JSON el capítulo actual y lo devuelve
    const contenido = rv60Data.find(b => b.capitulo === capitulo);

    return (
        <div className="p-4 text-white">
            <h2 className="text-2x1 mb-4">Biblia RV60 - Capitulo {capitulo}</h2>
            <div className="space-y-2">
                {contenido ? (
                    contenido.verses.map((versiculo, index) => (
                        <p key={index} >
                            <span className="font-bold">{index + 1}.</span> {versiculo}
                        </p>
                    ))
                ) : (
                    <p>El capítulo no existe o está cargando</p>
                )}
            </div>
        </div>
    );
}