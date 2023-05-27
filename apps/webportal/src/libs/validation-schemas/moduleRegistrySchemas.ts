import * as yup from 'yup';

export const addModuleValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  url: yup.string().required('Module url is required'),
  status: yup
    .string()
    .test(
      'oneOfRequired',
      'Status should be active or inactive',
      item => item === 'active' || item === 'inactive',
    ),
});
