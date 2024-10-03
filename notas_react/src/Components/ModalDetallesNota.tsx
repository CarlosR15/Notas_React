import { ModalProps } from "../Props/ModalProps";

interface ModalDetallesNotaProps extends ModalProps {
  backgroundColor: string;
}

const ModalDetallesNota: React.FC<ModalDetallesNotaProps> = ({ isOpen, onClose, titulo, texto, backgroundColor }) => {

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ backgroundColor }} onClick={(e) => e.stopPropagation()}>
        <h2>{titulo}</h2>
        <div className="divModalNotas">
          <p>{texto}</p>
        </div>
        <div>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetallesNota;