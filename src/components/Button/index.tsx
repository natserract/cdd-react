import React from 'react'
import { TypeObject } from 'src/types/share';
import styled from "styled-components";
import { defaultTheme } from "src/themes/default";
import alpha from 'color-alpha'

type Size = "small" | "medium" | "large"
const commonIconStyles = (size: Size) => ({
  ...(size === 'small' && {
    '& > *:nth-of-type(1)': {
      fontSize: 13,
    },
  }),
  ...(size === 'medium' && {
    '& > *:nth-of-type(1)': {
      fontSize: 16,
    },
  }),
  ...(size === 'large' && {
    '& > *:nth-of-type(1)': {
      fontSize: 18,
    },
  }),
});

const commonFontSizeStyles = (size: Size) => ({
  ...(size === 'small' && {
    fontSize: 13,
  }),

  ...(size === 'medium' && {
    fontSize: 16,
  }),

  ...(size === 'large' && {
    fontSize: 17,
  }),
})

type ButtonColor = "inherit" | "primary" | "secondary" | "error" | "success" | "info"
type ButtonRootProps = {
  color?: ButtonColor,
  component?: string | React.ComponentType,
  variant?: "contained" | "outlined" | "text"
  disabled?: boolean
  type?: string
  sx?: React.CSSProperties,
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  size?: Size,
  noPadding?: boolean;
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
})(({ sx, variant, disabled, color, size, noPadding }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  boxSizing: 'border-box',
  outline: 0,
  border: 0,
  margin: 0,
  borderRadius: 3,
  padding: !noPadding ? '10px 23px 12px' : 0,
  color: color === 'inherit' ? 'inherit' : (
    variant !== 'text' ? alpha('white', 1) : buttonColorUtility(color).main
  ),
  cursor: disabled ? 'default' : 'pointer',
  minWidth: 64,
  minHeight: 35,
  transition: '.1s all ease-in-out',

  ...(variant === "text") && {
    backgroundColor: 'transparent',
  },

  ...(variant === 'outlined' && {
    padding: '5px 15px',
    border: `1px solid rgba(255, 255, 255, 0.23)`
  }),

  // Background color
  ...(variant !== "text" && color && color !== 'inherit' && {
    backgroundColor: buttonColorUtility(color).main,

    "&:hover": {
      backgroundColor: alpha(buttonColorUtility(color).dark, .9)
    }
  }),
  // End Background color

  ...commonFontSizeStyles(size),
  ...(disabled && {
    opacity: .5,
  }),
  ...sx,
}))

type ButtonIconProps = {
  size?: Size
}

const ButtonStartIcon = styled('span').withConfig<ButtonIconProps>({
  displayName: 'ButtonStartIcon',
})(({ size }) => ({
  display: 'inherit',
  marginRight: 8,
  marginLeft: -4,

  ...(size === 'small' && {
    marginLeft: -2,
  }),
  ...commonIconStyles(size),
}));

const ButtonEndIcon = styled('span').withConfig<ButtonIconProps>({
  displayName: 'ButtonEndIcon',
})(({ size }) => ({
  display: 'inherit',
  marginRight: -4,
  marginLeft: 8,

  ...(size === 'small' && {
    marginRight: -2,
  }),
  ...commonIconStyles(size),
}));

type ButtonProps = {
  children?: React.ReactNode,
} & ButtonRootProps & ButtonIconProps & Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    type,
    disabled,
    color = "inherit",
    size = 'medium',
    variant = "text",
    component = 'button',
    startIcon: startIconProp,
    endIcon: endIconProp,
    children,
    ...other
  } = props

  const buttonProps = {} as TypeObject

  if (component === 'button') {
    buttonProps.type = type === undefined ? 'button' : type;
    buttonProps.disabled = disabled;
  }

  const renderStartIcon = startIconProp && (
    <ButtonStartIcon className='ButtonStartIcon' size={size}>
      {startIconProp}
    </ButtonStartIcon>
  )

  const renderEndIcon = endIconProp && (
    <ButtonEndIcon className='ButtonEndIcon' size={size}>
      {endIconProp}
    </ButtonEndIcon>
  )

  return (
    <ButtonRoot
      ref={ref}
      color={color}
      size={size}
      variant={variant}
      {...buttonProps}
      {...other}
    >
      {renderStartIcon}
      {children}
      {renderEndIcon}
    </ButtonRoot>
  )
})

export default Button