'use client'

import {
    Avatar,
    Box,
    Center,
    Flex,
    Heading,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'

type PersonalCard = {
    name: string
    mail: string
    phone: string
    photo_url: string
}

export function PersonalCard({ person }: { person: PersonalCard }) {

    return (
        <Center py={6}>
            <Flex
                flexDirection={'column'}
                p={'2rem'}
                gap={4}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'xl'}
                rounded={'md'}
                overflow={'hidden'}>
                <Flex justify={'center'}>
                    <Avatar
                        size={'xxl'}
                        src={
                            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                        }
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>

                <Box>
                    <Stack spacing={2} align={'center'}>
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            {person.name}
                        </Heading>
                        <Text color={'gray.500'} fontSize={'xl'}>{person.mail}</Text>
                        <Text color={'gray.500'} fontSize={'xl'}>{person.phone}</Text>
                    </Stack>
                </Box>
            </Flex>
        </Center>
    )
}