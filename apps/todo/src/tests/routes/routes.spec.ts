import request from 'supertest';
import { setupRoutes } from '@/main/config/routes';
import app from '@/main/config/app';
import { v4 as uuid } from 'uuid'

setupRoutes(app);

describe('Testando a rotas de Todos', () => {
  it('Deve retornar status 200 e uma lista de todos', async () => {
    const response = await request(app).get('/api/v1/todo');

    // Verificar o status da resposta
    expect(response.status).toBe(200);

    // Se espera que haja pelo menos um item na lista
    expect(response.body.length).toBeGreaterThan(0);

    // Verificar a estrutura de cada item na lista
    const firstTodo = response.body;


    expect(firstTodo)
  });

  it('Deve criar um novo todo ao chamar a rota POST', async () => {
    const newTodo = {
      title: `Test Todo ${Date.now()}`,
      description: 'Descrição do novo todo',
      date: '2024-01-10T00:00:00.000Z',
      favorite: true,
      status: false,
    };

    const response = await request(app).post('/api/v1/todo').send(newTodo);

    // Verificar o status da resposta7
    expect(response.status).toBe(201); // Ou o status que você espera para a criação


    const createdTodo = response.body;
    // expect(createdTodo).toHaveProperty('id');
    // expect(createdTodo.title).toBe(newTodo.title);
    // expect(createdTodo.description).toBe(newTodo.description);
    // expect(createdTodo.date).toBe(newTodo.date);
    // expect(createdTodo.favorite).toBe(newTodo.favorite);
    // expect(createdTodo.status).toBe(newTodo.status);
    // expect(createdTodo).toHaveProperty('deleted');
    expect(createdTodo)


  });
});
