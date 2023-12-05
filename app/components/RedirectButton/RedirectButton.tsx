import { Box, useColorModeValue } from '@chakra-ui/react'

export function RedirectButton({ label, url }: { label: string, url: string }) {

    return (
        <Box as="a"
            px={4}
            py={2}
            rounded={'lg'}
            border={'2px solid gray'}
            width={'fit-content'}
            fontSize={'xl'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
                transition: 'all .4s ease-in-out'
            }}
            href={url}>
            {label}
        </Box>
    )
}