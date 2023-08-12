export interface ProductModel {
  id: number
  name: string
  description: string
  promo_price: number
  original_price: number
  images: string[]
  category: string
}

export interface ProductList extends ProductModel {
  list?: ProductModel[]
  currentPage?: number
  totalPages?: number
  totalProducts?: number
}
