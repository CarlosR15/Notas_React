import { ModalProps } from "../Props/ModalProps";

const ModalDetallesNota: React.FC<ModalProps> = ({ isOpen, onClose, titulo, texto }) => {

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{titulo}</h2>
        <p>{texto}</p>
        <div>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetallesNota;