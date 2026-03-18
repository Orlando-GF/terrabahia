# André Gomez Imóveis — Regras do Projeto

## O que é este projeto

Site estático para divulgar imóveis no interior da Bahia — terrenos urbanos, casas e imóveis rurais.
O corretor é André Gomez — ele vende diretamente, sem corretora intermediária.
O único objetivo do site é gerar contato via WhatsApp.

**Domínio:** andregomezimoveis.com.br

---

## Restrições técnicas

- Astro 4+, build estático, sem SSR
- CSS puro, sem Tailwind nem qualquer framework CSS
- Sem banco de dados, sem CMS, sem API, sem autenticação
- Sem painel admin — imóveis são cadastrados editando `src/data/imoveis.js` diretamente
- JavaScript apenas onde CSS não resolve

---

## Identidade visual

**Nome:** André Gomez Imóveis

**Logo:** exibido como `André Gomez` em destaque + `Imóveis` menor abaixo ou ao lado.

**Paleta de cores — usar sempre as variáveis, nunca hex avulso:**

| Variável        | Hex       | Uso                                         |
| --------------- | --------- | ------------------------------------------- |
| `--verde`       | `#2D5016` | Cor primária — botões, header, destaques    |
| `--verde-medio` | `#3D6B1F` | Hover de botões e elementos ativos          |
| `--verde-claro` | `#EBF2E3` | Fundos de seções, badges                    |
| `--areia`       | `#C8A96E` | Cor de acento — divisores, bordas, detalhes |
| `--areia-claro` | `#F5EDD9` | Fundo de seções alternadas                  |
| `--branco`      | `#F8F5F0` | Fundo principal do site                     |
| `--cinza-leve`  | `#EFEFEF` | Fundo de seções neutras                     |
| `--cinza-texto` | `#4A4A4A` | Cor padrão do texto corrido                 |
| `--preto`       | `#1A1A1A` | Títulos e headings                          |

**Tipografia:**

| Variável         | Fonte            | Uso               |
| ---------------- | ---------------- | ----------------- |
| `--fonte-titulo` | Playfair Display | Todos os headings |
| `--fonte-corpo`  | Source Sans 3    | Todo o resto      |

---

## Estrutura de páginas

| Página            | Rota            | Conteúdo                                     |
| ----------------- | --------------- | -------------------------------------------- |
| Home              | `/`             | Hero, destaques, categorias, CTA WhatsApp    |
| Terrenos          | `/terrenos`     | Listagem de terrenos disponíveis             |
| Casas             | `/casas`        | Listagem de casas disponíveis                |
| Rurais            | `/rurais`       | Listagem de rurais disponíveis               |
| Detalhe do imóvel | `/imoveis/[id]` | Fotos, informações completas, botão WhatsApp |
| Contato           | `/contato`      | Texto simples + botão WhatsApp               |

Não criar outras páginas sem instrução explícita.

---

## Configuração global

O arquivo `src/data/config.js` centraliza as configurações do proprietário:

- Número de WhatsApp no formato `55` + DDD + número, sem espaços ou traços. Ex: `5577984138877`
- Mensagem padrão de contato usada quando o usuário não vem de um imóvel específico
- URL do site: `https://www.andregomezimoveis.com.br`

O número de WhatsApp nunca deve ser repetido hardcoded em páginas ou componentes — sempre importado de `config.js`.

---

## Regras de negócio dos imóveis

### Campos de cada imóvel

| Campo             | Tipo                               | Descrição                                                                           |
| ----------------- | ---------------------------------- | ----------------------------------------------------------------------------------- |
| `id`              | string                             | Slug único, sem espaços ou acentos. Ex: `terreno-jequie-centro`                     |
| `tipo`            | `'terreno'`, `'casa'` ou `'rural'` | Define em qual listagem o imóvel aparece                                            |
| `status`          | `'disponivel'` ou `'vendido'`      | Controla visibilidade e botão de contato                                            |
| `destaque`        | boolean                            | Se `true` e disponível, aparece na seção de destaques da home                       |
| `titulo`          | string                             | Nome do imóvel, usado nos headings e no title da página                             |
| `cidade`          | string                             | Cidade onde o imóvel está localizado                                                |
| `bairro`          | string                             | Bairro ou localidade — exibido no card e na página                                  |
| `estado`          | string                             | Sigla do estado. Ex: `BA`                                                           |
| `preco`           | number                             | Valor em reais, sem formatação. Ex: `85000`                                         |
| `area`            | number                             | Área em metros quadrados                                                            |
| `caracteristicas` | string[]                           | Lista de diferenciais do imóvel                                                     |
| `descricao`       | string                             | Texto corrido usado no SEO e na página do imóvel                                    |
| `fotos`           | string[]                           | Caminhos das imagens em `public/images/imoveis/[id]/`. Mínimo de 1 foto obrigatória |
| `msgWhatsapp`     | string                             | Mensagem pré-preenchida usada no botão da página de detalhe do imóvel               |

Todo imóvel deve ter ao menos uma foto cadastrada. Imóvel sem foto não deve ser renderizado e deve gerar um aviso de erro no console durante o build.

### Comportamento por status

- `disponivel` — card exibido normalmente, botão de WhatsApp visível na página de detalhe
- `vendido` — card exibido com sobreposição "Vendido", botão de WhatsApp oculto na página de detalhe

Imóveis vendidos não são deletados — ficam no arquivo para histórico e prova social.

### Regras das listagens

- `/terrenos` exibe apenas imóveis com `tipo: 'terreno'` e `status: 'disponivel'`
- `/casas` exibe apenas imóveis com `tipo: 'casa'` e `status: 'disponivel'`
- `/rurais` exibe apenas imóveis com `tipo: 'rural'` e `status: 'disponivel'`
- A ordem de exibição segue a ordem de cadastro no arquivo — primeiro cadastrado, primeiro exibido
- Os cards não têm botão de WhatsApp — o card inteiro é clicável e leva para a página de detalhe do imóvel, onde o contato acontece
- Se não houver imóvel disponível numa listagem, exibir a mensagem: "Nenhum imóvel disponível no momento. Entre em contato para saber de novidades."
- Não há paginação — todos os imóveis do tipo aparecem na mesma página

### Regras da home

- A seção de destaques exibe no máximo 3 imóveis com `destaque: true` e `status: 'disponivel'`, na ordem de cadastro
- Se não houver nenhum destaque cadastrado, a seção de destaques não é renderizada
- O CTA de WhatsApp na home usa a mensagem padrão de `config.js`, não a mensagem de nenhum imóvel específico

---

## Regras de SEO

- Cada página tem `<title>` único no formato `[Título da Página] | André Gomez Imóveis`
- Cada página tem `<meta name="description">` própria com localização mencionada, entre 120 e 160 caracteres
- Toda imagem tem `alt` descritivo, `width` e `height` definidos
- A primeira imagem de cada página usa `loading="eager"`, as demais `loading="lazy"`
- Todo imóvel tem Schema.org do tipo `RealEstateListing` na sua página de detalhe
- Toda página tem `<link rel="canonical">` apontando para a URL canônica
- O `robots.txt` libera indexação de todas as páginas
- O sitemap é gerado automaticamente pela integração `@astrojs/sitemap`
- URLs são semânticas, baseadas no `id` do imóvel, sem parâmetros ou IDs numéricos
- Breadcrumb presente na página de detalhe no formato: Início › Tipo › Nome do Imóvel

---

## Regras de acessibilidade e HTML

- A tag `<html>` deve sempre ter o atributo `lang="pt-BR"`
- HTML semântico obrigatório: `<header>`, `<main>`, `<footer>`, `<article>`, `<section>`, `<nav>`, `<aside>`
- Apenas um `<h1>` por página
- Links externos sempre com `target="_blank" rel="noopener noreferrer"`
- Botão do menu mobile com `aria-label` e `aria-expanded` atualizados via JavaScript

---

## Organização do CSS

- Variáveis globais e reset em `src/styles/global.css`
- Estilos de cada componente dentro da tag `<style>` do próprio `.astro`
- Nunca usar `<style is:global>` em componentes
- Nunca usar hex avulso — sempre variáveis do `:root`

---

## O que nunca fazer

- Criar banco de dados, API routes, autenticação ou painel admin
- Usar frameworks CSS externos
- Repetir o número de WhatsApp fora de `src/data/config.js`
- Deletar imóveis do arquivo de dados — apenas mudar o `status` para `'vendido'`
- Criar páginas fora da estrutura definida sem instrução explícita
- Usar JavaScript para o que CSS resolve
- Cadastrar imóvel sem ao menos uma foto
- Adicionar botão de WhatsApp nos cards das listagens
