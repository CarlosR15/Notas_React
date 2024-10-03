import { CSSProperties, useEffect, useState } from 'react';
import { NotasProps } from '../Props/NotasProps';
import { useDroppable } from '@dnd-kit/core';
import CardNota from './Notas';
import ModalContenedorNotas from './ModalContenedorNotas';

interface ContenedorProps {
    id: number;
    notas: NotasProps[];
    onDelete: (id: number) => void;
    onEdit: (id: number, titulo: string, texto: string) => void;
    onAddNota: (nota: NotasProps) => void;
    items: NotasProps[];
    onDeleteContenedor: (contenedorId: number) => void;
}

const ContenedorNotas: React.FC<ContenedorProps> = ({ id, notas, onDelete, onEdit, onAddNota, items, onDeleteContenedor }) => {
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const { isOver, setNodeRef } = useDroppable({
        id: `contenedor-${id}`,
    });

    const style: CSSProperties = {
        border: isOver ? '2px dashed blue' : '2px solid gray',
        padding: '5px',
        position: 'relative',
        cursor: 'pointer',
    };

    useEffect(() => {
        if (notas.length === 0) {
          onDeleteContenedor(id);
        }
      }, [notas, id, onDeleteContenedor]);

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const notaId = parseInt(event.dataTransfer.getData('text/plain'), 10);

        const droppedNota = items.find(nota => nota.id === notaId);
        if (droppedNota) {
            if (!notas.some(nota => nota.id === droppedNota.id)) {
                onAddNota(droppedNota);
            }
        }
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const handleOpenDetailsModal = () => {
        setIsDetailsModalOpen(true);
    };

    const handleCloseDetailsModal = () => {
        setIsDetailsModalOpen(false);
    };

    return (
        <>
            <div ref={setNodeRef} style={style} onDrop={handleDrop} onDragOver={handleDragOver} onClick={handleOpenDetailsModal}>
                <div className="contNotasCont">
                    {notas.slice(0, 5).map((nota: NotasProps) => (
                        <CardNota
                            key={nota.id}
                            id={nota.id}
                            titulo={nota.titulo}
                            texto={nota.texto}
                            onDelete={() => { }}
                            onEdit={() => { }}
                        />
                    ))}
                </div>
            </div>
            <ModalContenedorNotas
                isOpen={isDetailsModalOpen}
                onClose={handleCloseDetailsModal}
                notas={notas}
                onDelete={onDelete}
                onEdit={onEdit}
            />
        </>
    );
};

export default ContenedorNotas;