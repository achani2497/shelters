'use client'
import { Text } from '@chakra-ui/react'
export function PageTitle({ title }: { title: string }) {
    return (
        <Text as="h2" fontSize={'3xl'} fontWeight={'bold'} color={'black'}>{title} </Text>
    )
}