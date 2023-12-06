'use client'
import Image from 'next/image'
import {
    Box,
    Center,
    Heading,
    Text,
    Button,
    Flex,
} from '@chakra-ui/react'
import { useState } from 'react'

export interface IDog {
    name: string
    weight: number
    age: number
    photo_url: string
    description: string
    shelter_enter_date: string
}

function daysInShelter(arriveDate: string){
    const arrivalDate = new Date(arriveDate);
    const currentDate = new Date();

    const diffInMs = currentDate.getTime() - arrivalDate.getTime();

    const msInADay = 1000 * 60 * 60 * 24; // Milisegundos en un día
    const diffInDays = diffInMs / msInADay;

    const days = Math.floor(diffInDays);

    return days
}

export function DogCard({ dog }: { dog: IDog }) {

    const [showFullDescription, setShowFullDescription] = useState(false)
    const words = dog.description.split(' ');
    const lengthBreakpoint = 40
    const displayText = showFullDescription ? dog.description : words.slice(0, lengthBreakpoint).join(' ') + '...';

    return (
        <Center>
            <Box
                w={'inherit'}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}>
                <Box h={'210px'} bg={'gray.100'} pos={'relative'} rounded={'md'} mb={4} overflow={'hidden'}>
                    <Image
                        src={dog.photo_url}
                        fill
                        alt={dog.name + ' photo'}
                    />
                </Box>
                <Flex flexDirection={'column'} gap={4}>
                    <Heading
                        fontSize={'3xl'}
                        fontFamily={'body'}>
                        {dog.name}
                    </Heading>
                    <Box>
                        <p><b>Peso:</b> {dog.weight} kg</p>
                        <p><b>Edad:</b> {dog.age} años</p>
                        <p>Lleva <b>{daysInShelter(dog.shelter_enter_date)} días</b> con nosotros</p>
                    </Box>
                    <Text color={'gray.700'} fontSize={'xl'}>
                        {displayText + ' '}
                        {
                            dog.description.length > lengthBreakpoint ? 
                            (<Button colorScheme='teal' variant={'link'} onClick={() => setShowFullDescription(!showFullDescription)}>
                                {showFullDescription?'Leer menos':'Leer más'}
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
                </Flex>
            </Box>
        </Center>
    )
}