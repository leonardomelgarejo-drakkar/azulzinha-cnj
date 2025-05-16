  Feature: Checkout Aceite Termo
  
  @ui @checkout @com-aceite-termo
  Scenario: 01-Habilita botão efetuar pagamento ao aceitar o termo de uso
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
       And clica no botão próximo
       And clica no checkbox concordando com os termos
      Then o botão efetuar deve estar habilidado

  @ui @checkout @sem-aceite-termo
  Scenario: 02-Botão de efetuar pagamento desabilitado até aceitar o termo de uso
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
       And clica no botão próximo
      Then o botão efetuar deve estar desabilidado

  @ui @checkout @pagamento-pos-aceite @falha-pagamento
  Scenario: 03-Pagamento realizado sem sucesso após aceite
     Given que a cobrança de depósito judicial fixo de valor R$'526.10' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
       And a página do cadastro de depósito é acessada
       And seleciona quantidade de parcelas igual 1 x de R$ 526,89
       And clica no botão continuar
       And preenche o número do cartão com '5555555555555555'
       And preenche a validade com '12/2030'
       And preenche o card verification value com '123'
       And preenche o CEP com '91220-470'
       And preenche o numero com '250'
       And clica no botão próximo
       And clica no checkbox concordando com os termos
       And clica no botão efetuar pagamento
      Then tela é recarregada com a mensagem 'Pagamento negado'

  @ui @checkout @pagamento-pos-aceite @pagamento-aprovado
  Scenario: 04-Pagamento realizado com sucesso após aceite
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
       And clica no botão próximo
       And clica no checkbox concordando com os termos
       And clica no botão efetuar pagamento
      Then tela é recarregada com a mensagem 'Pagamento negado'