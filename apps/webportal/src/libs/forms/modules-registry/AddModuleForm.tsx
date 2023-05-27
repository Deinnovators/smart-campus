import React, { useCallback, useState } from 'react';
import { api } from '@webportal/services';
import { ModuleRegistry } from 'database';
import { BaseModuleForm } from './BaseModuleForm';

export interface AddModuleFormProps {
  onSuccess?: (data: ModuleRegistry) => void;
}

export const AddModuleForm: React.FC<AddModuleFormProps> = ({ onSuccess }) => {
  const onSubmit = useCallback(
    async (e: any) => {
      try {
        setLoading(true);
        const res = await api.modules.createModule(e, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setLoading(false);
        onSuccess?.(res);
      } catch (error) {
        setLoading(false);
      }
    },
    [onSuccess],
  );
  const [loading, setLoading] = useState<boolean>(false);

  return <BaseModuleForm onSubmit={onSubmit} loading={loading} />;
};
