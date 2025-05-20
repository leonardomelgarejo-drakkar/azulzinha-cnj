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

Given('que a cobrança de depósito judicial fixo, com letras, de valor R${string} foi cadastrada com sucesso', { timeout: timeout }, async function (valorDeposito: string) {
  valorDepositoFluxo = Number(valorDeposito);
  const processo = ProcessoFactory.geraProcessoComValorDepositoCodigoProcessoFixoComLetras(valorDepositoFluxo);
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

When('a página do cadastro de depósito é acessada', { timeout: timeout }, async function () {
  depositoJudicialHeaderText = await depositoJudicialPage.getdepositoJudicialHeaderText();
  await assert.assertElementContains(depositoJudicialHeaderText, "Depósito Judicial Não Tributá");
});

Then('o nome do titular é carregado automaticamente com {string}', { timeout: timeout }, async function (titularCartao: string) {
  const nomeTitularCartao = await depositoJudicialPage.getNomeTitularCartao();
  await assert.assertElementContains(nomeTitularCartao, titularCartao);
});

Then('o cpf do titular é carregado automaticamente com {string}', { timeout: timeout }, async function (cpfTitular: string) {
  const cpfTitularCartao = await depositoJudicialPage.getCpfTitularCartao();
  await assert.assertElementContains(cpfTitularCartao, cpfTitular);
});

Then('automaticamente o endereço é carregado com {string}', { timeout: timeout }, async function (enderecoTitular: string) {
  const enderecoTitularCartao = await depositoJudicialPage.getEnderecoTitularCartao();
  await assert.assertElementContains(enderecoTitularCartao, enderecoTitular);
});

Then('automaticamente o bairro é carregado com {string}', { timeout: timeout }, async function (bairroTitular: string) {
  const bairroTitularCartao = await depositoJudicialPage.getBairroTitularCartao();
  await assert.assertElementContains(bairroTitularCartao, bairroTitular);
});

Then('automaticamente a cidade é carregada com {string}', { timeout: timeout }, async function (cidadeTitular: string) {
  const cidadeTitularCartao = await depositoJudicialPage.getCidadeTitularCartao();
  await assert.assertElementContains(cidadeTitularCartao, cidadeTitular);
});

Then('automaticamente o valor de depósito é carregado com {string}', { timeout: timeout }, async function (valorDepositoTitular: string) {
  const valorDepositoTitularCartao = await depositoJudicialPage.getValorDepositoTitularCartao();
  await assert.assertElementContains(valorDepositoTitularCartao, valorDepositoTitular);
});

Then('automaticamente o serviço de conveniência é carregado com {string}', { timeout: timeout }, async function (servicoConvenienciaTitular: string) {
  const servicoConvenienciaTitularCartao = await depositoJudicialPage.getServicoConvenienciaTitularCartao();
  await assert.assertElementContains(servicoConvenienciaTitularCartao, servicoConvenienciaTitular);
});

Then('automaticamente o total do pagamento é carregado com {string}', { timeout: timeout }, async function (totalPagamento: string) {
  const totalPagamentoCartao = await depositoJudicialPage.getTotalPagamentoCartao();
  await assert.assertElementContains(totalPagamentoCartao, totalPagamento);
});

Then('automaticamente o estado é carregado com {string}', { timeout: timeout }, async function (estadoTitular: string) {
  const estadoTitularCartao = await depositoJudicialPage.getEstadoTitularCartao();
  await assert.assertElementContains(estadoTitularCartao, estadoTitular);
});

Then('tela é recarregada com a mensagem {string}', { timeout: timeout }, async function (pagamentoNegado: string) {
  const pagamentoNegadoCartao = await depositoJudicialPage.getPagamentoNegado(pagamentoNegado);
  await assert.assertElementContains(pagamentoNegadoCartao, pagamentoNegado);
});

Then('tela é recarregada com a mensagem Seu pagamento foi {string}', { timeout: timeout }, async function (pagamentoAprovado: string) {
  const pagamentoAprovadoCartao = await depositoJudicialPage.getPagamentoAprovado();
  await assert.assertElementContains(pagamentoAprovadoCartao, pagamentoAprovado);
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

When('seleciona quantidade de parcelas igual 1 x', { timeout: timeout }, async function () {
  await depositoJudicialPage.selecionaQuantidadeDeParcelas1x();
});

When('seleciona quantidade de parcelas igual 2 x', { timeout: timeout }, async function () {
  await depositoJudicialPage.selecionaQuantidadeDeParcelas2x();
});

When('clica no botão continuar', { timeout: timeout }, async function () {
  await depositoJudicialPage.clicaContinuar();
});

When('clica no botão próximo', { timeout: timeout }, async function () {
  await depositoJudicialPage.clicaProximo();
});

When('clica no checkbox concordando com os termos', { timeout: timeout }, async function () {
  await depositoJudicialPage.clicaCheckboxTermos();
});

When('clica no botão efetuar pagamento', { timeout: timeout }, async function () {
  await depositoJudicialPage.clicaEfetuarPagamento();
});

When('tenta clicar no botão efetuar pagamento sem concordar com os termos', { timeout: timeout }, async function () {
  await depositoJudicialPage.clicaEfetuarPagamento();
});

When('preenche o número do cartão com {string}', { timeout: timeout }, async function (numeroCartao: string) {
  await depositoJudicialPage.preencheNumeroCartao(numeroCartao);
});

When('preenche a validade com {string}', { timeout: timeout }, async function (validadeCartao: string) {
  await depositoJudicialPage.preencheValidadeCartao(validadeCartao);
});

When('preenche o card verification value com {string}', { timeout: timeout }, async function (cardVerificationValue: string) {
  await depositoJudicialPage.preencheCVV(cardVerificationValue);
});

When('preenche o CEP com {string}', { timeout: timeout }, async function (cep: string) {
  await depositoJudicialPage.preencheCEP(cep);
});

When('preenche o numero com {string}', { timeout: timeout }, async function (numero: string) {
  await depositoJudicialPage.preencheNumeroEndereco(numero);
});

When('altera quantidade de parcelas para 2x R$263,71', { timeout: timeout }, async function () {
  await depositoJudicialPage.clicaQuantidadeParcelas();
  await depositoJudicialPage.alterarQuantidadeDeParcelas2x();
});

Then('confirma a alteração para {string}', { timeout: timeout }, async function (novaQuantidadeParcelas: string) {
  const quantidadeParcelasSelecionadas = await depositoJudicialPage.getQuantidadeDeParcelasSelecionadas();
  await assert.assertElementContains(quantidadeParcelasSelecionadas, novaQuantidadeParcelas);
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

Then('o botão efetuar deve estar habilidado', { timeout: timeout }, async function () {
  const botaoEfetuarPagamentoHabilitado =  await depositoJudicialPage.isBotaoPagamentoHabilitado();
  await assert.assertTrue(botaoEfetuarPagamentoHabilitado);
});

Then('o botão efetuar deve estar desabilidado', { timeout: timeout }, async function () {
  const botaoEfetuarPagamentoDesabilitado =  await depositoJudicialPage.isBotaoPagamentoDesabilitado();
  await assert.assertTrue(botaoEfetuarPagamentoDesabilitado);
});