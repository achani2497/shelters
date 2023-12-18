'use client'
import {
    Flex,
    Heading,
    Text
} from '@chakra-ui/react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SheltieButton } from "../Button/Button";

export function DescriptionCard({ photoUrl, title, description, buttonText, buttonUrl }: any) {
    const { push } = useRouter()
    return (
        <>
            <Flex
                width={'100%'}
                borderWidth="1px"
                borderRadius="lg"
                height={'fit-content'}
                bg={'white'}
                boxShadow={'xl'}
                padding={4}
                marginBottom={8}
                flexDirection={{ base: 'column', md: 'row' }}
            >
                <Flex w={{ base: '100%', md: '300px' }} height={{ base: '200px', md: '300px' }} position={'relative'} rounded={'xl'} overflow={'hidden'}>
                    <Image
                        src={photoUrl}
                        fill
                        alt="Shelter image"
                        priority
                        style={{ objectFit: 'contain' }}
                    />
                </Flex>
                <Flex
                    flexDirection="column"
                    gap={4}
                    p={4}
                    width={'100%'}
                >
                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                        {title}
                    </Heading>
                    <Text
                        fontSize={'xl'}>
                        {description}
                    </Text>
                    <SheltieButton alignMiddle={false} label={buttonText} action={() => push(buttonUrl)} />
                </Flex>
            </Flex>
        </>
    )
}