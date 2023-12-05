'use client'
import Image from 'next/image'
import {
    Box,
    Center,
    Heading,
    Text,
    Button,
    useColorModeValue,
    Flex,
} from '@chakra-ui/react'

interface IDogCard {
    name: string
    weight: number
    age: number
    photo_url: string
    description: string
}

export function DogCard({ dog }: { dog: IDogCard }) {

    return (
        <Center>
            <Box
                w={'full'}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                bg={useColorModeValue('white', 'gray.900')}
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
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        color={useColorModeValue('gray.700', 'white')}
                        fontSize={'3xl'}
                        fontFamily={'body'}>
                        {dog.name}
                    </Heading>
                    <Text color={'gray.700'} fontSize={'xl'}>
                        {dog.description}
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
                        Lo quiero adoptar asd ❤️!                    </Button>
                </Flex>
            </Box>
        </Center>
    )
}