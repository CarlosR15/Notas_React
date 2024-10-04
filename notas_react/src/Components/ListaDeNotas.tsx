import { useContext, useEffect, useState } from 'react';
import { NotasContext } from '../Context/NotasContext';
import CardNota from './Notas';
import Modal from './Modal';
import GeneradorCont from './GeneradorCont'
import ContenedorNotas from './ContenedorNotas';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { SortableContext, rectSwappingStrategy } from '@dnd-kit/sortable';
import { NotasProps } from '../Props/NotasProps';

//Creacion del componente notas (este we trai todo)
const ListaNotas: React.FC = () => {

  //Se llama al contexto
  const context = useContext(NotasContext);

  if (!context) {
    throw new Error("ListaNotas debe estar dentro de un NotasProvider");
  }

  // funciones del contexto
  const { notas, editarNota, agregarNota, dispatchModal, modalState, actualizarOrden } = context;

  //estado pa menejar la nota y contenedor (no se mueve el contenedor dio mio)
  const [items, setItems] = useState(notas);
  const [contenedores, setContenedores] = useState<{ id: number; notas: NotasProps[] }[]>([]);

  //Cuando cambian las notas en el contexto, se actualiza los items
  useEffect(() => {
    setItems(notas);
  }, [notas]);

  // Sensores del dnd
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, //Se activa el sensor despues de 10px
      },
    })
  );

  // Manejador de eliminacion de notas de un contenedor
  const handleDeleteNotaFromContenedor = (notaId: number, contenedorId: number) => {
    setContenedores(prevContenedores =>
      prevContenedores.map(contenedor =>
        contenedor.id === contenedorId
          ? { ...contenedor, notas: contenedor.notas.filter(nota => nota.id !== notaId) }
          : contenedor
      )
    );
  };

  //Se elimina una nota a nivel global
  const eliminarNotaGlobal = (id: number) => {
    setItems(prevItems => prevItems.filter(nota => nota.id !== id));
  };

  //Manejador de la eliminacion de una nota, este checa global o en el contenedor
  const handleDeleteNota = (notaId: number, contenedorId?: number) => {
    if (contenedorId) {
      handleDeleteNotaFromContenedor(notaId, contenedorId);
    }

    eliminarNotaGlobal(notaId); //Aqui se borra globalmente
  };

  //Manejador de edicion de una nota, con reeducer de los modales
  const handleEdit = (id: number, titulo: string, texto: string) => {
    dispatchModal({ type: 'OPEN_MODAL' });
    dispatchModal({ type: 'SET_TITLE', payload: titulo });
    dispatchModal({ type: 'SET_TEXT', payload: texto });
    dispatchModal({ type: 'SET_ID', payload: id });
  };

  //Agrega una nota a un contenedor
  const handleAddNotaToContenedor = (contenedorId: number, nota: NotasProps) => {
    setContenedores(prev =>
      prev.map(contenedor =>
        contenedor.id === contenedorId ? { ...contenedor, notas: [...contenedor.notas, nota] } : contenedor
      )
    );
  };

  //manejador de eliminacion de contenedor
  const handleDeleteContenedor = (contenedorId: number) => {
    setContenedores(prev => prev.filter(contenedor => contenedor.id !== contenedorId));
  };

  //Manejador de final de un evento dnd (trai todo x30)
  const handleDragEnd = (event: any) => {
    const { active, over } = event; //Se obtiene el objeto que se mueve y sobre el que se encuentra

    if (!over) {
      return; // Si no hay donde, no hace nada
    }

    //Si esta sobre un contenedor
    if (over && typeof over.id === 'string' && over.id.startsWith('contenedor-')) {
      const contenedorId = parseInt(over.id.replace('contenedor-', ''), 10); //obtiene su id
      const activeNota = items.find(item => item.id === active.id); //obtiene el id de la nota que estas agarrando

      if (activeNota) {
        handleAddNotaToContenedor(contenedorId, activeNota); //y la mete al contenedor

        const newItems = items.filter(item => item.id !== active.id);
        setItems(newItems); //Actualiza la lista de notas pa que ya no se vea la que se fue
      }
    }

    // Si se suelta donde se crea un contenedor
    if (over.id === 'contenedor-notas') {
      const activeIndex = items.findIndex(item => item.id === active.id);
      if (activeIndex === -1) return; //Si no se encuentra a la nota no hace nada

      const newNota = items[activeIndex]; // obtieene la nota que estas moviendo

      const newItems = items.filter(item => item.id !== newNota.id);
      setItems(newItems); //Actualiza a la lista pa que no se vea x2

      const newContenedor = {
        id: contenedores.length + 1, //Se crea un nuevo contenedor con id
        notas: [newNota], //y se le pone la nota (porque si no tiene se vuela)
      };

      setContenedores(prev => [...prev, newContenedor]); // Se agrega el nuevo contenedor
    } 
      // Si se encuentra sobre otra nota
      else if (active.id !== over.id) {
      const activeIndex = items.findIndex(item => item.id === active.id);
      const overIndex = items.findIndex(item => item.id === over.id);

      if (activeIndex === -1 || overIndex === -1) return; //Si no se sabee cual es no hace nada

      const newItems = [...items]; //se crea una copia de como estan las notas
      //Se intercabian de posicion
      [newItems[activeIndex], newItems[overIndex]] = [newItems[overIndex], newItems[activeIndex]];

      setItems(newItems); //Actualiza la ista
      actualizarOrden(newItems); //Actualiza el orden
    }
  };

  console.log('Groups:', contenedores); // pa ver si las notas se metieron al grupo o si existe un grupo
  console.log('Notas:', items); //pa ver las notas

  return (
    <div>
      <DndContext //Contexto de dnd
        sensors={sensors} //sensores del dnd
        collisionDetection={closestCenter} //deteccion de colisiones
        onDragEnd={handleDragEnd} //manejador de lo del final del dnd (donde se hace todo)
      >
        <SortableContext items={items} strategy={rectSwappingStrategy}> {/* Contexto para elementos que se pueden ordenar*/}
          <GeneradorCont children={undefined} onCreateContainer={function (): void {
            throw new Error('Function not implemented.');
          } }></GeneradorCont>
          <div className="gridNotas">
            {items.map((nota) => (
              <CardNota
                key={`nota-${nota.id}`}
                id={nota.id}
                titulo={nota.titulo}
                texto={nota.texto}
                onDelete={(id: number) => handleDeleteNota(id)}
                onEdit={(id: number, titulo: string, texto: string) => handleEdit(id, titulo, texto)}
              />
            ))}

            {contenedores.length > 0 && contenedores.map(contenedor => (
              <ContenedorNotas
                key={`contenedor-${contenedor.id}`}
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

      <Modal //Modal para editar o eliminar cosas
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