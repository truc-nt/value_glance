import { useState, useEffect, useCallback } from "react";

const useFetch = (
  fetcher: (...params: any[]) => Promise<any>,
  ...initialParams: any[]
) => {
  const [data, setData] = useState<any>(null);

  const fetchData = useCallback(
    async (...params: any[]) => {
      try {
        const data = await fetcher(...params);
        setData(data);
      } catch (err) {
        console.log(err);
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
