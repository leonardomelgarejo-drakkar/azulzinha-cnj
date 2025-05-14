Feature: Tela de Dados do Cartão

  @ui @tela-dados-cartao
  Scenario: 01-Alteração de quantidade de parcelas selecionadas
     Given que a cobrança de depósito judicial de valor R$'526.10' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And seleciona quantidade de parcelas igual 1 x de R$ 526,89
       And clica no botão continuar
       And altera quantidade de parcelas para 2x R$263,71
       And confirma a alteração para '2x de  R$ 263,71'