import { createContext, useState, ReactNode, useReducer } from 'react';
import { NotasProps } from '../Props/NotasProps';
import { modalReducer, State, Action } from '../Reducer/ModalReducer';

//Interfaz pal contexto de las notas
interface NotasContextProps {
  notas: NotasProps[]; //array de notas
  agregarNota: (titulo: string, texto: string) => void;// funcion para agregar una nueva nota
  editarNota: (id: number, titulo: string, texto: string) => void; //funcion para editar una nota existente
  eliminarNota: (id: number) => void;//funcion para eliminar una nota
  actualizarOrden: (nuevoOrden: NotasProps[]) => void;// pa actualizar el orden de las notas
  dispatchModal: React.Dispatch<Action>;
  modalState: State;
}

// Crea el contexto de notas con un valor nulo
export const NotasContext = createContext<NotasContextProps | undefined>(undefined);

// Componente proveedor de contexto de notas
export const NotasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notas, setNotas] = useState<NotasProps[]>([]);

  // Estado inicial para el modal
  const initialModalState: State = {
    id: null,
    isModalOpen: false,
    titulo: '',
    texto: '',
    isConfirmModalOpen: false
  };

  //useReducer para manejar el estado del modal
  const [modalState, dispatchModal] = useReducer(modalReducer, initialModalState);

  // funcion para agregar una nueva nota
  const agregarNota = (titulo: string, texto: string) => {
    const nuevaNota = { id: notas.length + 1, titulo, texto };
    setNotas([...notas, nuevaNota]);
    dispatchModal({ type: 'CLOSE_MODAL' });
  };

  // funcion para editar una nota existente
  const editarNota = (id: number, titulo: string, texto: string) => {
    const nuevasNotas = notas.map(nota =>
      nota.id === id ? { ...nota, titulo, texto } : nota
    );
    setNotas(nuevasNotas);
    dispatchModal({ type: 'CLOSE_MODAL' });
  };

  //funcion para eliminar una nota
  const eliminarNota = (id: number) => {
    const nuevasNotas = notas.filter(nota => nota.id !== id);
    setNotas(nuevasNotas);
  };

  //funcion  para actualizar el orden de las notas
  const actualizarOrden = (nuevoOrden: NotasProps[]) => {
    setNotas(nuevoOrden);
  };

  return (
    <NotasContext.Provider value={{ notas, agregarNota, editarNota, eliminarNota, actualizarOrden, dispatchModal, modalState }}>
      {children}
    </NotasContext.Provider>
  );
};