import { SheltieButton } from "@/components/Button/Button";
import { TextAreaInput, TextInput } from "@/components/FormInput/FormInput";
import { PageTitle } from "@/components/PageTitle/PageTitle";
import { ShelterService } from "@/services/shelterService";
import { Validations } from "@/utils/Validations";
import { Card, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Comment = {
    id: number
    person_name: string
    comment: string
}

export function Comments({ initialComments, shelterId }: { initialComments: Comment[], shelterId: number }) {
    const shelterService = new ShelterService()

    const [comments, setComments] = useState(initialComments || [])
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
                const lastComment = comments[comments.length - 1]
                setComments([...comments, { id: lastComment!.id + 1, person_name: values.name, comment: values.comment }])
                reset()
            })
            .catch(e => {
                console.log(e)
                toast.update(notif, { render: 'No pudimos registrar tu comentario, por favor intenta mas tarde', type: "error", isLoading: false })
            })
    }


    return (

        <Flex flexDirection={"column"} gap={'1rem'}>
            <PageTitle title="Comentarios sobre nuestro trabajo" />
            <Flex flexDirection={'column'} gap={'1rem'}>
                {comments.map((comment, index) => {
                    return (
                        <Card key={index} padding={'1rem'} variant={'filled'}>
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
                        <TextInput label="Tu nombre" fieldName="name" errorObj={errors?.name} validations={Validations['humanName']} register={register} />
                        <TextAreaInput label="Dejanos tu comentario" errorObj={errors?.comment} register={register} validations={Validations['comment']} fieldName="comment" />
                        <SheltieButton alignMiddle={false} fitContent label="Enviar" type={'submit'} />
                    </Flex>
                </form>
            </Card>
        </Flex>
    )
}