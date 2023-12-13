import { Button } from '@chakra-ui/react'

export function SheltieButton({ label, action = '' }: { label: string, action: any }) {
    return (
        <Button variant={'outline'} transitionDuration={'.7s'} _hover={{
            bg: 'purple',
            color: 'white',
            border: 'purple'
        }}
            color={'#A855F7'}
            mt={'1rem'}
            mx={'auto'}
            border={'2px solid #A855F7'}
            width={{ base: '100%', md: '50%', lg: '30%' }}
            onClick={action}
        >
            {label}
        </Button>
    )
}