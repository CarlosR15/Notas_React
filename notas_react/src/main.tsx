import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import NavBar from './Components/Navbar';
import BtnAgregarNota from './Components/BotonAgregarNotas';
import ListaNotas from './Components/ListaDeNotas';
import { NotasProvider } from './Context/NotasContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotasProvider>
      <NavBar />
      <BtnAgregarNota />
      <ListaNotas />
    </NotasProvider>
  </StrictMode>
);