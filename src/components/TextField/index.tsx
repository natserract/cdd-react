
import clsx from 'clsx'
import React, { useState } from 'react'
import { useCallback } from 'react'
import styled from 'styled-components'

import InputBase from '../InputBase'
import { InputBaseProps } from '../InputBase/types'
import Typography from '../Typography'

const TextFieldContainer = styled.div.withConfig({
  displayName: 'TextFieldContainer'
})`
  display: flex;
  flex-direction: column;
  padding: 25px;
  position: relative;
`

const TextFieldLabel = styled.label`
  position: absolute;
  left: 20px;
  top: calc(1.2em + 0.79em);
  color: #999;
  font-weight: normal;
  opacity: 0.75;
  order: 1;
  display: block;
  padding-left: 7px;
  text-shadow: none;
  text-transform: capitalize;
  transform-origin: left top 0px;
  transform: translate(14px, 16px) scale(1);
  transition: 200ms ease all;
  max-width: calc(100% - 24px);
  z-index: 1;
  pointer-events: none;
`

const TextFieldHelper = styled(Typography)`
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  font-size: .8rem;
  line-height: 1.66;
  text-align: left;
  margin: 5px 5px 0px;
  order: 3;
`

type TextFieldRootProps = {
  placeholder?: string
  label?: string;
  helperText?: string
  fullWidth?: boolean,
  color?: "primary" | "secondary" | "success" | "error" | "info"
  variant?: "outlined" | "filled" | "standard"
}

const TextFieldRoot = styled(InputBase).withConfig<TextFieldRootProps>({
  displayName: 'TextField',
})(({ theme, variant, color }) => ({
  borderRadius: 0,
  display: 'flex',
  lineHeight: '1.2em',
  border: 0,
  borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
  paddingTop: 30,

  ...(variant === 'outlined' && {
    border: '1px solid rgba(0, 0, 0, 0.15)',
  }),

  "&:hover": {
    borderColor: ' rgba(0, 0, 0, .25)'
  },

  color: '#000',
  flex: '1 1 auto',
  order: 2,
  height: '1.2em',

  "&:focus, &.focus": {
    outline: 0,
    borderColor: theme.palette[color].main,
  },

  [`&:focus + ${TextFieldLabel}, &.focus + ${TextFieldLabel}`]: {
    opacity: 1,
    color: theme.palette[color].main,
    transform: 'translate(14px, 3px) scale(0.65)',
  },

}))

type TextFieldProps = TextFieldRootProps & InputBaseProps

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const {
    control,
    name,
    placeholder,
    label,
    helperText,
    className,
    onChange: onChangeProps,
    color = 'primary',
    ...other
  } = props

  const [classes, setClasses] = useState('')

  const handleChange = useCallback((e) => {
    onChangeProps(e)
    const value = e.target.value

    if (value) {
      setClasses('focus')
    } else {
      setClasses('')
    }
  }, [onChangeProps])

  return (
    <TextFieldContainer>
      <TextFieldRoot
        ref={ref}
        className={clsx(classes, className)}
        color={color}
        control={control}
        name={name}
        onChange={handleChange}
        {...other}
      />
      <TextFieldLabel>
        {placeholder || label}
      </TextFieldLabel>

      {helperText && (
        <TextFieldHelper
          children={helperText}
          component='p'
        />
      )}
    </TextFieldContainer>
  )
})

export default TextField