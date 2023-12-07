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
    Flex,
    FormErrorMessage,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ShelterService } from '@/app/services/shelterService'

export function DebtBanner({ debtProp, shelterId }: { debtProp: number, shelterId: number }) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm();
    const shelterService = new ShelterService()

    function debtWithCommas() {
        return debtProp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function onSubmit(values: any) {
        const notif = toast.loading('Realizando donación...', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })

        shelterService.update('shelter', 'debt', Math.max(0, debtProp - values.amount), shelterId)
            .then(() =>
                toast.update(notif, { render: 'Donación realizada! Muchas Gracias por tu ayuda ❤️', type: "success", isLoading: false })
            )
            .catch(e => {
                console.log(e)
                toast.update(notif, { render: 'No se pudo realizar la donación, por favor intenta mas tarde', type: "error", isLoading: false })
            })
    }


    return (
        <>
            {
                debtProp > 0 ? (
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader>Realiza tu donación ❤️🐕</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl isInvalid={!!errors?.amount?.message?.toString()}>
                                <FormLabel htmlFor='amount'>¿Cuánto queres donar?</FormLabel>
                                <Input type='number' placeholder='$10, $100, $1000' {
                                    ...register('amount', {
                                        required: 'Es necesario que ingreses una cantidad',
                                        valueAsNumber: true,
                                        min: {
                                            value: 0,
                                            message: 'La cantidad minima es 0'
                                        }
                                    })
                                } />
                                <FormErrorMessage>
                                    {errors?.amount && errors?.amount?.message?.toString()}
                                </FormErrorMessage>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Flex gap={'1rem'}>
                                <Button className='bg-purple-500' _hover={{
                                    bg: 'purple',
                                    color: 'white'
                                }}
                                    color={'white'} type='submit' isLoading={isSubmitting}>
                                    Donar
                                </Button>
                                <Button onClick={onClose}>Cancelar</Button>
                            </Flex>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
            <ToastContainer />
        </>
    )
}