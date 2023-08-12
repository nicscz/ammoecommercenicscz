import { ProductController } from './product'
import { HttpRequest, HttpResponse } from "../protocols/http"
import { MissingParamError } from '../errors'
import { Validation } from '../protocols/validation'

interface Product {
  id: number
  name: string,
  description: string,
  promo_price: number,
  original_price: number,
  images: string[],
  category: string
}

interface ProductList extends Product {
  list?: Product[]
}

interface ProductRepository {
  getProducts(): Promise<ProductList[]>
  getProductById(id: number): Promise<Product>
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null{
      return null
    }
  }
  return new ValidationStub()
}

const makeProductRepositoryStub = () => {
  class ProductRepositoryStub implements ProductRepository{
    getProducts(): Promise<ProductList[]> {
      return Promise.resolve([
        {
          id: 1, 
          name: 'Camiseta Casual',
          description: 'Uma camiseta confortável para o uso diário.',
          promo_price: 29.99,
          original_price: 39.99,
          images: [
            'https://exemplo.com/imagens/camiseta1.jpg'
          ],
          category: 'Vestuário'
        },
        {
          id: 2,
            name: 'Tênis Esportivo',
            description: 'Tênis durável e ideal para atividades físicas.',
            promo_price: 79.99,
            original_price: 89.99,
            images: [
              'https://exemplo.com/imagens/tenis1.jpg',
              'https://exemplo.com/imagens/tenis2.jpg'
            ],
            category: 'Calçados'
        }
      ])
    }

    getProductById(id: number): Promise<Product> {
      return Promise.resolve({
        id: 1, 
          name: 'Camiseta Casual',
          description: 'Uma camiseta confortável para o uso diário.',
          promo_price: 29.99,
          original_price: 39.99,
          images: [
            'https://exemplo.com/imagens/camiseta1.jpg'
          ],
          category: 'Vestuário'
      })
    }
  }

  return new ProductRepositoryStub()
}

interface SutTypes {
  sut: ProductController,
  productRepositoryStub: ProductRepository,
  validation: Validation
}

const makeSut = (): SutTypes => {
  const productRepositoryStub = makeProductRepositoryStub()
  const validation = makeValidation()
  const sut = new ProductController(productRepositoryStub, validation)
  return {
    sut,
    productRepositoryStub,
    validation
  }
}

describe('Product Controller', () => {
  describe('GetProducts', () => {
      test('Should return a list of products', async () => {
        const { sut } = makeSut()
        const result = await sut.getProducts()
        expect(result).toEqual({
          statusCode: 200,
          body: [
            {
              id: 1, 
              name: 'Camiseta Casual',
              description: 'Uma camiseta confortável para o uso diário.',
              promo_price: 29.99,
              original_price: 39.99,
              images: [
                'https://exemplo.com/imagens/camiseta1.jpg'
              ],
              category: 'Vestuário'
            },
            {
              id: 2,
                name: 'Tênis Esportivo',
                description: 'Tênis durável e ideal para atividades físicas.',
                promo_price: 79.99,
                original_price: 89.99,
                images: [
                  'https://exemplo.com/imagens/tenis1.jpg',
                  'https://exemplo.com/imagens/tenis2.jpg'
                ],
                category: 'Calçados'
            }
          ]
        })
      })

      test('should throw if GetProducts throws', async () => {
        const { sut, productRepositoryStub } = makeSut();
        
        jest.spyOn(productRepositoryStub, 'getProducts').mockRejectedValueOnce(new Error());
      
        try {
          await sut.getProducts();
          fail('Expected an exception to be thrown')
        } catch (error) {
          expect(error).toBeInstanceOf(Error)
        }
      });
      
  })

  describe('GetProductById', () => {
    test('Should return a product', async () => {
      const { sut } = makeSut()

      const httpRequest: HttpRequest = {
        body: {
          id: 1
        }
      }

      const result = await sut.getProductById(httpRequest)

      expect(result).toEqual({
        statusCode: 200,
        body: {
          id: 1, 
            name: 'Camiseta Casual',
            description: 'Uma camiseta confortável para o uso diário.',
            promo_price: 29.99,
            original_price: 39.99,
            images: [
              'https://exemplo.com/imagens/camiseta1.jpg'
            ],
            category: 'Vestuário'
        } 
      })
    })
  })
})
