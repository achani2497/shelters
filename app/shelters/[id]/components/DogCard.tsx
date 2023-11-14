import style from './DogCard.module.css'
import Image from 'next/image'

interface IDogCard {
    name: string
    location: string
}

async function photoUrlFetch() {
    const res = await fetch('https://dog.ceo/api/breeds/image/random').then(res => res.json())
    return res.message
}

export async function DogCard({ name, location }: IDogCard) {
    const age = Math.max(Math.round(Math.random() * 16), 1)
    const weight = Math.max(Math.round(Math.random() * 23), 2)
    const photoUrl = await photoUrlFetch()

    return (
        <div className={style.dogCard}>
            <div className={style.dogCardHeader}>
                <Image src={photoUrl} width={200} height={200} alt='foto de perrito'></Image>
            </div>
            <div className={style.dogCardBody}>
                <span>Nombre: {name}</span>
                <span>Edad: {age} </span>
                <span>Peso: {weight}</span>
                <span>Para adopcion en: {location}</span>
            </div>
            <button className={style.dogCardButton}>Lo quiero adoptar ❤️!</button>
        </div>
    )
}