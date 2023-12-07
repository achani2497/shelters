import { PageTitle } from "@/app/components/PageTitle/PageTitle";
import { Text, Flex, Card, Textarea, FormControl, Button, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ShelterService } from "@/app/services/shelterService";
import { toast } from "react-toastify";
import { useState } from "react";

interface IComment {
    person_name: string
    comment: string
}

export function Comments({ commentsProp, shelterId }: { commentsProp: IComment[], shelterId: number }) {
    const shelterService = new ShelterService()

    const [comments, setComments] = useState(commentsProp || [])
    const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm({
        defaultValues: {
            name: '',
            comment: ''
        }
    });

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

        shelterService.createComment(values.name, values.comment, shelterId)
            .then(() => {
                toast.update(notif, { render: 'Muchas Gracias por dejarnos tu comentario ❤️', type: "success", isLoading: false })
                setComments([...comments, { person_name: values.name, comment: values.comment }])
                reset()
            })
            .catch(e => {
                console.log(e)
                toast.update(notif, { render: 'No pudimos registrar tu comentario, por favor intenta mas tarde', type: "error", isLoading: false })
            })
    }


    return (

        <Flex flexDirection={"column"} gap={'1rem'} padding={"0 2rem"}>
            <PageTitle title="Comentarios sobre nuestro trabajo" />
            <Flex flexDirection={'column'} gap={'1rem'}>
                {comments.map((comment) => {
                    return (
                        <Card padding={'1rem'} variant={'filled'}>
                            <Flex flexDirection={'column'}>
                                <Text as='b'>{comment.person_name} </Text>
                                <Text fontSize="lg">{comment.comment}</Text>
                            </Flex>
                        </Card>
                    )
                })}
            </Flex>
            <Card padding={'1rem'} boxShadow={'xl'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex flexDirection={'column'} gap={'1rem'}>
                        <FormControl isInvalid={!!errors?.name?.message?.toString()}>
                            <FormLabel htmlFor="name" fontWeight={'bold'}>Tu nombre</FormLabel>
                            <Input type='text' {...register('name', {
                                required: 'Este campo no puede estar vacío',
                                maxLength: {
                                    value: 30,
                                    message: 'El nombre no puede contener mas de 30 caracteres'
                                }
                            })}></Input>
                            <FormErrorMessage>
                                {errors?.name && errors?.name?.message?.toString()}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors?.comment?.message?.toString()}>
                            <FormLabel htmlFor='comment' fontWeight={'bold'}>Dejanos tu comentario</FormLabel>
                            <Textarea placeholder="Tu comentario aqui ..."
                                {...register('comment', {
                                    required: 'Este campo no puede estar vacío',
                                    maxLength: {
                                        value: 200,
                                        message: 'El comentario no puede contener mas de 200 caracteres'
                                    }
                                })}
                            ></Textarea>
                            <FormErrorMessage>
                                {errors?.comment && errors?.comment?.message?.toString()}
                            </FormErrorMessage>
                        </FormControl>
                        <Button className='bg-purple-500' width={'fit-content'} mt={'1rem'} _hover={{
                            bg: 'purple',
                            color: 'white'
                        }}
                            color={'white'} type='submit' isLoading={isSubmitting}>
                            Enviar
                        </Button>
                    </Flex>
                </form>
            </Card>
        </Flex>
    )
}