//Importacion de los hooks de react y estilos CSS
import { CSSProperties, useEffect, useState } from 'react';
import { NotasProps } from '../Props/NotasProps';
import { useDroppable } from '@dnd-kit/core'; //Llamado al hook useDroppable de la libreria dnd-kit
import CardNota from './Notas';
import ModalContenedorNotas from './ModalContenedorNotas';
import ModalConfirm from './ModalConfirmacion';

//Props de contenedor para las notas
interface ContenedorProps {
    id: number;
    notas: NotasProps[]; //Array de las notas que pertecen al contenedor
    onDelete: (id: number) => void;
    onEdit: (id: number, titulo: string, texto: string) => void;
    onAddNota: (nota: NotasProps) => void;
    items: NotasProps[]; //Array de las notas que estan afuera
    onDeleteContenedor: (contenedorId: number) => void; //Funcion para eliminar contenedor si no tiene notas
}

//Componente contenedor
const ContenedorNotas: React.FC<ContenedorProps> = ({ id, notas, onDelete, onEdit, onAddNota, items, onDeleteContenedor }) => {
    //Manejadores de los modales
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [notaAAgregar, setNotaAAgregar] = useState<NotasProps | null>(null);

    //Configurar area droppeable con ID
    const { isOver, setNodeRef } = useDroppable({
        id: `contenedor-${id}`,
    });

    //Estilo que hace que cambie si hay algo sobre el
    const style: CSSProperties = {
        border: isOver ? '2px dashed blue' : '2px solid gray',
        padding: '5px',
        position: 'relative',
        cursor: 'pointer',
    };

    // Efecto que se usa en el array de notas
    useEffect(() => {
        if (notas.length === 0) { 
            onDeleteContenedor(id); //Si no tiene notas, el contenedor se elimina
        }
    }, [notas, id, onDeleteContenedor]);

    // Evento de soltar nota en el deste
    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const notaId = parseInt(event.dataTransfer.getData('text/plain'), 10);

        //Buscar la nota en los items disponibles
        const droppedNota = items.find(nota => nota.id === notaId);
        if (droppedNota && !notas.some(nota => nota.id === droppedNota.id)) {
            setNotaAAgregar(droppedNota);
            setIsConfirmModalOpen(true);
        }
    };

    // Evento del drag sobre el contenedor
    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    //Funcion para la confirmacion para agregar las notas al contenedor
    const handleConfirmAddNota = () => {
        if (notaAAgregar) {
            onAddNota(notaAAgregar);
            setNotaAAgregar(null);
        }
        setIsConfirmModalOpen(false);
    };

    //Funcion para cancelar la adicion
    const handleCancelAddNota = () => {
        setNotaAAgregar(null);
        setIsConfirmModalOpen(false);
    };

    // Funcion para abrir el modal con las notas que tiene el contenedor
    const handleOpenDetailsModal = () => {
        setIsDetailsModalOpen(true);
    };

    // Cerrar el modal que muestra las notas que tiene el contenedor
    const handleCloseDetailsModal = () => {
        setIsDetailsModalOpen(false);
    };

    return (
        <>
            <div ref={setNodeRef} style={style} onDrop={handleDrop} onDragOver={handleDragOver} onClick={handleOpenDetailsModal}>
                <div className="contNotasCont">
                    {/*Muestra las primeras 5 notas del contenedor*/}
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

            {/* Modal para mostrar las notas del contenedor */}
            <ModalContenedorNotas
                isOpen={isDetailsModalOpen}
                onClose={handleCloseDetailsModal}
                notas={notas}
                onDelete={onDelete}
                onEdit={onEdit}
            />

            {/* Modal de confirmacion para agregar una nota al contenedor */}
            <ModalConfirm
                isOpen={isConfirmModalOpen}
                onClose={handleCancelAddNota}
                onConfirm={handleConfirmAddNota}
                message="¿Estás seguro de que deseas agregar esta nota al contenedor?"
            />
        </>
    );
};

export default ContenedorNotas;