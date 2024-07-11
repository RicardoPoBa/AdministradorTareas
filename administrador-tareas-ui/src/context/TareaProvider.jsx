import React, { createContext, useState } from 'react';

export const TareaContext = createContext();

export const TareaProvider = ({ children }) => {

  const [tareaState, setTareaState] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
    fechaInicial: "",
    fechaFinal: "",
    colaborador: "",
    prioridad: "",
    estado: "" 
});
  const [actualizarState, setActualizarState] = useState(false);
  const [filtro, setFiltro] = useState(false);
  const [filtrarPor, setFiltrarPor] = useState({});
  
  const [URL, setURL] = useState('https://localhost:7144');




  return (
    <TareaContext.Provider value={{ tareaState, setTareaState, actualizarState, setActualizarState, filtro, setFiltro,filtrarPor, setFiltrarPor,URL }}>
      {children}
    </TareaContext.Provider>
  );
};
