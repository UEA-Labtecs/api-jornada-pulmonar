export function calcularPontuacao(tempoEmMilissegundos: number): number {
  // Defina os limites de tempo e pontuação conforme necessário
  const limiteSuperior = 120000; // 2 minutos
  const limiteInferior = 1000;  // 1 segundo

  // Garanta que o tempo esteja dentro dos limites
  const tempoNormalizado = Math.max(Math.min(tempoEmMilissegundos, limiteSuperior), limiteInferior);

  // Calcule a pontuação com base na lógica desejada
  const pontuacao = (limiteSuperior - tempoNormalizado) / (limiteSuperior - limiteInferior);

  // Arredonde a pontuação para evitar casas decimais longas
  return Math.round(pontuacao * 1000);
}