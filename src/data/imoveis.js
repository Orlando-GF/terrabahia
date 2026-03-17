/**
 * Banco de dados oficial dos imoveis - TerraBahia
 */

export const imoveis = [
  {
    // IDENTIFICACAO
    id: 'fazenda-regiao-cotegipe',
    tipo: 'rural',
    status: 'disponivel',
    destaque: true,
    
    // INFORMACOES
    titulo: 'Fazenda \u00e0 Venda - 1.200 Hectares',
    cidade: 'Cotegipe',
    bairro: 'Zona Rural',
    estado: 'BA',
    preco: 12000000, 
    area: 12000000, 
    
    // CARACTERISTICAS
    caracteristicas: [
      '2.500 metros de margem de rio',
      'Dupla aptid\u00e3o (Pecu\u00e1ria e Agricultura)',
      '700 ha de mata nativa preservada',
      '300 ha de pastagem formada',
      '200 ha agricult\u00e1veis (solo f\u00e9rtil)',
      'Energia el\u00e9trica trif\u00e1sica',
      'Casa sede confort\u00e1vel',
      'Curral funcional com balan\u00e7a'
    ],
    
    // DESCRICAO
    descricao: 'Excelente fazenda com 1.200 hectares, localizada em regi\u00e3o produtiva e de f\u00e1cil acesso, ideal para pecu\u00e1ria e agricultura. A propriedade possui 2.500 metros de margem de rio, garantindo abund\u00e2ncia de \u00e1gua e \u00f3timo potencial para irriga\u00e7\u00e3o. Conta com dupla aptid\u00e3o, apresentando solo f\u00e9rtil e bem drenado. Estrutura operacional completa com estradas internas bem conservadas e documenta\u00e7\u00e3o 100% regularizada.',
    
    // FOTOS
    fotos: [
      '/images/imoveis/fazenda-regiao-cotegipe/capa.webp',
      '/images/imoveis/fazenda-regiao-cotegipe/capa2.webp',
      '/images/imoveis/fazenda-regiao-cotegipe/capa3.webp',
      '/images/imoveis/fazenda-regiao-cotegipe/capa4.webp'
    ],
    
    // MENSAGEM WHATSAPP
    msgWhatsapp: 'Ol\u00e1 Andre! Tenho interesse na Fazenda de 1.200 hectares em Cotegipe. Podemos conversar?'
  }
];

// Funcoes auxiliares de filtragem
export const disponiveis = imoveis.filter(i => i.status === 'disponivel');
export const terrenos = imoveis.filter(i => i.tipo === 'terreno' && i.status === 'disponivel');
export const rurais = imoveis.filter(i => i.tipo === 'rural' && i.status === 'disponivel');
export const casas = imoveis.filter(i => i.tipo === 'casa' && i.status === 'disponivel');
export const destaques = imoveis.filter(i => i.destaque && i.status === 'disponivel');

/**
 * Formata o preco para o padrao brasileiro
 */
export function formatarPreco(valor) {
  if (valor === 0 || !valor) return 'Consulte';
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/**
 * Formata area de m2 para hectares se for rural e grande
 */
export function formatarArea(area, tipo) {
  if (tipo === 'rural' && area >= 10000) {
    return `${(area / 10000).toLocaleString('pt-BR')} ha`;
  }
  return `${area.toLocaleString('pt-BR')} m\u00b2`;
}