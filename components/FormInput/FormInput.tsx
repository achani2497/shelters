import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/react";

type CustomInput = {
    label: string
    fieldName: string
    type?: string
    placeholder?: string
    validations?: any
    register: any
    errorObj: any
    className?: string
}

export function TextInput({ label, fieldName, type = 'text', placeholder = '', validations = {}, register, errorObj, className = '' }: CustomInput) {
    return (
        <FormControl className={className} isInvalid={!!errorObj?.message?.toString()}>
            <FormLabel htmlFor={fieldName} fontWeight={'bold'}>{label}</FormLabel>
            <Input type={type} placeholder={placeholder} {
                ...register(fieldName, validations)
            } />
            <FormErrorMessage>
                {errorObj && errorObj?.message?.toString()}
            </FormErrorMessage>
        </FormControl>
    )
}

export function DateInput({ label, fieldName, validations = {}, register, errorObj }: CustomInput) {
    return (
        <FormControl isInvalid={!!errorObj?.message?.toString()}>
            <FormLabel htmlFor={fieldName} fontWeight={'bold'}>{label}</FormLabel>
            <Input type='date' {
                ...register(fieldName, validations)
            } />
            <FormErrorMessage>
                {errorObj && errorObj?.message?.toString()}
            </FormErrorMessage>
        </FormControl>
    )
}

export function TextAreaInput({ label, fieldName, placeholder = '', validations = {}, register, errorObj, className = '' }: CustomInput) {
    return (
        <FormControl className={className} isInvalid={!!errorObj?.message?.toString()}>
            <FormLabel htmlFor={fieldName} fontWeight={'bold'}>{label}</FormLabel>
            <Textarea placeholder={placeholder} {
                ...register(fieldName, validations)
            } />
            <FormErrorMessage>
                {errorObj && errorObj?.message?.toString()}
            </FormErrorMessage>
        </FormControl>
    )
}