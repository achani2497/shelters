'use client'
import { Flex, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { DescriptionCard } from '../../../../components/DescriptionCard/DescriptionCard';
import { useFetchShelters } from '../../../../hooks/shelter';
import style from './list.module.css';

export function ListOfShelters() {

    const [isLoaded, setIsLoaded] = useState(false)
    const { shelters, finishedFetching } = useFetchShelters()

    useEffect(() => {
        if (finishedFetching) {
            setIsLoaded(finishedFetching);
        }
    }, [finishedFetching])

    return (
        <ul className={style.cardsContainer}>
            {
                isLoaded ? (
                    shelters.slice(0, 5).map((shelter: any) => {
                        return (
                            <DescriptionCard
                                key={shelter.id}
                                photoUrl={`/images/shelters/${shelter.photo_url}`}
                                title={shelter.name}
                                description={shelter.description}
                                buttonText="Ir al perfil del refugio"
                                buttonUrl={`/shelters/${shelter.id}`}
                            />
                        )
                    })
                ) : (
                    <Flex flexDirection={'column'} gap={'2rem'}>
                        <Skeleton height={"350px"} fadeDuration={1} />
                        <Skeleton height={"350px"} fadeDuration={1} />
                        <Skeleton height={"350px"} fadeDuration={1} />
                    </Flex>
                )
            }
        </ul>
    )

}