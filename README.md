# Trabalho 3: Front-end de Uma aplicação Web com Acesso a uma API REST

## Trabalho Final: Desenvolvimento de uma Aplicação Web Interativa com API REST

O projeto será desenvolvido em grupos (já definidos).

- **Prazo de entrega:** até a data prevista no Cronograma: 30/11/2026
- **Apresentação:** na semana da entrega, apresentações realizadas pelo grupo para toda a turma

## Objetivo Principal

Este trabalho tem como objetivo consolidar os conhecimentos adquiridos na disciplina, com foco na criação de uma interface web dinâmica e responsiva.

O desafio central é desenvolver uma aplicação web usando HTML (tags semânticos!), CSS e JavaScript (pode-se empregar Bootstrap e jQuery) onde a interação do usuário produza alterações na página sem recarregamentos dela (page reloads).

Para isso, os grupos deverão consumir e manipular dados de um back-end simulado, realizando requisições HTTP assíncronas com JavaScript, preferencialmente por meio da Fetch API, para se comunicar com endpoints no padrão REST.

> **Importante!** Será empregada uma simulação de uma API usando aplicações livres disponíveis na web. Não é um requisito deste trabalho a implementação de um back-end real para a aplicação!

## Temas Sugeridos

### Mini E-Commerce (Catálogo e Carrinho)
Uma vitrine de produtos onde o usuário pode navegar, ver detalhes e adicionar/remover/atualizar itens em um carrinho de compras.
- Recursos sugeridos (2): `/produtos` (lista estática de produtos); `/cart` (itens que o usuário adicionou - foco do POST, PUT, DELETE)

### Painel Kanban (Estilo Trello Simplificado)
Um painel visual com colunas (ex: "A Fazer", "Fazendo", "Feito"). O usuário pode criar, editar, excluir e mover "cartões" (tarefas) entre as colunas.
- Recurso sugerido (1): `/tarefas` (o "status" da tarefa, ex: "Fazendo", seria uma propriedade do objeto "tarefa" a ser atualizada via PUT)

### Microblog / Mural de Recados
Uma interface simples (como um Twitter) com um formulário para enviar novas postagens e um "feed" que exibe todas as postagens (criadas via POST) e permite excluí-las (DELETE).
- Recurso sugerido (1): `/posts` (contendo usuario, mensagem, dataHora)

### Sistema de Agendamento (de Salas ou Serviços)
Uma interface para criar, visualizar, editar e cancelar agendamentos.
- Recurso sugerido (1): `/agendamentos` (contendo nome, data, hora, serviço, etc.)

### Painel de Gerenciamento de Usuários (Admin)
Uma tabela de usuários onde um "admin" pode adicionar, editar e remover usuários.
- Recurso sugerido (1): `/users` (contendo nome, email, cargo, etc.)

### Aplicativo de Enquetes (Votação)
Exibir enquetes e permitir que o usuário vote. O foco é usar PUT para atualizar os contadores de votos.
- Recurso sugerido (1): `/enquetes` (contendo pergunta, array de opções, array de votos)

### Gerenciador de Tarefas com Projetos (Pai/Filho)
Uma lista de "Projetos" que, ao serem clicados, filtram e exibem uma lista de "Tarefas" associadas.
- Recursos sugeridos (2): `/projetos` e `/tarefas` (onde a tarefa tem um `projetoId`)

### Sugestão extra usando uma API pública

**Painel de Mídia (Híbrido: API Pública + MockAPI)**
Uma aplicação que consome uma API pública (como a TMDb para filmes) para busca. O usuário pode "favoritar" itens, e esses favoritos são salvos na sua API Mock.
- Recurso sugerido (1): `/favoritos` (usado para POST e DELETE, salvando o ID do filme/item)

### Tema próprio?
Grupos que desejarem propor um tema diferente devem validá-lo com o professor na primeira semana, garantindo que o escopo e os requisitos técnicos sejam equivalentes.

## Requisitos Técnicos Obrigatórios

A aplicação desenvolvida deve incluir:

- **HTML:** estrutura semântica e bem organizada
- **CSS e UI Framework:** estilizado com CSS puro ou uso de Bootstrap para agilizar o desenvolvimento de interfaces responsivas e componentes
- **Responsividade:** a aplicação deverá apresentar comportamento adequado pelo menos em telas de desktop e dispositivos móveis
- **JavaScript (puro ou jQuery)**
  - Manipulação dinâmica do DOM (ex: adicionar, remover e editar elementos na tela)
  - Validação de formulários no lado do cliente (client-side)
- **Comunicação assíncrona:** a comunicação com a API deverá ser realizada preferencialmente com a Fetch API. O uso de `$.ajax()` poderá ser aceito caso jQuery tenha sido utilizado em outras partes do projeto
- **Implementação correta dos verbos HTTP no estilo REST:**
  - `GET`: para buscar e exibir listas de dados ou dados únicos
  - `POST`: para criar novos dados (ex: salvar um novo agendamento)
  - `PUT`: para atualizar/substituir um recurso existente (ex: atualizar os dados de um usuário existente)
  - `PATCH`: para atualizar parcialmente um recurso (ex: marcar uma tarefa como concluída)
  - `DELETE`: para remover dados (ex: cancelar um agendamento)
- Recursos escolhidos para o CRUD devem permitir demonstrar claramente GET, POST, PUT/PATCH e DELETE
- **Back-end simulado:** use um serviço para simular o back-end mantendo-se dentro dos limites para uso de um plano gratuito (implementação do back-end não é um requisito deste trabalho). Poderá ser utilizado o MockAPI.io ou outro serviço equivalente aprovado pelo professor
- **Tratamento dos estados da comunicação:** a interface deverá fornecer feedback adequado durante operações assíncronas e em situações de erro. As chamadas realizadas com `fetch()` deverão verificar o status da resposta, utilizando, por exemplo, `response.ok`, e tratar falhas de comunicação de forma adequada
- **Qualidade do código:** o código JavaScript deve ser organizado em funções com responsabilidades bem definidas, utilizar nomes claros para variáveis e funções, evitar duplicação desnecessária e manter separação adequada entre estrutura (HTML), apresentação (CSS) e comportamento (JavaScript)
- **Acessibilidade:** a aplicação deverá adotar práticas básicas de acessibilidade, incluindo uso de HTML semântico, associação correta entre label e campos de formulário, textos alternativos para imagens relevantes, contraste adequado e navegação utilizável por teclado

## Apresentação (até 10 minutos)

O grupo deverá:

- Apresentar o objetivo do projeto escolhido e principais funcionalidades (PowerPoint com até 4 slides)
- Demonstrar a aplicação, executando todas as funcionalidades (Criar, Ler, Atualizar, Excluir)
- Mostrar e explicar os trechos de código mais relevantes (especialmente as requisições assíncronas e manipulação do DOM)
- Mostrar, no DevTools/Network ou no código, pelo menos uma requisição HTTP e identificar método, URL e status retornado

## Entregas (na data prevista)

- Slides utilizados na apresentação
- Upload, nesta tarefa, da pasta do projeto zipada

## Critérios de Avaliação

| Critério | Peso |
|---|---|
| Funcionalidades e CRUD | 3,0 |
| Comunicação com API / HTTP / Fetch | 2,0 |
| JavaScript e manipulação do DOM | 1,5 |
| HTML, CSS e responsividade | 1,5 |
| Organização e qualidade do código | 1,0 |
| Apresentação e demonstração | 1,0 |
| **Total** | **10,0** |
