import { Given, When, Then } from "@cucumber/cucumber";
import { cadastrarDepositoJudicial } from "../../helper/util/cadastroCobrancaHelper";
import { ProcessoFactory } from "../../factory/processoFactory";
import { fixture } from "../../hooks/pageFixture";
import DepositoJudicialPage from "../../pages/depositoJudicialPage";
import Assert from "../../helper/wrapper/assert";
import { timeout } from "../../helper/globalConfig";

let depositoJudicialPage: DepositoJudicialPage;
let assert: Assert;
let valorDepositoFluxo: number;
let depositoJudicialHeaderText: string;
let valorx: string;

Given('que a cobrança de depósito judicial de valor R${string} foi cadastrada com sucesso', { timeout: timeout }, async function (valorDeposito: string) {
  valorDepositoFluxo = Number(valorDeposito);
  const processo = ProcessoFactory.geraProcessoComValorDeposito(valorDepositoFluxo);
  const requestData = JSON.stringify(processo);
  
  const { responseBody } = await cadastrarDepositoJudicial(requestData, 1, this);
  
  this.endpointPagamento = responseBody.endpointPagamento;
});

When('o usuário acessa o link do cadastro judicial', { timeout: timeout }, async function () {
  depositoJudicialPage = new DepositoJudicialPage(fixture.page);
  assert = new Assert(fixture.page);
  const url = this.endpointPagamento.replace(/^"+|"+$/g, '');
  await depositoJudicialPage.goto(url);
});

Then('a página do cadastro de depósito é acessada', { timeout: timeout }, async function () {
  depositoJudicialHeaderText = await depositoJudicialPage.getdepositoJudicialHeaderText();
  await assert.assertElementContains(depositoJudicialHeaderText, "Depósito Judicial Não Tributá");
});

Then('a quantidade de parcelas é {string}', { timeout: timeout }, async function (textNumParcelas: string) {
  const textQuantidadeParcelas = await depositoJudicialPage.getTextQuantidadeParcelasEsperadas(textNumParcelas);
  await assert.assertElementContains(textQuantidadeParcelas, textNumParcelas);
});

Then('o valor da parcela é {string}', { timeout: timeout }, async function (valorEsperado: string) {
  valorx = await depositoJudicialPage.getValorEsperado(valorEsperado);
  await assert.assertElementContains(valorx, valorEsperado);
});

Then('o valor {string}', { timeout: timeout }, async function (valorTotal: string) {
  const valorTotalAtual = depositoJudicialPage.getValorTotalEsperado(valorTotal);

  await assert.assertElementContains(await valorTotalAtual, valorTotal);
});

Then('a {string}', { timeout: timeout }, async function (valorConveniencia: string) {
  const textValorConvenienciaAtual = depositoJudicialPage.getValorTotalEsperado(valorConveniencia);

  await assert.assertElementContains(await textValorConvenienciaAtual, valorConveniencia);
});
