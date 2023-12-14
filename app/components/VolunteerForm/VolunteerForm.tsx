import { ShelterService } from '@/app/services/shelterService';
import { Flex, FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SheltieButton } from '../Button/Button';
import { TextInput } from '../FormInput/FormInput';
import styles from './form.module.css';

export function VolunteerForm({ shelters = [], shelter_id = '', embeded = false }: { shelters?: any, shelter_id?: number | string, embeded?: boolean }) {
    const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm({
        defaultValues: {
            name: '',
            age: '',
            phone: '',
            mail: '',
            shelter: shelter_id
        }
    });

    function onSubmit(values: any) {
        const notif = toast.loading('Realizando inscripción ...', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })

        ShelterService.createStaff(values.name, values.mail, values.phone, values.shelter)
            .then(_ => {
                toast.update(notif, { render: 'Listo! Ya estas inscripto', type: "success", isLoading: false })
                reset()
            })
            .catch((e) => {
                console.log(e)
                toast.update(notif, { render: 'No se pudo realizar la inscripción por favor intenta mas tarde', type: "error", isLoading: false })
            })
    }

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <Flex padding={'2rem'} flexDirection={'column'} gap={'1rem'} boxShadow={!embeded ? '2xl' : ''} borderRadius={!embeded ? '2xl' : ''}>
                    <TextInput label='Nombre completo' fieldName='name' placeholder='Nombre completo' validations={
                        {
                            required: 'Es necesario que ingreses tu nombre completo',
                            maxLength: {
                                value: 50,
                                message: 'El nombre no puede superar los 50 caractéres'
                            },
                            minLength: {
                                value: 7,
                                message: 'El nombre debe tener al menos 7 caractéres'
                            }
                        }
                    } register={register} errorObj={errors?.name} />
                    <TextInput label='Edad' type='number' fieldName='age' validations={
                        {
                            required: 'Es necesario que ingreses tu edad',
                            max: {
                                value: 120,
                                message: 'Edad inválida'
                            },
                            min: {
                                value: 18,
                                message: 'Debes tener al menos 18 años para anotarte como voluntario'
                            }
                        }
                    } register={register} errorObj={errors?.age} />
                    <TextInput label='Telefono' fieldName='phone' placeholder='1122334455' validations={
                        {
                            required: 'Es necesario que ingreses tu teléfono de contacto',
                            maxLength: {
                                value: 10,
                                message: 'El teléfono no puede exceder los 10 caractéres'
                            },
                            minLength: {
                                value: 8,
                                message: 'El teléfono debe tener al menos 8 caratéres'
                            }
                        }
                    } register={register} errorObj={errors?.phone} />
                    <TextInput label='Mail' fieldName='mail' placeholder='tumail@example.com' validations={
                        {
                            required: 'Es necesario que ingreses tu email',
                            maxLength: {
                                value: 40,
                                message: 'El mail no puede exceder los 40 caractéres'
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Email inválido',
                            },
                        }
                    } register={register} errorObj={errors?.mail} />
                    {
                        !shelter_id ? (
                            <FormControl isInvalid={!!errors?.shelter?.message?.toString()}>
                                <FormLabel htmlFor={'shelter'} fontWeight={'bold'}>¿A qué refugio queres ayudar?</FormLabel>
                                <Select variant='flushed' size={'lg'} placeholder='Selecciona uno de nuestros refugios' {...register('shelter', { required: 'Especifica a qué refugio queres ayudar' })}>
                                    {
                                        shelters.map((shelter: any) => (
                                            <option key={shelter.id} value={shelter.id}>{shelter.name}</option>
                                        ))
                                    }
                                </Select>
                                <FormErrorMessage>
                                    {errors && errors?.shelter?.message?.toString()}
                                </FormErrorMessage>
                            </FormControl>
                        ) : ''
                    }
                    <SheltieButton isSubmitting={isSubmitting} type='submit' label={'Anotarme'} />
                </Flex>
            </form>
            <ToastContainer />
        </>
    )
}