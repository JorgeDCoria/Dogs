import React, { useEffect, useState } from "react";
import s from './Pagination.module.css';

/**
 * selectButtons funcion encargada de generar un control de botones con las
 * numeraciones correspondientes.
 * @param {Int} currentPage pagina actual activa
 * @param {Int} totalPage cantidad total de paginas
 * @param {Int} block cantidad de botones del control de paginacion
 * @returns {Array} array con los botones correspondientes 
 */
const selectButtons = (currentPage, totalPage, block) =>{
  console.log("entrando a component pagination");
  let blockPagination = [1];

  if (currentPage < block) {
    for (let i = 2; i < block; i++) blockPagination.push(i);
  } else if (currentPage >= (totalPage - (block - 2))) {
    for (let i = (totalPage - (block - 2)); i < totalPage; i++) blockPagination.push(i);
  } else {
    for (let i = currentPage - 2; blockPagination.length < block - 1; i++) blockPagination.push(i);
  }

  blockPagination.push(totalPage);

  return blockPagination;
}

export default function Pagination({ pagina, changePage, totalPaginas }) {

  const totalBlock = 7;
  const [buttons, setButtons] = useState([]);

  useEffect(()=>{
    setButtons(selectButtons(pagina, totalPaginas, totalBlock)) ;
  },[pagina])
  

  return (
    <div className={s.container}>
      <button onClick={()=>changePage(pagina-1)}>&lt;</button>
      {buttons.length && buttons.map((e, i) => <button className={pagina === e ? s.current:null} onClick={()=>changePage(e)} key={i}>{e}</button>)}
      <button onClick={()=>changePage(pagina+1)}>&gt;</button>
    </div>
  );
};

