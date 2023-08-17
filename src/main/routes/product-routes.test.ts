import { redis } from '../../infra/database/redis'
import request from 'supertest'
import app from '../config/app'
import * as dotenv from 'dotenv'
dotenv.config()

afterAll(async () => {
  await redis.quit();
});

describe('Product Routes', () => {
  describe('GET /products', () => {
    test('should return 200 on get products', async () => {
        await request(app)
        .get('/api/products?page=1&pageSize=2')
        .expect({
            statusCode: 200,
            body: {
              products: [
                {
                    "id": 35,
                    "nome": "Smartphone Modelo X",
                    "descricao": "Um smartphone avançado com recursos incríveis.",
                    "preco_promocional": "799.99",
                    "preco_original": "899.99",
                    "imagens": [
                        "smartphone_x.jpg"
                    ],
                    "categoria": "Eletrônicos",
                    "created_at": "2023-08-15T01:30:38.177Z"
                },
                {
                    "id": 37,
                    "nome": "Fone de Ouvido Bluetooth Premium",
                    "descricao": "Fone de ouvido premium com qualidade de áudio excepcional.",
                    "preco_promocional": "149.99",
                    "preco_original": "179.99",
                    "imagens": [
                        "fone_premium.jpg"
                    ],
                    "categoria": "Acessórios",
                    "created_at": "2023-08-15T01:30:38.177Z"
                }
            ],
              currentPage: 1,
              totalPages: 15,
              totalProducts: 29
            }
          })
    })
  })  
  describe('GET /productByName', () => {
    test('should return 200 on get a product by name ', async () => {
        await request(app)
        .get('/api/productByName')
        .send({
            "name": "Smartphone Modelo X"
        })
        .expect({
            "statusCode": 200,
            "body": [
                {
                    "id": 35,
                    "nome": "Smartphone Modelo X",
                    "descricao": "Um smartphone avançado com recursos incríveis.",
                    "preco_promocional": "799.99",
                    "preco_original": "899.99",
                    "imagens": [
                        "smartphone_x.jpg"
                    ],
                    "categoria": "Eletrônicos",
                    "created_at": "2023-08-15T01:30:38.177Z"
                }
            ]
        })
    })
  })  
  describe('DELETE /product', () => {
    test('should return 200 when deleting a product', async () => {
        const response = await request(app)
            .delete(`/api/product/45`)
            .expect(200);

        expect(response.body).toEqual({
            "statusCode": 200,
            "body": false
        });
    });
});

})
