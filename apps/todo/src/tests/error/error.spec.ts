import { CustomError } from './customError';

describe('CustomError', () => {
  it('deve lançar uma instância de CustomError com a mensagem fornecida', () => {
    const mensagemErro = 'Mensagem de erro de teste';

    // Use um wrapper de função para testar se ocorrem erros
    const lancaCustomError = () => {
      throw new CustomError(mensagemErro);
    };

    // Use o expect().toThrow() do Jest para verificar se o erro correto está sendo lançado
    expect(lancaCustomError).toThrow(CustomError);
    expect(lancaCustomError).toThrow(mensagemErro);

    try {
      lancaCustomError();
    } catch (erro) {
      // Asserts adicionais se necessário
      expect(erro).toBeInstanceOf(CustomError);
      expect(erro.message).toBe(mensagemErro);
    }
  });

  it('deve ter a propriedade de nome correta', () => {
    const customError = new CustomError('Erro de teste');
    expect(customError.name).toBe('CustomError');
  });

  it('deve ter o rastreamento de pilha (stack trace) correto', () => {
    const customError = new CustomError('Erro de teste');

    // Verifica se o rastreamento de pilha contém o nome da classe e a mensagem de erro
    expect(customError.stack).toContain('CustomError');
    expect(customError.stack).toContain('Erro de teste');
  });
});
