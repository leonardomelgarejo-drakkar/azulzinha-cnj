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
  await depositoJudicialPage.gotoLuegRep(this.endpointPagamento);
});

Then('a página do cadastro de depósito é acessada', { timeout: timeout }, async function () {
  depositoJudicialHeaderText = await depositoJudicialPage.getdepositoJudicialHeaderText();
  await assert.assertElementContains(depositoJudicialHeaderText, "Depósito Judicial Não Tributá");
});

Then('o valor da parcela em {string} vez es fica R${string}', { timeout: timeout }, async function (numParcelas: string, valorEsperado: string) {
  this.numParcelas = numParcelas;
  valorx = await depositoJudicialPage.getValorEsperado(numParcelas, valorEsperado);
  const expectedText = `${numParcelas} x de R$${valorEsperado}`;
  await assert.assertElementContains(valorx, expectedText);
});

Then('o valor total fica R${string}', { timeout: timeout }, async function (valorTotal: string) {
  if(this.numParcelas === "9"){
    valorx = await depositoJudicialPage.getValorTotal(valorTotal, 1);
  } else if (this.numParcelas === "10"){
    valorx = await depositoJudicialPage.getValorTotal(valorTotal, 2);
  } else {
    valorx = await depositoJudicialPage.getValorTotal(valorTotal, 1);
  }
  
  const expectedText = `Total: R$${valorTotal}`;
  await assert.assertElementContains(valorx, expectedText);
});

Then('o valor do serviço de conveniência de R${string}', { timeout: timeout }, async function (valorConveniencia: string) {
  if(this.numParcelas === "9"){
    valorx = await depositoJudicialPage.getValorConveniência(valorConveniencia, 1);
  } else if (this.numParcelas === "10"){
    valorx = await depositoJudicialPage.getValorConveniência(valorConveniencia, 2);
  } else {
    valorx = await depositoJudicialPage.getValorConveniência(valorConveniencia, 1);
  }
  
  const expectedText = `Incluso serviço de conveniência: R$${valorConveniencia}`;
  await assert.assertElementContains(valorx, expectedText);
});
