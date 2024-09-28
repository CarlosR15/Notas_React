import { ReactNode } from "react";

const ListaNotas: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="gridNotas">{children}</div>
};

export default ListaNotas