export class ProductController {
  getProducts (): any {
    return ({
      produtos: [
        {
          nome: 'Camiseta Casual',
          descrição: 'Uma camiseta confortável para o uso diário.',
          preço_promocional: 29.99,
          preço_original: 39.99,
          imagens: [
            'https://exemplo.com/imagens/camiseta1.jpg'
          ],
          categoria: 'Vestuário'
        },
        {
          nome: 'Tênis Esportivo',
          descrição: 'Tênis durável e ideal para atividades físicas.',
          preço_promocional: 79.99,
          preço_original: 89.99,
          imagens: [
            'https://exemplo.com/imagens/tenis1.jpg',
            'https://exemplo.com/imagens/tenis2.jpg'
          ],
          categoria: 'Calçados'
        },
        {
          nome: 'Notebook Ultraleve',
          descrição: 'Um notebook fino e poderoso para trabalho e entretenimento.',
          preço_promocional: 999.99,
          preço_original: 1199.99,
          imagens: [
            'https://exemplo.com/imagens/notebook1.jpg'
          ],
          categoria: 'Eletrônicos'
        }
      ]
    })
  }
}
