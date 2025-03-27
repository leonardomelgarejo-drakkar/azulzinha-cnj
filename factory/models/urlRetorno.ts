export class Documento {
  tipo: string;
  numero: string;

  private constructor(builder: typeof Documento.Builder.prototype) {
    this.tipo = builder.tipo;
    this.numero = builder.numero;
  }

  static Builder = class {
    tipo: string = "CPF";
    numero: string = "00000000000";

    setTipo(tipo: string): this {
      this.tipo = tipo;
      return this;
    }

    setNumero(numero: string): this {
      this.numero = numero;
      return this;
    }

    build(): Documento {
      return new Documento(this);
    }
  };
}
