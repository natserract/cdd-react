import React from 'react'
import { HTMLAttributes } from 'src/types/share'
import styled from 'styled-components'
import alpha from 'color-alpha'

import { useStepContext } from '../Step/context';

type Color = "primary" | "secondary" | "error" | "success" | "info"
type StepLabelRootProps = {
  variant?: 'standard' | 'numbering';
  color?: Color
}

const StepLabelRoot = styled('span').withConfig<StepLabelRootProps>({
  displayName: 'StepLabel'
})(({ theme, color }) => ({
  color: theme.palette[color].main,
  fontWeight: 500,
  display: "flex",
  alignItems: "center",
}))

type StepNumberProps = {
  index: number;
  active: boolean;
  completed: boolean;
  color?: Color
}
const StepNumber = styled('span')<StepNumberProps>(
  ({ theme, color, active, completed }) => ({
    display: 'inline-flex',
    color: theme.palette[color].main,
    backgroundColor: alpha(theme.palette[color].main, .2),

    width: 20,
    height: 20,
    padding: 16,
    borderRadius: '50%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme.customShadows.widgetWide,
    marginRight: 10,

    ...((active || completed) && {
      backgroundColor: theme.palette[color].main,
      color: alpha('white', 1),
    })
  })
)

type StepLabelProps = {
  children: React.ReactNode;
} & StepLabelRootProps & Partial<HTMLAttributes<HTMLSpanElement>>

const StepLabel = React.forwardRef<HTMLSpanElement, StepLabelProps>((props, ref) => {
  const {
    children,
    color = "primary",
    variant = 'standard',
    ...other
  } = props

  const { index, active, completed } = useStepContext()

  const renderNumbering = variant === 'numbering' && (
    <StepNumber
      active={active}
      color={color}
      completed={completed}
      index={(index + 1)}
    >
      {index + 1}
    </StepNumber>
  )

  return (
    <StepLabelRoot
      ref={ref}
      color={color}
      variant={variant}
      {...other}
    >
      {renderNumbering}
      {children}
    </StepLabelRoot>
  )
})

export default StepLabel