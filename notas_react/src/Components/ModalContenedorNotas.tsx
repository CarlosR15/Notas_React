import { NotasProps } from '../Props/NotasProps';
import CardNota from './Notas';

//Definicion de props pal modal que muestra las notas dentro del contenedor
interface ModalContenedorNotasProps {
  isOpen: boolean;
  onClose: () => void;
  notas: NotasProps[];
  onDelete: (id: number) => void;
  onEdit: (id: number, titulo: string, texto: string) => void;
}

//componente modal que muestra notas dentro del contenedor
const ModalContenedorNotas: React.FC<ModalContenedorNotasProps> = ({ isOpen, onClose, onDelete, onEdit, notas }) => {
  // si no esta abierto no hace na
  if (!isOpen) return null;

  //el modal pues
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Notas dentro del contenedor</h2>
        {notas.map((nota: NotasProps) => (
          <CardNota
            key={nota.id}
            id={nota.id}
            titulo={nota.titulo}
            texto={nota.texto}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ModalContenedorNotas;