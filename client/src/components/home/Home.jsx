import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from '../../redux/action';
import Loading from "../loading/Loading";
import SideBar from "../sidebar/SideBar";
import s from './home.module.css';
import Card from '../card/Card';
import Pagination from "../pagination/Pagination";



export default function Home() {
  //pagina iniciada en uno
  const [pagina, setPagina] = useState(1);
  const dogs = useSelector((state) => state.dogs);
  //const error = useSelector((state)=> state.error)
  const dispatch = useDispatch();
  //cantidad de elementos por page
  const porPagina = 8;
  //cantidad total de paginas
  const totalPaginas = Math.ceil(dogs.length / porPagina);
 

  useEffect(() => {
    dispatch(getDogs());
  },[dispatch]);

  const changePage = (n)=>{
    setPagina(n);
  }

  if(dogs.length){
    return(
      <div className={s.container}>
        <SideBar></SideBar>
        <div className={s.container_cards}>
          { dogs.slice((pagina -1) * porPagina, (pagina -1)* porPagina +porPagina )
            .map(dog => <Card key={dog.id} image={dog.image} name={dog.name} />)}

        {dogs.length && <Pagination pagina={pagina} changePage={changePage} totalPaginas  = {totalPaginas}></Pagination>}
        </div>
        
      </div>
    );
  }else{
    return(
      <>
      <Loading></Loading>
      </>
      
    );
  }
}