//Define el estado
export type State = {
  isModalOpen: boolean; // dice si el modal esta abierto
  isConfirmModalOpen: boolean; // dice si el modal de confirmacion esta abierto
  titulo: string; 
  texto: string;
  id: number | null;
};

// Define los tipos de accion que pueden afectar el estado del modal
export type Action =
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'OPEN_CONFIRM_MODAL' }
  | { type: 'CLOSE_CONFIRM_MODAL' }
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_TEXT'; payload: string }
  | { type: 'SET_ID'; payload: number }
  | { type: 'RESET_FORM' };

// Define el reductor para manejar el estado del modal
export const modalReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, isModalOpen: true };
    case 'CLOSE_MODAL':
      return { ...state, isModalOpen: false };
    case 'OPEN_CONFIRM_MODAL':
      return { ...state, isConfirmModalOpen: true };
    case 'CLOSE_CONFIRM_MODAL':
      return { ...state, isConfirmModalOpen: false };
    case 'SET_TITLE':
      return { ...state, titulo: action.payload };
    case 'SET_TEXT':
      return { ...state, texto: action.payload };
    case 'SET_ID':
      return { ...state, id: action.payload };
    case 'RESET_FORM':
      return { ...state, titulo: '', texto: '', id: null };
    default:
      return state;
  }
};