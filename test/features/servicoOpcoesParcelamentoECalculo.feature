Feature: Cadastro Cobranca Deposito Judicial

  @calculo-parcelamento @1x @UI
  Scenario: 01-Verificar cálculo do parcelamento em 1 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '1' vez es fica R$'1.001,51'
       And o valor total fica R$'1.001,51'
      #  And o valor do serviço de conveniência de R$'1,50'
  
  @calculo-parcelamento @2x @UI
  Scenario: 02-Verificar cálculo do parcelamento em 2 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '2' vez es fica R$'501,26'
       And o valor total fica R$'1.002,51'
      #  And o valor do serviço de conveniência de R$'2,50'

  @calculo-parcelamento @3x @UI
  Scenario: 03-Verificar cálculo do parcelamento em 3 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '3' vez es fica R$'338,50'
       And o valor total fica R$'1.015,51'
      #  And o valor do serviço de conveniência de R$'15,50'

  @calculo-parcelamento @4x @UI
  Scenario: 04-Verificar cálculo do parcelamento em 4 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '4' vez es fica R$'255,28'
       And o valor total fica R$'1.021,11'
      #  And o valor do serviço de conveniência de R$'21,10'

  @calculo-parcelamento @5x @UI
  Scenario: 05-Verificar cálculo do parcelamento em 5 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '5' vez es fica R$'207,10'
       And o valor total fica R$'1.035,51'
      #  And o valor do serviço de conveniência de R$'35,50'

  @calculo-parcelamento @6x @UI
  Scenario: 06-Verificar cálculo do parcelamento em 6 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '6' vez es fica R$'174,25'
       And o valor total fica R$'1.045,51'
      #  And o valor do serviço de conveniência de R$'45,50'

  @calculo-parcelamento @7x @UI
  Scenario: 07-Verificar cálculo do parcelamento em 7 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '7' vez es fica R$'150,79'
       And o valor total fica R$'1.055,51'
      #  And o valor do serviço de conveniência de R$'55,50'

  @calculo-parcelamento @8x @UI
  Scenario: 08-Verificar cálculo do parcelamento em 8 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '8' vez es fica R$'134,40'
       And o valor total fica R$'1.075,21'
      #  And o valor do serviço de conveniência de R$'75,20'

  @calculo-parcelamento @9x @UI
  Scenario: 09-Verificar cálculo do parcelamento em 9 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '9' vez es fica R$'120,61'
       And o valor total fica R$'1.085,51'
      #  And o valor do serviço de conveniência de R$'85,50'

  @calculo-parcelamento @10x @UI
  Scenario: 10-Verificar cálculo do parcelamento em 10 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '10' vez es fica R$'108,55'
       And o valor total fica R$'1.085,51'
      #  And o valor do serviço de conveniência de R$'85,50'

  @calculo-parcelamento @11x @UI
  Scenario: 11-Verificar cálculo do parcelamento em 11 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '11' vez es fica R$'102,02'
       And o valor total fica R$'1.122,21'
      #  And o valor do serviço de conveniência de R$'122,20'

  @calculo-parcelamento @12x @UI
  Scenario: 12-Verificar cálculo do parcelamento em 12 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '12' vez es fica R$'96,29'
       And o valor total fica R$'1.155,51'
      #  And o valor do serviço de conveniência de R$'155,50'

  @calculo-parcelamento @todas-parcelas @e2e-test @smoke-test @UI
  Scenario Outline: Verificar cálculo do parcelamento em <parcelas> vez(es)
    Given que a cobrança de depósito judicial de valor R$'<valorDeposito>' foi cadastrada com sucesso
    When o usuário acessa o link do cadastro judicial
    Then a página do cadastro de depósito é acessada
    And o valor da parcela em '<parcelas>' vez es fica R$'<valorParcela>'
    And o valor total fica R$'<valorTotal>'
   #  And o valor do serviço de conveniência de R$'<valorServico>'

  Examples:
    | parcelas | valorDeposito | valorParcela | valorTotal | valorServico |
    | 1        | 1000.01       | 1.001,51     | 1.001,51   | 1,50        |
    | 2        | 1000.01       | 501,26       | 1.002,51   | 2,50        |clear
    | 3        | 1000.01       | 338,50       | 1.015,51   | 15,50       |
    | 4        | 1000.01       | 255,28       | 1.021,11   | 21,10       |
    | 5        | 1000.01       | 207,10       | 1.035,51   | 35,50       |
    | 6        | 1000.01       | 174,25       | 1.045,51   | 45,50       |
    | 7        | 1000.01       | 150,79       | 1.055,51   | 55,50       |
    | 8        | 1000.01       | 134,40       | 1.075,21   | 75,20       |
    | 9        | 1000.01       | 120,61       | 1.085,51   | 85,50       |
    | 10       | 1000.01       | 108,55       | 1.085,51   | 85,50       |
    | 11       | 1000.01       | 102,02       | 1.122,21   | 122,20      |
    | 12       | 1000.01       | 96,29        | 1.155,51   | 155,50      |