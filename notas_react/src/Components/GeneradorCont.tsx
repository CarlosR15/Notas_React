import { useDroppable } from '@dnd-kit/core';
import React from 'react';

interface GeneradorContProps {
    children: React.ReactNode;
}

const GeneradorCont: React.FC<GeneradorContProps> = ({ children }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: 'contenedor-notas',
    });

    return (
        <div
            className='GeneradorCont'
            ref={setNodeRef}
            style={{
                border: isOver ? '2px dashed blue' : '2px solid gray',
                padding: '10px',
                width: '18%',
                minHeight: '15vh',
            }}
        >
        <span>Arrastra una nota aqui para crear un cunjunto</span>
            {children}
        </div>
    );
};

export default GeneradorCont;