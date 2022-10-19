import { JSONSchemaType } from 'ajv';
import { CreateProductAttributeParams } from './product-attribute.model';

export const ProductAttributeValidation = {
  create: {
    body: {
      type: 'object',
      properties: {
        key: { type: 'string' },
        value: { type: 'string' },
        quantity: { type: 'integer', nullable: true },
        price: { type: 'number', nullable: true },
      },
      required: ['key', 'value'],
      additionalProperties: false,
      errorMessage: {},
    } as JSONSchemaType<CreateProductAttributeParams>,
  },
};
