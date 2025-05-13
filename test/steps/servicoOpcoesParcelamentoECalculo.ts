import { Given, When, Then } from "@cucumber/cucumber";
import { cadastrarDepositoJudicial } from "../../helper/util/cadastroCobrancaHelper";
import { ProcessoFactory } from "../../factory/processoFactory";
import { fixture } from "../../hooks/pageFixture";
import DepositoJudicialPage from "../../pages/depositoJudicialPage";
import Assert from "../../helper/wrapper/assert";
import { timeout } from "../../config/globalConfig";

let depositoJudicialPage: DepositoJudicialPage;
let assert: Assert;
let valorDepositoFluxo: number;
let depositoJudicialHeaderText: string;
let codigoProcesso: string;
let valorx: string;

Given('que a cobrança de depósito judicial de valor R${string} foi cadastrada com sucesso', { timeout: timeout }, async function (valorDeposito: string) {
  valorDepositoFluxo = Number(valorDeposito);
  const processo = ProcessoFactory.geraProcessoComValorDepositoCodigoProcesso(valorDepositoFluxo);
  const requestData = JSON.stringify(processo);
  
  const { responseBody } = await cadastrarDepositoJudicial(requestData, 1, this);
  
  this.endpointPagamento = responseBody.endpointPagamento;
});

Given('que a cobrança de depósito judicial fixo de valor R${string} foi cadastrada com sucesso', { timeout: timeout }, async function (valorDeposito: string) {
  valorDepositoFluxo = Number(valorDeposito);
  const processo = ProcessoFactory.geraProcessoComValorDepositoCodigoProcessoFixo(valorDepositoFluxo);
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

Then('a máscara do tooltip de serviço de convêniencia está correta', { timeout: timeout }, async function () {
  const toolTipConveniencia = await depositoJudicialPage.getToolTipConveniencia();
  await assert.assertElementContains(toolTipConveniencia, "O que é o serviço de conveniência?");
});

Then('a aba de dados do processo é expandida', { timeout: timeout }, async function () {
  await depositoJudicialPage.expandirDadosProcesso();
});

Then('o código do processo é {string}', { timeout: timeout }, async function (processo: string) {
  codigoProcesso = await depositoJudicialPage.getCodigoProcesso();
  await assert.assertElementContains(codigoProcesso, processo);
});

Then('o primeiro passo é {string}', { timeout: timeout }, async function (primeiro: string) {
  const primeiroPasso = await depositoJudicialPage.getPrimeiroPasso();
  await assert.assertElementContains(primeiroPasso, primeiro);
});

Then('o segundo passo é {string}', { timeout: timeout }, async function (segundo: string) {
  const segundoPasso = await depositoJudicialPage.getSegundoPasso();
  await assert.assertElementContains(segundoPasso, segundo);
});

Then('o terceiro passo é {string}', { timeout: timeout }, async function (terceiro: string) {
  const terceiroPasso = await depositoJudicialPage.getTerceiroPasso();
  await assert.assertElementContains(terceiroPasso, terceiro);
});

Then('o quarto passo é {string}', { timeout: timeout }, async function (quarto: string) {
  const quartoPasso = await depositoJudicialPage.getQuartoPasso();
  await assert.assertElementContains(quartoPasso, quarto);
});

Then('o quinto passo é {string}', { timeout: timeout }, async function (quinto: string) {
  const quintoPasso = await depositoJudicialPage.getQuintoPasso();
  await assert.assertElementContains(quintoPasso, quinto);
});

Then('o depositante é {string}', { timeout: timeout }, async function (depositante: string) {
  const nomeDepositante = await depositoJudicialPage.getDepositante();
  await assert.assertElementContains(nomeDepositante, depositante);
});

Then('o autor é {string}', { timeout: timeout }, async function (autor: string) {
  const nomeAutor = await depositoJudicialPage.getAutor();
  await assert.assertElementContains(nomeAutor, autor);
});

Then('o réu é {string}', { timeout: timeout }, async function (reu: string) {
  const nomeReu = await depositoJudicialPage.getReu();
  await assert.assertElementContains(nomeReu, reu);
});

Then('o documento do depositante é {string}', { timeout: timeout }, async function (documento: string) {
  const documentoDepositante = await depositoJudicialPage.getDocumentoDepositante();
  await assert.assertElementContains(documentoDepositante, documento);
});

Then('o documento do autor é {string}', { timeout: timeout }, async function (documento: string) {
  const documentoAutor = await depositoJudicialPage.getDocumentoAutor();
  await assert.assertElementContains(documentoAutor, documento);
});

Then('o documento do réu é {string}', { timeout: timeout }, async function (documento: string) {
  const documentoReu = await depositoJudicialPage.getDocumentoReu();
  await assert.assertElementContains(documentoReu, documento);
});

Then('o valor do depósito é {string}', { timeout: timeout }, async function (valor: string) {
  const valorDeposito = await depositoJudicialPage.getValorDeposito();
  await assert.assertElementContains(valorDeposito, valor);
});

Then('o telefone do depositante é {string}', { timeout: timeout }, async function (telefone: string) {
  const telefoneDepositante = await depositoJudicialPage.getTelefoneDepositante();
  await assert.assertElementContains(telefoneDepositante, telefone);
});

Then('o e-mail do depositante é {string}', { timeout: timeout }, async function (email: string) {
  const emailDepositante = await depositoJudicialPage.getEmailDepositante();
  await assert.assertElementContains(emailDepositante, email);
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
