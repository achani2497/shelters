'use client'
import { Flex, Skeleton, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { SheltieButton } from './components/Button/Button'
import { Carousel } from './components/Carousel/Carousel'
import { ImagesCardLayout } from './components/ImagesCardLayout/ImagesCardLayout'
import { useFetchAdoptedDogs, useFetchShelters } from './hooks/shelter'

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false)
    const { shelters, finishedFetching } = useFetchShelters(['dog'])
    const { adoptedDogs, adoptedFinishedFetching } = useFetchAdoptedDogs()

    useEffect(() => {
        if (finishedFetching && adoptedFinishedFetching) {
            setIsLoaded(true)
        }
    }, [finishedFetching, adoptedFinishedFetching])
    return (
        <main>
            <Flex flexDirection={'column'} gap={'4rem'}>
                {/* Primera parte de la home page */}
                <Flex gap={'1rem'} flexDirection={'column'}>
                    <Text fontSize={'3xl'} fontWeight={'bold'}>Explora nuestros refugios</Text>
                    {isLoaded ? (
                        <Flex gap={'1rem'} justifyContent={'space-around'} w={'100%'} wrap={'wrap'}>
                            {
                                shelters.slice(0, 2).map((shelter: any) => {
                                    return (
                                        <ImagesCardLayout key={shelter.id} images={shelter.dog.map((sub: any) => sub.photo_url).slice(0, 3)} shelterId={shelter.id} shelterName={shelter.name} />
                                    )
                                })
                            }
                            <SheltieButton label={'Ver más refugios'} action={() => { }} />
                        </Flex>
                    ) : (<Skeleton height={'400px'} />)}
                </Flex>
                <Flex gap={'1rem'} flexDirection={'column'}>
                    <Text fontSize={'3xl'} fontWeight={'bold'}>Estos son algunos de nuestros amiguitos adoptados</Text>
                    {isLoaded ? <Carousel dogs={adoptedDogs} /> : <Skeleton height={'400px'} />}
                </Flex>
                {/* Casos de exitos mostrados en forma de card, cada card tiene que tener una foto, el nombre de la persona que adoptó y el nombre del perro adoptado y un pequeño testimonio, tiene que ser en forma de carousel */}
                {/* Formulario para anotarse como voluntario en algun refugio, datos: nombre completo, telefono, mail, edad. Tiene que haber un Select donde me muestren todos los refugios disponibles. */}

            </Flex>
        </main>
    )
}
