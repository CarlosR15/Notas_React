import React from 'react';

interface ModalConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;
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