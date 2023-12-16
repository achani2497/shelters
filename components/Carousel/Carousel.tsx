import { Box, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import styles from './Carousel.module.css'

const adoptionQuotes = {
    1: "Estoy emocionado por los días llenos de aventuras que nos esperan juntos!",
    2: "¡Su llegada ha transformado nuestra casa en un hogar! Estoy muy contenta de haberlo adoptado.",
    3: "Esta niña llenó mi corazón de felicidad. ¡No podría estar más contenta!",
    4: "Su amor incondicional es increíble. Me siento muy afortunada de tenerlo conmigo.",
    5: "Nos elegimos mutuamente y ya somos inseparables. ¡Es una dicha tenerla en casa!"
}

export function Carousel({ dogs }: any) {
    return (
        <Box className={styles.slider} pb={'4rem'} bgColor={'white'} mx={'auto'} overflow={'hidden'} position={'relative'} width={'100%'}>
            <Flex className={styles.slideTrack} gap={'10rem'} height={'fit-content'}>
                {
                    dogs.map((adoptedDog: any, index: number) => {
                        return (
                            <Flex flexDirection={'column'} key={index} boxShadow={'2xl'} borderRadius={'xl'} position={'relative'} overflow={'hidden'} minHeight={400} w={600}>
                                <Image src={`/images/${adoptedDog.dog.photo_url}`} width={500} height={300} className={styles.slide} alt='adopted dog' priority />
                                <Box padding={'1rem'}>
                                    <Text> {`${adoptedDog.person_name} - `}
                                        <Text className={styles.slideText} as='em' fontSize={'md'} fontWeight={'bold'} align={'justify'} py={'1rem'} bottom={0} width={'100%'}>
                                            {`"${adoptionQuotes[adoptedDog.id]}"`}
                                        </Text>
                                    </Text>
                                </Box>
                            </Flex>)
                    })
                }{
                    dogs.map((adoptedDog: any, index: number) => {
                        return (
                            <Flex flexDirection={'column'} key={index} boxShadow={'2xl'} borderRadius={'xl'} position={'relative'} overflow={'hidden'} height={'fit-content'} w={600}>
                                <Image src={`/images/${adoptedDog.dog.photo_url}`} width={500} height={300} className={styles.slide} alt='adopted dog' priority />
                                <Box padding={'1rem'}>
                                    <Text> {`${adoptedDog.person_name} - `}
                                        <Text className={styles.slideText} as='em' fontSize={'md'} fontWeight={'bold'} align={'justify'} py={'1rem'} bottom={0} width={'100%'}>
                                            {`"${adoptionQuotes[adoptedDog.id]}"`}
                                        </Text>
                                    </Text>
                                </Box>
                            </Flex>)
                    })
                }
            </Flex>
        </Box>
    )
}