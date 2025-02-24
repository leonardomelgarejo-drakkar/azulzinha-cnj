import { Given, Then, When } from "@cucumber/cucumber";
import { APIRequestContext, APIResponse, expect, request } from "@playwright/test";
import { ProcessoFactory } from "../../factory/processoFactory";
import { ProcessoJudicial } from "../../factory/models/processoJudicial";
import { getHeaders } from "../../helper/util/requestConfig";

let baseURL: string;
let resourcePath: string;
let url: string;
let context: APIRequestContext;
let requestData: string;
let response: APIResponse;
let responseBody: any;
let requestTime: any;
let requestStartTime: any;
let requestEndTime: any;
let processo: ProcessoJudicial;

Given('o usuário preenche todos os campos obrigatórios', async function () {
  processo = ProcessoFactory.geraProcessoPadrao();
  requestData = JSON.stringify(processo);
});

Given('o usuário não preenche o código do processo', async function () {
  processo = ProcessoFactory.geraProcessoComCodigoProcessoVazio();
  requestData = JSON.stringify(processo);
});

Given('o usuário não preenche o id do deposito', async function () {
  processo = ProcessoFactory.geraProcessoComIdDepositoVazio();
  requestData = JSON.stringify(processo);
});

Given('o usuário não preenche a finalidade do depósito', async function () {
  processo = ProcessoFactory.geraProcessoComFinalidadeDepositoVazia();
  requestData = JSON.stringify(processo);
});

Given('o usuário preenche o valor do depósito com zero', async function () {
  processo = ProcessoFactory.geraProcessoComValorDepositoZero();
  requestData = JSON.stringify(processo);
});

Given('o usuário preenche o valor do depósito com número negativo', async function () {
  processo = ProcessoFactory.geraProcessoComValorDepositoNegativo();
  requestData = JSON.stringify(processo);
});

Given('o usuário não preenche a observação do depósito', async function () {
  processo = ProcessoFactory.geraProcessoComObservacaoDepositoVazia();
  requestData = JSON.stringify(processo);
});

Given('o usuário preenche o código do processo com um caractere', async function () {
  processo = ProcessoFactory.geraProcessoComCodigoProcessoComUmCaracter();
  requestData = JSON.stringify(processo);
});

Given('o usuário preenche o código do processo com muitos caracteres', async function () {
  processo = ProcessoFactory.geraProcessoComCodigoProcessoMuitoLongo();
  requestData = JSON.stringify(processo);
});

Given('o usuário não preenche o nome do autor', async function () {
  processo = ProcessoFactory.geraProcessoComNomeAutorVazio();
  requestData = JSON.stringify(processo);
});

Given('o usuário preenche o nome do autor com um caractere', async function () {
  processo = ProcessoFactory.geraProcessoComNomeAutorComUmCaracter();
  requestData = JSON.stringify(processo);
});

Given('o usuário preenche o nome do autor com muitos caracteres', async function () {
  processo = ProcessoFactory.geraProcessoComNomeAutorComMuitosCaracteres();
  requestData = JSON.stringify(processo);
});

Given('o usuário preenche um CPF inválido para o autor', async function () {
  processo = ProcessoFactory.geraProcessoComCpfAutorInvalido();
  requestData = JSON.stringify(processo);
});

Given('o usuário preenche um CPF inválido para o réu', async function () {
  processo = ProcessoFactory.geraProcessoComCpfReuInvalido();
  requestData = JSON.stringify(processo);
});

Given('o usuário preenche um CPF inválido para o depositante', async function () {
  processo = ProcessoFactory.geraProcessoComCnpjDepositanteInvalido();
  requestData = JSON.stringify(processo);
});

Given('o usuário não preenche o CPF para o autor', async function () {
  processo = ProcessoFactory.geraProcessoComCpfAutorVazio();
  requestData = JSON.stringify(processo);
});

Given('o usuário preenche o tipo do documento com CNPJ e o número como CPF para o autor', async function () {
  processo = ProcessoFactory.geraProcessoComDocumentoAutorDivergente();
  requestData = JSON.stringify(processo);
});

Given('o usuário preenche o tipo do documento com CNPJ e o número como CPF para o réu', async function () {
  processo = ProcessoFactory.geraProcessoComDocumentoDepositanteDivergente();
  requestData = JSON.stringify(processo);
});

Given('o usuário preenche o tipo do documento com CNPJ e o número como CPF para o depositante', async function () {
  processo = ProcessoFactory.geraProcessoComDocumentoReuDivergente();
  requestData = JSON.stringify(processo);
});

Given('o usuário não preenche o CPF para o réu', async function () {
  processo = ProcessoFactory.geraProcessoComCPFReuVazio();
  requestData = JSON.stringify(processo);
});

Given('o usuário não preenche o CPF para o depositante', async function () {
  processo = ProcessoFactory.geraProcessoComCPFDepositanteVazio();
  requestData = JSON.stringify(processo);
});

Given('o usuário não preenche o email', async function () {
  processo = ProcessoFactory.geraProcessoComEmailDepositanteVazio();
  requestData = JSON.stringify(processo);
});

Given('o usuário não preenche o telefone', async function () {
  processo = ProcessoFactory.geraProcessoComTelefoneDepositanteVazio();
  requestData = JSON.stringify(processo);
});

Given('o usuário preenche um e-mail inválido', async function () {
  processo = ProcessoFactory.geraProcessoComEmailDepositanteInvalido();
  requestData = JSON.stringify(processo);
});

Given('o usuário preenche um telefone inválido', async function () {
  processo = ProcessoFactory.geraProcessoComTelefoneDepositanteInvalido();
  requestData = JSON.stringify(processo);
});

Given('o usuário não preenche o nome do réu', async function () {
  processo = ProcessoFactory.geraProcessoComNomeReuVazio();
  requestData = JSON.stringify(processo);
});

Given('o usuário preenche o nome do réu com um caractere', async function () {
  processo = ProcessoFactory.geraProcessoComNomeReuComUmCaracter();
  requestData = JSON.stringify(processo);
});

Given('o usuário preenche o nome do depositante com um caractere', async function () {
  processo = ProcessoFactory.geraProcessoComNomeDepositanteComUmCaracter();
  requestData = JSON.stringify(processo);
});

Given('o usuário preenche o nome do réu com muitos caracteres', async function () {
  processo = ProcessoFactory.geraProcessoComNomeReuComMuitosCaracteres();
  requestData = JSON.stringify(processo);
});

Given('o usuário preenche o nome do depositante com muitos caracteres', async function () {
  processo = ProcessoFactory.geraProcessoComNomeDepositanteComMuitosCaracteres();
  requestData = JSON.stringify(processo);
});

When('a requisição de inclusão é realizada {int} vez es', async function (quantidadeExecucoes) {
  baseURL = "https://dev.azulzinhapay.fiserv.com/CNJ_API/rest/CNJ";
  resourcePath = "/CadastroCobrancaDepositoJudicial";
  url = `${baseURL}${resourcePath}`;

  context = await request.newContext({
    baseURL: url,
  });

  this.context = context;

  for (let i = 0; i < quantidadeExecucoes; i++) {
    requestStartTime = performance.now();

    response = await this.context.post("", {
      headers: getHeaders(),
      data: requestData,
      timeout: (30 * 1000)
    });

    requestEndTime = performance.now();
    requestTime = Number((requestEndTime - requestStartTime).toFixed(2));

    this.attach(`Execução número ${i + 1} - Raw Request: ${JSON.stringify(requestData, null, 2)}`, 'application/json');
    this.attach(`Execução número ${i + 1} - Status Code: ${response.status()}`, 'text/plain');
    this.attach(`Execução número ${i + 1} - Response: ${JSON.stringify(await response.json(), null, 2)}`, 'application/json');
    this.attach(`Execução número ${i + 1} - Tempo de Execução: ${requestTime} ms`, 'text/plain');
  }

  responseBody = await response.json();
});

Then('a resposta contém o status code {int}', async function (expectedStatusCode) {
  expect(response.status()).toBe(expectedStatusCode);
});

Then('o tempo de resposta é abaixo de {int} milisegundos', async function (expectedResponseTime) {
  expect(requestTime).toBeLessThan(expectedResponseTime);
});

Then('o endpoint de pagamento é retornado corretamente', async function () {
  expect(responseBody).toHaveProperty("endpointPagamento");
  expect(responseBody.endpointPagamento).toContain("https://dev.azulzinhapay.fiserv.com/CNJ/pagaid/");
  expect(responseBody.endpointPagamento.length).toBe(83);
});

Then('a resposta contém a mensagem {string}', async function (expectedErroMessage) {
  expect(responseBody.Errors[0]).toContain(expectedErroMessage);
});
