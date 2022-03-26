import React from 'react'
import { TypeObject } from 'src/types/share';
import styled from "styled-components";
import { defaultTheme } from "src/themes/default";
import alpha from 'color-alpha'

type ButtonColor = "inherit" | "primary" | "secondary" | "success" | "info"
type ButtonRootProps = {
  color?: ButtonColor,
  component?: string | React.ComponentType,
  variant?: "contained" | "outlined" | "text"
  disabled?: boolean
  type?: 'button' | "reset" | "submit"
  sx?: Record<string, unknown>
}

const buttonColorUtility = (color: ButtonColor) => {
  const colorThemeMain = defaultTheme.palette[color].main
  const colorThemeDark = defaultTheme.palette[color].dark

  return {
    main: colorThemeMain,
    dark: colorThemeDark,
  }
}

const ButtonRoot = styled('button').withConfig<ButtonRootProps>({
  displayName: 'Button',
})(({ sx, variant, disabled, color }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  boxSizing: 'border-box',
  outline: 0,
  border: 0,
  margin: 0,
  borderRadius: 0,
  padding: '6px 16px',
  color: color === 'inherit' ? 'inherit' : alpha('white', 1),
  cursor: disabled ? 'default' : 'pointer',
  minWidth: 64,
  minHeight: 35,
  transition: '.1s all ease-in-out',

  ...(variant === "text") && {
    backgroundColor: 'transparent'
  },

  ...(variant === 'outlined' && {
    padding: '5px 15px',
    border: `1px solid rgba(255, 255, 255, 0.23)`
  }),

  ...(color && color !== 'inherit' && {
    backgroundColor: buttonColorUtility(color).main,

    "&:hover": {
      backgroundColor: alpha(buttonColorUtility(color).dark, .9)
    }
  }),

  ...(disabled && {
    opacity: .5,
  }),

  ...sx,
}))

type ButtonProps = {
  children?: React.ReactNode,
} & ButtonRootProps & Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    color = "inherit",
    disabled,
    type,
    variant = "text",
    component = 'button',
    children,
    ...other
  } = props

  const ComponentProp = component
  const buttonProps = {} as TypeObject

  if (ComponentProp === 'button') {
    buttonProps.type = type === undefined ? 'button' : type;
    buttonProps.disabled = disabled;
  }

  return (
    <ButtonRoot
      ref={ref}
      color={color}
      variant={variant}
      {...buttonProps}
      {...other}
    >
      {children}
    </ButtonRoot>
  )
})

export default Button