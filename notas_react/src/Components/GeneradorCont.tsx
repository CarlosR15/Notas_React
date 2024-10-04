import { useDroppable } from '@dnd-kit/core';
import { useState } from 'react';
import ModalConfirm from './ModalConfirmacion';

//Definir los props que acepta el componente
interface GeneradorContProps {
    onCreateContainer: () => void;
    children: React.ReactNode;
}

// Componente GeneradorCont
const GeneradorCont: React.FC<GeneradorContProps> = ({ onCreateContainer, children }) => {
    //configuracion del area dropeable
    const { isOver, setNodeRef } = useDroppable({
        id: 'contenedor-notas',
    });

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); //Estado pal modal de confirmacion

    //Manejador del evento soltar
    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        setIsConfirmModalOpen(true);
    };

    // Confirmacion de la creacion de un contenedor
    const handleConfirmCreateContainer = () => {
        onCreateContainer();
        setIsConfirmModalOpen(false);
    };

    // Cancelacion de la creacion del contenedor
    const handleCancelCreateContainer = () => {
        setIsConfirmModalOpen(false);
    };

    return (
        <div
            className='GeneradorCont'
            ref={setNodeRef}
            onDragOver={(e) => e.preventDefault()}
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