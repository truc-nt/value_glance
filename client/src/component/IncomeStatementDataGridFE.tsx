import { useEffect, useState } from "react";

import { Table, DatePicker } from "antd";
import dayjs from "dayjs";

import NumberRangePicker from "./NumberRangePicker";
import useLoading from "../hook/useLoading";
import useFetch from "../hook/useFetch";
import {
  IGetIncomeStatementResponse,
  getIncomeStatement,
} from "../api/financial_statement";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    sorter: (a: IGetIncomeStatementResponse, b: IGetIncomeStatementResponse) =>
      new Date(a.date).getTime() - new Date(b.date).getTime(),
  },
  {
    title: "Revenue",
    dataIndex: "revenue",
    key: "revenue",
    sorter: (a: IGetIncomeStatementResponse, b: IGetIncomeStatementResponse) =>
      a.revenue - b.revenue,
  },
  {
    title: "Net Income",
    dataIndex: "netIncome",
    key: "netIncome",
    sorter: (a: IGetIncomeStatementResponse, b: IGetIncomeStatementResponse) =>
      a.netIncome - b.netIncome,
  },
  {
    title: "Gross Profit",
    dataIndex: "grossProfit",
    key: "grossProfit",
  },
  {
    title: "EPS (Earnings Per Share)",
    dataIndex: "eps",
    key: "eps",
  },
  {
    title: "Operating Income",
    dataIndex: "operatingIncome",
    key: "operatingIncome",
  },
];

interface IFilterState {
  year: [number | null, number | null];
  revenue: [number | null, number | null];
  netIncome: [number | null, number | null];
}

const IncomingStatementDataGrid = () => {
  const getIncomeStatementWithLoading = useLoading(getIncomeStatement);
  const { data: incomingStatement } = useFetch(getIncomeStatementWithLoading);

  const [filteredIncomingStatement, setFilteredIncomingStatement] = useState(
    []
  );

  const [rangeFilter, setRangeFilter] = useState<IFilterState>({
    year: [null, null],
    revenue: [null, null],
    netIncome: [null, null],
  });

  useEffect(() => {
    const filteredData = incomingStatement?.filter(
      (item: IGetIncomeStatementResponse) => {
        return Object.entries(rangeFilter).every(([filterKey, filterValue]) => {
          try {
            const itemValue =
              filterKey != "year"
                ? item?.[filterKey as keyof IGetIncomeStatementResponse]
                : new Date(item?.["date"]).getFullYear();
            const [min, max] = filterValue;
            return !min || !max || (min <= itemValue && itemValue <= max);
          } catch {
            return false;
          }
        });
      }
    );

    setFilteredIncomingStatement(filteredData);
  }, [incomingStatement, rangeFilter]);
  return (
    <>
      <div className="w-full flex flex-wrap mb-8">
        <div className="w-full md:w-1/3 p-2">
          <div className="font-bold mb-1">Year Range</div>
          <DatePicker.RangePicker
            className="w-full"
            picker="year"
            onChange={(
              dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
            ) => {
              setRangeFilter({
                ...rangeFilter,
                year: [dates?.[0]?.year() ?? null, dates?.[1]?.year() ?? null],
              });
            }}
          />
        </div>
        <div className="w-full md:w-1/3 p-2">
          <div className="font-bold mb-1">Revenue Range</div>
          <NumberRangePicker
            min={0}
            onChange={(range) => {
              setRangeFilter({
                ...rangeFilter,
                revenue: range,
              });
            }}
            onClear={() =>
              setRangeFilter({
                ...rangeFilter,
                revenue: [null, null],
              })
            }
          />
        </div>
        <div className="w-full md:w-1/3 p-2">
          <div className="font-bold mb-1">Net Income Range</div>
          <NumberRangePicker
            min={0}
            onChange={(range) => {
              setRangeFilter({
                ...rangeFilter,
                netIncome: range,
              });
            }}
            onClear={() =>
              setRangeFilter({
                ...rangeFilter,
                netIncome: [null, null],
              })
            }
          />
        </div>
      </div>
      <Table
        dataSource={filteredIncomingStatement}
        columns={columns}
        className="w-full"
        scroll={{ x: "max-content" }}
      />
    </>
  );
};

export default IncomingStatementDataGrid;
