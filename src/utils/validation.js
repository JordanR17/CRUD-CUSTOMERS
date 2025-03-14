const sanitizeInput = (input, typeInput) => {
    if (typeof input !== 'string') {
        return '';
    }

    if (typeInput === 'password') {
        return input.replace(/[^A-Za-z\d@$!%*?&\-+]/g, '');
    } else if (typeInput === 'phone') {
        return input.replace(/[^\d]/g, ''); // Ahora solo deja números
    } else if (typeInput === 'email') {
        return input.replace(/[^\w@.-]/gi, ''); // Permite email válido
    } else {
        return input.replace(/[^A-Za-z\s]/gi, ''); // Solo letras y espacios
    }
};
export const validateInputs = (name, lastname, email, address, phone) => {
    const s = {
        name: sanitizeInput(name, 'name'),
        lastname: sanitizeInput(lastname, 'lastname'),
        email: sanitizeInput(email, 'email').trim(), // Remueve espacios extras
        address: sanitizeInput(address, 'address'),
        phone: sanitizeInput(phone, 'phone').trim(), // Asegura que solo tenga números
    };

    const regexEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    const regexPhone = /^\d{10}$/;

    const errors = [];

    if (!s.name || !s.lastname || !s.email || !s.address || !s.phone) {
        errors.push({ msg: 'Todos los campos son requeridos', type: 'danger' });
    }

    if (!regexEmail.test(s.email)) {
        errors.push({ msg: 'Oops! Esto no parece ser un email válido', type: 'danger' });
    }
    if (!regexPhone.test(s.phone)) {
        errors.push({ msg: 'Oops! El número de teléfono no es válido', type: 'danger' });
    }

    return { errors, s };
};
