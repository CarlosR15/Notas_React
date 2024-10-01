import React from "react";
import { NotasProps } from "../Props/NotasProps";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CardNotaProps extends NotasProps {
    onDelete: (id: number) => void;
    onEdit: (id: number, titulo: string, texto: string) => void;
}

const CardNota: React.FC<CardNotaProps> = ({ id, titulo, texto, onDelete, onEdit }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="nota">
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