import { DogCard } from "./components/DogCard"
import style from './styles.module.css'
import { PageTitle } from "@/app/components/PageTitle/PageTitle"

async function pichichosFetch() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/')
    return res.json()
}

export default async function Page({ params }) {

    const pichichos = await pichichosFetch()

    return (
        <div className="flex flex-col gap-4">
            <PageTitle title="Estos son nuestros amiguitos" />
            <ul className={style.dogsCardContainer}>
                {
                    pichichos.map(pichicho => {
                        return (
                            <DogCard
                                name={pichicho.name}
                                location={pichicho.address.city}
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
}