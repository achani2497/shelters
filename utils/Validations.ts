export const Validations = {
    humanName: {
        required: 'Es necesario que ingreses tu nombre',
        minLength: {
            value: 7,
            message: 'Tu nombre debe tener mas de 7 caractéres'
        },
        maxLength: {
            value: 70,
            message: 'Tu nombre no puede tener mas de 70 caractéres'
        }
    },
    dogName: {
        required: 'Es necesario que ingreses el nombre de tu mascota',
        minLength: {
            value: 3,
            message: 'El nombre no puede tener menos de 3 caractéres'
        },
        maxLength: {
            value: 20,
            message: 'El nombre no puede tener mas de 20 caractéres'
        }
    },
    location: {
        required: 'Es necesario que ingreses la ubicación',
        minLengt: {
            value: 10,
            message: 'La ubicación debe tener al menos 10 caractéres'
        },
        maxLength: {
            value: 70,
            message: 'La ubicación no puede exceder los 70 caracteres'
        }
    },
    phone: {
        required: 'Es necesario que ingreses un teléfono de contacto',
        maxLength: {
            value: 10,
            message: 'El teléfono debe tener 10 caracteres'
        },
        minLength: {
            value: 10,
            message: 'El teléfono debe tener 10 caracteres'
        }
    },
    comment: {
        required: 'Este campo no puede estar vacío',
        maxLength: {
            value: 200,
            message: 'El comentario no puede contener mas de 200 caracteres'
        }
    },
    age: {
        required: 'Es necesario que ingreses tu edad',
        max: {
            value: 120,
            message: 'Edad inválida'
        },
        min: {
            value: 18,
            message: 'Debes tener al menos 18 años para anotarte como voluntario'
        }
    },
    mail: {
        required: 'Es necesario que ingreses tu email',
        maxLength: {
            value: 40,
            message: 'El mail no puede exceder los 40 caractéres'
        },
        pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Email inválido',
        },
    },
    donation: {
        required: 'Es necesario que ingreses una cantidad',
        valueAsNumber: true,
        min: {
            value: 0,
            message: 'La cantidad minima es 0'
        }
    }
}