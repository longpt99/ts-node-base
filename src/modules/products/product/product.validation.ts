import { JSONSchemaType } from 'ajv';
import { AppObject } from '../../../common/consts';
import { ProductAttributeValidation } from '../product-attribute/product-attribute.validation';
import { CreateProductParams, UpdateProductParams } from './product.model';

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
        category: {
          type: 'string',
          enum: Object.values(AppObject.PRODUCT_CATEGORY),
        },
      },
      required: [
        'description',
        'name',
        'status',
        'price',
        'quantity',
        'productAttributes',
        'category',
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
  update: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string', nullable: true },
        description: { type: 'string', nullable: true },
        price: { type: 'number', nullable: true },
        quantity: { type: 'integer', nullable: true },
        productAttributes: {
          type: 'array',
          items: ProductAttributeValidation.create.body,
          nullable: true,
        },
        category: {
          type: 'string',
          enum: Object.values(AppObject.PRODUCT_CATEGORY),
          nullable: true,
        },
      },
      additionalProperties: false,
      errorMessage: {},
    } as JSONSchemaType<UpdateProductParams>,
  },
};
