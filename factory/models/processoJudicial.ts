import { DataRequest } from "../helper/util/DataRequest";

export class ProcessoJudicial {
  constructor(
    public processo: string,
    public autor: any,
    public reu: any,
    public depositante: any,
    public deposito: any
  ) {}

  static Builder = class {
    private processo: string = DataRequest.generateProcessoNumber();
    private autor: any = {
      nome: DataRequest.geraNomePessoa(),
      documento: { tipo: "CPF", numero: DataRequest.generateValidCPF() }
    };
    private reu: any = {
      nome: DataRequest.geraNomePessoa(),
      documento: { tipo: "CPF", numero: DataRequest.generateValidCPF() }
    };
    private depositante: any = {
      nome: "QA Depositante",
      documento: { tipo: "CNPJ", numero: "97855495000172" },
      "e-mail": "qa.depositante@test.com",
      telefone: "51985319316"
    };
    private deposito: any = {
      id: DataRequest.generateDepositoId(),
      finalidade: "GARANTIA",
      valor: 1000.00,
      observacoes: "TESTQA"
    };

    setProcesso(processo: string) {
      this.processo = processo;
      return this;
    }

    setAutor(autor: any) {
      this.autor = autor;
      return this;
    }

    setReu(reu: any) {
      this.reu = reu;
      return this;
    }

    setDepositante(depositante: any) {
      this.depositante = depositante;
      return this;
    }

    setDeposito(deposito: any) {
      this.deposito = deposito;
      return this;
    }

    build() {
      return new ProcessoJudicial(this.processo, this.autor, this.reu, this.depositante, this.deposito);
    }
  };
}
