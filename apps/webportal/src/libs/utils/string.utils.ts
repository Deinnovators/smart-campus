import {
  moduleImageDir,
  userImageDir,
} from '@webportal/constants/api.constants';

export const getModuleImageUrl = (imageName: string) => {
  if (!imageName) return '';
  if (imageName.startsWith('http')) return imageName;
  return moduleImageDir + '/' + imageName;
};

export const getUserImageUrl = (imageName: string | null | undefined) => {
  if (!imageName) return '/images/user.webp';
  if (imageName.startsWith('http')) return imageName;
  return userImageDir + '/' + imageName;
};

export const getSpaceSeperatedName = (st: string = '') => {
  return st.replaceAll('_', ' ');
};
export const getAndSeperatedName = (st: string = '') => {
  return st.replaceAll('_', '&');
};
