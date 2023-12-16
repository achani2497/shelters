'use client'
import { supabase } from "@/lib/initSupabase";
import { daysPassed } from "@/utils/Functions";
import { Validations } from "@/utils/Validations";
import { SearchIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SheltieButton } from "../../components/Button/Button";
import { DateInput, TextInput } from "../../components/FormInput/FormInput";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { MissingService } from "../../services/missingService";
import { Dog, DogCard } from "../shelters/[id]/components/DogCard/DogCard";
import style from './missing.module.css';

export default function Page() {

    const [missingDogs, setMissingDogs] = useState([])
    const [filteredDogs, setFilteredDogs] = useState([])
    const reportMissingModal = useDisclosure()
    const reportFoundedModal = useDisclosure()
    const [foundedDog, setFoundedDog] = useState()
    const [finishedFetching, setFinishFetching] = useState(false)
    const reportMissingForm = useForm({
        defaultValues: {
            owner_name: '',
            name: '',
            missing_date: '',
            photo_url: '',
            location: '',
            phone: ''
        }
    });
    const reportFoundedForm = useForm({
        defaultValues: {
            name: '',
            location: '',
            phone: ''
        }
    })

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

    function onSubmitMissing(values: any) {
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

        MissingService.reportMissing(values.owner_name, values.name, values.missing_date, values.photo_url, values.location, values.phone)
            .then(() => {
                toast.update(notif, { render: 'Reportado, esperamos que lo puedas encontrar pronto!', type: "success", isLoading: false })
                reportMissingForm.reset()
                fetchMissingDogs().then((data: any) => {
                    setMissingDogs(data)
                }).catch(e => console.log(e))
                reportMissingModal.onClose()
            }
            )
            .catch(e => {
                console.log(e)
                toast.update(notif, { render: 'No se pudo realizar el reporte, por favor intenta mas tarde', type: "error", isLoading: false })
            })

    }

    function onSubmitFounded(values: any) {
        const notif = toast.loading('Realizando aviso ...', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })

        // MissingService.reportMissing(values.name, values.missing_date, values.photo_url, values.location, values.phone)
        //     .then(() => {
        //         toast.update(notif, { render: 'Gracias por avisarnos, ya contactamos a el/la propietario/a!', type: "success", isLoading: false })
        //         reportMissingForm.reset()
        //         fetchMissingDogs().then((data: any) => {
        //             setMissingDogs(data)
        //         }).catch(e => console.log(e))
        //         reportMissingModal.onClose()
        //     }
        //     )
        //     .catch(e => {
        //         console.log(e)
        //         toast.update(notif, { render: 'No se pudo realizar el aviso, por favor intenta mas tarde', type: "error", isLoading: false })
        //     })
    }

    function openFoundedDogModal(dog: any) {
        setFoundedDog(dog)
        reportFoundedModal.onOpen()
    }

    function search(e: any) {
        const keyWord = e.target.value.trim().toLowerCase()
        const dogs = missingDogs.filter((dog: Dog) => dog.name.toLocaleLowerCase().includes(keyWord))
        setFilteredDogs(dogs)
    }

    return (
        <>
            <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'}>
                <PageTitle title="Estos amiguitos estan perdidos" />
                <SheltieButton fitContent alignMiddle={false} label={'Reportar perro perdido'} action={reportMissingModal.onOpen} />

            </Flex>
            <InputGroup my={'1rem'}>
                <InputLeftElement pointerEvents='none'>
                    <SearchIcon color='gray.300' />
                </InputLeftElement>
                <Input placeholder="Busca por nombre" onChange={search}></Input>
            </InputGroup>
            {finishedFetching ? (
                <ul className={style.cardContainer}>
                    {
                        filteredDogs.map((dog: any, index) => {
                            return (
                                <DogCard key={index} dog={dog}>
                                    <Box>
                                        <p><b>Ultima vez visto en:</b> {dog.location}</p>
                                        <p><b>Teléfono de contacto:</b> {dog.phone}</p>
                                        <p>Lleva <b>{daysPassed(dog.missing_date)} días</b> perdido</p>
                                    </Box>
                                    <SheltieButton label={'Lo encontré!'} action={() => { openFoundedDogModal(dog) }} />
                                </DogCard>)
                        })
                    }
                </ul>

            ) : (<Skeleton height={"400px"} fadeDuration={1} />)}

            {/* Form para reportar perro perdido */}
            <Modal
                isOpen={reportMissingModal.isOpen}
                onClose={reportMissingModal.onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={reportMissingForm.handleSubmit(onSubmitMissing)}>
                        <ModalHeader>Dejanos la información</ModalHeader>
                        <ModalCloseButton />
                        {/* Inputs */}
                        <ModalBody pb={6}>
                            <Flex flexDirection={'column'} gap={'1rem'}>
                                {/* Nombre del dueño */}
                                <TextInput
                                    label={'¿Cómo te llamas?'}
                                    fieldName={'owner_name'}
                                    validations={Validations['humanName']}
                                    register={reportMissingForm.register}
                                    errorObj={reportMissingForm.formState.errors?.owner_name}
                                />
                                {/* Nombre del perro */}
                                <TextInput
                                    label={'¿Cómo se llama tu mascota?'}
                                    fieldName={'name'}
                                    validations={Validations['dogName']}
                                    register={reportMissingForm.register}
                                    errorObj={reportMissingForm.formState.errors?.name}
                                />
                                {/* Ubicacion */}
                                <TextInput
                                    label={'¿En qué dirección se perdió?'}
                                    placeholder={'Calle y altura, Barrio'}
                                    fieldName={'location'}
                                    validations={Validations['location']}
                                    register={reportMissingForm.register}
                                    errorObj={reportMissingForm.formState.errors?.location}
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
                                    register={reportMissingForm.register}
                                    errorObj={reportMissingForm.formState.errors?.missing_date}
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
                                    register={reportMissingForm.register}
                                    errorObj={reportMissingForm.formState.errors?.photo_url}
                                />
                                {/* Telefono */}
                                <TextInput
                                    label={'Dejanos tu teléfono de contacto'}
                                    fieldName={'phone'}
                                    type={'number'}
                                    validations={Validations['phone']}
                                    register={reportMissingForm.register}
                                    errorObj={reportMissingForm.formState.errors?.phone}
                                />
                            </Flex>
                        </ModalBody>
                        {/* Botones */}
                        <ModalFooter>
                            <Flex gap={'1rem'}>
                                <SheltieButton label={'Reportar'} type='submit' isSubmitting={reportMissingForm.formState.isSubmitting} />
                                <Button onClick={reportMissingModal.onClose}>Cancelar</Button>
                            </Flex>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
            {/* Form para reportar perro encontrado */}
            <Modal
                isOpen={reportFoundedModal.isOpen}
                onClose={reportFoundedModal.onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={reportFoundedForm.handleSubmit(onSubmitFounded)}>
                        {foundedDog ? (<ModalHeader> Dejanos tu información para avisarle al dueño de {foundedDog['name']}</ModalHeader>) : null}
                        <ModalCloseButton />
                        {/* Inputs */}
                        <ModalBody pb={6}>
                            <Flex flexDirection={'column'} gap={'1rem'}>
                                {/* Nombre */}
                                <TextInput
                                    label={'¿Cómo es tu nombre completo?'}
                                    fieldName={'name'}
                                    validations={Validations['humanName']}
                                    register={reportFoundedForm.register}
                                    errorObj={reportFoundedForm.formState.errors?.name}
                                />
                                {/* Ubicacion */}
                                <TextInput
                                    label={'¿En qué dirección te encontras?'}
                                    placeholder={'Calle y altura, Barrio'}
                                    fieldName={'location'}
                                    validations={Validations['location']}
                                    register={reportFoundedForm.register}
                                    errorObj={reportFoundedForm.formState.errors?.location}
                                />
                                {/* Telefono */}
                                <TextInput
                                    label={'Dejanos tu teléfono de contacto'}
                                    fieldName={'phone'}
                                    type={'number'}
                                    validations={Validations['phone']}
                                    register={reportFoundedForm.register}
                                    errorObj={reportFoundedForm.formState.errors?.phone}
                                />
                            </Flex>
                        </ModalBody>
                        {/* Botones */}
                        <ModalFooter>
                            <Flex gap={'1rem'}>
                                <SheltieButton label={'Avisar'} type='submit' isSubmitting={reportFoundedForm.formState.isSubmitting} />
                                <Button onClick={reportFoundedModal.onClose}>Cancelar</Button>
                            </Flex>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
            <ToastContainer />
        </>

    )
}