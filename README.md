![CI Status](https://github.com/leonardomelgarejo-drakkar/azulzinha-cnj/actions/workflows/playwright.yml/badge.svg)

# Projeto de automação de testes de API e WEB do projeto Azulzinha - CNJ

## Descrição

Este projeto contempla a automação de testes de API e WEB do projeto Azulzinha CNJ, com a composição de core Node.js + frameworks Cucumber-JS/Playwright + linguagem Typescript

# Pré-requisitos

* Instalar [Node.js 22.10.0](https://nodejs.org/pt/blog/release/v22.10.0)
* Instalar [Cucumber-JS 11.1.1](https://github.com/cucumber/cucumber-js)
* Instalar [Playwright 1.49](https://playwright.dev/docs/intro)
* Clone o repositório: ```git clone https://github.com/leonardomelgarejo-drakkar/azulzinha-cnj```

## Como rodar os testes

Execução local - A execução dos testes é orquestrada pelo Cucumber-JS, ou seja, via tags relacionadas a específicos cenários de testes, que possuem o padrão @ + objetivo (exemplo: @smoke-test). Para este projeto, rodar os comandos a seguir:

  * Rodar todos os testes (não é necessário informar uma tag): 
  ``npm test``

  * Rodar o grupo de cenarios de testes desejado (Informe a tag desejada): 
  ``npm test --TAGS="@smoke-test"``

  * Rodar o grupo de cenários de testes desejado e ignorar o grupo não desejado (Informe as tags desejadas): 
  ``npm test --TAGS="@smoke-test and not @skip"``

  * Rodar os grupos de cenários de testes A ou B (Informe as tags desejadas): 
  ``npm test --TAGS="@smoke-test or @funcional-test"``

  * Rodar os grupos de cenários de testes A e B (Informe as tags desejadas): 
  ``npm test --TAGS="@smoke-test and @funcional-test"``

## 📊 Relatório de Testes  

Os relatórios de testes são gerados pelo **Cucumber-JS** de duas formas:  

### 📍 Execução Local  
Ao rodar os testes (conforme tópico anterior), dois arquivos são criados na pasta `test-result`:  

- **`cucumber-report.json`** – Contém a estrutura base e os metadados do relatório.  
- **`cucumber-report.html`** – Relatório HTML detalhado com:  
  - Testes bem-sucedidos e falhos.  
  - Percentual de sucesso das execuções.  
  - Data e duração da última execução.  
  - Sistema operacional utilizado.  
  - Versões do **Node.js** e **Cucumber-JS**.  
  - Lista detalhada das **features** e **cenários** executados.  

Para visualizar o relatório HTML, basta abrir o arquivo `cucumber-report.html` no navegador. 🚀

### 📍 Execução Remota   
A geração de relatórios para execuções remotas está em fase de manutenção e será integrada à pipeline CI/CD. O objetivo é disponibilizá-los via GitHub Actions.  

O relatório gerado pode ser acessado no [CUCUMBER REPORT](https://leonardomelgarejo-drakkar.github.io/azulzinha-cnj/).  

O JSON do relatório pode ser acessado diretamente em: [Cucumber Report JSON](https://leonardomelgarejo-drakkar.github.io/azulzinha-cnj/report.json).

## Estrutura do projeto

```plaintext
├── .github
│   ├── workflows
│   │   └── playwright.yml
│   config
|   ├── cucumber.js
|   factory
|   ├── processoFactory.ts
|   ├── models
|   |   ├── deposito.ts
|   |   ├── documento.ts
|   |   ├── pessoa.ts
|   |   └── processoJudicial.ts
|   helper
|   ├── env
|   |   ├── .env.dev
|   |   ├── .env.test
|   |   ├── env.ts
|   |   report
|   |   ├── init.ts
|   |   types
|   |   ├── env.d.ts
|   |   util
|   |   ├── test-data
│   │   |   └── registerUser.json
|   |   ├── DataRequests.ts
|   |   ├── requestConfig.ts
|   |   wrapper
|   |   └── assert.ts
|   hooks
|   ├── hooks.ts
|   test
|   ├── features
|   |   ├── cadastroCobrancaDepositoJudicial.feature
|   ├── steps
|   |   └── cadastroCobrancaDepositoJudicialSteps.ts
|   .gitignore
|   .package-lock.json
|   README.md
└── tsconfig.json
```

## Sobre a estrutura do projeto

### .github/workflows/playwright.yml

Arquivo de configuração para execução da pipeline do Github Actions.

### config/cucumber.js

Arquivo de configuração do Cucumber-JS.

### factory

Aplica o padrão de fábrica para gerar instâncias genéricas, facilitando o gerenciamento dos dados necessários para inclusões de objetos.

### helper/env

Centraliza as váriaveis utilizadas no ambiente e o recurso para acessa-lás para execução dos testes.

### helper/report

Recursos de apoio para a geração do relatório de testes

### helper/types

Recurso com função de declarar tipos globais para as variáveis de ambiente (process.env) no contexto do Node.js.

### helper/util

Recursos de apoio geral para a execução dos testes.

### helper/wrapper

Recurso para otimizar os recursos do Playwright

### hooks

Recurso para gestão centralizada de pré-condições e pós-condições na execução dos testes.

### test

Contém as features e seus steps, ou seja, o arquivo no padrão gherkin organizados em cenários de testes(scenarios) que por sua vez são implementados tecnicamente por um arquivo Typescript que usa as dependências do Playwright para execução dos testes.

### package-lock.json

O arquivo package-lock.json tem um papel fundamental no gerenciamento de dependências em projetos Node.js. Ele é gerado automaticamente pelo npm (Node Package Manager) sempre que você instala, atualiza ou remove pacotes

### package.json

O package.json é o arquivo de configuração principal de um projeto Node.js.

### tsconfig.json

O arquivo tsconfig.json é usado para configurar o compilador TypeScript (tsc).

## Padrões de projetos aplicados:

* Test Data Factory
* Data Provider
* Builder
* Request and Response Specification

## Pipeline

Atualmente, a pipeline CI inclui os seguintes steps:
- **test**: Execução dos testes automatizados.
- **deploy-report**: Deploy do relatório de testes para o GitHub Pages.

### 📦 Dependências Principais  

| Pacote | Versão | Função |
|--------|--------|--------|
| `@cucumber/cucumber` | 11.1.1 | Framework BDD para automação de testes |
| `@playwright/test` | 1.49.1 | Automação de testes Web e API |
| `dotenv` | 16.4.7 | Gerenciamento de variáveis de ambiente |
| `ts-node` | 10.9.2 | Permite rodar TypeScript sem necessidade de compilar para JavaScript |
