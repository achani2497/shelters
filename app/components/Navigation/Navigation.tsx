'use client'
import { HamburgerIcon } from '@chakra-ui/icons'
import {
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex,
    IconButton,
    Link,
    useDisclosure
} from '@chakra-ui/react'
import Image from 'next/image'

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
            fontSize={'lg'}
            color={'white'}
        >
            {label}
        </Box>
    )
}

export function Navigation() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Box className='bg-purple-500 text-white' height={'fit-content'} px={{ base: '2rem', md: '10%' }} boxShadow={'lg'} position={'fixed'} top={'0'} zIndex={'99'} width={'full'}>
                <Flex h={'fit-content'} alignItems={'center'} justifyContent={'space-between'} alignContent={'center'} width={'100%'} minHeight={'4rem'} position={'relative'}>

                    <Box width={{ base: 100, md: 200 }} height={{ base: 50, md: 50 }} position={'relative'}>
                        <Link href='/' height={'100%'} width={'100%'}>
                            <Image src={'/logo.svg'} alt='sheltie logo' fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                        </Link>
                    </Box>

                    {/* MenuItems para pantallas que no sean celular */}
                    <Flex gap={'2rem'} display={{ base: 'none', md: 'flex' }}>
                        {links.map((link) => (
                            <NavLink key={link.label} url={link.route} label={link.label} />
                        ))}
                    </Flex>

                    {/* Ícono de hamburguesa para pantallas chicas */}
                    <IconButton
                        display={{ base: 'flex', md: 'none' }}
                        icon={<HamburgerIcon />}
                        onClick={onOpen}
                        aria-label="Abrir menú"
                        size={'2xl'}
                        fontSize='25px'
                        color={'white'}
                        zIndex={99}
                    />

                    {/* Menú de navegación */}
                    <Drawer isOpen={isOpen} placement={'right'} onClose={onClose} size={'full'}>
                        <DrawerOverlay />
                        <DrawerContent className='bg-purple-500' color={'white'}>
                            <DrawerBody display={'flex'} alignItems={'flex-end'}>
                                {/* Contenido del menú */}
                                <Flex flexDirection={'column'} width={'100%'}>
                                    <NavLink url={'/'} label={'Home'} />
                                    {links.map((link) => (
                                        <NavLink key={link.label} url={link.route} label={link.label} />
                                    ))}
                                </Flex>
                            </DrawerBody>
                            <DrawerCloseButton fontSize={'20px'} />
                        </DrawerContent>
                    </Drawer>
                </Flex>
            </Box>
        </>
    )
}