import { openDB } from "@/database/config";

describe('Testando a conexão com o banco de dados', () => {
  it('Deve abrir a conexão com o banco de dados sem erros', async () => {
    // Tente abrir a conexão com o banco de dados
    try {
      const db = await openDB();
      // Feche a conexão para garantir que ela foi aberta com sucesso
      await db.close();
    } catch (error) {
      // Se houver algum erro, falhe o teste
      fail(`Erro ao abrir a conexão com o banco de dados: ${error}`);
    }
  });
});
