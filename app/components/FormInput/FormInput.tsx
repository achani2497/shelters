import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";

export function TextInput({ label, fieldName, type = 'text', placeholder = '', validations = {}, register, errorObj }: any) {
    return (
        <FormControl isInvalid={!!errorObj?.message?.toString()}>
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

export function DateInput({ label, fieldName, validations = {}, register, errorObj }: any) {
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
