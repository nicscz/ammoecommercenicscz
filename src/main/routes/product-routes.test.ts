import request from 'supertest'
import app from '../config/app'
import { DatabaseConnector } from '../../infra/database/postgres/postgres'

describe('Product Routes', () => {
  describe('GET /products', () => {
    test('should return 200 on get products', async () => {
        await request(app)
        .get('/api/products?page=1&pageSize=10')
        .expect({
            "statusCode": 200,
            "body": {
                "products": [
                    {
                        "id": 3,
                        "nome": "Camiseta Casual",
                        "descricao": "Uma camiseta confortável para o uso diário.",
                        "preco_promocional": "29.99",
                        "preco_original": "39.99",
                        "imagens": [
                            "https://exemplo.com/imagens/camiseta1.jpg"
                        ],
                        "categoria": "Vestuário",
                        "created_at": "2023-08-13T16:13:28.128Z"
                    },
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
                        "id": 36,
                        "nome": "Notebook Ultrabook Pro",
                        "descricao": "Um ultrabook poderoso e leve para produtividade.",
                        "preco_promocional": "1299.99",
                        "preco_original": "1499.99",
                        "imagens": [
                            "ultrabook_pro.jpg"
                        ],
                        "categoria": "Informática",
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
                    },
                    {
                        "id": 38,
                        "nome": "Smart TV 55\" Ultra HD",
                        "descricao": "TV com qualidade de imagem incrível para sua sala.",
                        "preco_promocional": "999.99",
                        "preco_original": "1199.99",
                        "imagens": [
                            "smart_tv_55.jpg"
                        ],
                        "categoria": "Eletrônicos",
                        "created_at": "2023-08-15T01:31:29.352Z"
                    },
                    {
                        "id": 39,
                        "nome": "Câmera DSLR Profissional",
                        "descricao": "Câmera de alta qualidade para fotografia profissional.",
                        "preco_promocional": "799.99",
                        "preco_original": "899.99",
                        "imagens": [
                            "camera_dslr.jpg"
                        ],
                        "categoria": "Fotografia",
                        "created_at": "2023-08-15T01:31:29.352Z"
                    },
                    {
                        "id": 40,
                        "nome": "Relógio Inteligente Fitness",
                        "descricao": "Relógio com recursos inteligentes para acompanhar sua saúde.",
                        "preco_promocional": "129.99",
                        "preco_original": "149.99",
                        "imagens": [
                            "relogio_fitness.jpg"
                        ],
                        "categoria": "Acessórios",
                        "created_at": "2023-08-15T01:31:29.352Z"
                    },
                    {
                        "id": 41,
                        "nome": "Console de Video Game Next-Gen",
                        "descricao": "Console de última geração para uma experiência de jogo incrível.",
                        "preco_promocional": "499.99",
                        "preco_original": "599.99",
                        "imagens": [
                            "console_nextgen.jpg"
                        ],
                        "categoria": "Eletrônicos",
                        "created_at": "2023-08-15T01:31:29.352Z"
                    },
                    {
                        "id": 42,
                        "nome": "Mochila para Notebook",
                        "descricao": "Mochila resistente e prática para transportar seu notebook.",
                        "preco_promocional": "39.99",
                        "preco_original": "49.99",
                        "imagens": [
                            "mochila_notebook.jpg"
                        ],
                        "categoria": "Acessórios",
                        "created_at": "2023-08-15T01:31:29.352Z"
                    },
                    {
                        "id": 43,
                        "nome": "Forno Elétrico de Bancada",
                        "descricao": "Forno para preparar suas refeições de maneira prática.",
                        "preco_promocional": "79.99",
                        "preco_original": "89.99",
                        "imagens": [
                            "forno_eletrico.jpg"
                        ],
                        "categoria": "Eletrodomésticos",
                        "created_at": "2023-08-15T01:31:29.352Z"
                    }
                ],
                "currentPage": 1,
                "totalPages": 4,
                "totalProducts": "31"
            }
        })
    })
  })  
  describe('GET /productByName', () => {
    test('should return 200 on get a product by name ', async () => {
        await request(app)
        .get('/api/productByName')
        .send({
            "name": "Camiseta Casual"
        })
        .expect({
            "statusCode": 200,
            "body": [
                {
                    "id": 3,
                    "nome": "Camiseta Casual",
                    "descricao": "Uma camiseta confortável para o uso diário.",
                    "preco_promocional": "29.99",
                    "preco_original": "39.99",
                    "imagens": [
                        "https://exemplo.com/imagens/camiseta1.jpg"
                    ],
                    "categoria": "Vestuário",
                    "created_at": "2023-08-13T16:13:28.128Z"
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
