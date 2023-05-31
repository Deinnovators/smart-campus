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
import SearchSelect, {
  SearchSelectProps,
} from '@webportal/libs/forms/shared/SearchSelect';
import { debounce } from '@webportal/libs/utils/debounce';
import { api } from '@webportal/services';
import { ModuleRegistry } from 'database';
import React, { useCallback, useEffect, useState } from 'react';

export interface ModuleParentFieldProps
  extends Omit<SearchSelectProps, 'onSelect' | 'options'> {
  // eslint-disable-next-line no-unused-vars
  onSelectParent: (value?: string) => void;
}

const ModuleParentField: React.FC<ModuleParentFieldProps> = ({
  onSelectParent,
  value,
  ...props
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [parents, setParents] = useState<ModuleRegistry[]>([]);

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

  return (
    <SearchSelect
      onSelect={onSelectParent}
      loading={loading}
      value={value}
      onSearch={getParents}
      options={parents.map(p => ({ title: p.name, value: p.url }))}
      {...props}
    />
  );
};

export default ModuleParentField;
