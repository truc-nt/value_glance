import { useContext, useCallback } from "react";

import { LoadingContext } from "../provider/LoadingProvider";

const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoadingContext must be used within a LoadingProvider");
  }
  return context;
};

const useLoading = <T extends (...args: any[]) => Promise<any>>(fetcher: T) => {
  const { setLoading } = useLoadingContext();
  const executeFetcher = useCallback(
    async (...params: Parameters<T>) => {
      try {
        setLoading(true);
        const res = await fetcher(...params);
        return res;
      } finally {
        setLoading(false);
      }
    },
    [fetcher]
  );

  return executeFetcher;
};

export default useLoading;
