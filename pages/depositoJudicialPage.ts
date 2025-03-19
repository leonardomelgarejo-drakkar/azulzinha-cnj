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
    depositoJudicialHeaderText: "Depósito Judicial Não Tributá",
    valor: "R$1.001,51"
  }

  async gotoLuegRep(BASEURL: string){
    await this.base.goto(BASEURL);
  }

  async getdepositoJudicialHeaderText(){
    return await this.base.getByText(this.Elements.depositoJudicialHeaderText);
  }

  async getValorEsperado(numParcelas: string, valorEsperado: string) {
    const text = `${numParcelas} x de R$${valorEsperado}`;

    return await this.base.getByTextWithScrollToElement(text);
  }

  async getValorTotal(valorTotal: string, position: number) {
    const text = `Total: R$${valorTotal}`;

    return await this.base.getByTextOnPosition(text, position);
  }

  async getValorConveniência(valorConveniencia: string, position: number) {
    const text = `Incluso serviço de conveniência: R$${valorConveniencia}`;

    return await this.base.getByTextOnPosition(text, position);
  }
  
}