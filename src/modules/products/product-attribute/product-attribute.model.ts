import { ProductAttribute } from './product-attribute.entity';

export type ProductAttributeModel = ProductAttribute;

export interface CreateProductAttributeParams {
  quantity?: number;
  price?: number;
  key: string;
  value: string;
}
