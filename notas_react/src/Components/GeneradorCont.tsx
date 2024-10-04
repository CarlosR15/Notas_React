import { useDroppable } from '@dnd-kit/core';
import React, { useState } from 'react';
import ModalConfirm from './ModalConfirmacion';

interface GeneradorContProps {
    onCreateContainer: () => void;
    children: React.ReactNode;
}

const GeneradorCont: React.FC<GeneradorContProps> = ({ onCreateContainer, children }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: 'contenedor-notas',
    });

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Estado para el modal

    const handleDrop = () => {
        setIsConfirmModalOpen(true); // Abrir modal al soltar
    };

    const handleConfirmCreateContainer = () => {
        onCreateContainer(); // Llamar a la función para crear el contenedor
        setIsConfirmModalOpen(false); // Cerrar el modal
    };

    const handleCancelCreateContainer = () => {
        setIsConfirmModalOpen(false); // Cerrar el modal
    };

    return (
        <div
            className='GeneradorCont'
            ref={setNodeRef}
            onDrop={handleDrop}
            style={{
                border: isOver ? '2px dashed blue' : '2px solid gray',
                padding: '10px',
                width: '18%',
                minHeight: '15vh',
            }}
        >
            <span>Arrastra una nota aqui para crear un contenedor de notas</span>
            {children}

            {isConfirmModalOpen && (
                <ModalConfirm
                    isOpen={isConfirmModalOpen}
                    onClose={handleCancelCreateContainer}
                    onConfirm={handleConfirmCreateContainer}
                    message="¿Estás seguro de que quieres crear un contenedor de notas?"
                />
            )}
        </div>
    );
};

export default GeneradorCont;