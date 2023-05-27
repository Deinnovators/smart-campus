import { UploadFile } from '@mui/icons-material';
import { Box, FormControl, FormHelperText, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';

export interface ImageUploadProps {
  onChange: (file: File) => void;
  size?: number;
  imagePath?: string;
  label?: string;
  error?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  size = 150,
  imagePath,
  label,
  error,
}) => {
  const [iconPath, setIconPath] = useState<string>();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setIconPath(reader.result as string);
      };
      onChange(file);
    },
    [onChange],
  );

  return (
    <FormControl fullWidth margin='normal'>
      <input
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        id='module-icon'
        onChange={handleChange}
      />
      <label htmlFor='module-icon'>
        <Box
          justifyContent='center'
          alignItems='center'
          display='flex'
          flexDirection='column'>
          <Box
            height={size}
            width={size}
            display='flex'
            justifyContent='center'
            alignItems='center'
            overflow='hidden'
            style={{ cursor: 'pointer' }}
            borderRadius={2}
            my={1}
            bgcolor='GrayText'>
            {iconPath || imagePath ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={iconPath ?? imagePath}
                alt='module-image'
                style={{ height: 150, width: 150 }}
              />
            ) : (
              <UploadFile />
            )}
          </Box>
          {label ? (
            <Typography style={{ cursor: 'pointer' }}>{label}</Typography>
          ) : null}
          {error ? <FormHelperText error>{error}</FormHelperText> : null}
        </Box>
      </label>
    </FormControl>
  );
};

export default ImageUpload;
