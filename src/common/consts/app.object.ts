export class AppObject {
  static readonly MODULES = {
    USER: 'User',
    ADMIN: 'Admin',
  };

  static readonly COMMON_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    DELETED: 'deleted',
    UNVERIFIED: 'unverified',
  };

  static readonly REQUEST_OBJECT = {
    BODY: 'body',
    PARAMS: 'params',
    QUERY: 'query',
  };

  static readonly GRANT_TYPES = {
    PASSWORD: 'password',
    FACEBOOK: 'facebook',
    GOOGLE: 'google',
  };
}
