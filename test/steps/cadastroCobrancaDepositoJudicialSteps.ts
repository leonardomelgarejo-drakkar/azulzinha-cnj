import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ProcessoFactory } from "../../factory/processoFactory";
import { ProcessoJudicial } from "../../factory/models/processoJudicial";
import { cadastrarDepositoJudicial } from "../../helper/util/cadastroCobrancaHelper";
import { timeout } from "../../config/globalConfig";

let requestData: string;
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

Given('o usuário preenche a urlRetorno', async function () {
  processo = ProcessoFactory.geraProcessoComUrlRetornoPreenchida();
  requestData = JSON.stringify(processo);
});

Given('o usuário não preenche a urlRetorno', async function () {
  processo = ProcessoFactory.geraProcessoComUrlRetornoVazia();
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
  processo = ProcessoFactory.geraProcessoComDocumentoReuDivergente();
  requestData = JSON.stringify(processo);
});

Given('o usuário preenche o tipo do documento com CNPJ e o número como CPF para o depositante', async function () {
  processo = ProcessoFactory.geraProcessoComDocumentoDepositanteDivergente();
  requestData = JSON.stringify(processo);
});

Given('o usuário não preenche o CPF para o réu', async function () {
  processo = ProcessoFactory.geraProcessoComCPFReuVazio();
  requestData = JSON.stringify(processo);
});

Given('o usuário não preenche o CNPJ para o depositante', async function () {
  processo = ProcessoFactory.geraProcessoComCNPJDepositanteVazio();
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

When('a requisição de inclusão é realizada {int} vez es', { timeout: timeout }, async function (quantidadeExecucoes: number) {
  const { response, responseBody, requestTime } = await cadastrarDepositoJudicial(requestData, quantidadeExecucoes, this);
  this.response = response;
  this.responseBody = responseBody;
  this.requestTime = requestTime;
});

Then('a resposta contém o status code {int}', async function (expectedStatusCode) {
  expect(this.response.status()).toBe(expectedStatusCode);
});

Then('o tempo de resposta é abaixo de {int} milisegundos', async function (expectedResponseTime) {
  expect(this.requestTime).toBeLessThan(expectedResponseTime);
});

Then('o endpoint de pagamento é retornado corretamente', async function () {
  const ambiente = process.env.ENV || 'qa'; // default opcional para QA

  const dominioEsperado = ambiente === 'dev'
    ? 'https://dev.azulzinhapay.fiserv.com/CNJ/pagaid/'
    : 'https://qa.azulzinhapay.fiserv.com/CNJ/pagaid/';

  expect(this.responseBody).toHaveProperty("endpointPagamento");
  expect(this.responseBody.endpointPagamento).toContain(dominioEsperado);
});

Then('a resposta contém a mensagem {string}', async function (expectedErroMessage) {
  expect(this.responseBody.Errors[0]).toContain(expectedErroMessage);
});
