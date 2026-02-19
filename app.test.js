const request = require('supertest');
const app = require('./app');

describe('Testes da API de Frutas', () => {

  test('GET / retorna mensagem', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("API funcionando 🚀");
  });

  test('GET /frutas retorna lista de frutas', async () => {
    const response = await request(app).get('/frutas');
    expect(response.statusCode).toBe(200);

    expect(response.body.frutas).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ nome: "maçã", preco: 5 }),
        expect.objectContaining({ nome: "banana", preco: 3 }),
        expect.objectContaining({ nome: "laranja", preco: 4 })
      ])
    );
  });

  test('POST /frutas adiciona uma fruta', async () => {
    const response = await request(app)
      .post('/frutas')
      .send({ nome: "abacaxi", preco: 8 });

    expect(response.statusCode).toBe(201);

    expect(response.body.frutas).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ nome: "abacaxi", preco: 8 })
      ])
    );
  });

});
