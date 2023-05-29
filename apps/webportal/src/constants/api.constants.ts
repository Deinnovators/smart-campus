export const AuthHeaderKey = 'Authorization';
export const BaseUrl = 'http://localhost:1337';
export const ApiUrl = BaseUrl + '/api';
export const getApiUrlOfVersion = (version: string) => ApiUrl + '/' + version;
export const uploadDir = BaseUrl + '/uploads';
export const moduleImageDir = uploadDir + '/modules';
export const userImageDir = uploadDir + '/users';
export const PaginationLimit = 20;
