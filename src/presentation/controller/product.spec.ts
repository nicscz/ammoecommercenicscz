import { ProductController } from "./product";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { MissingParamError } from "../errors";
import { Validation } from "../protocols/validation";
import { ProductModel, ProductList } from "../../domain/models/product"
import { ProductRepository } from '../../data/protocols/db/product/repositories/productRepository'

const makeProductValidationId = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null;
    }
  }
  return new ValidationStub();
};

const makeProductValidationName = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null;
    }
  }
  return new ValidationStub();
};

const makeProductRepositoryStub = () => {
  class ProductRepositoryStub implements ProductRepository {
    getProductsPaginated(
      page: number,
      pageSize: number
    ): Promise<ProductList[]> {
      return Promise.resolve([
        {
          id: 1,
          name: "Camiseta Casual",
          description: "Uma camiseta confortável para o uso diário.",
          promo_price: 29.99,
          original_price: 39.99,
          images: ["https://exemplo.com/imagens/camiseta1.jpg"],
          category: "Vestuário",
        },
        {
          id: 2,
          name: "Tênis Esportivo",
          description: "Tênis durável e ideal para atividades físicas.",
          promo_price: 79.99,
          original_price: 89.99,
          images: [
            "https://exemplo.com/imagens/tenis1.jpg",
            "https://exemplo.com/imagens/tenis2.jpg",
          ],
          category: "Calçados",
        },
      ]);
    }

    getTotalProductCount(): Promise<number> {
      return Promise.resolve(37);
    }

    getProductByName(name: string): Promise<ProductModel> {
      return Promise.resolve({
        id: 1,
        name: "Camiseta Casual",
        description: "Uma camiseta confortável para o uso diário.",
        promo_price: 29.99,
        original_price: 39.99,
        images: ["https://exemplo.com/imagens/camiseta1.jpg"],
        category: "Vestuário",
      });
    }

    deleteProductById(id: any): Promise<boolean> {
      return Promise.resolve(true);
    }
  }

  return new ProductRepositoryStub();
};

interface SutTypes {
  sut: ProductController
  validationId: Validation
  validationName: Validation
  productRepositoryStub: ProductRepository
}

const makeSut = (): SutTypes => {
  const productRepositoryStub = makeProductRepositoryStub();
  const validationId = makeProductValidationId();
  const validationName = makeProductValidationName();
  const sut = new ProductController(productRepositoryStub, validationId, validationName);
  return {
    sut,
    validationId,
    validationName,
    productRepositoryStub
  };
};

describe("Product Controller", () => {
  describe("GetProducts", () => {
    test("Should return a list of products", async () => {
      const { sut } = makeSut();
      const page: number = 1,
        pageSize: number = 10;
      const result = await sut.getProducts(page, pageSize);

      expect(result).toEqual({
        statusCode: 200,
        body: {
          currentPage: 1,
          products: [
            {
              id: 1,
              name: "Camiseta Casual",
              description: "Uma camiseta confortável para o uso diário.",
              promo_price: 29.99,
              original_price: 39.99,
              images: ["https://exemplo.com/imagens/camiseta1.jpg"],
              category: "Vestuário",
            },
            {
              id: 2,
              name: "Tênis Esportivo",
              description: "Tênis durável e ideal para atividades físicas.",
              promo_price: 79.99,
              original_price: 89.99,
              images: [
                "https://exemplo.com/imagens/tenis1.jpg",
                "https://exemplo.com/imagens/tenis2.jpg",
              ],
              category: "Calçados",
            },
          ],
          totalPages: 4,
          totalProducts: 37,
        },
      });
    });

    test("should throw if GetProducts throws", async () => {
      const { sut, productRepositoryStub } = makeSut();

      jest
        .spyOn(productRepositoryStub, "getProductsPaginated")
        .mockRejectedValueOnce(new Error());

      try {
        await sut.getProducts();
        fail("Expected an exception to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe("GetProductByName", () => {
    test("Should return a product", async () => {
      const { sut } = makeSut();

      const httpRequest: HttpRequest = {
        body: {
          name: "Camiseta Casual",
        },
      };

      const result = await sut.getProductByName(httpRequest);

      expect(result).toEqual({
        statusCode: 200,
        body: {
          id: 1,
          name: "Camiseta Casual",
          description: "Uma camiseta confortável para o uso diário.",
          promo_price: 29.99,
          original_price: 39.99,
          images: ["https://exemplo.com/imagens/camiseta1.jpg"],
          category: "Vestuário",
        },
      });
    });

    test("Should return 400 if no id is provided", async () => {
      const { sut, validationName } = makeSut();
      jest.spyOn(validationName, "validate").mockReturnValueOnce(new MissingParamError("id"));

      const httpRequest: HttpRequest = {
        body: {
          name: null,
        },
      };

      const result = await sut.getProductByName(httpRequest);

      expect(result).toEqual({
        statusCode: 400,
        body: new MissingParamError("id")
      });
    });

    test("should throw if GetProductByName throws", async () => {
      const { sut, productRepositoryStub } = makeSut();

      jest
        .spyOn(productRepositoryStub, "getProductByName")
        .mockRejectedValueOnce(new Error());

      const httpRequest: HttpRequest = {
        body: {
          name: "Camiseta Casual",
        },
      };

      try {
        await sut.getProductByName(httpRequest);
        fail("Expected an exception to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe("DeleteProductById", () => {
    test("Should return 400 if no id is provided", async () => {
      const { sut, validationId: validation } = makeSut();
      jest.spyOn(validation, "validate").mockReturnValueOnce(new MissingParamError("id"));

      const httpRequest: HttpRequest = { body: { id: null } }

      const result = await sut.deleteProductById(httpRequest);

      expect(result).toEqual({
        body: new MissingParamError('id'),
        statusCode: 400
      });
    });

    test('Should delete a product', async () => {
      const { sut } = makeSut()

      const httpRequest: HttpRequest = { params: { id: 1 } }

      const result = await sut.deleteProductById(httpRequest)

      expect(result).toEqual({
        "statusCode": 200,
        "body": true
      })
    })

    test('Should throw if deleteProductById throws', async () => {
      const { sut, productRepositoryStub } = makeSut()
      
      jest
        .spyOn(productRepositoryStub, "deleteProductById")
        .mockRejectedValueOnce(new Error());

      const httpRequest: HttpRequest = {
        body: {
          id: 1,
        },
      };

      try {
        await sut.deleteProductById(httpRequest);
        fail("Expected an exception to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    })
  });
});
