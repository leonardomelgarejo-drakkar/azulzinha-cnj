Feature: Cadastro Cobranca Deposito Judicial

  @deposito-judicial @smoke-test
  Scenario: 01-Tentativa de cadastrar cobrança de depósito judicial completa
    Given o usuário preenche todos os campos obrigatórios
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 200
    And o tempo de resposta é abaixo de 5000 milisegundos
    And o endpoint de pagamento é retornado corretamente

  @deposito-judicial
  Scenario: 02-Tentativa de cadastrar cobrança com código do processo vazio
    Given o usuário preenche todos os campos obrigatórios
    And o usuário não preenche o código do processo
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "O processo não pode ser um campo vazio"

  @deposito-judicial
  Scenario: 03-Tentativa de cadastrar cobrança deposito judicial com código pequeno do processo
    Given o usuário preenche todos os campos obrigatórios
    And o usuário preenche o código do processo com um caractere
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "O tamanho do código do processo deve ser de 20 caracteres"

  @deposito-judicial
  Scenario: 04-Tentativa de cadastrar cobrança deposito judicial com código do processo muito longo
    Given o usuário preenche todos os campos obrigatórios
    And o usuário preenche o código do processo com muitos caracteres
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "O tamanho do código do processo deve ser de 20 caracteres"

@deposito-judicial
  Scenario: 05-Tentativa de cadastrar cobrança deposito judicial com nome do autor vázio
    Given o usuário preenche todos os campos obrigatórios
    And o usuário não preenche o nome do autor
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "Nome do Autor não pode ser um campo vazio"

@deposito-judicial
  Scenario: 06-Tentativa de cadastrar cobrança deposito judicial com nome do autor curto
    Given o usuário preenche todos os campos obrigatórios
    And o usuário preenche o nome do autor com um caractere
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 200
    And o tempo de resposta é abaixo de 5000 milisegundos
    And o endpoint de pagamento é retornado corretamente
  
  @deposito-judicial
  Scenario: 07-Tentativa de cadastrar cobrança com nome do autor muito longo
    Given o usuário preenche todos os campos obrigatórios
    And o usuário preenche o nome do autor com muitos caracteres
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "Nome do Autor é muito longo"

  @deposito-judicial
  Scenario: 08-Tentativa de cadastrar cobrança com CPF do autor inválido
    Given o usuário preenche todos os campos obrigatórios
    And o usuário preenche um CPF inválido para o autor
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422 
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "O CPF informado não é válido."
  
  @deposito-judicial
  Scenario: 09-Tentativa de cadastrar cobrança com CPF vazio para o autor
    Given o usuário preenche todos os campos obrigatórios
    And o usuário não preenche o CPF para o autor
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "O CPF informado não é válido."

  @deposito-judicial
  Scenario: 10-Tentativa de cadastrar cobrança com tipo e número do documento do autor divergente
    Given o usuário preenche todos os campos obrigatórios
    And o usuário preenche o tipo do documento com CNPJ e o número como CPF para o autor
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "O CNPJ informado não é válido."

  @deposito-judicial
  Scenario: 11-Tentativa de cadastrar cobrança com nome do réu vazio
    Given o usuário preenche todos os campos obrigatórios
    And o usuário não preenche o nome do réu
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "Nome do Réu não pode ser um campo vazio"

  @deposito-judicial
  Scenario: 12-Tentativa de cadastrar cobrança com nome do réu curto
    Given o usuário preenche todos os campos obrigatórios
    And o usuário preenche o nome do réu com um caractere
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 200
    And o tempo de resposta é abaixo de 5000 milisegundos
    And o endpoint de pagamento é retornado corretamente
  
  @deposito-judicial @debug
  Scenario: 13-Tentativa de cadastrar cobrança com nome do réu muito longo
    Given o usuário preenche todos os campos obrigatórios
    And o usuário preenche o nome do réu com muitos caracteres
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "Nome do Réu é muito longo"

  @deposito-judicial
  Scenario: 14-Tentativa de cadastrar cobrança com CPF vazio para o réu
    Given o usuário preenche todos os campos obrigatórios
    And o usuário não preenche o CPF para o réu
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "O CPF informado não é válido."

  @deposito-judicial
  Scenario: 15-Tentativa de cadastrar cobrança com CPF do réu inválido
    Given o usuário preenche todos os campos obrigatórios
    And o usuário preenche um CPF inválido para o réu
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "O CPF informado não é válido."

  @deposito-judicial
  Scenario: 16-Tentativa de cadastrar cobrança com tipo e número do documento do réu divergente
    Given o usuário preenche todos os campos obrigatórios
    And o usuário preenche o tipo do documento com CNPJ e o número como CPF para o réu
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "O CNPJ informado não é válido."

  @deposito-judicial
  Scenario: 17-Tentativa de cadastrar cobrança com nome do depositante curto
    Given o usuário preenche todos os campos obrigatórios
    And o usuário preenche o nome do depositante com um caractere
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 200
    And o tempo de resposta é abaixo de 5000 milisegundos
    And o endpoint de pagamento é retornado corretamente

  @deposito-judicial @debug
  Scenario: 18-Tentativa de cadastrar cobrança com nome do depositante muito longo
    Given o usuário preenche todos os campos obrigatórios
    And o usuário preenche o nome do depositante com muitos caracteres
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "Nome do Réu é muito longo"

  @deposito-judicial
  Scenario: 19-Tentativa de cadastrar cobrança com CNPJ vazio para o depositante
    Given o usuário preenche todos os campos obrigatórios
    And o usuário não preenche o CNPJ para o depositante
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "O CNPJ informado não é válido."

  @deposito-judicial
  Scenario: 20-Tentativa de cadastrar cobrança com CNPJ do depositante inválido
    Given o usuário preenche todos os campos obrigatórios
    And o usuário preenche um CPF inválido para o depositante
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "O CNPJ informado não é válido."

  @deposito-judicial
  Scenario: 21-Tentativa de cadastrar cobrança com tipo e número do documento do depositante divergente
    Given o usuário preenche todos os campos obrigatórios
    And o usuário preenche o tipo do documento com CNPJ e o número como CPF para o depositante
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "O CNPJ informado não é válido."

  @deposito-judicial
  Scenario: 22-Tentativa de cadastrar cobrança com e-mail do depositante vazio
    Given o usuário preenche todos os campos obrigatórios
    And o usuário não preenche o email
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "O email do depositante não pode ser um campo vázio"

  @deposito-judicial
  Scenario: 23-Tentativa de cadastrar cobrança com e-mail do depositante inválido
    Given o usuário preenche todos os campos obrigatórios
    And o usuário preenche um e-mail inválido
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "O e-mail do depositante está inválido"

  @deposito-judicial
  Scenario: 24-Tentativa de cadastrar cobrança com telefone do depositante vazio
    Given o usuário preenche todos os campos obrigatórios
    And o usuário não preenche o telefone
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "O telefone do depositante não pode ser um campo vázio"

  @deposito-judicial
  Scenario: 25-Tentativa de cadastrar cobrança com telefone do depositante inválido
    Given o usuário preenche todos os campos obrigatórios
    And o usuário preenche um telefone inválido
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "O telefone do depositante está inválido"

  @deposito-judicial
  Scenario: 26-Tentativa de cadastrar cobrança de depósito judicial duas vezes
    Given o usuário preenche todos os campos obrigatórios
    When a requisição de inclusão é realizada 2 vez es
    Then a resposta contém o status code 200
    And o tempo de resposta é abaixo de 5000 milisegundos
    And o endpoint de pagamento é retornado corretamente

  @deposito-judicial
  Scenario: 27-Tentativa de cadastrar cobrança com id do depósito vazio
    Given o usuário preenche todos os campos obrigatórios
    And o usuário não preenche o id do deposito
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "O id do depósito não pode ser um campo vazio"

  @deposito-judicial
  Scenario: 28-Tentativa de cadastrar cobrança com finalidade do depósito vazia
    Given o usuário preenche todos os campos obrigatórios
    And o usuário não preenche a finalidade do depósito
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 200
    And o tempo de resposta é abaixo de 5000 milisegundos
    And o endpoint de pagamento é retornado corretamente

  @deposito-judicial
  Scenario: 29-Tentativa de cadastrar cobrança com valor do depósito vazio
    Given o usuário preenche todos os campos obrigatórios
    And o usuário preenche o valor do depósito com zero
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "Campo Valor não pode ser menor ou igual a zero"

  @deposito-judicial
  Scenario: 30-Tentativa de cadastrar cobrança com valor do depósito negativo
    Given o usuário preenche todos os campos obrigatórios
    And o usuário preenche o valor do depósito com número negativo
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 422
    And o tempo de resposta é abaixo de 5000 milisegundos
    And a resposta contém a mensagem "Campo Valor não pode ser menor ou igual a zero"

  @deposito-judicial
  Scenario: 31-Tentativa de cadastrar cobrança com observação do depósito vazia
    Given o usuário preenche todos os campos obrigatórios
    And o usuário não preenche a observação do depósito
    When a requisição de inclusão é realizada 1 vez es
    Then a resposta contém o status code 200
    And o tempo de resposta é abaixo de 5000 milisegundos
    And o endpoint de pagamento é retornado corretamente