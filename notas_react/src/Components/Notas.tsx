import React from "react";
import { NotasProps } from "../Props/NotasProps";

const CardNota: React.FC<NotasProps> = ({ titulo, texto }) => {
    return (
        <div className="nota">
            <h2>{titulo}</h2>
            <p>{texto}</p>
            <a href="">Editar</a>
            <a href="">Eliminar</a>
        </div>
    )
};

export default CardNota;