import SearchSelect, {
  SearchSelectProps,
} from '@webportal/libs/forms/shared/SearchSelect';
import { api } from '@webportal/services';
import { Faculty } from 'database';
import React, { useCallback, useState } from 'react';

export interface FacultyFieldProps
  extends Omit<SearchSelectProps, 'onSelect' | 'options'> {
  // eslint-disable-next-line no-unused-vars
  onSelectFaculty: (value?: string) => void;
}

export const FacultyField: React.FC<FacultyFieldProps> = ({
  onSelectFaculty,
  value,
  ...props
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [faculties, setFaculties] = useState<Faculty[]>([]);

  const getFaculty = useCallback(async (name: string) => {
    try {
      setLoading(true);
      const res = await api.faculty.getFaculties({
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
        take: 4,
      });
      setFaculties(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  return (
    <SearchSelect
      onSelect={onSelectFaculty}
      loading={loading}
      value={value}
      onSearch={getFaculty}
      options={faculties.map(p => ({ title: p.name, value: p.id?.toString() }))}
      {...props}
    />
  );
};
