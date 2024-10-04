//Props del modal
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (titulo: string, texto: string) => void;
  titulo: string;
  texto: string;
  dispatch: React.Dispatch<any>;
  children?: React.ReactNode;
}