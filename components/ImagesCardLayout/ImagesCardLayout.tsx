import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SheltieButton } from "../Button/Button";
import styles from './imageCardLayout.module.css';

export function ImagesCardLayout({ images, shelterId, shelterName }: { images: string[], shelterId: number, shelterName: string }) {
    const { push } = useRouter()
    function goToShelter() {
        push(`/shelters/${shelterId}`)
    }

    return (
        <Flex flexDirection={'column'} boxShadow={{ base: 'xl', md: 'xl', lg: '2xl' }} gap='1rem' padding={'1.5rem'} borderRadius="xl">
            <Flex width={{ base: '320px', md: '45vw', lg: '34.5vw', xl: '35vw' }} minW={{ lg: '430px', xl: '450px' }} maxW={'660px'} height={'350px'} gap={'1rem'} flexDirection={{ base: 'column', lg: 'row' }} >
                <Flex
                    flex={2}
                    flexShrink={'shrink'}
                    borderRadius="xl"
                    overflow="hidden"
                    position={'relative'}
                >
                    <Image className={styles.secondary} src={`/images/${images[0]}`} alt={'dog image'} fill />
                </Flex>
                <Flex flexDirection={{ base: 'row', lg: 'column' }} gap={'1rem'} flex={1}>
                    <Box
                        borderRadius="xl"
                        overflow="hidden"
                        position={'relative'}
                        width={'100%'}
                        height={'100%'}
                    >
                        <Image src={`/images/${images[1]}`} alt={'dog image'} className={styles.secondary} fill />
                    </Box>
                    <Box
                        borderRadius="xl"
                        overflow="hidden"
                        position={'relative'}
                        width={'100%'}
                        height={'100%'}
                    >
                        <Image src={`/images/${images[2]}`} alt={'dog image'} className={styles.secondary} fill />
                    </Box>

                </Flex>
            </Flex>
            <SheltieButton label={`Visitar el refugio "${shelterName}"`} action={goToShelter} />
        </Flex>
    )
}