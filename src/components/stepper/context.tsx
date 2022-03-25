import * as React from 'react';

type TypeStepperContext = {
  activeStep: number;
  orientation: "horizontal";
}

const StepperContext = React.createContext<TypeStepperContext>({
  activeStep: 0,
  orientation: "horizontal",
})
export default StepperContext