'use client'
import { supabase } from "@/lib/initSupabase";
import { SearchIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { DateInput, TextInput } from "../components/FormInput/FormInput";
import { PageTitle } from "../components/PageTitle/PageTitle";
import { MissingService } from "../services/missingService";
import { Dog, DogCard } from "../shelters/[id]/components/DogCard";
import style from './missing.module.css';

export default function Page() {

    const [missingDogs, setMissingDogs] = useState([])
    const [filteredDogs, setFilteredDogs] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [finishedFetching, setFinishFetching] = useState(false)
    const { handleSubmit, register, reset, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            name: '',
            missing_date: '',
            photo_url: '',
            location: '',
            phone: ''
        }
    });

    useEffect(() => {
        fetchMissingDogs().then((data: any) => {
            setMissingDogs(data)
            setFilteredDogs(data)
            setFinishFetching(true)
        }).catch()

    }, []);

    async function fetchMissingDogs() {
        const { data, error } = await supabase.from('missing').select()
        if (error) {
            throw error
        }
        return data
    }

    function daysLost(arriveDate: string) {
        const arrivalDate = new Date(arriveDate);
        const currentDate = new Date();

        const diffInMs = currentDate.getTime() - arrivalDate.getTime();

        const msInADay = 1000 * 60 * 60 * 24; // Milisegundos en un día
        const diffInDays = diffInMs / msInADay;

        const days = Math.floor(diffInDays);

        return days
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

        MissingService.reportMissing(values.name, values.missing_date, values.photo_url, values.location, values.phone)
            .then(() => {
                toast.update(notif, { render: 'Reportado, esperamos que lo puedas encontrar pronto!', type: "success", isLoading: false })
                reset()
                fetchMissingDogs().then((data: any) => {
                    setMissingDogs(data)
                }).catch(e => console.log(e))
                onClose()
            }
            )
            .catch(e => {
                console.log(e)
                toast.update(notif, { render: 'No se pudo realizar el reporte, por favor intenta mas tarde', type: "error", isLoading: false })
            })

    }

    function search(e: any) {
        const keyWord = e.target.value.trim().toLowerCase()
        const dogs = missingDogs.filter((dog: Dog) => dog.name.toLocaleLowerCase().includes(keyWord))
        setFilteredDogs(dogs)
    }

    return (
        <>
            <Flex justifyContent={'space-between'} w={'full'}>
                <PageTitle title="Estos amiguitos estan perdidos" />
                <Button className='bg-purple-500' _hover={{
                    bg: 'purple',
                    color: 'white'
                }}
                    color={'white'}
                    onClick={onOpen}>
                    Reportar perro perdido
                </Button>
            </Flex>
            <InputGroup my={'1rem'}>
                <InputLeftElement pointerEvents='none'>
                    <SearchIcon color='gray.300' />
                </InputLeftElement>
                <Input placeholder="Busca por nombre" onChange={search}></Input>
            </InputGroup>
            <Skeleton height={"auto"} isLoaded={finishedFetching}>
                <ul className={style.cardContainer}>
                    {
                        filteredDogs.map((dog: any, index) => {
                            return (
                                <DogCard key={index} dog={dog}>
                                    <Box>
                                        <p><b>Ultima vez visto en:</b> {dog.location}</p>
                                        <p><b>Teléfono de contacto:</b> {dog.phone}</p>
                                        <p>Lleva <b>{daysLost(dog.missing_date)} días</b> perdido</p>
                                    </Box>
                                    <Button
                                        px={4}
                                        fontSize={'md'}
                                        rounded={'full'}
                                        color={'black'}
                                        boxShadow={
                                            '0px 1px 25px -5px rgb(20 20 20 / 48%), 0 10px 10px -5px rgb(30 30 30 / 43%)'
                                        }
                                        _hover={{
                                            bg: 'black',
                                            color: 'white'
                                        }}
                                        _focus={{
                                            bg: 'black',
                                            color: 'white'
                                        }}>
                                        Lo encontré!
                                    </Button>
                                </DogCard>)
                        })
                    }
                </ul>
            </Skeleton>
            {/* Form para reportar perro perdido */}
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader>Dejanos la información</ModalHeader>
                        <ModalCloseButton />
                        {/* Inputs */}
                        <ModalBody pb={6}>
                            <Flex flexDirection={'column'} gap={'1rem'}>
                                {/* Nombre */}
                                <TextInput
                                    label={'¿Cómo se llama?'}
                                    fieldName={'name'}
                                    validations={
                                        {
                                            required: 'Es necesario que ingreses el nombre',
                                        }
                                    }
                                    register={register}
                                    errorObj={errors?.name}
                                />
                                {/* Ubicacion */}
                                <TextInput
                                    label={'¿En qué dirección se perdió?'}
                                    placeholder={'Calle y altura, Barrio'}
                                    fieldName={'location'}
                                    validations={
                                        {
                                            required: 'Es necesario que ingreses la ubicación',
                                            maxLength: {
                                                value: 70,
                                                message: 'La ubicación no puede exceder los 70 caracteres'
                                            }
                                        }
                                    }
                                    register={register}
                                    errorObj={errors?.location}
                                />
                                {/* Fecha */}
                                <DateInput
                                    label={'¿Cuando se perdió?'}
                                    fieldName={'missing_date'}
                                    validations={
                                        {
                                            required: 'Es necesario que ingreses la fecha',
                                        }
                                    }
                                    register={register}
                                    errorObj={errors?.missing_date}
                                />
                                {/* Foto */}
                                <TextInput
                                    label={'Dejanos una foto para saber cómo se ve'}
                                    fieldName={'photo_url'}
                                    validations={
                                        {
                                            required: 'Necesitamos una foto para saber como se ve',
                                        }
                                    }
                                    register={register}
                                    errorObj={errors?.photo_url}
                                />
                                {/* Telefono */}
                                <TextInput
                                    label={'Dejanos tu teléfono de contacto'}
                                    fieldName={'phone'}
                                    type={'number'}
                                    validations={
                                        {
                                            required: 'Es necesario que ingreses un teléfono de contacto',
                                            maxLength: {
                                                value: 10,
                                                message: 'El teléfono debe tener 10 caracteres'
                                            },
                                            minLength: {
                                                value: 10,
                                                message: 'El teléfono debe tener 10 caracteres'
                                            }
                                        }
                                    }
                                    register={register}
                                    errorObj={errors?.phone}
                                />
                            </Flex>
                        </ModalBody>
                        {/* Botones */}
                        <ModalFooter>
                            <Flex gap={'1rem'}>
                                <Button className='bg-purple-500' _hover={{
                                    bg: 'purple',
                                    color: 'white'
                                }}
                                    color={'white'} type='submit' isLoading={isSubmitting}>
                                    Reportar
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