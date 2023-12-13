import { Box, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import styles from './Carousel.module.css'

export function Carousel({ dogs }: any) {
    return (
        <Box className={styles.slider} pb={'4rem'} bgColor={'white'} mx={'auto'} overflow={'hidden'} position={'relative'} width={'100%'}>
            <Flex className={styles.slideTrack} gap={'10rem'} height={300}>
                {
                    dogs.map((adoptedDog: any, index: number) => {
                        return (
                            <Box key={index} boxShadow={'2xl'} borderRadius={'xl'} position={'relative'} overflow={'hidden'}>
                                <Image src={`/images/${adoptedDog.dog.photo_url}`} width={500} height={300} className={styles.slide} alt='adopted dog' priority />
                                {`${adoptedDog.dog.name} fue adopado por ${adoptedDog.persona_name}`}
                            </Box>)
                    })
                }{
                    dogs.map((adoptedDog: any, index: number) => {
                        return (
                            <Box key={index} boxShadow={'2xl'} borderRadius={'xl'} position={'relative'} overflow={'hidden'}>
                                <Image src={`/images/${adoptedDog.dog.photo_url}`} width={500} height={300} className={styles.slide} alt='adopted dog' priority />
                                {`${adoptedDog.dog.name} fue adopado por ${adoptedDog.persona_name}`}
                            </Box>)
                    })
                }
            </Flex>
        </Box>
    )
}