import { createContext, useState, ReactNode, useReducer  } from 'react';
import { NotasProps } from '../Props/NotasProps';
import { modalReducer, State, Action } from '../Reducer/ModalReducer';

interface NotasContextProps {
  notas: NotasProps[];
  agregarNota: (titulo: string, texto: string) => void;
  editarNota: (id: number, titulo: string, texto: string) => void;
  eliminarNota: (id: number) => void;
  dispatchModal: React.Dispatch<Action>;
  modalState: State;
}

export const NotasContext = createContext<NotasContextProps | undefined>(undefined);

export const NotasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notas, setNotas] = useState<NotasProps[]>([
    { id: 1, titulo: 'Sis', texto: 'Ayuda' }
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

  return (
    <NotasContext.Provider value={{ notas, agregarNota, editarNota, eliminarNota, dispatchModal, modalState }}>
      {children}
    </NotasContext.Provider>
  );
};