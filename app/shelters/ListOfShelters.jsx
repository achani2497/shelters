import style from './styles.module.css'
import { DescriptionCard } from '../components/DescriptionCard/DescriptionCard';
import { supabase } from '@/lib/initSupabase';

const fetchShelters = async () => {
    const { data, error } = await supabase.from("shelter").select();
    if (data) {
        return data
    } else {
        console.log(error)
        return []
    }
}

export async function ListOfShelters() {
    const shelters = await fetchShelters();
    return (
        <ul className={style.cardsContainer}>
            {shelters.slice(0, 5).map(shelter => {
                return (
                    <li>
                        <DescriptionCard
                            photoUrl='https://picsum.photos/200/200'
                            title={shelter.name}
                            description={shelter.description}
                            buttonText="Ir al perfil del refugio"
                            buttonUrl={`shelters/${shelter.id}`}
                        />
                    </li>
                )
            })}
        </ul>
    )

}