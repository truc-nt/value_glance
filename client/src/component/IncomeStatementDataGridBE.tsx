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

const IncomeStatementDataGridBE = () => {
  const [rangeFilter, setRangeFilter] = useState<IFilterState>({
    year: [null, null],
    revenue: [null, null],
    netIncome: [null, null],
  });
  const [sorter, setSorter] = useState<any>(null);

  const [queryParam, setQueryParam] = useState({});
  const getIncomeStatementWithLoading = useLoading(getIncomeStatement);
  const { data: incomeStatementment } = useFetch(
    getIncomeStatementWithLoading,
    [queryParam, false]
  );

  const handleTableChange = (_: any, __: any, sorter: any) => {
    setSorter(sorter);
  };

  useEffect(() => {
    const _queryParam: { [key: string]: any } = {};
    Object.entries(rangeFilter).forEach(([key, range]) => {
      if (range[0] !== null && range[1] !== null) {
        _queryParam[`filter_${key}_range`] = range;
      }
    });
    if (sorter && sorter.field && sorter.order) {
      _queryParam["sort"] = sorter.field;
      _queryParam["sort_order"] = sorter.order === "ascend" ? "asc" : "desc";
    }

    if (JSON.stringify(queryParam) !== JSON.stringify(_queryParam)) {
      setQueryParam(_queryParam);
    }
  }, [rangeFilter, sorter]);

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
        dataSource={incomeStatementment?.map(
          (item: IGetIncomeStatementResponse, index: number) => ({
            ...item,
            key: index,
          })
        )}
        columns={columns}
        className="w-full"
        scroll={{ x: "max-content" }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default IncomeStatementDataGridBE;
