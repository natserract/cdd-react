import React, { useContext, HTMLAttributes, useMemo } from "react";
import { Any } from "src/types/share";
import styled from "styled-components";

import { StepperContext } from "../Stepper";
import StepIcon from '../StepIcon'

import { StepContext, useStepContext } from './context'
import { StepContextType } from "./types";


export {
  StepContext,
  useStepContext,
}

type StepProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  color?: "primary" | "secondary" | "error" | "success" | "info"
} & Partial<StepContextType> & Partial<HTMLAttributes<HTMLDivElement>>;

const StepRoot = styled('div').withConfig<StepProps>({
  displayName: 'Step'
})(({ theme, color }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  color: theme.palette[color].main,
  fontWeight: 500,
}))

const Step = React.forwardRef<Any, StepProps>((props, ref) => {
  const {
    children,
    index,
    active: activeProp,
    completed: completedProp,
    disabled: disabledProp,
    last,
    icon,
    color = "primary",
    ...other
  } = props

  const { activeStep, orientation, total } = useContext(StepperContext)

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
    color,
  }

  const isLastIndex = (index + 1) === total
  const renderStepIcon = !isLastIndex && (
    <StepIcon
      color={color}
      icon={icon}
    />
  )

  return (
    <StepContext.Provider value={value}>
      <StepRoot
        ref={ref}
        {...rootProps}
        {...other}
      >
        {children}
      </StepRoot>
      {renderStepIcon}
    </StepContext.Provider>
  )
})

export default Step;