export const AuthHeaderKey = 'Authorization';
export const BaseUrl = 'http://66.29.130.137:1338';
export const ApiUrl = BaseUrl + '/api';
export const getApiUrlOfVersion = (version: string) => ApiUrl + '/' + version;
export const uploadDir = BaseUrl + '/uploads';
export const moduleImageDir = uploadDir + '/modules';
export const userImageDir = uploadDir + '/users';
export const PaginationLimit = 20;
