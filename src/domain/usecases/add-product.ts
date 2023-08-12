import { ProductModel } from '../models/product'

export interface AddProductModel {
  name: string
  description: string
  promo_price: number
  original_price: number
  images: string[]
  category: string
}

export interface AddProduct {
  add: (product: AddProductModel) => Promise<ProductModel>
}
