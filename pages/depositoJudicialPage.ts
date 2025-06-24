import { type Page } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/playwrightWrappers';

export default class DepositoJudicialPage {

  private base: PlaywrightWrapper;

  constructor(private page: Page){
    this.base = new PlaywrightWrapper(page);
  }

  private Elements = {
    menuItemRole: "menuitem",
    searchBox: "searchbox",
    gridCell: "gridcell",
    buttonRoleType: "button",
    optionRoleType: "option",
    checkboxRole: "checkbox",
    depositoJudicialHeaderText: "Depósito Judicial",
    toolTipConvenienciaText: "O que é o serviço de conveniê",
    valor: "R$1.001,51",
    numeroProcessoText: "Processo N°:",
    continuarText: "Continuar",
    proximoText: "Proximo",
    opcaoQuantidadeParcelasText: "Select an option",
    quantidadeParcelas2xText: "2x de R$ 263,71",
    emailDepositanteByText: "qa.depositante@test.com",
    cpfTitularCartaoText: "CPF do titular ou CNPJ97.855.",
    estadoTitularCartaoText: "Rio Grande do Sul (RS)",
    enviarText: "Enviar",
    testIdPrimeiroPasso: "ValidaçãoProcesso",
    testIdSegundoPasso: "Natureza do depósito",
    testIdTerceiroPasso: "InformaçõesDepósito",
    testIdQuartoPasso: "FormaPagamento",
    testIdQuintoPasso: "Confirmação",
    testIdDepositante: "DepositanteName",
    testIdAutor: "AutorName",
    testIdReu: "RéuName",
    testIdDocumentoDepositante: "CNPJValueDepositante",
    testIdDocumentoAutor: "CPFValueAutor",
    testIdDocumentoReu: "CPFValueReu",
    testIdValorDeposito: "DepositantValue",
    testIdNumeroCartao: "InputNumeroCartao",
    testIdValidadeCartao: "input-login-birth-date",
    testIdVVVCartao: "CVVInput",
    testIdCEP: "input-cep-to-register",
    testIdNumeroEndereco: "input-number-address-to-register",
    testIdNomeTitularCartao: "InputNameCartao",
    testIdCpfTitularCartao: "InputNameCartao",
    testIdEnderecoTitularCartao: "input-address-to-register",
    testIdBairroTitularCartao: "input-neighborhood-to-register",
    testIdCidadeTitularCartao: "input-city-to-register",
    testIdValorDepositoTitularCartao: "payment-resume-total-debits",
    testIdServicoConvenienciaTitularCartao: "payment-resume-service-rate",
    testIdTotalPagamentoCartao: "payment-resume-final-total-value",
    testIdEfetuarPagamento: "btn-confirmPayment-makePayment",
    testIdDetalhePagamento: "DetalhePagamento",
    testIdPagamentoAprovado: "ConcluidoPagamento",
    testIdTelefoneDepositante: "TelefoneDepositante",
    umaParcelaLocator: "#b4-b3-l1-7_0-Checkbox1",
    duasParcelasLocator: "#b4-b3-l1-7_1-Checkbox1",
    challengeFrameLocator: "iframe[name='challengeFrame']",
    resultFrameLocator: "#result"
  }

  async goto(BASEURL: string){
    await this.base.goto(BASEURL);
  }

  async getdepositoJudicialHeaderText(){
    return await this.base.getByText(this.Elements.depositoJudicialHeaderText);
  }

  async getNomeTitularCartao(){
    return await this.base.getInputValueByTestId(this.Elements.testIdNomeTitularCartao);
  }

  async getCpfTitularCartao(){
    return await this.base.getByText(this.Elements.cpfTitularCartaoText);
  }  

  async getEnderecoTitularCartao(){
    return await this.base.getInputValueByTestId(this.Elements.testIdEnderecoTitularCartao);
  }  

  async getBairroTitularCartao(){
    return await this.base.getInputValueByTestId(this.Elements.testIdBairroTitularCartao);
  }  

  async getCidadeTitularCartao(){
    return await this.base.getInputValueByTestId(this.Elements.testIdCidadeTitularCartao);
  }

  async getValorDepositoTitularCartao(){
    return await this.base.getByTestId(this.Elements.testIdValorDepositoTitularCartao);
  }

  async getServicoConvenienciaTitularCartao(){
    return await this.base.getByTestId(this.Elements.testIdServicoConvenienciaTitularCartao);
  }

  async getTotalPagamentoCartao(){
    return await this.base.getByTestId(this.Elements.testIdTotalPagamentoCartao);
  }

  async getEstadoTitularCartao(){
    return await this.base.getByText(this.Elements.estadoTitularCartaoText);
  }

  async getPagamentoNegado(erroMessage: string){
    return await this.base.getByText(erroMessage);
  }

  async getPagamentoAprovado(){
    return await this.base.getByTestId(this.Elements.testIdPagamentoAprovado);
  }

  async getToolTipConveniencia(){
    return await this.base.getByText(this.Elements.toolTipConvenienciaText);
  }

  async getTextQuantidadeParcelasEsperadas(textNumParcelas: string) {
    const text = this.base.getByTextExact(textNumParcelas, true);

    return await text;
  }

  async selecionaQuantidadeDeParcelas1x() {
    const text = this.base.waitAndClick(this.Elements.umaParcelaLocator);

    return await text;
  }

  async selecionaSimulador3DScomStatusNegado() {
    await this.base.waitAndClickWithChallenge(this.Elements.challengeFrameLocator, this.Elements.resultFrameLocator, "N");
  }

  async selecionaSimulador3DScomStatusSucesso() {
    await this.base.waitAndClickWithChallenge(this.Elements.challengeFrameLocator, this.Elements.resultFrameLocator, "Y");
  }

  async selecionaQuantidadeDeParcelas2x() {
    this.base.waitAndClick(this.Elements.duasParcelasLocator);
  }

  async clicaContinuar() {
    await this.base.waitAndClickGetByRoleWithoutReturn(this.Elements.buttonRoleType, this.Elements.continuarText);
  }

  async clicaProximo() {
    await this.base.waitAndClickGetByRoleWithoutReturn(this.Elements.buttonRoleType, this.Elements.proximoText);
  }

  async clicaCheckboxTermos() {
    await this.base.waitAndClickGetByRoleBasic(this.Elements.checkboxRole);
  }

  async clicaEfetuarPagamento() {
    await this.base.clickByTestId(this.Elements.testIdEfetuarPagamento);
  }

  async clicaEnviarChallenge() {
    await this.base.waitAndClickGetByRoleWithChallenge(this.Elements.challengeFrameLocator, this.Elements.buttonRoleType, this.Elements.enviarText);
  }

  async clicaQuantidadeParcelas() {
    await this.base.waitAndClickGetByRole(this.Elements.buttonRoleType, this.Elements.opcaoQuantidadeParcelasText);
  }

  async alterarQuantidadeDeParcelas2x() {
    await this.base.waitAndClickGetByRoleWithoutReturn(this.Elements.optionRoleType, this.Elements.quantidadeParcelas2xText);
  }

  async getQuantidadeDeParcelasSelecionadas() {
    const text = await this.base.getTextByRole(this.Elements.buttonRoleType, this.Elements.opcaoQuantidadeParcelasText);

    return text;
  }

  async getValorEsperado(valorEsperado: string) {
    const text = this.base.getByTextExact(valorEsperado, true);

    return await this.base.getByTextWithScrollToElement(await text);
  }

  async getValorTotalEsperado(textNumParcelas: string) {
    const text = this.base.getByText(textNumParcelas);

    return await this.base.getByTextWithScrollToElement(await text);
  }

  async getValorTotal(valorTotal: string, position: number) {
    const text = `Total: R$${valorTotal}`;

    return await this.base.getByTextOnPosition(text, position);
  }

  async getValorConveniência(valorConveniencia: string, position: number) {
    const text = `Incluso serviço de conveniência: R$${valorConveniencia}`;

    return await this.base.getByTextOnPosition(text, position);
  }

  async expandirDadosProcesso(){
    return await this.base.waitAndClickGetByRole(this.Elements.buttonRoleType, this.Elements.numeroProcessoText);
  }

  async preencheNumeroCartao(numeroCartao: string){
    await this.base.fillByTestId(this.Elements.testIdNumeroCartao, numeroCartao);
  }

  async preencheValidadeCartao(validadeCartao: string){
    await this.base.fillByTestId(this.Elements.testIdValidadeCartao, validadeCartao);
  }

  async preencheCVV(cvv: string){
    await this.base.fillByTestId(this.Elements.testIdVVVCartao, cvv);
  }  

  async preencheCEP(cep: string){
    await this.base.fillByTestId(this.Elements.testIdCEP, cep);
  }  

  async preencheNumeroEndereco(numeroEndereco: string){
    await this.base.fillByTestId(this.Elements.testIdNumeroEndereco, numeroEndereco);
  }  

  async getCodigoProcesso(){
    return await this.base.getTextByRole(this.Elements.buttonRoleType, this.Elements.numeroProcessoText);
  }

  async getPrimeiroPasso(){
    return await this.base.getByTestId(this.Elements.testIdPrimeiroPasso);
  }

  async getSegundoPasso(){
    return await this.base.getByTestId(this.Elements.testIdSegundoPasso);
  }

  async getTerceiroPasso(){
    return await this.base.getByTestId(this.Elements.testIdTerceiroPasso);
  }

  async getQuartoPasso(){
    return await this.base.getByTestId(this.Elements.testIdQuartoPasso);
  }

  async getQuintoPasso(){
    return await this.base.getByTestId(this.Elements.testIdQuintoPasso);
  }

  async getDepositante(){
    return await this.base.getByTestId(this.Elements.testIdDepositante);
  }

  async getAutor(){
    return await this.base.getByTestId(this.Elements.testIdAutor);
  }

  async getReu(){
    return await this.base.getByTestId(this.Elements.testIdReu);
  }

  async getDocumentoDepositante(){
    return await this.base.getByTestId(this.Elements.testIdDocumentoDepositante);
  }

  async getDocumentoAutor(){
    return await this.base.getByTestId(this.Elements.testIdDocumentoAutor);
  }

  async getDocumentoReu(){
    return await this.base.getByTestId(this.Elements.testIdDocumentoReu);
  }

  async getValorDeposito(){
    return await this.base.getByTestId(this.Elements.testIdValorDeposito);
  }

  async getTelefoneDepositante(){
    return await this.base.getByTestId(this.Elements.testIdTelefoneDepositante);
  }

  async getEmailDepositante(){
    return await this.base.getByText(this.Elements.emailDepositanteByText);
  }

  async isBotaoPagamentoHabilitado(): Promise<boolean>{
    return await this.base.isEnableByTestID(this.Elements.testIdEfetuarPagamento);
  }

  async isBotaoPagamentoDesabilitado(): Promise<boolean>{
    return await this.base.isDisableByTestID(this.Elements.testIdEfetuarPagamento);
  }
  
}