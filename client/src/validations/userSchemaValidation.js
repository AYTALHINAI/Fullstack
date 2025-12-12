import * as yup from 'yup';

export const UserSchemaValidation = yup.object().shape({
    email:yup.string().email('Not a Valid Email Format!!').required('Email is Required..'),
    password:yup.string().required('Password is Required..').min(6,'Minimum 6 characters required..'),
});