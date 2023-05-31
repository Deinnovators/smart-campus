import {
  Box,
  FormControl,
  LinearProgress,
  MenuItem,
  OutlinedTextFieldProps,
  Paper,
  TextField,
  Zoom,
} from '@mui/material';
import { debounce } from '@webportal/libs/utils/debounce';
import React, { useEffect, useState } from 'react';

type Option = {
  value: string;
  title: string;
};

export interface SearchSelectProps
  extends Omit<
    OutlinedTextFieldProps,
    'onChange' | 'onFocus' | 'onSelect' | 'variant'
  > {
  options: Option[];
  onSearch?: (text: string) => void;
  onSelect?: (value?: string) => void;
  loading?: boolean;
}

export const SearchSelect: React.FC<SearchSelectProps> = ({
  value,
  onSelect,
  options,
  loading,
  onSearch,
  ...props
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const debouncedSearch = React.useMemo(() => {
    if (!onSearch) return;
    return debounce(onSearch);
  }, [onSearch]);

  const valueText = React.useMemo(() => {
    const parent = options.find(p => p.value === value);
    return parent?.title ?? '';
  }, [options, value]);

  useEffect(() => {
    debouncedSearch?.(text);
  }, [debouncedSearch, text]);

  return (
    <FormControl
      fullWidth
      margin='normal'
      style={{ position: 'relative', overflow: 'visible' }}>
      <TextField
        value={isEditing ? text : valueText}
        onFocus={() => setIsEditing(true)}
        onChange={e => setText(e.target.value)}
        {...props}
      />
      <Zoom in={isEditing}>
        <Box pt={1} position='absolute' width='100%' top={48} zIndex={999999}>
          {loading ? <LinearProgress /> : null}
          <Paper elevation={5}>
            <MenuItem
              key={''}
              onClick={() => {
                setText('');
                setIsEditing(false);
                onSelect?.('');
              }}
              sx={{ padding: 2 }}>
              None
            </MenuItem>
            {options.map(option => (
              <MenuItem
                key={option.value}
                onClick={() => {
                  setText('');
                  setIsEditing(false);
                  onSelect?.(option.value);
                }}
                sx={{ padding: 2 }}>
                {option.title}
              </MenuItem>
            ))}
          </Paper>
        </Box>
      </Zoom>
    </FormControl>
  );
};

export default SearchSelect;
