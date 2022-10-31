import { Order } from './order.entity';

export type OrderModel = Order;

export interface CreateOrderParams {
  products: {
    id: string;
    productAttributes: {
      id: string;
      quantity: number;
    }[];
  }[];
  shippingAddress: {
    city: string;
    district: string;
    ward: string;
    street: string;
  };
}
