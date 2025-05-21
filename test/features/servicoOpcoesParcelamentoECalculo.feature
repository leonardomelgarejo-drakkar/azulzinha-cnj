Feature: Cálculo Parcelas de Cobranca Deposito Judicial

  @ui @calculo-parcelamento @1x @smoke
  Scenario: 01-Verificar cálculo do parcelamento em 1 x
     Given que a cobrança de depósito judicial de valor R$'526.10' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And a quantidade de parcelas é '1 x de'
       And o valor da parcela é 'R$ 526,89'
       And o valor 'Total: R$ 526,89'
       And a 'Incluso serviço de conveniência: R$ 0,79'
  
  @ui @calculo-parcelamento @2x
  Scenario: 02-Verificar cálculo do parcelamento em 2 x
     Given que a cobrança de depósito judicial de valor R$'526.10' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And a quantidade de parcelas é '2 x de'
       And o valor da parcela é 'R$ 263,71'
       And o valor 'Total: R$ 527,42'
       And a 'Incluso serviço de conveniência: R$ 1,32'

  @ui @calculo-parcelamento @3x
  Scenario: 03-Verificar cálculo do parcelamento em 3 x
     Given que a cobrança de depósito judicial de valor R$'526.10' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And a quantidade de parcelas é '3 x de'
       And o valor da parcela é 'R$ 178,08'
       And o valor 'Total: R$ 534,25'
       And a 'Incluso serviço de conveniência: R$ 8,15'

  @ui @calculo-parcelamento @4x
  Scenario: 04-Verificar cálculo do parcelamento em 4 x
     Given que a cobrança de depósito judicial de valor R$'526.10' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And a quantidade de parcelas é '4 x de'
       And o valor da parcela é 'R$ 134,30'
       And o valor 'Total: R$ 537,20'
       And a 'Incluso serviço de conveniência: R$ 11,10'

  @ui @calculo-parcelamento @5x
  Scenario: 05-Verificar cálculo do parcelamento em 5 x
     Given que a cobrança de depósito judicial de valor R$'526.10' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And a quantidade de parcelas é '5 x de'
       And o valor da parcela é 'R$ 108,95'
       And o valor 'Total: R$ 544,78'
       And a 'Incluso serviço de conveniência: R$ 18,68'

  @ui @calculo-parcelamento @6x
  Scenario: 06-Verificar cálculo do parcelamento em 6 x
     Given que a cobrança de depósito judicial de valor R$'526.10' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And a quantidade de parcelas é '6 x de'
       And o valor da parcela é 'R$ 91,67'
       And o valor 'Total: R$ 550,04'
       And a 'Incluso serviço de conveniência: R$ 23,94'

  @ui @calculo-parcelamento @7x
  Scenario: 07-Verificar cálculo do parcelamento em 7 x
     Given que a cobrança de depósito judicial de valor R$'526.10' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And a quantidade de parcelas é '7 x de'
       And o valor da parcela é 'R$ 79,32'
       And o valor 'Total: R$ 555,30'
       And a 'Incluso serviço de conveniência: R$ 29,20'

  @ui @calculo-parcelamento @8x
  Scenario: 08-Verificar cálculo do parcelamento em 8 x
     Given que a cobrança de depósito judicial de valor R$'526.10' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And a quantidade de parcelas é '8 x de'
       And o valor da parcela é 'R$ 70,70'
       And o valor 'Total: R$ 565,66'
       And a 'Incluso serviço de conveniência: R$ 39,56'

  @ui @calculo-parcelamento @9x
  Scenario: 09-Verificar cálculo do parcelamento em 9 x
     Given que a cobrança de depósito judicial de valor R$'526.10' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And a quantidade de parcelas é '9 x de'
       And o valor da parcela é 'R$ 63,45'
       And o valor 'Total: R$ 571,08'
       And a 'Incluso serviço de conveniência: R$ 44,98'

  @ui @calculo-parcelamento @10x
  Scenario: 10-Verificar cálculo do parcelamento em 10 x
     Given que a cobrança de depósito judicial de valor R$'526.10' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And a quantidade de parcelas é '10 x de'
       And o valor da parcela é 'R$ 57,63'
       And o valor 'Total: R$ 576,34'
       And a 'Incluso serviço de conveniência: R$ 50,24'

  @ui @calculo-parcelamento @11x
  Scenario: 11-Verificar cálculo do parcelamento em 11 x
     Given que a cobrança de depósito judicial de valor R$'526.10' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And a quantidade de parcelas é '11 x de'
       And o valor da parcela é 'R$ 53,67'
       And o valor 'Total: R$ 590,39'
       And a 'Incluso serviço de conveniência: R$ 64,29'

  @ui @calculo-parcelamento @12x
  Scenario: 12-Verificar cálculo do parcelamento em 12 x
     Given que a cobrança de depósito judicial de valor R$'526.10' foi cadastrada com sucesso
      When o usuário acessa o link do cadastro judicial
      Then a página do cadastro de depósito é acessada
       And a quantidade de parcelas é '12 x de'
       And o valor da parcela é 'R$ 50,65'
       And o valor 'Total: R$ 607,91'
       And a 'Incluso serviço de conveniência: R$ 81,81'