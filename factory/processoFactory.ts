import { ProcessoJudicial } from "../factory/models/processoJudicial";
import { DataRequest } from "../helper/util/dataRequest";

export class ProcessoFactory {
  
  static geraProcessoPadrao(): ProcessoJudicial {
    return new ProcessoJudicial.Builder().build();
  }

  static geraProcessoComCodigoProcessoVazio(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setProcesso("").build();
  }

  static geraProcessoComCodigoProcessoComUmCaracter(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setProcesso("1")
      .build();
  }

  static geraProcessoComCodigoProcessoMuitoLongo(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setProcesso(DataRequest.geneProcessoAcimaDoLimite())
      .build();
  }

  static geraProcessoComNomeAutorVazio(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setAutor({
        nome: "",
        documento: { tipo: "CPF", numero: DataRequest.generateValidCPF() }
      })
      .build();
  }

  static geraProcessoComNomeAutorComUmCaracter(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setAutor({
        nome: "A",
        documento: { tipo: "CPF", numero: DataRequest.generateValidCPF() },
        "e-mail": "qa.autor@test.com",
        telefone: "51985319314",
      })
      .build();
  }

  static geraProcessoComNomeAutorComMuitosCaracteres(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setAutor({
        nome: DataRequest.geraNomeLongoPessoa(),
        documento: { tipo: "CPF", numero: DataRequest.generateValidCPF() },
        "e-mail": "qa.autor@test.com",
        telefone: "51985319314",
      })
      .build();
  }

  static geraProcessoComCpfAutorInvalido(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setAutor({
        nome: DataRequest.geraNomePessoa(),
        documento: { tipo: "CPF", numero: "12345678" }
      })
      .build();
  }

  static geraProcessoComCpfAutorVazio(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setAutor({
        nome: DataRequest.geraNomePessoa(),
        documento: { tipo: "CPF", numero: "" }
      })
      .build();
  }

  static geraProcessoComDocumentoAutorDivergente(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setAutor({
        nome: DataRequest.geraNomePessoa(),
        documento: { tipo: "CNPJ", numero: DataRequest.generateValidCPF() }
      })
      .build();
  }

  static geraProcessoComDocumentoReuDivergente(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setReu({
        nome: DataRequest.geraNomePessoa(),
        documento: { tipo: "CNPJ", numero: DataRequest.generateValidCPF() }
      })
      .build();
  }

  static geraProcessoComDocumentoDepositanteDivergente(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setDepositante({
        nome: "QA Depositante",
        documento: { tipo: "CNPJ",numero: DataRequest.generateValidCPF() },
        "e-mail": "qa.depositante@test.com",
        telefone: "51985319316",
      })
      .build();
  }

  static geraProcessoComCpfReuInvalido(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setReu({
        nome: DataRequest.geraNomePessoa(),
        documento: { tipo: "CPF", numero: "12345678" }
      })
      .build();
  }

  static geraProcessoComCnpjDepositanteInvalido(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setDepositante({
        nome: "QA Depositante",
        documento: { tipo: "CNPJ", numero: "123456" },
        "e-mail": "qa.depositante@test.com",
        telefone: "51985319316",
      })
      .build();
  }

  static geraProcessoComCPFReuVazio(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setReu({
        nome: DataRequest.geraNomePessoa(),
        documento: { tipo: "CPF", numero: "" }
      })
      .build();
  }

  static geraProcessoComCNPJDepositanteVazio(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setDepositante({
        nome: "QA Depositante",
        documento: { tipo: "CNPJ", numero: "" },
        "e-mail": "qa.depositante@test.com",
        telefone: "51985319316",
      })
      .build();
  }

  static geraProcessoComEmailDepositanteVazio(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setDepositante({
        nome: "QA Depositante",
        documento: { tipo: "CNPJ", numero: "97855495000172" },
        "e-mail": "",
        telefone: "51985319316",
      })
      .build();
  }

  static geraProcessoComTelefoneDepositanteVazio(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setDepositante({
        nome: "QA Depositante",
        documento: { tipo: "CNPJ", numero: "97855495000172" },
        "e-mail": "qa.depositante@test.com",
        telefone: "",
      })
      .build();
  }

  static geraProcessoComEmailDepositanteInvalido(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setDepositante({
        nome: "QA Depositante",
        documento: { tipo: "CNPJ", numero: "97855495000172" },
        "e-mail": "qa.depositantetest.com",
        telefone: "51985319316",
      })
      .build();
  }

  static geraProcessoComTelefoneDepositanteInvalido(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setDepositante({
        nome: "QA Depositante",
        documento: { tipo: "CNPJ", numero: "97855495000172" },
        "e-mail": "qa.depositantetest.com",
        telefone: "12345",
      })
      .build();
  }

  static geraProcessoComNomeReuVazio(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setReu({
        nome: "",
        documento: { tipo: "CPF", numero: DataRequest.generateValidCPF() },
        "e-mail": "qa.reu@test.com",
        telefone: "51985319315",
      })
      .build();
  }

  static geraProcessoComNomeReuComUmCaracter(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setReu({
        nome: "A",
        documento: { tipo: "CPF", numero: DataRequest.generateValidCPF() },
        "e-mail": "qa.reu@test.com",
        telefone: "51985319315",
      })
      .build();
  }

  static geraProcessoComNomeDepositanteComUmCaracter(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setDepositante({
        nome: "A",
        documento: { tipo: "CNPJ", numero: "97855495000172" },
        "e-mail": "qa.depositante@test.com",
        telefone: "51985319316",
      })
      .build();
  }

  static geraProcessoComNomeReuComMuitosCaracteres(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setReu({
        nome: DataRequest.geraNomeLongoPessoa(),
        documento: { tipo: "CPF", numero: DataRequest.generateValidCPF() },
        "e-mail": "qa.reu@test.com",
        telefone: "51985319315",
      })
      .build();
  }

  static geraProcessoComNomeDepositanteComMuitosCaracteres(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setDepositante({
        nome: DataRequest.geraNomeLongoPessoa(),
        documento: { tipo: "CNPJ", numero: "97855495000172" },
        "e-mail": "qa.depositante@test.com",
        telefone: "51985319316",
      })
      .build();
  }

  static geraProcessoComIdDepositoVazio(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setDeposito({
        id: "",
        finalidade: "GARANTIA",
        valor: 1000.00,
        observacoes: "TESTQA"})
      .build()
  }

  static geraProcessoComFinalidadeDepositoVazia(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setDeposito({
        id: DataRequest.generateDepositoId(),
        finalidade: "",
        valor: 1000.00,
        observacoes: "TESTQA"})
      .build()
  }

  static geraProcessoComValorDeposito(valor: number): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setDeposito({
        id: DataRequest.generateDepositoId(),
        finalidade: "GARANTIA",
        valor: valor,
        observacoes: "TESTQA"})
      .build()
  }

  static geraProcessoComValorDepositoZero(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setDeposito({
        id: DataRequest.generateDepositoId(),
        finalidade: "GARANTIA",
        valor: 0,
        observacoes: "TESTQA"})
      .build()
  }

  static geraProcessoComValorDepositoNegativo(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setDeposito({
        id: DataRequest.generateDepositoId(),
        finalidade: "GARANTIA",
        valor: -1,
        observacoes: "TESTQA"})
      .build()
  }

  static geraProcessoComObservacaoDepositoVazia(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setDeposito({
        id: DataRequest.generateDepositoId(),
        finalidade: "GARANTIA",
        valor: 1000.00,
        observacoes: ""})
      .build()
  }

  static geraProcessoComUrlRetornoPreenchida(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setUrlRetorno("https://novodepositojudicial.caixa.gov/br/lalala")
      .build()
  }

  static geraProcessoComUrlRetornoVazia(): ProcessoJudicial {
    return new ProcessoJudicial.Builder()
      .setUrlRetorno("")
      .build()
  }
}
