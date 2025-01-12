import fetch from "./base";
import qs from "qs";

export interface IGetIncomeStatementResponse {
  date: string;
  revenue: number;
  grossProfit: number;
  operatingIncome: number;
  netIncome: number;
  eps: number;
}

export const getIncomeStatement = (
  queryParam = {},
  isFrontendMode: boolean = true
): Promise<IGetIncomeStatementResponse> => {
  return fetch<IGetIncomeStatementResponse>(
    isFrontendMode
      ? "/v3/income-statement/AAPL?period=annual"
      : `/income-statement?${qs.stringify(queryParam, {
          arrayFormat: "comma",
        })}`,
    {},
    isFrontendMode
  );
};
