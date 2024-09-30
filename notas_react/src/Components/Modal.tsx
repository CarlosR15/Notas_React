import { useEffect } from 'react';
import { ModalProps } from "../Props/ModalProps";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, dispatch, titulo, texto }) => {

  useEffect(() => {
    if (!isOpen) {
      dispatch({ type: 'RESET_FORM' });
    }
  }, [isOpen, dispatch]);

  const handleSave = () => {
    if (titulo && texto) {
      onSave(titulo, texto);
    }
  };

  if (!isOpen) {
    return null;
  }

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