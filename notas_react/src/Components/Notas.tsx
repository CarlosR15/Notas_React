import { useState, CSSProperties } from "react";
import { NotasProps } from "../Props/NotasProps";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ModalDetallesNota from "./ModalDetallesNota";
import ModalConfirm from "./ModalConfirmacion";

interface CardNotaProps extends NotasProps {
    onDelete: (id: number) => void;
    onEdit: (id: number, titulo: string, texto: string) => void;
    style?: CSSProperties;
}

const colores = ["#FFCDD2", "#F8BBD0", "#E1BEE7", "#D1C4E9", "#C5CAE9", "#BBDEFB", "#B3E5FC", "#B2EBF2", "#B2DFDB", "#C8E6C9", "#DCEDC8", "#F0F4C3", "#FFF9C4", "#FFECB3", "#FFE0B2", "#FFCCBC"];

const CardNota: React.FC<CardNotaProps> = ({ id, titulo, texto, onDelete, onEdit, style }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);

    const colorIndex = id % colores.length;
    const backgroundColor = colores[colorIndex];

    const cardStyle = {
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

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDeleteConfirmModalOpen(true); // Abre el modal de confirmación
    };

    const handleConfirmDelete = () => {
        onDelete(id);
        setIsDeleteConfirmModalOpen(false); // Cierra el modal después de eliminar
    };

    const handleCancelDelete = () => {
        setIsDeleteConfirmModalOpen(false); // Cierra el modal si se cancela
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
                        onClick={handleDeleteClick}
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
                onSave={function (_titulo: string, _texto: string): void {
                    throw new Error("Function not implemented.");
                }} dispatch={function (_value: any): void {
                    throw new Error("Function not implemented.");
                }} />

            <ModalConfirm
                isOpen={isDeleteConfirmModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                message={`¿Estás seguro de que deseas eliminar la nota "${titulo}"?`}
            />
        </>
    );
};

export default CardNota;