import { APIRequestContext, APIResponse, request } from "@playwright/test";
import { getHeaders } from "../util/requestConfig";

/**
 * Realiza o cadastro de cobrança de depósito judicial.
 *
 * @param requestData - Dados da requisição (JSON string).
 * @param quantidadeExecucoes - Número de execuções da requisição.
 * @param world - Contexto do Cucumber para anexos (opcional).
 * @returns Objeto com a resposta, o corpo da resposta e o tempo de execução da última chamada.
 */
export async function cadastrarDepositoJudicial(
  requestData: string,
  quantidadeExecucoes: number,
  world?: any
): Promise<{ response: APIResponse; responseBody: any; requestTime: number }> {
  const baseURL = process.env.BASEURL;
  const resourcePath = process.env.RESOURCE_PATH_DEPOSITO_JUDICIAL;
  const url = `${baseURL}${resourcePath}`;

  const context: APIRequestContext = await request.newContext({
    baseURL: url,
  });

  let response: APIResponse;
  let requestTime = 0;

  for (let i = 0; i < quantidadeExecucoes; i++) {
    const requestStartTime = performance.now();

    response = await context.post("", {
      headers: getHeaders(),
      data: requestData,
      timeout: 30 * 1000,
    });

    const requestEndTime = performance.now();
    requestTime = Number((requestEndTime - requestStartTime).toFixed(2));

    if (world && world.attach) {
      world.attach(`Execução número ${i + 1} - Raw Request: ${JSON.stringify(requestData, null, 2)}`, 'application/json');
      world.attach(`Execução número ${i + 1} - Status Code: ${response.status()}`, 'text/plain');
      
      const jsonResponse = await response.json();
      world.attach(`Execução número ${i + 1} - Response: ${JSON.stringify(jsonResponse, null, 2)}`, 'application/json');
      world.attach(`Execução número ${i + 1} - Tempo de Execução: ${requestTime} ms`, 'text/plain');
    }
  }

  const responseBody = await response.json();
  return { response, responseBody, requestTime };
}
