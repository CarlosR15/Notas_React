import { useContext, useReducer, useState } from 'react';
import { NotasContext } from '../Context/NotasContext';
import Modal from './Modal'
import ModalConfirm from './ModalConfirmacion';
import { modalReducer } from '../Reducer/ModalReducer';

const initialState = {
  isModalOpen: false,
  isConfirmModalOpen: false,
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

  const [isSaving, setIsSaving] = useState(false);

  const handleOpenModal = () => {
    dispatch({ type: 'OPEN_MODAL' });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
    dispatch({ type: 'RESET_FORM' });
  };

  const handleSaveNota = () => {
    setIsSaving(true);
    dispatch({ type: 'OPEN_CONFIRM_MODAL' });
  };

  const confirmSaveNota = () => {
    agregarNota(state.titulo, state.texto);
    dispatch({ type: 'CLOSE_CONFIRM_MODAL' });
    handleCloseModal();
  };

  const cancelSaveNota = () => {
    dispatch({ type: 'CLOSE_CONFIRM_MODAL' });
    setIsSaving(false);
  };

  return (
    <>
      <div className='BtnAgregarNotas'>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <div className='btnAddNotes'>
          <span id="addNotes" className="material-symbols-outlined" onClick={handleOpenModal} style={{ cursor: "pointer" }}>
            add_notes
          </span>
        </div>
        <Modal
          isOpen={state.isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveNota}
          titulo={state.titulo}
          texto={state.texto}
          dispatch={dispatch}
        />
        <ModalConfirm
          isOpen={state.isConfirmModalOpen}
          onClose={cancelSaveNota}
          onConfirm={confirmSaveNota}
          message="¿Estás seguro de que deseas guardar esta nota?"
        />
      </div>
    </>
  );
};

export default BtnAgregarNota;