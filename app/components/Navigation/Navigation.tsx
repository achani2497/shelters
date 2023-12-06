'use client'
import Link from "next/link"
import {
    Box,
    Flex,
    HStack,
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
            height={'4rem'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            // _hover={{
            //     borderBottom: '3px solid violet'
            // }}
            href={url}>
            {label}
        </Box>
    )
}

export function Navigation() {

    return (
        <>
            <Box bg={'white'} height={'4rem'} px={'10%'} boxShadow={'lg'} position={'fixed'} top={'0'} zIndex={'99'} width={'full'}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                    <Link href='/' >Sheltie</Link>
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