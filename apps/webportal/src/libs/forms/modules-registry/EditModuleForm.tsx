import React, { useCallback, useState } from 'react';
import { api } from '@webportal/services';
import { ModuleRegistry } from 'database';
import { BaseModuleForm } from './BaseModuleForm';
import { getModuleImageUrl } from '@webportal/libs/utils/string.utils';

export interface EditModuleFormProps {
  onSuccess?: (data: ModuleRegistry) => void;
  module: ModuleRegistry;
}

export const EditModuleForm: React.FC<EditModuleFormProps> = ({
  onSuccess,
  module,
}) => {
  const onSubmit = useCallback(
    async (e: any) => {
      try {
        setLoading(true);
        const res = await api.modules.updateModule(module.id, e, {
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
    [onSuccess, module.id],
  );
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: any = {
    name: module.name,
    parentUrl: module.parentUrl,
    url: module.url,
    accessToRoles: module.accessToRoles,
    status: module.status,
  };

  return (
    <BaseModuleForm
      onSubmit={onSubmit}
      loading={loading}
      initialValues={initialValues}
      imagePath={getModuleImageUrl(module.icon)}
    />
  );
};
