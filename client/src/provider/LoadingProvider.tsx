import { createContext, useState } from "react";
import { Spin } from "antd";

interface ILoadingContext {
  setLoading: (loading: boolean) => void;
}

export const LoadingContext = createContext<ILoadingContext | undefined>(
  undefined
);

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ setLoading }}>
      {children}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <Spin size="large" />
        </div>
      )}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
