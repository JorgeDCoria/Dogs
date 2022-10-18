import React from "react";

export default function Card({image, name}){
    return(
        <div>
            <img src={image} alt="imagen" />
        </div>
    );
}