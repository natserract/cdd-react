import React, { useContext, HTMLAttributes, useMemo } from "react";
import { Any } from "src/types/share";
import styled from "styled-components";

import { StepperContext } from "../Stepper";

import { StepContext, useStepContext } from './context'
import { StepContextType } from "./types";

export {
  StepContext,
  useStepContext,
}

type StepProps = {
  children: React.ReactNode;
} & Partial<StepContextType> & Partial<HTMLAttributes<HTMLDivElement>>;

const StepperRoot = styled('div').withConfig<StepProps>({
  displayName: 'Stepper'
})((_props) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}))

const Step = React.forwardRef<Any, StepProps>((props, ref) => {
  const {
    children,
    index,
    active: activeProp,
    completed: completedProp,
    disabled: disabledProp,
    last,
    ...other
  } = props

  const { activeStep, orientation } = useContext(StepperContext)

  let [active = false, completed = false, disabled = false] = [
    activeProp,
    completedProp,
    disabledProp,
  ];

  if (activeStep === index) {
    active = activeProp !== undefined ? activeProp : true
  } else if (activeStep > index) {
    completed = completedProp !== undefined ? completedProp : true
  } else if (activeStep < index) {
    disabled = disabledProp !== undefined ? disabledProp : true
  }

  const value = useMemo(() => ({
    index,
    last,
    completed,
    active,
  }), [
    active,
    completed,
    index,
    last
  ])

  const rootProps = {
    ...props,
    active,
    completed,
    disabled,
    orientation,
  }

  return (
    <StepContext.Provider value={value}>
      <StepperRoot
        ref={ref}
        {...rootProps}
        {...other}
      >
        {children}
      </StepperRoot>
    </StepContext.Provider>
  )
})

export default Step;