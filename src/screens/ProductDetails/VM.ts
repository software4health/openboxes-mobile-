import { ProductCategory } from '../../data/product/category/ProductCategory';
import { Attributes } from '../../data/product/Attributes';
import { ProductType } from '../../data/product/ProductType';
import { ProductImage } from '../../data/product/ProductImage';

export interface VM {
  header: string;
  name: string;
  productCode: string;
  description: string;
  pricePerUnit: number;
  details: DetailsItemVM[];
  category: ProductCategory;
  attributes: Attributes[];
  productType: ProductType;
  images: ProductImage[];
  status: string;
  quantityAllocated: number;
  quantityAvailable: number;
  quantityOnHand: number;
  quantityOnOrder: number;
  unitOfMeasure: string;
  image?: any;
  availableItems: [];
}

export interface DetailsItemVM {
  key: string;
  name: string;
  value: string;
}
