import React, { useMemo } from 'react'
import styled from "styled-components";

import StepperContext from './context'
export {
  StepperContext
}

type ChildrenNode = {
  type: string;
  key: string;
  ref: React.Ref<unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>
}

type StepperRootProps = {
  activeStep: number;
  orientation?: "horizontal",
  sx?: React.CSSProperties,
}

const StepperRoot = styled('div').withConfig<StepperRootProps>({
  displayName: 'Stepper',
})(({ sx }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  ...sx,
}))

type StepperProps = {
  children: React.ReactNode,
} & StepperRootProps

// Stepper is just a wrapper, here's we have context provider
// Returned list of children, we can handle active step, and completed here
const Stepper = React.forwardRef<HTMLDivElement, StepperProps>((props, ref) => {
  const {
    activeStep = 0,
    children,
    orientation = "horizontal",
    ...other
  } = props

  // Set children to flatten arrays, because children must be array
  // @see: https://reactjs.org/docs/react-api.html#reactchildrentoarray
  // Boolean is constructor, default is `true`
  const childrens = (React.Children.toArray(children) as ChildrenNode[]).filter(Boolean)
  const steps = childrens.map((step, index) => {
    const isLast = (index + 1) === childrens.length

    return React.cloneElement(step, {
      index,
      last: isLast ? 1 : 0,
      ...step.props,
    })
  })

  const value = useMemo(() => ({
    activeStep,
    orientation,
  }), [activeStep, orientation])

  return (
    <StepperContext.Provider value={value}>
      <StepperRoot
        ref={ref}
        activeStep={activeStep}
        {...other}
      >
        {steps}
      </StepperRoot>
    </StepperContext.Provider>
  )
})

export default Stepper
