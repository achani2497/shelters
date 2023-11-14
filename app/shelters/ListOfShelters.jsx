import style from './styles.module.css'
import { DescriptionCard } from '../components/DescriptionCard/DescriptionCard';

const fetchShelters = () => {
    return fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
}

export async function ListOfShelters() {
    const shelters = await fetchShelters();
    // const usuarios = [
    //     {
    //         id: 1,
    //         name: "Alejandro",
    //         age: 25
    //     },
    //     {
    //         id: 2,
    //         name: "Luna",
    //         age: 61
    //     },
    //     {
    //         id: 3,
    //         name: "Daisy",
    //         age: 75
    //     },
    //     ...users
    // ]
    return (
        <ul className={style.cardsContainer}>
            {shelters.slice(0, 5).map(shelter => {
                return (
                    <li>
                        <DescriptionCard
                            photoUrl='https://picsum.photos/200/200'
                            title={shelter.title}
                            description={shelter.body}
                            buttonText="Ir al perfil del refugio"
                            buttonUrl={`shelters/${shelter.id}`}
                        />
                    </li>
                )
            })}
        </ul>
    )

}