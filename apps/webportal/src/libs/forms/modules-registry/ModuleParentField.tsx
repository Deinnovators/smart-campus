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
import { api } from '@webportal/services';
import { ModuleRegistry } from 'database';
import React, { useCallback, useEffect, useState } from 'react';

export interface ModuleParentFieldProps
  extends Omit<OutlinedTextFieldProps, 'onChange' | 'onFocus'> {
  // eslint-disable-next-line no-unused-vars
  onSelectParent: (value?: string) => void;
}

const ModuleParentField: React.FC<ModuleParentFieldProps> = ({
  onSelectParent,
  value,
  onBlur,
  ...props
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [parents, setParents] = useState<ModuleRegistry[]>([]);
  const [text, setText] = useState<string>('');
  const valueText = React.useMemo(() => {
    const parent = parents.find(p => p.url === value);
    return parent?.name;
  }, [parents, value]);

  const getParents = useCallback(async (name: string) => {
    try {
      setLoading(true);
      const res = await api.modules.getParents({
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
        take: 4,
      });
      setParents(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  const debouncedGetParents = React.useMemo(() => {
    return debounce(getParents);
  }, [getParents]);

  useEffect(() => {
    debouncedGetParents(text);
  }, [debouncedGetParents, text]);

  return (
    <FormControl
      fullWidth
      margin='normal'
      style={{ position: 'relative', overflow: 'visible' }}>
      <TextField
        value={isEditing ? text : valueText}
        onFocus={() => setIsEditing(true)}
        onChange={e => setText(e.target.value)}
        onBlur={e => {
          onBlur?.(e);
        }}
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
                onSelectParent?.();
              }}
              sx={{ padding: 2 }}>
              None
            </MenuItem>
            {parents.map(p => (
              <MenuItem
                key={p.url}
                onClick={() => {
                  setText('');
                  setIsEditing(false);
                  onSelectParent?.(p.url);
                }}
                sx={{ padding: 2 }}>
                {p.name}
              </MenuItem>
            ))}
          </Paper>
        </Box>
      </Zoom>
    </FormControl>
  );
};

export default ModuleParentField;
