import React from "react";
import { NotasProps } from "../Props/NotasProps";

interface CardNotaProps extends NotasProps {
    onDelete: (id: number) => void;
    onEdit: (id: number, titulo: string, texto: string) => void;
}

const CardNota: React.FC<CardNotaProps> = ({ id, titulo, texto, onDelete, onEdit }) => {
    return (
        <div className="nota">
            <h2>{titulo}</h2>
            <p>{texto}</p>
            <div className="btnNotas">
                <a href="#" onClick={() => onEdit(id, titulo, texto)}>Editar</a>
                <a href="#" onClick={() => onDelete(id)}>Eliminar</a>
            </div>
        </div>
    );
};

export default CardNota;