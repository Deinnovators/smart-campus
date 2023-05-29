import * as yup from 'yup';

export const addUserValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  uid: yup.string().required('Id is required'),
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 character')
    .required('Password is required'),
  nationality: yup.string().required('Nationality is required'),
  nationalityType: yup.string().required('Nationality type is required'),
  role: yup.string().required('Role is required'),
});
