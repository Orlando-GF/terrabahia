/**
 * Banco de dados oficial dos imóveis - TerraBahia
 */

export const imoveis = [
  {
    // IDENTIFICAÇÃO
    id: 'fazenda-regiao-cotegipe',
    tipo: 'rural',
    status: 'disponivel',
    destaque: true,
    
    // INFORMAÇÕES
    titulo: 'Fazenda à Venda – 1.200 Hectares',
    cidade: 'Cotegipe',
    bairro: 'Zona Rural',
    estado: 'BA',
    preco: 12000000, // R$ 10.000,00 por hectare * 1.200
    area: 12000000, // 1.200 hectares em m² (1 hectare = 10.000m²)
    
    // CARACTERÍSTICAS
    caracteristicas: [
      '2.500 metros de margem de rio',
      'Dupla aptidão (Pecuária e Agricultura)',
      '700 ha de mata nativa preservada',
      '300 ha de pastagem formada',
      '200 ha agricultáveis (solo fértil)',
      'Energia elétrica trifásica',
      'Casa sede confortável',
      'Curral funcional com balança'
    ],
    
    // DESCRIÇÃO
    descricao: 'Excelente fazenda com 1.200 hectares, localizada em região produtiva e de fácil acesso, ideal para pecuária e agricultura. A propriedade possui 2.500 metros de margem de rio, garantindo abundância de água e ótimo potencial para irrigação. Conta com dupla aptidão, apresentando solo fértil e bem drenado. Estrutura operacional completa com estradas internas bem conservadas e documentação 100% regularizada.',
    
    // FOTOS (Pasta: public/images/imoveis/fazenda-regiao-cotegipe/)
    fotos: [
      '/images/imoveis/fazenda-regiao-cotegipe/capa.webp',
      '/images/imoveis/fazenda-regiao-cotegipe/capa2.webp',
      '/images/imoveis/fazenda-regiao-cotegipe/capa3.webp',
      '/images/imoveis/fazenda-regiao-cotegipe/capa4.webp'
    ],
    
    // MENSAGEM WHATSAPP
    msgWhatsapp: 'Olá Andre! Tenho interesse na Fazenda de 1.200 hectares em Cotegipe. Podemos conversar?'
  }
];

// Funções auxiliares de filtragem
export const disponiveis = imoveis.filter(i => i.status === 'disponivel');
export const terrenos = imoveis.filter(i => i.tipo === 'terreno' && i.status === 'disponivel');
export const rurais = imoveis.filter(i => i.tipo === 'rural' && i.status === 'disponivel');
export const casas = imoveis.filter(i => i.tipo === 'casa' && i.status === 'disponivel');
export const destaques = imoveis.filter(i => i.destaque && i.status === 'disponivel');

/**
 * Formata o preço para o padrão brasileiro
 */
export function formatarPreco(valor) {
  if (valor === 0 || !valor) return 'Consulte';
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/**
 * Formata área de m² para hectares se for rural e grande
 */
export function formatarArea(area, tipo) {
  if (tipo === 'rural' && area >= 10000) {
    return `${(area / 10000).toLocaleString('pt-BR')} ha`;
  }
  return `${area.toLocaleString('pt-BR')} m²`;
}