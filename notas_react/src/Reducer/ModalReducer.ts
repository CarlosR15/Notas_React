export type State = {
  isModalOpen: boolean;
  titulo: string;
  texto: string;
  id: number | null;
};

export type Action =
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_TEXT'; payload: string }
  | { type: 'SET_ID'; payload: number }
  | { type: 'RESET_FORM' };

  export const modalReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'OPEN_MODAL':
        return { ...state, isModalOpen: true };
      case 'CLOSE_MODAL':
        return { ...state, isModalOpen: false };
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