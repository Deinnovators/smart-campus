import React, { useState } from 'react';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export type PasswordFieldProps = Omit<TextFieldProps, 'type'>;

const PasswordField: React.FC<PasswordFieldProps> = ({ ...props }) => {
  const [showPass, setShowPass] = useState<boolean>();

  return (
    <TextField
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={() => setShowPass(prev => !prev)}>
              {showPass ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      type={showPass ? 'text' : 'password'}
    />
  );
};

export default PasswordField;
