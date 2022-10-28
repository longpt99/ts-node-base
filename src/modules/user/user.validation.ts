import { JSONSchemaType } from 'ajv';
import { UpdateUserProfileParams } from './user.interface';

export const UserValidation = {
  updateProfile: {
    body: {
      type: 'object',
      properties: {
        firstName: { type: 'string', nullable: true },
        lastName: { type: 'string', nullable: true },
        dateOfBirth: { type: 'string', nullable: true },
        mobilePhone: {
          type: 'object',
          nullable: true,
          properties: {
            dialCode: { type: 'string' },
            phone: { type: 'string' },
          },
          required: ['dialCode', 'phone'],
        },
      },
      additionalProperties: false,
      errorMessage: {},
    } as JSONSchemaType<UpdateUserProfileParams>,
  },
};
