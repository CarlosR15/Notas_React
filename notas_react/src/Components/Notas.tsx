import { useState, CSSProperties } from "react";
import { NotasProps } from "../Props/NotasProps";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ModalDetallesNota from "./ModalDetallesNota";

interface CardNotaProps extends NotasProps {
    onDelete: (id: number) => void;
    onEdit: (id: number, titulo: string, texto: string) => void;
    style?: CSSProperties;
}

const colores = ["#FFCDD2", "#F8BBD0", "#E1BEE7", "#D1C4E9", "#C5CAE9", "#BBDEFB", "#B3E5FC", "#B2EBF2", "#B2DFDB", "#C8E6C9", "#DCEDC8", "#F0F4C3", "#FFF9C4", "#FFECB3", "#FFE0B2", "#FFCCBC"];

const CardNota: React.FC<CardNotaProps> = ({ id, titulo, texto, onDelete, onEdit, style }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    const colorIndex = id % colores.length;
    const backgroundColor = colores[colorIndex];

    const cardStyle  = {
        ...style,
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor,
    };

    const handleOpenDetailsModal = () => {
        setIsDetailsModalOpen(true);
    };

    const handleCloseDetailsModal = () => {
        setIsDetailsModalOpen(false);
    };

    return (
        <>
            <div ref={setNodeRef} style={cardStyle} {...attributes} {...listeners} className="nota" onClick={handleOpenDetailsModal}>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

                <div className="btnNotas">
                    <span
                        id="edit"
                        className="material-icons"
                        onClick={(e) => { e.stopPropagation(); onEdit(id, titulo, texto); }}
                        style={{ cursor: "pointer" }}
                    >
                        edit_note
                    </span>
                    <span
                        id="del"
                        className="material-icons"
                        onClick={(e) => { e.stopPropagation(); onDelete(id); }}
                        style={{ cursor: "pointer" }}
                    >
                        delete
                    </span>
                </div>

                <h2>{titulo}</h2>
                <p>{texto}</p>
            </div>

            <ModalDetallesNota
                isOpen={isDetailsModalOpen}
                onClose={handleCloseDetailsModal}
                titulo={titulo}
                texto={texto}
                backgroundColor={backgroundColor}
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