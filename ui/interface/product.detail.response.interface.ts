export interface IProductDetailResponse {
  _id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  category: string;
  freeShipping: boolean;
  description: string;
  sellerId: string;
}
