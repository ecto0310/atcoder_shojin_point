"use client";

import ConditionForm from "@/component/conditionForm";
import ResultTable from "@/component/resultTable";
import { defaultResult } from "@/interface/result";
import { useState } from "react";

const Page = () => {
  const [result, setResult] = useState(defaultResult());

  return (
    <main>
      <ConditionForm setResult={setResult} />
      <ResultTable result={result} />
    </main>
  );
};

export default Page;
