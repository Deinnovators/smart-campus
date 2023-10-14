export const AuthHeaderKey = 'Authorization';
export const BaseUrl = process.env['NEXT_PUBLIC_BASE_API_URL'];
export const ApiUrl = BaseUrl + '/api';
export const getApiUrlOfVersion = (version: string) => ApiUrl + '/' + version;
export const uploadDir = BaseUrl + '/uploads';
export const moduleImageDir = uploadDir + '/modules';
export const userImageDir = uploadDir + '/users';
export const PaginationLimit = 20;
