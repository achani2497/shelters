import { supabase } from "@/lib/initSupabase"
import { DogCard } from "./components/DogCard"
import { PersonalCard } from "./components/PersonalCard"
import style from './styles.module.css'
import { PageTitle } from "@/app/components/PageTitle/PageTitle"


function fetch(table, shelterId) {
    return supabase.from(table).select().eq('shelter_id', shelterId)
}

async function pichichosFetch(shelterId) {
    const { data, error } = await fetch('dog', shelterId);
    if (data) {
        return data
    } else {
        console.log(error)
        return []
    }
}

async function personalFetch(shelterId) {
    const { data, error } = await fetch('staff', shelterId);
    if (data) {
        return data
    } else {
        console.log(error)
        return []
    }

}

export default async function Page({ params }) {

    const pichichos = await pichichosFetch(params['id'])
    const personal = await personalFetch(params['id'])

    return (
        <div className={style.shelterContainer}>
            <div className={style.dogsContainer}>
                <PageTitle title="Estos son nuestros amiguitos" />
                <ul className={style.cardContainer}>
                    {
                        pichichos.map(pichicho => {
                            return (
                                <DogCard
                                    dog={pichicho}
                                />
                            )
                        })
                    }
                </ul>
            </div>
            <div className={style.personalContainer}>
                <PageTitle title="Nuestro personal" />
                <ul className={style.cardContainer}>
                    {
                        personal.map(person => {
                            return (
                                <PersonalCard
                                    person={person}
                                />
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}