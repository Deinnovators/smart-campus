import React, { useCallback, useState } from 'react';
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
import ModuleParentField from '@webportal/libs/forms/modules-registry/ModuleParentField';
import ImageUpload from '@webportal/libs/forms/shared/ImageUpload';

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
  status: 'active',
  url: '',
  accessToRoles: ['superadmin'],
};

export const BaseModuleForm: React.FC<BaseModuleFormProps> = ({
  onSubmit,
  initialValues,
  loading,
}) => {
  const [icon, setIcon] = useState<File>();
  const [iconError, setIconError] = useState<string>();

  const createFormData = useCallback(
    (values: any) => {
      if (!icon) {
        setIconError('Module image is required');
        return;
      }
      const formData: any = new FormData();
      const keys = Object.keys(values);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        formData.append(key, values[key]);
      }
      formData.delete('accessToRoles');
      formData.append('accessToRoles', JSON.stringify(values.accessToRoles));
      if (icon) {
        formData.append('icon', icon);
      }
      onSubmit?.(formData);
    },
    [icon, onSubmit],
  );

  const { values, handleSubmit, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: (initialValues as any) ?? newInitialValues,
      onSubmit: createFormData,
      validationSchema: addModuleValidationSchema,
    });

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <ImageUpload
        onChange={file => {
          setIconError('');
          setIcon(file);
        }}
        label={`${values.icon || icon ? 'Change' : 'Upload'} module image`}
        error={iconError}
      />
      <FormControl fullWidth margin='normal'>
        <TextField
          placeholder='Module name'
          label='Name'
          value={values.name}
          onChange={handleChange('name')}
          onBlur={handleBlur('name')}
          error={Boolean(touched.name && errors.name)}
          helperText={touched.name && (errors.name as any)}
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
          helperText={touched.url && (errors.url as any)}
        />
      </FormControl>
      <ModuleParentField
        placeholder='Type to search parent'
        label='Parent'
        variant='outlined'
        value={values.parentUrl}
        onBlur={handleBlur('parentUrl')}
        onSelectParent={handleChange('parentUrl') as any}
        error={Boolean(touched.parentUrl && errors.parentUrl)}
        helperText={touched.parentUrl && (errors.parentUrl as any)}
      />
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
          <FormHelperText error>{errors.accessToRoles as any}</FormHelperText>
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
          <FormHelperText error>{errors.status as any}</FormHelperText>
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
