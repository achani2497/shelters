'use client'
import Link from "next/link"
import {
    Box,
    Flex,
    HStack,
    useColorModeValue,
} from '@chakra-ui/react'

const links = [
    {
        label: 'Refugios',
        route: '/shelters'
    },
    {
        label: 'Mascotas',
        route: '/'
    }
]


const NavLink = ({ url, label }: { url: string, label: string }) => {

    return (
        <Box
            as="a"
            p={3}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
                transition: 'all .5s ease-in-out'
            }}
            href={url}>
            {label}
        </Box>
    )
}

export function Navigation() {

    return (
        <>
            <Box bg={'white'} height={'4rem'} px={4} boxShadow={'lg'} position={'fixed'} top={'0'} zIndex={'99'} width={'full'}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <HStack spacing={8} alignItems={'center'} fontSize={'xl'}>
                        <Link href='/' >Sheltie</Link>
                        <HStack as={'nav'} spacing={4} display={'flex'}>
                            {links.map((link) => (
                                <NavLink key={link.label} url={link.route} label={link.label}></NavLink>
                            ))}
                        </HStack>
                    </HStack>
                </Flex>
            </Box>
        </>
    )
}