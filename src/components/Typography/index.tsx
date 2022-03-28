import React from 'react'
import styled from "styled-components";
import { defaultTheme } from "src/themes/default";
import { Any, HTMLAttributes } from 'src/types/share';

type TypographyRootProps = {
  color?: "primary" | "textPrimary" | "secondary" | "textSecondary" | "error" | "hint" | "success",
  gutterBottom?: boolean
  component?: string | React.ComponentType,
  sx?: React.CSSProperties
  variant?: keyof typeof defaultTheme.typography
  bolder?: boolean,
  display?: 'block' | 'inline'
}

const TypographyRoot = styled('span').withConfig<TypographyRootProps>({
  displayName: 'Typography',
})(({ sx, color, gutterBottom, bolder, variant, display }) => ({
  margin: 0,
  fontWeight: bolder ? 'bold' : 'normal',

  ...(display === 'block' && {
    display: 'block'
  }),

  ...(variant && defaultTheme.typography[variant]),

  ...(color && {
    color: defaultTheme.palette.text[color]
  }),

  ...(gutterBottom && {
    marginBottom: '1em',
  }),

  ...sx,
}))

export type TypographyProps = {
  children?: React.ReactNode,
} & TypographyRootProps & Partial<HTMLAttributes<HTMLSpanElement>>

const Typography = React.forwardRef<React.Component<{}, Any, Any>, TypographyProps>((props, ref) => {
  const {
    color = "primary",
    variant = "body1",
    component,
    ...other
  } = props

  const Component = component || 'span';

  return (
    <TypographyRoot
      ref={ref}
      as={Component}
      color={color}
      variant={variant}
      {...other}
    />
  )
})

export default Typography