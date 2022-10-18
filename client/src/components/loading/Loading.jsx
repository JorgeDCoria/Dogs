import React from "react";
import s from './Loading.module.css';
import gift from '../../assets/image/loading.gif';

export default function Loading(){
    return(
        <div className={s.container}>
          <img src={gift} alt="cargando" />
        </div>
    );
}
