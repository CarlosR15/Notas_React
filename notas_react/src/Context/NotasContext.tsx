import { createContext, useState, ReactNode, useReducer } from 'react';
import { NotasProps } from '../Props/NotasProps';
import { modalReducer, State, Action } from '../Reducer/ModalReducer';

interface NotasContextProps {
  notas: NotasProps[];
  agregarNota: (titulo: string, texto: string) => void;
  editarNota: (id: number, titulo: string, texto: string) => void;
  eliminarNota: (id: number) => void;
  actualizarOrden: (nuevoOrden: NotasProps[]) => void;
  dispatchModal: React.Dispatch<Action>;
  modalState: State;
}

export const NotasContext = createContext<NotasContextProps | undefined>(undefined);

export const NotasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notas, setNotas] = useState<NotasProps[]>([
    { id: 1, titulo: 'Sis', texto: 'Ayuda' },
    { id: 2, titulo: 'Sass', texto: 'Dios' },
    { id: 3, titulo: 'wa', texto: 'mio' },
    { id: 4, titulo: 'sa', texto: 'por' },
    { id: 5, titulo: 'pa', texto: 'favor' },
    { id: 6, titulo: 'dre', texto: 'salvenme' },
    { id: 7, titulo: 'nues', texto: 'que' },
    { id: 8, titulo: 'tro', texto: 'no' },
    { id: 9, titulo: 'que', texto: 'acabo' },
    { id: 10, titulo: 'es', texto: 'esto' },
    { id: 11, titulo: 'tas', texto: 'jesus' },
    { id: 12, titulo: 'en', texto: 'baja' },
    { id: 13, titulo: 'los', texto: 'AAAAAAAAAAAAAAAAAAAAAA' }
  ]);

  const initialModalState: State = {
    id: null,
    isModalOpen: false,
    titulo: '',
    texto: '',
  };

  const [modalState, dispatchModal] = useReducer(modalReducer, initialModalState);

  const agregarNota = (titulo: string, texto: string) => {
    const nuevaNota = { id: notas.length + 1, titulo, texto };
    setNotas([...notas, nuevaNota]);
    dispatchModal({ type: 'CLOSE_MODAL' });
  };

  const editarNota = (id: number, titulo: string, texto: string) => {
    const nuevasNotas = notas.map(nota =>
      nota.id === id ? { ...nota, titulo, texto } : nota
    );
    setNotas(nuevasNotas);
    dispatchModal({ type: 'CLOSE_MODAL' });
  };

  const eliminarNota = (id: number) => {
    const nuevasNotas = notas.filter(nota => nota.id !== id);
    setNotas(nuevasNotas);
  };

  const actualizarOrden = (nuevoOrden: NotasProps[]) => {
    setNotas(nuevoOrden);
  };

  return (
    <NotasContext.Provider value={{ notas, agregarNota, editarNota, eliminarNota, actualizarOrden, dispatchModal, modalState }}>
      {children}
    </NotasContext.Provider>
  );
};