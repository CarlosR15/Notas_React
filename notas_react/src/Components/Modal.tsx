import { useEffect } from 'react';
import { ModalProps } from "../Props/ModalProps";

//Componente modal que recibe los modal props
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, dispatch, titulo, texto }) => {

  useEffect(() => {
    if (!isOpen) {
      dispatch({ type: 'RESET_FORM' }); //Si el modal no esta abierto, se resetea el formulario
    }
  }, [isOpen, dispatch]); //Se ejecuta cuando cambia el isOpen o dispatch

  //Manejador del guardado de la nota
  const handleSave = () => {
    if (titulo && texto) {
      onSave(titulo, texto);
    }
  };

  //Si el modal no esta abierto no hace na
  if (!isOpen) {
    return null;
  }

  //El modal pues
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{titulo ? "Editar Nota" : "Agregar nueva nota"}</h2>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => dispatch({ type: 'SET_TITLE', payload: e.target.value })}
        />
        <textarea
          placeholder="Texto"
          value={texto}
          onChange={(e) => dispatch({ type: 'SET_TEXT', payload: e.target.value })}
        />
        <div>
          <button onClick={handleSave}>Guardar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;