import { useContext } from 'react';
import { NotasContext } from '../Context/NotasContext';
import CardNota from './Notas';
import Modal from './Modal';

const ListaNotas: React.FC = () => {
  const context = useContext(NotasContext);

  if (!context) {
    throw new Error("ListaNotas debe estar dentro de un NotasProvider");
  }

  const { notas, eliminarNota, editarNota, agregarNota, dispatchModal, modalState } = context;

  const handleEdit = (id: number, titulo: string, texto: string) => {
    dispatchModal({ type: 'OPEN_MODAL' });
    dispatchModal({ type: 'SET_TITLE', payload: titulo });
    dispatchModal({ type: 'SET_TEXT', payload: texto });
    dispatchModal({ type: 'SET_ID', payload: id });
  };

  return (
    <div>
      <div className="gridNotas">
        {notas.map((nota) => (
          <CardNota
            key={nota.id}
            id={nota.id}
            titulo={nota.titulo}
            texto={nota.texto}
            onDelete={(id: number) => eliminarNota(id)}
            onEdit={(id: number, titulo: string, texto: string) => handleEdit(id, titulo, texto)}
          />
        ))}
      </div>

      <Modal
        isOpen={modalState.isModalOpen}
        onClose={() => dispatchModal({ type: 'CLOSE_MODAL' })}
        onSave={(titulo, texto) => {
          if (modalState.id !== null) {
            editarNota(modalState.id, titulo, texto);
          } else {
            agregarNota(titulo, texto);
          }
        }}
        titulo={modalState.titulo}
        texto={modalState.texto}
        dispatch={dispatchModal}
      />
    </div>
  );
};

export default ListaNotas;