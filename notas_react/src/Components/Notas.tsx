import { useState } from "react";
import { NotasProps } from "../Props/NotasProps";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ModalDetallesNota from "./ModalDetallesNota";

interface CardNotaProps extends NotasProps {
    onDelete: (id: number) => void;
    onEdit: (id: number, titulo: string, texto: string) => void;
}

const CardNota: React.FC<CardNotaProps> = ({ id, titulo, texto, onDelete, onEdit }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleOpenDetailsModal = () => {
        setIsDetailsModalOpen(true);
    };

    const handleCloseDetailsModal = () => {
        setIsDetailsModalOpen(false);
    };

    return (
        <>
            <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="nota" onClick={handleOpenDetailsModal}>
                <h2>{titulo}</h2>
                <p>{texto}</p>
                <div className="btnNotas">
                    <a href="#" onClick={(e) => { e.stopPropagation(); onEdit(id, titulo, texto); }}>Editar</a>
                    <a href="#" onClick={(e) => { e.stopPropagation(); onDelete(id); }}>Eliminar</a>
                </div>
            </div>

            <ModalDetallesNota
                isOpen={isDetailsModalOpen}
                onClose={handleCloseDetailsModal}
                titulo={titulo}
                texto={texto}
                // El onSave existe en los props del modal (el cual se esta reciclando), pero como no se usa, se declara en error de manera automatica si se llama durante este proceso
                onSave={function (_titulo: string, _texto: string): void {
                    throw new Error("Function not implemented.");
                }} dispatch={function (_value: any): void {
                    throw new Error("Function not implemented.");
                }} />
        </>
    );
};
export default CardNota;