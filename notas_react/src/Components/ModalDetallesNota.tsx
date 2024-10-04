import { ModalProps } from "../Props/ModalProps";

//extension de los props del modal
interface ModalDetallesNotaProps extends ModalProps {
  backgroundColor: string;
}

//Componente Modal pa mostrar las notas, y pa que se vean de su color, pa eso es el background colo
const ModalDetallesNota: React.FC<ModalDetallesNotaProps> = ({ isOpen, onClose, titulo, texto, backgroundColor }) => {

  //Si no esta abierto no hacee na
  if (!isOpen) {
    return null;
  }

  //El modal pues x4
  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ backgroundColor }} onClick={(e) => e.stopPropagation()}> {/*Fondo dinamico pa que sean del mismo color la nota y el modal*/}
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