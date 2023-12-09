'use client'
import {
    Box,
    Center,
    Flex,
    Heading
} from '@chakra-ui/react'
import Image from 'next/image'

export type Dog = {
    name: string
    weight: number
    age: number
    photo_url: string
    description: string
    shelter_enter_date: string
}

export function DogCard({ children, dog }: { children: any, dog: Dog }) {

    return (
        <Center>
            <Box
                minW={'250px'}
                w={'inherit'}
                boxShadow={'xl'}
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
                    {children}
                </Flex>
            </Box>
        </Center>
    )
}