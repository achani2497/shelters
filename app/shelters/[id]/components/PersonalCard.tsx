import style from './DogCard.module.css'
import Image from 'next/image'

interface IPersonalCard {
    name: string
    mail: string
    phone: string
    photo_url: string
}

export async function PersonalCard({ person }: { person: IPersonalCard }) {

    return (
        // TODO: Usar chakraUi para crear esta card
        <div className={style.dogCard}>
            <div className={style.dogCardHeader}>
                <Image src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' width={200} height={200} alt='foto de persona'></Image>
            </div>
            <div className={style.dogCardBody}>
                <span>Nombre: {person.name}</span>
                <span>Mail: {person.mail} </span>
                <span>Teléfono: {person.phone}</span>
            </div>
        </div>
    )
}