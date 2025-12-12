import * as yup from 'yup';

export const UserRegisterSchemaValidation = yup.object().shape({
    email: yup.string().email('Not a Valid Email Format!!').required('Email is Required..'),
    password: yup.string().required('Password is Required..').min(6, 'Minimum 6 characters required..'),
    uname: yup.string().required('Username is required!!!'),
    phone: yup.string().required("Phone Number is required!").matches(/^[79][0-9]+$/, "Only digits allowed").min(8, "Min 8 digits").max(8, "Max 8 digits"),
});