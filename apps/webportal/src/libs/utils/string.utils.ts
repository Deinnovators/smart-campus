import { moduleImageDir } from '@webportal/constants/api.constants';

export const getModuleImageUrl = (imageName: string) => {
  if (!imageName) return '';
  if (imageName.startsWith('http')) return imageName;
  return moduleImageDir + '/' + imageName;
};
