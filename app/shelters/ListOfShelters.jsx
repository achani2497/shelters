'use client'
import style from './styles.module.css'
import { DescriptionCard } from '../components/DescriptionCard/DescriptionCard';
import { useEffect, useState } from 'react';
import { Skeleton } from "@chakra-ui/react";
import { useFetchShelters } from '../hooks/shelter';

export function ListOfShelters() {

    const [isLoaded, setIsLoaded] = useState(false)
    const [shelters, finishedFetching] = useFetchShelters()

    useEffect(() => {
        if (shelters) {
            setIsLoaded(finishedFetching);
        }
    }, [shelters])

    return (
        <ul className={style.cardsContainer}>
            <Skeleton height={"auto"} isLoaded={isLoaded} fadeDuration={1}>
                {shelters.slice(0, 5).map(shelter => {
                    return (
                        <li key={shelter.id}>
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
            </Skeleton>
        </ul>
    )

}