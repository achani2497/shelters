'use client'
import { ComposedText } from "../ComposedText/ComposedText";
import { RedirectButton } from "../RedirectButton/RedirectButton";
import style from './DescriptionCard.module.css'

import {
    Flex,
    Heading,
    Image,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'

export function DescriptionCard({ photoUrl, title, description, buttonText, buttonUrl }) {
    return (
        <>
            <Flex
                width={'full'}
                borderWidth="1px"
                borderRadius="lg"
                height={'20rem'}
                bg={'white'}
                boxShadow={'xl'}
                padding={4}
                marginBottom={8}
            >
                <Flex flex={1} bg="green.200" minWidth={'250px'} maxWidth={'fit-content'}>
                    <Image
                        max-width={'300px'}
                        objectFit="fill"
                        src={
                            photoUrl
                        }
                        alt="#"
                    />
                </Flex>
                <Flex
                    flexDirection="column"
                    gap={4}
                    p={4}>
                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                        {title}
                    </Heading>
                    <Text
                        color={useColorModeValue('gray.700', 'gray.400')}
                        fontSize={'xl'}>
                        {description}
                    </Text>
                    <RedirectButton label={buttonText} url={buttonUrl}></RedirectButton>
                </Flex>
            </Flex>
        </>
    )
}