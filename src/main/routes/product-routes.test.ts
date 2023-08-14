import request from 'supertest'
import app from '../config/app'
import { DatabaseConnector } from '../../infra/database/postgres/postgres'

describe('Product Routes', () => {
  describe('GET /products', () => {
    test('should return 200 on signup', async () => {
        await request(app)
        .get('/api/products?page=1&pageSize=10')
        .expect({
            "statusCode": 200,
            "body": {
                "products": [
                    {
                        "id": 2,
                        "nome": "Tênis Esportivo",
                        "descricao": "Tênis durável e ideal para atividades físicas.",
                        "preco_promocional": "79.99",
                        "preco_original": "89.99",
                        "imagens": [
                            "https://exemplo.com/imagens/tenis1.jpg",
                            "https://exemplo.com/imagens/tenis2.jpg"
                        ],
                        "categoria": "Calçados",
                        "created_at": "2023-08-13T16:14:38.801Z"
                    },
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
                ],
                "currentPage": 1,
                "totalPages": 1,
                "totalProducts": "2"
            }
        })
    })
  })
  
})
