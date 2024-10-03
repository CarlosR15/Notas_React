import { useContext, useEffect, useState } from 'react';
import { NotasContext } from '../Context/NotasContext';
import CardNota from './Notas';
import Modal from './Modal';
import GeneradorCont from './GeneradorCont'
import ContenedorNotas from './ContenedorNotas';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { SortableContext, rectSwappingStrategy } from '@dnd-kit/sortable';
import { NotasProps } from '../Props/NotasProps';

const ListaNotas: React.FC = () => {
  const context = useContext(NotasContext);

  if (!context) {
    throw new Error("ListaNotas debe estar dentro de un NotasProvider");
  }

  const { notas, editarNota, agregarNota, dispatchModal, modalState, actualizarOrden } = context;
  const [items, setItems] = useState(notas);
  const [contenedores, setContenedores] = useState<{ id: number; notas: NotasProps[] }[]>([]);

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

  const handleDeleteNotaFromContenedor = (notaId: number, contenedorId: number) => {
    setContenedores(prevContenedores =>
      prevContenedores.map(contenedor =>
        contenedor.id === contenedorId
          ? { ...contenedor, notas: contenedor.notas.filter(nota => nota.id !== notaId) }
          : contenedor
      )
    );
  };

  const eliminarNotaGlobal = (id: number) => {
    setItems(prevItems => prevItems.filter(nota => nota.id !== id));
  };

  const handleDeleteNota = (notaId: number, contenedorId?: number) => {
    if (contenedorId) {
      handleDeleteNotaFromContenedor(notaId, contenedorId);
    }

    eliminarNotaGlobal(notaId);
  };

  const handleEdit = (id: number, titulo: string, texto: string) => {
    dispatchModal({ type: 'OPEN_MODAL' });
    dispatchModal({ type: 'SET_TITLE', payload: titulo });
    dispatchModal({ type: 'SET_TEXT', payload: texto });
    dispatchModal({ type: 'SET_ID', payload: id });
  };

  const handleAddNotaToContenedor = (contenedorId: number, nota: NotasProps) => {
    setContenedores(prev =>
      prev.map(contenedor =>
        contenedor.id === contenedorId ? { ...contenedor, notas: [...contenedor.notas, nota] } : contenedor
      )
    );
  };

  const handleDeleteContenedor = (contenedorId: number) => {
    setContenedores(prev => prev.filter(contenedor => contenedor.id !== contenedorId));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (over && typeof over.id === 'string' && over.id.startsWith('contenedor-')) {
      const contenedorId = parseInt(over.id.replace('contenedor-', ''), 10);
      const activeNota = items.find(item => item.id === active.id);

      if (activeNota) {
        handleAddNotaToContenedor(contenedorId, activeNota);

        const newItems = items.filter(item => item.id !== active.id);
        setItems(newItems);
      }
    }
    if (over.id === 'contenedor-notas') {
      const activeIndex = items.findIndex(item => item.id === active.id);
      if (activeIndex === -1) return;

      const newNota = items[activeIndex];

      const newItems = items.filter(item => item.id !== newNota.id);
      setItems(newItems);

      const newContenedor = {
        id: contenedores.length + 1,
        notas: [newNota],
      };

      setContenedores(prev => [...prev, newContenedor]);
    } else if (active.id !== over.id) {
      const activeIndex = items.findIndex(item => item.id === active.id);
      const overIndex = items.findIndex(item => item.id === over.id);

      if (activeIndex === -1 || overIndex === -1) return;

      const newItems = [...items];
      [newItems[activeIndex], newItems[overIndex]] = [newItems[overIndex], newItems[activeIndex]];

      setItems(newItems);
      actualizarOrden(newItems);
    }
  };

  console.log('Groups:', contenedores);
  console.log('Notas:', items);

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={rectSwappingStrategy}>
          <GeneradorCont children={undefined}></GeneradorCont>
          <div className="gridNotas">
            {items.map((nota) => (
              <CardNota
                key={nota.id}
                id={nota.id}
                titulo={nota.titulo}
                texto={nota.texto}
                onDelete={(id: number) => handleDeleteNota(id)}
                onEdit={(id: number, titulo: string, texto: string) => handleEdit(id, titulo, texto)}
              />
            ))}
            {contenedores.length > 0 && contenedores.map(contenedor => (
              <ContenedorNotas
                key={contenedor.id}
                id={contenedor.id}
                notas={contenedor.notas || []}
                items={items || []}
                onDelete={(id: number) => handleDeleteNota(id, contenedor.id)}
                onEdit={(id: number, titulo: string, texto: string) => handleEdit(id, titulo, texto)}
                onAddNota={(nota: NotasProps) => handleAddNotaToContenedor(contenedor.id, nota)}
                onDeleteContenedor={handleDeleteContenedor}
              />
            ))}
          </div>
          <div>
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