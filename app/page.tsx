'use client'
import { Flex, Skeleton, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SheltieButton } from './components/Button/Button'
import { Carousel } from './components/Carousel/Carousel'
import { ImagesCardLayout } from './components/ImagesCardLayout/ImagesCardLayout'
import { VolunteerForm } from './components/VolunteerForm/VolunteerForm'
import { useFetchAdoptedDogs, useFetchShelters } from './hooks/shelter'

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false)
    const { shelters, finishedFetching } = useFetchShelters(['dog'])
    const { adoptedDogs, adoptedFinishedFetching } = useFetchAdoptedDogs()
    const { push } = useRouter()

    useEffect(() => {
        if (finishedFetching && adoptedFinishedFetching) {
            setIsLoaded(true)
        }
    }, [finishedFetching, adoptedFinishedFetching])
    return (
        <main>
            <Flex flexDirection={'column'} gap={'8rem'}>
                {/* Primera parte de la home page */}
                <Flex gap={'1rem'} flexDirection={'column'}>
                    <Text fontSize={'3xl'} fontWeight={'bold'}>Explora nuestros refugios</Text>
                    {isLoaded ? (
                        <Flex flexDirection={'column'} gap={'1rem'}>
                            <Flex gap={'1rem'} justifyContent={'space-around'} w={'100%'} wrap={'wrap'}>
                                {
                                    shelters.slice(0, 2).map((shelter: any) => {
                                        return (
                                            <ImagesCardLayout key={shelter.id} images={shelter.dog.map((sub: any) => sub.photo_url).slice(0, 3)} shelterId={shelter.id} shelterName={shelter.name} />
                                        )
                                    })
                                }
                            </Flex>
                            <SheltieButton label={'Ver más refugios'} outline={true} action={() => push('/shelters/')} />
                        </Flex>
                    ) : (<Skeleton height={'400px'} />)}
                </Flex>
                <Flex gap={'1rem'} flexDirection={'column'}>
                    <Text fontSize={'3xl'} fontWeight={'bold'}>Estos son algunos de nuestros amiguitos adoptados</Text>
                    {isLoaded ? <Carousel dogs={adoptedDogs} /> : <Skeleton height={'400px'} />}
                </Flex>
                <Flex alignItems={'center'} flexDirection={'column'} gap={'1rem'}>
                    <Text fontSize={'3xl'} fontWeight={'bold'}>Sumate como voluntario!</Text>
                    <VolunteerForm shelters={shelters} />
                </Flex>
            </Flex>
        </main>
    )
}
