
import clsx from 'clsx'
import React, { useRef, useState } from 'react'
import { useCallback } from 'react'
import styled from 'styled-components'
import useForkRef from '@rooks/use-fork-ref'
import { useOnClickOutside } from 'src/hooks/useClickOutside'

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
  label?: string;
  helperText?: string
  fullWidth?: boolean,
  startAdornment?: React.ReactNode,
  endAdornment?: React.ReactNode,
}

const TextFieldRoot = styled(InputBase).withConfig<TextFieldRootProps>({
  displayName: 'TextField',
})(({ theme, variant, color, sx, startAdornment, endAdornment }) => ({
  borderRadius: 0,
  display: 'flex',
  lineHeight: '1.2em',
  border: 0,
  borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
  paddingTop: 30,

  ...(variant === 'outlined' && {
    border: '1px solid rgba(0, 0, 0, 0.15)',
  }),

  "&:hover:not([disabled], :focus)": {
    borderColor: ' rgba(0, 0, 0, .25)'
  },

  color: '#000',
  flex: '1 1 auto',
  order: 2,
  height: '1.2em',

  "&:focus": {
    outline: 0,
    borderColor: theme.palette[color].main,
  },

  [`&:focus + ${TextFieldLabel}`]: {
    color: theme.palette[color].main,
  },
  [`&:focus + ${TextFieldLabel}, &.focus + ${TextFieldLabel}`]: {
    opacity: 1,
    transform: 'translate(14px, 3px) scale(0.65)',
  },

  ...(startAdornment && {
    paddingLeft: 40,
    [`& + ${TextFieldLabel}`]: {
      left: '3em',
    },
  }),
  ...(endAdornment && {
    paddingRight: 40,
  }),

  ...sx,
}))

const TextFieldAdornmentRoot =
  styled('div')<Pick<
    TextFieldRootProps,
    'startAdornment' | 'endAdornment'
  > & {
    active?: boolean;
    color?: "primary" | "secondary" | "success" | "error" | "info"
  }>(({ theme, startAdornment, endAdornment, active, color }) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    color: active ? theme.palette[color].main : 'rgba(0, 0, 0, 0.25)',

    ...(startAdornment && {
      left: '2.7em'
    }),
    ...(endAdornment && {
      right: '2.7em',
    }),
  })
  )


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
    startAdornment,
    endAdornment,
    color = 'primary',
    ...other
  } = props

  const rootRef = useRef(null)
  const handleRef = useForkRef(ref, rootRef)

  const [isActive, setIsActive] = useState(false)
  const [classes, setClasses] = useState('')

  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(rootRef, () => setIsActive(false));

  const handleChange = useCallback((e) => {
    const value = e.target.value

    if (value) {
      setClasses('focus')
    } else {
      setClasses('')
    }

    if (onChangeProps && typeof onChangeProps === "function") {
      onChangeProps(e)
    }
  }, [onChangeProps])

  const renderStartAdornment = startAdornment && (
    <TextFieldAdornmentRoot
      active={isActive}
      color={color}
      startAdornment={startAdornment}
    >
      {startAdornment}
    </TextFieldAdornmentRoot>
  )

  const renderEndAdornment = endAdornment && (
    <TextFieldAdornmentRoot
      active={isActive}
      color={color}
      endAdornment={endAdornment}
    >
      {endAdornment}
    </TextFieldAdornmentRoot>
  )

  return (
    <TextFieldContainer>
      <TextFieldRoot
        ref={handleRef}
        className={clsx(classes, className)}
        color={color}
        control={control}
        endAdornment={endAdornment}
        name={name}
        startAdornment={startAdornment}
        onChange={handleChange}
        onClick={() => setIsActive(true)}
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

      {renderStartAdornment}
      {renderEndAdornment}
    </TextFieldContainer>
  )
})

export default TextField