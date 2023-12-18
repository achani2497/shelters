import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";


export function ElasticText({ text, breakpoint }: { text: string, breakpoint: number }) {
    function displayText(description: string, showFullDescription: boolean, lengthBreakpoint: number) {
        const words = description.split(' ');
        return showFullDescription ? description : words.slice(0, lengthBreakpoint).join(' ') + '...';

    }

    const [showFullDescription, setShowFullDescription] = useState(false)

    return (
        <Text color={'gray.700'} fontSize={'xl'}>
            {displayText(text, showFullDescription, breakpoint) + ' '}
            {
                text.length > breakpoint ?
                    (<Button colorScheme='teal' variant={'link'} onClick={() => setShowFullDescription(!showFullDescription)}>
                        {showFullDescription ? 'Leer menos' : 'Leer más'}
                    </Button>) : null
            }
        </Text>
    )
}