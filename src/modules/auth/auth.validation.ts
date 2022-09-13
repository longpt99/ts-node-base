import { JSONSchemaType } from 'ajv';
import { RegisterAccount } from '../user/user.interface';

export const AuthValidation = {
  register: {
    body: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          minLength: 5,
          errorMessage: {
            type: 'mustString',
            minLength: 'min length',
          },
        },
        password: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
      },
      required: ['email', 'password', 'firstName', 'lastName'],
      additionalProperties: false,
      errorMessage: {
        required: {
          firstName: 'firstNameIsRequired',
          lastName: 'lastNameIsRequired',
          email: 'emailIsRequired',
          password: 'passwordIsRequired',
        },
      },
    } as JSONSchemaType<RegisterAccount>,
  },
};
