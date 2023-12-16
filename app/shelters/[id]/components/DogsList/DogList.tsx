import { SheltieButton } from "@/components/Button/Button";
import { daysPassed } from "@/utils/Functions";
import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Dog, DogCard } from "../DogCard/DogCard";
import style from './styles.module.css';

function displayText(description: string, showFullDescription: boolean, lengthBreakpoint: number) {
    const words = description.split(' ');
    return showFullDescription ? description : words.slice(0, lengthBreakpoint).join(' ') + '...';

}

export function DogsList({ pichichos }: { pichichos: Dog[] }) {
    const [showFullDescription, setShowFullDescription] = useState(false)
    const lengthBreakpoint = 40

    return (
        <ul className={style.cardContainer}>
            {
                pichichos?.map((dog, index) => {
                    return (
                        <DogCard
                            key={index}
                            dog={dog}
                        >
                            <Box>
                                <p><b>Peso:</b> {dog.weight} kg</p>
                                <p><b>Edad:</b> {dog.age} años</p>
                                <p>Lleva <b>{daysPassed(dog.shelter_enter_date)} días</b> con nosotros</p>
                            </Box>
                            <Text color={'gray.700'} fontSize={'xl'}>
                                {displayText(dog.description, showFullDescription, lengthBreakpoint) + ' '}
                                {
                                    dog.description.length > lengthBreakpoint ?
                                        (<Button colorScheme='teal' variant={'link'} onClick={() => setShowFullDescription(!showFullDescription)}>
                                            {showFullDescription ? 'Leer menos' : 'Leer más'}
                                        </Button>) : null
                                }
                            </Text>
                            <SheltieButton label={'Lo quiero adoptar ❤️!'} />
                        </DogCard>
                    )
                })
            }
        </ul>
    )
}