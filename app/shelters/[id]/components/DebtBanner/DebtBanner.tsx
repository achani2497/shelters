'use client'

import style from './DebtBanner.module.css'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
    Heading,
} from '@chakra-ui/react'
import { FormEvent } from 'react';

export function DebtBanner({ debt }: { debt: number }) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    function debtWithCommas() {
        return debt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // TODO: Ver como agrego el submit
    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        console.log(formData)
        // const response = await fetch('/api/submit', {
        //     method: 'POST',
        //     body: formData,
        // })

        // // Handle response if necessary
        // const data = await response.json()
        // // ...
    }


    return (
        <>
            {
                debt > 0 ? (
                    <Box w='full' position={'absolute'} display={'flex'} flexDirection={'column'} gap={'.5rem'} top={'4rem'} left={0} backgroundColor={'rgba(255, 0, 0, .7)'} color={'white'} h={'fit-content'} padding={'1rem'} textAlign={'center'} alignItems={'center'}>
                        <Heading as="h2" size="lg">Nuestra deuda asciende hasta los ${debtWithCommas()}</Heading>
                        <Button fontSize={'lg'} onClick={onOpen} className={style.debtButton}>¡Ayudanos!</Button>
                    </Box>
                ) : null
            }
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Realiza tu donación ❤️🐕</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>¿Cuánto queres donar?</FormLabel>
                            <Input name='amount' placeholder='$10, $100, $1000' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} type='submit'>
                            Donar
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}