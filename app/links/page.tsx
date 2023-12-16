'use client'
import { PageTitle } from "@/components/PageTitle/PageTitle"
import { Flex, Grid, Text } from "@chakra-ui/react"
import Link from "next/link"
import styles from './links.module.css'

export default function Page() {
    const links = [
        {
            title: 'Atención veterinaria y castraciones gratuitas',
            description: 'Sacá un turno de manera online para castrar a tu mascota en los centros de atención veterinaria de la Ciudad de Buenos Aires.',
            url: 'https://buenosaires.gob.ar/agenciaambiental/mascotas/atencion-veterinaria-y-castraciones-gratuitas'
        },
        {
            title: 'Sitio con información para mascotas del Gobierno de la Ciudad',
            description: 'Mascotas de la Ciudad proporciona las herramientas necesarias para lograr el bienestar de perros y gatos, además de la convivencia armónica y responsable de las mascotas y sus tenedores en el espacio público.',
            url: 'https://buenosaires.gob.ar/agenciaambiental/mascotas'
        },
        {
            title: 'Mascotas en el espacio publico',
            description: 'Conocé la ubicación de los caniles en la Ciudad y los cuidados de las mascotas en el espacio público.',
            url: 'https://buenosaires.gob.ar/agenciaambiental/mascotas/mascotas-en-el-espacio-publico'
        },
        {
            title: 'Castraciones gratuitas',
            description: 'Sección de la página del Gobierno Nacional dedicada a dar información acerca de las castraciones gratuitas que se hacen a nivel nacional.',
            url: 'https://www.argentina.gob.ar/salud/protenencia/castraciones'
        },
        {
            title: 'Programa "Protenencia"',
            description: 'Un programa inclusivo y participativo que fomenta la castración masiva, la sanidad de los animales y la tenencia responsable de mascotas.',
            url: 'https://www.argentina.gob.ar/salud/protenencia'
        }
    ]
    return (
        <Flex flexDir={'column'} gap={'1rem'}>
            <PageTitle title="Links que pueden ser útiles" />
            <Grid templateColumns={'repeat(auto-fill, minmax(20rem, 23rem))'} autoRows={'25rem'} justifyContent={{ base: 'center', md: 'space-around' }} gap={'2rem'}>
                {
                    links.map(link => (
                        <Flex gap={'1rem'} flexDirection={'column'} boxShadow={'xl'} width={'100%'} height={'100%'} rounded={'xl'} padding={'2rem'}>
                            <Text fontWeight='bold' fontSize={'xl'}>{link.title}</Text>
                            <Text as={'em'}>{link.description} </Text>
                            <Link href={link.url} rel="noopener noreferrer" target="_blank" className={styles.button}
                            > Visitar Sitio </Link>
                        </Flex>
                    ))
                }
            </Grid>
        </Flex>

    )
}