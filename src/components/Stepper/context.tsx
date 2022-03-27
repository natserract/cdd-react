import * as React from 'react';

type TypeStepperContext = {
  activeStep: number;
  orientation: "horizontal";
  total: number;
}

const StepperContext = React.createContext<TypeStepperContext>({
  activeStep: 0,
  orientation: "horizontal",
  total: 0,
})
export default StepperContext