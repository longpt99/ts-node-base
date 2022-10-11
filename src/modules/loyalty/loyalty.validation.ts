import { JSONSchemaType } from 'ajv';
import { ICreateLoyalty } from './loyalty.model';

export const LoyaltyValidation = {
  create: {
    body: {
      type: 'object',
      properties: {
        point: { type: 'number' },
      },
      required: ['point'],
      additionalProperties: false,
      errorMessage: {
        type: 'should be an object', // will not replace internal "type" error for the property "foo"
        required: {
          point: 'pointRequired',
        },
      },
    } as JSONSchemaType<ICreateLoyalty>,
  },
};
