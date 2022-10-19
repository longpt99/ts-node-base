import { JSONSchemaType } from 'ajv';
import { ProductAttributeValidation } from '../product-attribute/product-attribute.validation';
import { CreateProductParams } from './product.model';

export const ProductValidation = {
  create: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        status: { type: 'string' },
        price: { type: 'number' },
        quantity: { type: 'integer' },
        productAttributes: {
          type: 'array',
          items: ProductAttributeValidation.create.body,
          minItems: 1,
        },
      },
      required: [
        'description',
        'name',
        'status',
        'price',
        'quantity',
        'productAttributes',
      ],
      additionalProperties: false,
      errorMessage: {
        // required: {
        //   email: 'emailIsRequired',
        //   password: 'passwordIsRequired',
        // },
      },
    } as JSONSchemaType<CreateProductParams>,
  },
};
