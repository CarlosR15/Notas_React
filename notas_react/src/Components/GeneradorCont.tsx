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

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const handleDrop = () => {
        setIsConfirmModalOpen(true);
    };

    const handleConfirmCreateContainer = () => {
        onCreateContainer();
        setIsConfirmModalOpen(false);
    };

    const handleCancelCreateContainer = () => {
        setIsConfirmModalOpen(false);
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