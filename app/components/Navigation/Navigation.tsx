'use client'
import {
    Box,
    Flex,
    HStack,
} from '@chakra-ui/react'
import Link from "next/link"

const links = [
    {
        label: 'Refugios',
        route: '/shelters'
    },
    {
        label: 'Perros Perdidos',
        route: '/missing'
    },
    {
        label: 'Links útiles',
        route: '/links'
    }
]


const NavLink = ({ url, label }: { url: string, label: string }) => {

    return (
        <Box
            as="a"
            height={'4rem'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            href={url}
            fontSize={'lg'}>
            {label}
        </Box>
    )
}

export function Navigation() {

    return (
        <>
            <Box className='bg-purple-500 text-white' height={'4rem'} px={'10%'} boxShadow={'lg'} position={'fixed'} top={'0'} zIndex={'99'} width={'full'}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                    <Link href='/' style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Sheltie</Link>
                    <HStack as={'nav'} spacing={8} display={'flex'}>
                        {links.map((link) => (
                            <NavLink key={link.label} url={link.route} label={link.label}></NavLink>
                        ))}
                    </HStack>
                </Flex>
            </Box>
        </>
    )
}