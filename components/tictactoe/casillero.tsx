'use client'

import style from './styles.module.css'

export default function Casillero(props: { posicionY: number, posicionX: number, bordes: string[] }) {
    const bordes = props.bordes.map(lado => style[lado]).join(" ")
    function alertClick() {
        alert(`Hiciste click en ${props.posicionX} y ${props.posicionY}`)
    }
    return (
        <div className={`${bordes}` + " " + style.casillero} onClick={alertClick}></div>
    )
}