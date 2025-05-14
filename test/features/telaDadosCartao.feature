Feature: Tela de Dados do Cartão

  @ui @tela-dados-cartao @alteracao-quantidade-parcelas
  Scenario: 01-Alteração de quantidade de parcelas selecionadas
     Given que a cobrança de depósito judicial de valor R$'526.10' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
       And a página do cadastro de depósito é acessada
       And seleciona quantidade de parcelas igual 1 x de R$ 526,89
       And clica no botão continuar
       And altera quantidade de parcelas para 2x R$263,71
      Then confirma a alteração para '2x de  R$ 263,71'

  @ui @tela-dados-cartao @dados-preenchimento-cartao
  Scenario: 02-Preenchimento de dados do cartão
     Given que a cobrança de depósito judicial de valor R$'526.10' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
       And a página do cadastro de depósito é acessada
       And seleciona quantidade de parcelas igual 1 x de R$ 526,89
       And clica no botão continuar
       And preenche o número do cartão com '5555555555555555'
       And preenche a validade com '12/2030'
       And preenche o card verification value com '123'
      Then o nome do titular é carregado automaticamente com 'QA Depositante'
       And o cpf do titular é carregado automaticamente com '97.855.495/0001-72'

  @ui @tela-dados-cartao @dados-endereco-titular
  Scenario: 03-Preenchimento de dados do endereço do titular do cartão
     Given que a cobrança de depósito judicial de valor R$'526.10' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
       And a página do cadastro de depósito é acessada
       And seleciona quantidade de parcelas igual 1 x de R$ 526,89
       And clica no botão continuar
       And preenche o número do cartão com '5555555555555555'
       And preenche a validade com '12/2030'
       And preenche o card verification value com '123'
       And preenche o CEP com '91220-470'
       And preenche o numero com '250'
      Then automaticamente o endereço é carregado automaticamente com 'Rua Rubens Rosa Guedes'
       And automaticamente o bairro é carregado automaticamente com 'Jardim Itu'