//Importaciones para react y componentes
import { useContext, useReducer, useState } from 'react';
import { NotasContext } from '../Context/NotasContext';
import Modal from './Modal'
import ModalConfirm from './ModalConfirmacion';
import { modalReducer } from '../Reducer/ModalReducer';

//Estado inicial
const initialState = {
  isModalOpen: false, //No se ve el modal
  isConfirmModalOpen: false, // La confirmacion es falsa
  titulo: '', // titulo, texto e id de la nota
  texto: '',
  id: null,
};

// Componente BtnAgregarNota
const BtnAgregarNota: React.FC = () => {
  // Se llama al contexto para accededer a la función agregarNota
  const context = useContext(NotasContext);
  // Error por si el contexto no se encuentra
  if (!context) {
    throw new Error("BtnAgregarNota debe estar dentro de un NotasProvider");
  }

  //Se llama a agregar nota del context
  const { agregarNota } = context;
  // Reducer para modales
  const [state, dispatch] = useReducer(modalReducer, initialState);

  //Verificacion de  si se esta guardando la nota
  const [isSaving, setIsSaving] = useState(false);

  //Funcion que abre el modal
  const handleOpenModal = () => {
    dispatch({ type: 'OPEN_MODAL' });
  };

  //Funcion que cierra el modal y reinicia el formulario para limpiar
  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
    dispatch({ type: 'RESET_FORM' });
  };

  //Funcion para abrir la nota y el modal de confirmación
  const handleSaveNota = () => {
    setIsSaving(true);
    dispatch({ type: 'OPEN_CONFIRM_MODAL' });
  };

  // Funcion  para confirmar el guardado de la nota
  const confirmSaveNota = () => {
    agregarNota(state.titulo, state.texto);
    dispatch({ type: 'CLOSE_CONFIRM_MODAL' });
    handleCloseModal();
  };

  //Funcion para cancelar con el modal confirm
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
        { /* Modal pa agregar notas */ }
        <Modal
          isOpen={state.isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveNota}
          titulo={state.titulo}
          texto={state.texto}
          dispatch={dispatch}
        />
        { /* Modal de confirmacion */ }
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