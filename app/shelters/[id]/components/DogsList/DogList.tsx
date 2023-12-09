import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Dog, DogCard } from "../DogCard";
import style from './styles.module.css';

function daysInShelter(arriveDate: string) {
    const arrivalDate = new Date(arriveDate);
    const currentDate = new Date();

    const diffInMs = currentDate.getTime() - arrivalDate.getTime();

    const msInADay = 1000 * 60 * 60 * 24; // Milisegundos en un día
    const diffInDays = diffInMs / msInADay;

    const days = Math.floor(diffInDays);

    return days
}

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
                                <p>Lleva <b>{daysInShelter(dog.shelter_enter_date)} días</b> con nosotros</p>
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
                            <Button
                                px={4}
                                fontSize={'md'}
                                rounded={'full'}
                                color={'black'}
                                boxShadow={
                                    '0px 1px 25px -5px rgb(20 20 20 / 48%), 0 10px 10px -5px rgb(30 30 30 / 43%)'
                                }
                                _hover={{
                                    bg: 'black',
                                    color: 'white'
                                }}
                                _focus={{
                                    bg: 'black',
                                    color: 'white'
                                }}>
                                Lo quiero adoptar ❤️!
                            </Button>
                        </DogCard>
                    )
                })
            }
        </ul>
    )
}