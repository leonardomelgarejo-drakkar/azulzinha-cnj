Feature: Cadastro Cobranca Deposito Judicial

  @ui @calculo-parcelamento @1x
  Scenario: 01-Verificar cálculo do parcelamento em 1 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '1' vez es fica R$'1.001,51'
       And o valor total fica R$'1.001,51'
  
  @ui @calculo-parcelamento @2x
  Scenario: 02-Verificar cálculo do parcelamento em 2 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '2' vez es fica R$'501,26'
       And o valor total fica R$'1.002,51'

  @ui @calculo-parcelamento @3x
  Scenario: 03-Verificar cálculo do parcelamento em 3 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '3' vez es fica R$'338,50'
       And o valor total fica R$'1.015,51'

  @ui @calculo-parcelamento @4x
  Scenario: 04-Verificar cálculo do parcelamento em 4 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '4' vez es fica R$'255,28'
       And o valor total fica R$'1.021,11'

  @ui @calculo-parcelamento @5x
  Scenario: 05-Verificar cálculo do parcelamento em 5 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '5' vez es fica R$'207,10'
       And o valor total fica R$'1.035,51'

  @ui @calculo-parcelamento @6x
  Scenario: 06-Verificar cálculo do parcelamento em 6 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '6' vez es fica R$'174,25'
       And o valor total fica R$'1.045,51'

  @ui @calculo-parcelamento @7x
  Scenario: 07-Verificar cálculo do parcelamento em 7 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '7' vez es fica R$'150,79'
       And o valor total fica R$'1.055,51'

  @ui @calculo-parcelamento @8x
  Scenario: 08-Verificar cálculo do parcelamento em 8 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '8' vez es fica R$'134,40'
       And o valor total fica R$'1.075,21'

  @ui @calculo-parcelamento @9x
  Scenario: 09-Verificar cálculo do parcelamento em 9 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '9' vez es fica R$'120,61'
       And o valor total fica R$'1.085,51'

  @ui @calculo-parcelamento @10x
  Scenario: 10-Verificar cálculo do parcelamento em 10 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '10' vez es fica R$'108,55'
       And o valor total fica R$'1.085,51'

  @ui @calculo-parcelamento @11x
  Scenario: 11-Verificar cálculo do parcelamento em 11 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '11' vez es fica R$'102,02'
       And o valor total fica R$'1.122,21'

  @ui @calculo-parcelamento @12x
  Scenario: 12-Verificar cálculo do parcelamento em 12 vez
     Given que a cobrança de depósito judicial de valor R$'1000.01' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And o valor da parcela em '12' vez es fica R$'96,29'
       And o valor total fica R$'1.155,51'
