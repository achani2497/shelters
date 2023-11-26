import style from './DogCard.module.css'
import Image from 'next/image'

interface IDogCard {
    name: string
    weight: number
    age: number
    photo_url: string
}

export async function DogCard({ dog }: { dog: IDogCard }) {

    return (
        <div className={style.dogCard}>
            <div className={style.dogCardHeader}>
                <Image src={dog.photo_url} width={200} height={200} alt='foto de perrito'></Image>
            </div>
            <div className={style.dogCardBody}>
                <span>Nombre: {dog.name}</span>
                <span>Edad: {dog.age} </span>
                <span>Peso: {dog.weight}</span>
            </div>
            <button className={style.dogCardButton}>Lo quiero adoptar ❤️!</button>
        </div>
    )
}