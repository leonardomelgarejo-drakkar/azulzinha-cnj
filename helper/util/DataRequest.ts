export class DataRequest {
  
  static generateProcessoNumber(): string {
    return `TESTQAPROC${this.generateRandomNumericString(10)}`;
  }

  static geneProcessoAcimaDoLimite(): string {
    return `TESTQAPROC${this.generateRandomNumericString(100)}`;
  }

  static geraNomePessoa(): string {
    const genericNames = ["João Silva", "Maria Santos", "Carlos Oliveira", "Ana Souza", "Roberto Lima"];
    const randomName = genericNames[Math.floor(Math.random() * genericNames.length)];
    return `TESTQANAME ${randomName.substring(0, 20)}`;
  }

  static geraNomeLongoPessoa(): string {
    const genericNames = ["João Silva", "Maria Santos", "Carlos Oliveira", "Ana Souza", "Roberto Lima"];
    const randomName = genericNames[Math.floor(Math.random() * genericNames.length)];

    const prefixo = "TESTQANAME ";

    let nomeBase = prefixo + randomName;

    return (nomeBase.padEnd(110, 'X')).substring(0, 110);
}

  static generateValidCPF(): string {
    const randomDigits = () => Math.floor(Math.random() * 9) + 1;
    let cpfArray = Array.from({ length: 9 }, randomDigits);

    const calculateDigit = (cpf: number[], factor: number) => {
      let total = cpf.reduce((sum, num, index) => sum + num * (factor - index), 0);
      let remainder = total % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    cpfArray.push(calculateDigit(cpfArray, 10));
    cpfArray.push(calculateDigit(cpfArray, 11));

    return cpfArray.join("");
  }

  static generateValidCNPJ(): string {
    let cnpjArray = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10));

    const calculateDigit = (cnpj: number[], factors: number[]) => {
      let total = cnpj.reduce((sum, num, index) => sum + num * factors[index], 0);
      let remainder = total % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstFactors = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const secondFactors = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    cnpjArray.push(calculateDigit(cnpjArray, firstFactors));
    cnpjArray.push(calculateDigit(cnpjArray, secondFactors));

    return cnpjArray.join("");
  }

  static generateDepositoId(): string {
    return `TESTQADEPID${this.generateRandomNumericString(9)}`;
  }

  private static generateRandomNumericString(length: number): string {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
  }
}
