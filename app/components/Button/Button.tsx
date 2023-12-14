import { Button } from '@chakra-ui/react'

export function SheltieButton({ label, outline = false, type = 'button', isSubmitting = false, action = () => { } }: { label: string, outline?: boolean, type?: 'button' | 'submit' | 'reset' | undefined, isSubmitting?: boolean, action?: any }) {
    return (
        <Button variant={'outline'} transitionDuration={'.7s'}
            isLoading={isSubmitting}
            loadingText='Enviando información'
            _hover={{
                bg: 'purple',
                color: 'white',
                border: 'purple'
            }}
            color={outline ? '#A855F7' : 'white'}
            mt={'1rem'}
            mx={'auto'}
            className={outline ? '' : 'bg-purple-500'}
            border={outline ? '2px solid #A855F7' : ''}
            width={{ base: '100%', md: '50%', lg: '30%' }}
            onClick={action}
            type={type}
        >
            {label}
        </Button>
    )
}