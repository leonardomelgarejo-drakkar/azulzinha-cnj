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
    depositoJudicialHeaderText: "Depósito Judicial Não Tributá",
    toolTipConvenienciaText: "O que é o serviço de conveniê",
    valor: "R$1.001,51",
    numeroProcessoText: "Processo N°:",
    telefoneDepositanteByText: "(51) 98531-",
    emailDepositanteByText: "qa.depositante@test.com",
    testIdPrimeiroPasso: "ValidaçãoProcesso",
    testIdSegundoPasso: "Natureza do depósito",
    testIdTerceiroPasso: "InformaçõesDepósito",
    testIdQuartoPasso: "FormaPagamento",
    testIdQuintoPasso: "Confirmação",
    testIdDepositante: "DepositanteValue",
    testIdAutor: "AutorValue",
    testIdReu: "RéuValue",
    testIdDocumentoDepositante: "CNPJValueDepositante",
    testIdDocumentoAutor: "CPFValueAutor",
    testIdDocumentoReu: "CPFValueReu",
    testIdValorDeposito: "ValorValue"
  }

  async goto(BASEURL: string){
    await this.base.goto(BASEURL);
  }

  async getdepositoJudicialHeaderText(){
    return await this.base.getByText(this.Elements.depositoJudicialHeaderText);
  }

  async getToolTipConveniencia(){
    return await this.base.getByText(this.Elements.toolTipConvenienciaText);
  }

  async getTextQuantidadeParcelasEsperadas(textNumParcelas: string) {
    const text = this.base.getByTextExact(textNumParcelas, true);

    return await text;
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
    return await this.base.getByText(this.Elements.telefoneDepositanteByText);
  }

  async getEmailDepositante(){
    return await this.base.getByText(this.Elements.emailDepositanteByText);
  }
  
}