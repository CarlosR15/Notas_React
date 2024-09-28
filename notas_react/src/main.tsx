import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css';
import CardNota from './Components/Notas'
import NavBar from './Components/Navbar';
import BtnAgregarNota from './Components/BotonAgregarNotas';
import ListaNotas from './Components/ListaDeNotas';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NavBar />
    <BtnAgregarNota />
    <ListaNotas>
      <CardNota id={0} titulo={'Sis'} texto={'Ayuda'} />
      <CardNota id={1} titulo={'Sus'} texto={'Salvenme'} />
      <CardNota id={2} titulo={'Dios'} texto={'Ayuda'} />
      <CardNota id={3} titulo={'Dios'} texto={'Ayuda'} />
      <CardNota id={4} titulo={'Dios'} texto={'Ayuda'} />
    </ListaNotas>
  </StrictMode>,
);