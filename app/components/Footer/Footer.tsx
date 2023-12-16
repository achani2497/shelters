import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { SocialMediaButton } from "./components/SocialMediaButton/SocialMediaButton";

export function Footer() {
    return (
        <Flex className={'bg-purple-500'} justifyContent={'center'} alignItems={'center'} height={'max-content'} wrap={'wrap'} color={'white'} mt={'auto'}>
            {/* Seccion 1 */}
            <Flex padding={'1rem'} width={{ base: '100%', md: '50%', lg: '40%' }} minW={380} height={'100%'} position={'relative'} flexDirection={'column'} wrap={'wrap'} gap={'1rem'} justifyContent={'center'}>
                <Flex flexDirection={'column'} width={'100%'} alignItems={{ base: 'center', md: 'flex-start' }}>
                    <Text fontWeight={'bold'} fontSize={'3xl'}>Sheltie</Text>
                    <Text fontSize={'lg'}> Descubrí refugios para perros cerca tuyo</Text>
                </Flex>
                <Flex width={'100%'} justifyContent={{ base: 'center', md: 'flex-start' }}>
                    <SocialMediaButton socialMediaName='facebook' />
                    <SocialMediaButton socialMediaName='x' />
                    <SocialMediaButton socialMediaName='instagram' />
                </Flex>
            </Flex>
            {/* Seccion 2 */}
            <Flex padding={'1rem'} gap={'1rem'} width={{ base: '100%', md: '50%', lg: '60%' }} height={'100%'} flexDirection={'column'} justifyContent={''} alignItems={{ base: 'center', md: 'flex-end' }} >
                <Text as='a' href="/shelters">Mira todos los refugios</Text>
                <Text as='a' href="/missing">Perros perdidos</Text>
                <Text as='a' href="/links">Links Útiles</Text>
                <Text as='a' href="/#voluntario">Anotate como voluntario!</Text>
            </Flex>
            {/* Seccion 3 */}
            <Flex flexDirection={'column'} padding={'.5rem'} width={'100%'} gap={'.2rem'}>
                <Text as={'i'} textAlign={'center'}>
                    © Alejandro Ismael Chañi, Todos los derechos reservados.
                </Text>
                <Flex gap={'.5rem'} alignSelf={'center'}>
                    <Text >
                        Hecho con
                    </Text>
                    <Image src={'/next.svg'} width={60} height={60} alt={'Next logo'} />
                </Flex>
            </Flex>
        </Flex>
    )
}