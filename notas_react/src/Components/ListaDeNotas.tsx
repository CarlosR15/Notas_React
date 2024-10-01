import { useContext, useEffect, useState } from 'react';
import { NotasContext } from '../Context/NotasContext';
import CardNota from './Notas';
import Modal from './Modal';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';

const ListaNotas: React.FC = () => {
  const context = useContext(NotasContext);

  if (!context) {
    throw new Error("ListaNotas debe estar dentro de un NotasProvider");
  }

  const { notas, eliminarNota, editarNota, agregarNota, dispatchModal, modalState } = context;
  const [items, setItems] = useState(notas);

  useEffect(() => {
    setItems(notas);
  }, [notas]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleEdit = (id: number, titulo: string, texto: string) => {
    dispatchModal({ type: 'OPEN_MODAL' });
    dispatchModal({ type: 'SET_TITLE', payload: titulo });
    dispatchModal({ type: 'SET_TEXT', payload: texto });
    dispatchModal({ type: 'SET_ID', payload: id });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex(item => item.id === active.id);
        const newIndex = prevItems.findIndex(item => item.id === over.id);
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  };

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="gridNotas">
            {items.map((nota) => (
              <CardNota
                key={nota.id}
                id={nota.id}
                titulo={nota.titulo}
                texto={nota.texto}
                onDelete={(id: number) => eliminarNota(id)}
                onEdit={(id: number, titulo: string, texto: string) => handleEdit(id, titulo, texto)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Modal
        isOpen={modalState.isModalOpen}
        onClose={() => dispatchModal({ type: 'CLOSE_MODAL' })}
        onSave={(titulo, texto) => {
          if (modalState.id !== null) {
            editarNota(modalState.id, titulo, texto);
          } else {
            agregarNota(titulo, texto);
          }
        }}
        titulo={modalState.titulo}
        texto={modalState.texto}
        dispatch={dispatchModal}
      />
    </div>
  );
};

export default ListaNotas;