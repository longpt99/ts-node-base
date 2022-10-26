import { ProductAttribute } from './product-attribute.entity';

export type ProductAttributeModel = ProductAttribute;

export interface CreateProductAttributeParams {
  quantity?: number;
  price?: number;
  key: string;
  value: string;
}

export interface UpdateProductAttributeParams {
  id: string;
  quantity?: number;
  price?: number;
  key: string;
  value: string;
}
