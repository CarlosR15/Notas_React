import React from 'react';

//Props pal modal de confirmacion
interface ModalConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

//componente modalconfirm que sirve pa confirmar jujiaasdifjas
const ModalConfirm: React.FC<ModalConfirmProps> = ({ isOpen, onClose, onConfirm, message }) => {
  // Si el modal no esta abierto no hace na
  if (!isOpen) return null;

  //El modal pues
  return (
    <div className="modal-confirm-overlay">
      <div className="modal-confirm">
        <p>{message}</p>
        <div className="modal-confirm-actions">
          <button onClick={onConfirm}>Confirmar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;