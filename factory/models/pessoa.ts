import { Documento } from "./documento";

export class Pessoa {
  nome: string;
  documento: Documento;
  "e-mail": string;
  telefone: string;

  private constructor(builder: typeof Pessoa.Builder.prototype) {
    this.nome = builder.nome;
    this.documento = builder.documento;
    this["e-mail"] = builder.email;
    this.telefone = builder.telefone;
  }

  static Builder = class {
    nome: string = "Nome Padrão";
    documento: Documento = new Documento.Builder().build();
    email: string = "";
    telefone: string = "";

    setNome(nome: string): this {
      this.nome = nome;
      return this;
    }

    setDocumento(documento: Documento): this {
      this.documento = documento;
      return this;
    }

    setEmail(email: string): this {
      this.email = email;
      return this;
    }

    setTelefone(telefone: string): this {
      this.telefone = telefone;
      return this;
    }

    build(): Pessoa {
      return new Pessoa(this);
    }
  };
}
