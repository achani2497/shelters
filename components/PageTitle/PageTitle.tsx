'use client'
import { Text } from '@chakra-ui/react'
export function PageTitle({ title }: { title: string }) {
    return (
        <Text as="h2" fontSize={{ base: 'xl', md: '3xl' }} textAlign={{ base: 'center', md: 'left' }} fontWeight={'bold'} color={'black'}>{title} </Text>
    )
}