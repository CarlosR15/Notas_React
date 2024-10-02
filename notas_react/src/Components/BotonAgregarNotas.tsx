import { useContext, useReducer } from 'react';
import { NotasContext } from '../Context/NotasContext';
import Modal from './Modal';
import { modalReducer } from '../Reducer/ModalReducer';

const initialState = {
  isModalOpen: false,
  titulo: '',
  texto: '',
  id: null,
};

const BtnAgregarNota: React.FC = () => {
  const context = useContext(NotasContext);
  if (!context) {
    throw new Error("BtnAgregarNota debe estar dentro de un NotasProvider");
  }
  const { agregarNota } = context;
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const handleOpenModal = () => {
    dispatch({ type: 'OPEN_MODAL' });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
    dispatch({ type: 'RESET_FORM' });
  };

  const handleSaveNota = (titulo: string, texto: string) => {
    agregarNota(titulo, texto);
    dispatch({ type: 'CLOSE_MODAL' });
    dispatch({ type: 'RESET_FORM' });
  };

  return (
    <>
      <div className='BtnAgregarNotas'>
        <button onClick={handleOpenModal}>Agregar Nota</button>
        <Modal
          isOpen={state.isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveNota}
          titulo={state.titulo}
          texto={state.texto}
          dispatch={dispatch}
        />
      </div>
    </>
  );
};

export default BtnAgregarNota;