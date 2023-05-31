import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { nationalityTypes, roles } from '@webportal/constants';
import PasswordField from '@webportal/libs/forms/shared/PasswordField';
import { DepartmentField } from '@webportal/libs/forms/users/DepartmentField';
import { FacultyField } from '@webportal/libs/forms/users/FacultyField';
import { addUserValidationSchema } from '@webportal/libs/validation-schemas/userSchemas';
import { api } from '@webportal/services';
import { User } from 'database';
import { useFormik } from 'formik';
import React, { useState } from 'react';

export interface AddUserFormProps {
  onSuccess?: (user: User) => void;
}

export const AddUserForm: React.FC<AddUserFormProps> = ({ onSuccess }) => {
  const [showNationality, setShowNationality] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDepartmentDisabled, setIsDepartmentDisabled] =
    useState<boolean>(true);

  const onSubmit = async (v: any) => {
    try {
      const values = { ...v };
      setLoading(true);
      if (values.facultyId) {
        values.faculty = {
          connect: { id: +values.facultyId },
        };
        delete values.facultyId;
      }
      if (values.departmentId) {
        values.department = {
          connect: { id: +values.departmentId },
        };
        delete values.departmentId;
      }
      const res = await api.users.createUser(values);
      setLoading(false);
      onSuccess?.(res);
    } catch (error) {
      setLoading(false);
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: '',
      uid: '',
      email: '',
      password: '',
      nationalityType: 'native',
      nationality: 'Bangladeshi',
      role: '',
      facultyId: undefined,
      departmentId: undefined,
    },
    onSubmit,
    validationSchema: addUserValidationSchema,
  });

  return (
    <Card sx={{ padding: 4 }}>
      <Box p={2}>
        <Box py={2} display='flex' justifyContent='center' alignItems='center'>
          <Typography variant='h6'>Add new user</Typography>
        </Box>
        <Box component='form' onSubmit={handleSubmit}>
          <FormControl fullWidth margin='normal'>
            <TextField
              label='Name'
              placeholder='Full name'
              value={values.name}
              onChange={handleChange('name')}
              onBlur={handleBlur('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
          </FormControl>
          <FormControl fullWidth margin='normal'>
            <TextField
              label='Id'
              placeholder='Related Id'
              value={values.uid}
              onChange={handleChange('uid')}
              onBlur={handleBlur('uid')}
              error={Boolean(touched.uid && errors.uid)}
              helperText={touched.uid && errors.uid}
            />
          </FormControl>
          <FormControl fullWidth margin='normal'>
            <TextField
              label='Email'
              type='email'
              placeholder='User email'
              value={values.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </FormControl>
          <FormControl fullWidth margin='normal'>
            <PasswordField
              label='Password'
              placeholder='User password'
              value={values.password}
              onChange={handleChange('password')}
              onBlur={handleBlur('password')}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </FormControl>
          <FacultyField
            label='Faculty'
            onSelectFaculty={(id?: string) => {
              if (id) {
                setIsDepartmentDisabled(false);
                setFieldValue('facultyId', id);
              }
            }}
            onBlur={handleBlur('facultyId')}
            error={Boolean(touched.facultyId && errors.facultyId)}
            helperText={touched.facultyId && errors.facultyId}
            value={values.facultyId}
          />
          <DepartmentField
            disabled={isDepartmentDisabled}
            label='Department'
            onSelectDepartment={(id?: string) => {
              if (id) {
                setFieldValue('departmentId', id);
              }
            }}
            onBlur={handleBlur('departmentId')}
            error={Boolean(touched.departmentId && errors.departmentId)}
            helperText={touched.departmentId && errors.departmentId}
            value={values.departmentId}
          />
          <FormControl fullWidth margin='normal'>
            <InputLabel id='nationality-type-select'>
              Nationality Type
            </InputLabel>
            <Select
              label='Nationality Type'
              id='nationality-select'
              labelId='nationality-type-select'
              value={values.nationalityType}
              onChange={e => {
                const value = e.target.value;
                if (value === 'foreign') {
                  setFieldValue('nationality', '');
                  setShowNationality(true);
                } else {
                  setShowNationality(false);
                  setFieldValue('nationality', 'Bangladeshi');
                }
                setFieldValue('nationalityType', value);
              }}
              onBlur={handleBlur('nationalityType')}
              error={Boolean(
                touched.nationalityType && errors.nationalityType,
              )}>
              {nationalityTypes.map(nationalityType => (
                <MenuItem key={nationalityType} value={nationalityType}>
                  <Typography sx={{ textTransform: 'capitalize' }}>
                    {nationalityType}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
            {touched.nationalityType && errors.nationalityType ? (
              <FormHelperText error>
                {errors.nationalityType as any}
              </FormHelperText>
            ) : null}
          </FormControl>
          {showNationality ? (
            <FormControl fullWidth margin='normal'>
              <TextField
                label='Nationality'
                placeholder='User nationality'
                value={values.nationality}
                onChange={handleChange('nationality')}
                onBlur={handleBlur('nationality')}
                error={Boolean(touched.nationality && errors.nationality)}
                helperText={touched.nationality && errors.nationality}
              />
            </FormControl>
          ) : null}
          <FormControl fullWidth margin='normal'>
            <InputLabel id='roles-select-label'>Role</InputLabel>
            <Select
              label='Role'
              id='roles-select'
              labelId='roles-select-label'
              value={values.role}
              onChange={handleChange('role') as any}
              onBlur={handleBlur('role')}
              error={Boolean(touched.role && errors.role)}>
              {roles.map(role => (
                <MenuItem key={role} value={role}>
                  <Typography sx={{ textTransform: 'capitalize' }}>
                    {role}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
            {touched.role && errors.role ? (
              <FormHelperText error>{errors.role as any}</FormHelperText>
            ) : null}
          </FormControl>
          <FormControl margin='normal'>
            <Button variant='contained' type='submit'>
              {loading ? (
                <CircularProgress color='inherit' size={24} />
              ) : (
                'Add user'
              )}
            </Button>
          </FormControl>
        </Box>
      </Box>
    </Card>
  );
};
