import { createContext, useContext } from "react";

import { StepContextType } from "./types";

const StepContext = createContext<StepContextType>({} as StepContextType)
const useStepContext = () => useContext(StepContext);

export {
  StepContext,
  useStepContext
}