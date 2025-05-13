Feature: Tela Detalhamento da cobrança

  @ui @tela-detalhamento-cobranca @stepper @e2e-test
  Scenario: 01-Validar máscaras do stepper
     Given que a cobrança de depósito judicial fixo de valor R$'526.10' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o primeiro passo é 'Validação do processo'
       And o segundo passo é 'Natureza do depósito'
       And o terceiro passo é 'Informações do depósito'
       And o quarto passo é 'Forma de pagamento'
       And o quinto passo é 'Confirmação2'

  @ui @tela-detalhamento-cobranca @dados-processo @e2e-test
  Scenario: 02-Validar máscaras de dados dos detalhes do processo
     Given que a cobrança de depósito judicial fixo de valor R$'526.10' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And a aba de dados do processo é expandida
       And o código do processo é 'TESTQAPROC7050318998'
       And o depositante é 'QA Depositante'
       And o documento do depositante é '97.855.495/0001-72'
       And o valor do depósito é 'R$ 526,10'
       And o telefone do depositante é '(51) 98531-9316'
       And o e-mail do depositante é 'qa.depositante@test.com'
       And o autor é 'TESTQANAME João Silva'
       And o documento do autor é '213.638.425-28'
       And o réu é 'TESTQANAME Roberto Lima'
       And o documento do réu é '916.165.444-22'

  @ui @tela-detalhamento-cobranca @dados-forma-pagamento @e2e-test
  Scenario: 03-Validar máscaras de dados de forma de pagamento
     Given que a cobrança de depósito judicial de valor R$'526.10' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And a máscara do tooltip de serviço de convêniencia está correta 
       And a quantidade de parcelas é '1 x de'
       And o valor da parcela é 'R$ 526,89'
       And o valor 'Total: R$ 526,89'
       And a 'Incluso serviço de conveniência: R$ 0,79'