
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
  position: relative;
`

const TextFieldLabel = styled.label`
  position: absolute;
  left: 0;
  top: 0;
  color: #999;
  font-weight: normal;
  opacity: 0.75;
  order: 1;
  display: block;
  text-shadow: none;
  text-transform: capitalize;
  transform-origin: left top 0px;
  transform: translate(14px, 15px) scale(1);
  transition: 200ms ease all;
  max-width: calc(100% - 24px);
  z-index: 1;
  pointer-events: none;
`

const TextFieldHelper = styled(Typography) <{
  isError?: boolean
}>`
  color: ${props => props.isError ? props.theme.palette.primary.main : 'rgba(0, 0, 0, 0.6)'};
  font-weight: 400;
  font-size: .8rem;
  line-height: 1.66;
  text-align: left;
  margin: 5px 5px 0px;
  order: 3;
  position: absolute;
  bottom: -3px;
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
})(({ theme, variant, color, isError: error, sx, startAdornment, endAdornment, multiline }) => ({
  borderRadius: 0,
  display: 'flex',
  lineHeight: '1.2em',
  border: 0,
  borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
  paddingTop: 30,
  fontWeight: 'bold',

  ...(variant === 'outlined' && {
    border: '1px solid rgba(0, 0, 0, 0.15)',
  }),

  ...(!error && {
    "&:hover:not([disabled], :focus)": {
      borderColor: ' rgba(0, 0, 0, .25)'
    },
  }),

  color: '#000',
  flex: '1 1 auto',
  order: 2,
  height: '1.3em',

  "&:focus": {
    outline: 0,
    ...(!error && {
      borderColor: theme.palette[color].main,
    }),
  },
  ...(error && {
    borderColor: theme.palette.primary.main,
  }),

  [`& + ${TextFieldLabel}`]: {
    ...(error && {
      color: theme.palette.primary.main,
    })
  },
  [`&:focus + ${TextFieldLabel}`]: {
    ...(!error && {
      color: theme.palette[color].main,
    }),
  },
  [`&:focus + ${TextFieldLabel}, &.focus + ${TextFieldLabel}`]: {
    opacity: 1,
    transform: 'translate(14px, 7px) scale(0.65)',
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

  // Multiline enabled
  ...(multiline && {
    resize: 'none',
    minHeight: 130
  }),

  ...sx,
}))

type TextFieldAdornmentRootProps = {
  active?: boolean;
  color?: "primary" | "secondary" | "success" | "error" | "info",
  isError?: boolean;
} & Pick<TextFieldRootProps, 'startAdornment' | 'endAdornment'>

const TextFieldAdornmentRoot =
  styled('div')<TextFieldAdornmentRootProps>(({ theme, startAdornment, endAdornment, active, color, isError }) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',

    ...(!isError && {
      color: active ? theme.palette[color].main : 'rgba(0, 0, 0, 0.25)',
    }),
    ...(isError && {
      color: theme.palette.primary.main
    }),

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
    errorMessage,
    className,
    onChange: onChangeProps,
    startAdornment,
    endAdornment,
    color = 'primary',
    isError,
    errors,
    activeIconOnChange,
    ...other
  } = props

  let isFormError = false

  if (errors && Object.prototype.hasOwnProperty.call(errors, name)) {
    isFormError = true
  }

  const rootRef = useRef(null)
  const handleRef = useForkRef(ref, rootRef)

  const [isActive, setIsActive] = useState(false)
  const [classes, setClasses] = useState('')
  const [activeIconOnChangeState, setActiveIconOnChangeState] = useState(false)

  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(rootRef, () => {
    setIsActive(false)
    setActiveIconOnChangeState(false)
  });

  const handleChange = useCallback((e) => {
    const value = e.target.value

    if (value) {
      setClasses('focus') // Triggering focus by class
      setActiveIconOnChangeState(true) // Show icon when value changed
    } else {
      setClasses('')
    }

    // Pass onChange function
    if (onChangeProps && typeof onChangeProps === "function") {
      onChangeProps(e)
    }
  }, [onChangeProps])

  const isHasStartAdornment = startAdornment && !activeIconOnChange
  const isHasStartAdornmentOnChange = startAdornment && activeIconOnChange && activeIconOnChangeState

  const renderStartAdornment = (isHasStartAdornmentOnChange || isHasStartAdornment) && (
    <TextFieldAdornmentRoot
      active={isActive}
      color={color}
      isError={isFormError}
      startAdornment={startAdornment}
    >
      {startAdornment}
    </TextFieldAdornmentRoot>
  )

  const isHasEndAdornment = endAdornment && !activeIconOnChange
  const isHasEndAdornmentOnChange = endAdornment && activeIconOnChange && activeIconOnChangeState

  const renderEndAdornment = (isHasEndAdornmentOnChange || isHasEndAdornment) && (
    <TextFieldAdornmentRoot
      active={isActive}
      color={color}
      endAdornment={endAdornment}
      isError={isFormError}
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
        isError={isFormError}
        name={name}
        startAdornment={startAdornment}
        onChange={handleChange}
        onClick={() => setIsActive(true)}
        {...other}
      />

      <TextFieldLabel>
        {placeholder || label}
      </TextFieldLabel>

      {(helperText || (isFormError && errorMessage)) && (
        <TextFieldHelper
          children={helperText || (isFormError && errorMessage)}
          component='p'
          isError={isFormError}
        />
      )}

      {renderStartAdornment}
      {renderEndAdornment}
    </TextFieldContainer>
  )
})

export default TextField