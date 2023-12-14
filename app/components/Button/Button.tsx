import { Button } from '@chakra-ui/react'

type SheltieButton = {
    label: string
    outline?: boolean
    type?: 'button' | 'submit' | 'reset' | undefined
    alignMiddle?: boolean
    isSubmitting?: boolean
    fitContent?: boolean
    action?: any
}

export function SheltieButton({ label, outline = false, type = 'button', alignMiddle = true, isSubmitting = false, fitContent = false, action = () => { } }: SheltieButton) {
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
            mx={alignMiddle ? 'auto' : ''}
            className={outline ? '' : 'bg-purple-500'}
            border={outline ? '2px solid #A855F7' : ''}
            width={fitContent ? 'fit-content' : { base: '100%', md: '50%', lg: '30%' }}
            minW={'fit-content'}
            onClick={action}
            type={type}
        >
            {label}
        </Button>
    )
}