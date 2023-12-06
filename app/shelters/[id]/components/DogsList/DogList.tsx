import { DogCard } from "../DogCard"
import { IDog } from "../DogCard"
import style from './styles.module.css'

export function DogsList({pichichos}:{pichichos: IDog[]}){
    return (
        <ul className={style.cardContainer}>
        {
            pichichos?.map(pichicho => {
                return (
                    <DogCard
                        dog={pichicho}
                    />
                )
            })
        }
        </ul>
    )
}