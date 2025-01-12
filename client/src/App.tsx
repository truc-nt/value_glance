import { useState } from "react";

import { Button, App as AntdApp } from "antd";

import LoadingProvider from "./provider/LoadingProvider";
import IncomeStatementDataGridFE from "./component/IncomeStatementDataGridFE";
import IncomeStatementDataGridBE from "./component/IncomeStatementDataGridBE";

function App() {
  const [isFrontendMode, setIsFrontendMode] = useState(true);
  return (
    <AntdApp>
      <div className="flex flex-col h-screen w-screen items-center p-8">
        <LoadingProvider>
          <div className="w-full flex justify-end items-center space-x-2">
            <span>Handle with</span>{" "}
            <Button onClick={() => setIsFrontendMode(!isFrontendMode)}>
              {isFrontendMode ? "frontend" : "backend"}
            </Button>{" "}
          </div>
          {isFrontendMode ? (
            <IncomeStatementDataGridFE />
          ) : (
            <IncomeStatementDataGridBE />
          )}
        </LoadingProvider>
      </div>
    </AntdApp>
  );
}

export default App;
