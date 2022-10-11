export class AppObject {
  static readonly TOKEN_TYPES = {
    BEARER: 'Bearer',
  };

  static readonly ERR_CODE_DB = {
    UNIQUE: '23505',
  };

  static readonly MODULES = {
    USER: 'User',
    ADMIN: 'Admin',
  };

  static readonly ROLES = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    SUPERVISOR: 'supervisor',
    STAFF: 'staff',
  };

  static readonly ENVIRONMENTS = {
    DEV: 'dev',
    LOCAL: 'local',
    PRODUCTION: 'production',
  };

  static readonly COMMON_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    DELETED: 'deleted',
  };

  static readonly USER_STATUS = {
    ...AppObject.COMMON_STATUS,
    UNVERIFIED: 'unverified',
  };

  static readonly PRODUCT_STATUS = {
    ...AppObject.COMMON_STATUS,
    SOLD_OUT: 'sold_out',
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
