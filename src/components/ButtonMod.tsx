import React from "react";

interface Props {

children: string;
onClick: () => void;
style: string;

}

function ButtonMod ({children, onClick, style} : Props ) {
    return (
    <button className = {style} onClick={onClick}>{children}</button>
    )   
} 

export default ButtonMod;