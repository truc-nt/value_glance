import { useState, useEffect, useCallback } from "react";

import { App } from "antd";

const useFetch = (
  fetcher: (...params: any[]) => Promise<any>,
  ...initialParams: any[]
) => {
  const [data, setData] = useState<any>(null);
  const { message } = App.useApp();

  const fetchData = useCallback(
    async (...params: any[]) => {
      try {
        const data = await fetcher(...params);
        setData(data);
      } catch (err) {
        message.error(String(err));
      }
    },
    [fetcher]
  );

  useEffect(() => {
    fetchData(...initialParams);
  }, [fetchData]);

  return { data, fetchData };
};

export default useFetch;
