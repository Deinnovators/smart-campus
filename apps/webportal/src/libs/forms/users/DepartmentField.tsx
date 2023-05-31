import SearchSelect, {
  SearchSelectProps,
} from '@webportal/libs/forms/shared/SearchSelect';
import { api } from '@webportal/services';
import { Department } from 'database';
import React, { useCallback, useState } from 'react';

export interface DepartmentFieldProps
  extends Omit<SearchSelectProps, 'onSelect' | 'options'> {
  // eslint-disable-next-line no-unused-vars
  onSelectDepartment: (value?: string) => void;
}

export const DepartmentField: React.FC<DepartmentFieldProps> = ({
  onSelectDepartment,
  value,
  ...props
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [departments, setDepartments] = useState<Department[]>([]);

  const getDepartments = useCallback(async (name: string) => {
    try {
      setLoading(true);
      const res = await api.department.getDepartmets({
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
        take: 4,
      });
      setDepartments(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  return (
    <SearchSelect
      onSelect={onSelectDepartment}
      loading={loading}
      value={value}
      onSearch={getDepartments}
      options={departments.map(p => ({
        title: p.name,
        value: p.id?.toString(),
      }))}
      {...props}
    />
  );
};
