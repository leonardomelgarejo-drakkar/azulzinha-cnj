export class Deposito {
  id: string;
  finalidade: string;
  valor: number;
  observacoes: string;

  private constructor(builder: typeof Deposito.Builder.prototype) {
    this.id = builder.id;
    this.finalidade = builder.finalidade;
    this.valor = builder.valor;
    this.observacoes = builder.observacoes;
  }

  static Builder = class {
    id: string = "DEFAULT_ID";
    finalidade: string = "GARANTIA";
    valor: number = 0.0;
    observacoes: string = "";

    setId(id: string): this {
      this.id = id;
      return this;
    }

    setFinalidade(finalidade: string): this {
      this.finalidade = finalidade;
      return this;
    }

    setValor(valor: number): this {
      this.valor = valor;
      return this;
    }

    setObservacoes(observacoes: string): this {
      this.observacoes = observacoes;
      return this;
    }

    build(): Deposito {
      return new Deposito(this);
    }
  };
}
