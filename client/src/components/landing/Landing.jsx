import React from 'react';
import { Link } from 'react-router-dom';
import s from './Landing.module.css';


export default function Landing(){
    return(
      <div className={s.container}>
        
          <h1 className={s.title}>Dogs</h1>
          <p className={s.paragraph}>Si eres amante de los perros, no te puedes perder las características, curiosidades y cuidados de todas las razas de perros. Desde perros pequeños hasta perros medianos o perros grandes. 

                Descubre cuál es la raza de perro más inteligente, la historia de cada tipo de perro, las curiosidades y necesidades... todo lo que debes saber para entender mejor a tu perro y darle lo que necesita.</p>
          <h3 className={s.subtitle}>¡No pierdas detalle y enamorate de cada uno de los perros!</h3>
          <Link to='/home'><button className={s.btn}>Comenzar</button> </Link>
          
        
      
      </div>
    );
}