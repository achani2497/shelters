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
            >
                <Flex w={'300px'} position={'relative'} rounded={'xl'} overflow={'hidden'}>
                    <Image
                        src={photoUrl}
                        width={300}
                        height={300}
                        alt="Shelter image"
                        priority
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