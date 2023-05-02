import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { addModuleValidationSchema } from '@webportal/libs/validation-schemas/moduleRegistrySchemas';
import { useFormik } from 'formik';
import { Prisma } from 'database';

export interface BaseModuleFormProps {
  onSubmit: (value: Prisma.ModuleRegistryCreateInput) => void;
  initialValues?: Prisma.ModuleRegistryCreateInput;
  loading?: boolean;
}
const roles = [
  'superadmin',
  'admin',
  'student',
  'teacher',
  'beneficiary',
  'stuff',
  'alumni',
];

const newInitialValues = {
  name: '',
  icon: '',
  status: 'active',
  url: '',
  accessToRoles: ['superadmin'],
};

export const BaseModuleForm: React.FC<BaseModuleFormProps> = ({
  onSubmit,
  initialValues,
  loading,
}) => {
  const { values, handleSubmit, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: (initialValues as any) ?? newInitialValues,
      onSubmit,
      validationSchema: addModuleValidationSchema,
    });

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <FormControl fullWidth margin='normal'>
        <TextField
          placeholder='Module name'
          label='Name'
          value={values.name}
          onChange={handleChange('name')}
          onBlur={handleBlur('name')}
          error={Boolean(touched.name && errors.name)}
          helperText={touched.name && errors.name}
        />
      </FormControl>
      <FormControl fullWidth margin='normal'>
        <TextField
          placeholder='Module image url'
          label='Image'
          value={values.icon}
          onChange={handleChange('icon')}
          onBlur={handleBlur('icon')}
          error={Boolean(touched.icon && errors.icon)}
          helperText={touched.icon && errors.icon}
        />
      </FormControl>
      <FormControl fullWidth margin='normal'>
        <TextField
          placeholder='Module url'
          label='Url'
          value={values.url}
          onChange={handleChange('url')}
          onBlur={handleBlur('url')}
          error={Boolean(touched.url && errors.url)}
          helperText={touched.url && errors.url}
        />
      </FormControl>
      <FormControl variant='outlined' fullWidth margin='normal'>
        <InputLabel id='roles-select-label'>Access Roles</InputLabel>
        <Select
          label='Access Roles'
          id='roles-select'
          labelId='roles-select-label'
          multiple
          renderValue={(selected: string[]) => selected.join(', ')}
          value={values.accessToRoles as string[]}
          onChange={handleChange('accessToRoles') as any}
          error={Boolean(touched.accessToRoles && errors.accessToRoles)}
          onBlur={handleBlur('accessToRoles')}>
          {roles.map(role => (
            <MenuItem key={role} value={role}>
              <Checkbox
                checked={(values.accessToRoles as string[])?.indexOf(role) > -1}
              />
              <ListItemText primary={role} />
            </MenuItem>
          ))}
        </Select>
        {touched.accessToRoles && errors.accessToRoles ? (
          <FormHelperText error>{errors.accessToRoles}</FormHelperText>
        ) : null}
      </FormControl>
      <FormControl fullWidth margin='normal'>
        <TextField
          select
          label='Status'
          value={values.status}
          onChange={handleChange('status') as any}
          error={Boolean(touched.status && errors.status)}
          onBlur={handleBlur('status')}>
          <MenuItem value='active'>Active</MenuItem>
          <MenuItem value='inactive'>Inactive</MenuItem>
        </TextField>
        {touched.status && errors.status ? (
          <FormHelperText error>{errors.status}</FormHelperText>
        ) : null}
      </FormControl>
      <FormControl margin='normal'>
        <Button disabled={loading} type='submit' variant='contained'>
          {loading ? <CircularProgress color='inherit' size={24} /> : 'Add'}
        </Button>
      </FormControl>
    </Box>
  );
};
