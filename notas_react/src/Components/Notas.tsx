import { useState, CSSProperties } from "react";
import { NotasProps } from "../Props/NotasProps";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ModalDetallesNota from "./ModalDetallesNota";
import ModalConfirm from "./ModalConfirmacion";

// Agrega props a los que se tenian
interface CardNotaProps extends NotasProps {
    onDelete: (id: number) => void; //pa la eliminacion de nota
    onEdit: (id: number, titulo: string, texto: string) => void; //edicion ded nota
    style?: CSSProperties; // lo de los colores
}

//Array de los posibles colores que pueden tener las notas
const colores = ["#FFCDD2", "#F8BBD0", "#E1BEE7", "#D1C4E9", "#C5CAE9", "#BBDEFB", "#B3E5FC", "#B2EBF2", "#B2DFDB", "#C8E6C9", "#DCEDC8", "#F0F4C3", "#FFF9C4", "#FFECB3", "#FFE0B2", "#FFCCBC"];

//componente cardnota (la nota pues) 
const CardNota: React.FC<CardNotaProps> = ({ id, titulo, texto, onDelete, onEdit, style }) => {
    //Hook que permite dnd en la nota
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    //Estado pal modal que muestra la nota
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    //Estado del modal de confirmacion
    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);

    //Con esto se ve que color tiene la nota y se le pone pa que muestre el modal
    const colorIndex = id % colores.length;
    const backgroundColor = colores[colorIndex];

    //Estilo pa las notas pal dnd y su background color
    const cardStyle = {
        ...style,
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor,
    };

    //manejador de la apertura del modal pa la nota
    const handleOpenDetailsModal = () => {
        setIsDetailsModalOpen(true);
    };

    //Manejador del que cierra el modal pa la nota
    const handleCloseDetailsModal = () => {
        setIsDetailsModalOpen(false);
    };

    //Maneja el clic pal boton eliminar
    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDeleteConfirmModalOpen(true);
    };

    //Confirmacion de la eliminacion
    const handleConfirmDelete = () => {
        onDelete(id);
        setIsDeleteConfirmModalOpen(false);
    };

    // Cancelacion de eliminacion
    const handleCancelDelete = () => {
        setIsDeleteConfirmModalOpen(false);
    };

    //La nota
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
                        className="material-symbols-outlined"
                        onClick={handleDeleteClick}
                        style={{ cursor: "pointer" }}
                    >
                        delete
                    </span>
                </div>

                <h2>{titulo}</h2>
                <p>{texto}</p>
            </div>

            {/* Modal para mostrar las notas */}
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