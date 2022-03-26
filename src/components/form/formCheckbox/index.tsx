// https://mui.com/components/checkboxes/#main-content
import React from 'react'
import {
  Controller,
  Control,
  RegisterOptions,
  ControllerRenderProps,
} from 'react-hook-form'
import styled from 'styled-components'
import Button from 'src/components/button'

type FormCheckboxRootProps = {}

const FormCheckboxRoot = styled(Button).withConfig({
  displayName: "FormCheckbox"
})(({ theme }) => ({
  color: theme.palette.text.secondary,
}))


type FormCheckboxProps = {
  children?: React.ReactNode
} & FormCheckboxRootProps

const FormCheckbox = React.forwardRef<HTMLButtonElement, FormCheckboxProps>((props, ref) => {
  const { ...other } = props

  return (
    <FormCheckboxRoot
      ref={ref}
      {...other}
    />
  )
})

export default FormCheckbox