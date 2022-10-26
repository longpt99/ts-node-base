import {
  CreateProductAttributeParams,
  UpdateProductAttributeParams,
} from '../product-attribute/product-attribute.model';
import { Product } from './product.entity';

export type ProductModel = Product;

export interface CreateProductParams {
  name: string;
  description: string;
  status: string;
  price: number;
  quantity: number;
  productAttributes: CreateProductAttributeParams[];
}

export type UpdateProductParams = Partial<
  Omit<CreateProductParams, 'status' | 'productAttributes'>
> & {
  productAttributes: UpdateProductAttributeParams[];
};
