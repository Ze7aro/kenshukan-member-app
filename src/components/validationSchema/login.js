import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),    
    password: Yup.string().min(8, '8 caracteres minimo').max(1000, 'Password es muy largo').required('Password es requerido'),
});