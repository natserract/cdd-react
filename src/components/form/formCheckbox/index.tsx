import React from 'react'
import styled from 'styled-components'
import Typography from 'src/components/typography'
import { defaultTheme } from "src/themes/default";

import FormInput from '../formInput'
import { FormInputProps } from '../types'

type FormCheckboxProps = {
  checked: boolean
  variant?: "normal" | "outlined"
  label?: string;
  color?: "primary" | "secondary" | "success"
}

const CheckboxIcon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 3px;
`

const CheckboxInput = styled(FormInput).attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`
const CheckboxWrapper = styled('div')<FormCheckboxProps>(({ variant, checked, color }) => ({
  display: 'inline-block',
  width: '16px',
  height: '16px',

  ...(variant === 'normal' && {
    background: checked ? defaultTheme.palette[color].main : 'transparent',
  }),

  ...(variant === 'outlined' && {
    background: 'transparent',
  }),

  border: `solid 3px ${defaultTheme.palette[color].main}`,
  borderRadius: '3px',
  transition: 'all 150ms',
  marginRight: '5px',
  marginTop: '2px',

  [`${CheckboxIcon}`]: {
    visibility: checked ? 'visible' : 'hidden',

    ...(variant === 'outlined' && {
      stroke: defaultTheme.palette[color].main,
    }),
  }
}))

const FormCheckboxRoot = styled('div').withConfig({
  displayName: "FormCheckbox"
})(() => ({
  display: 'inline-block',
  verticalAlign: 'middle',
  cursor: 'pointer'
}))

const FormCheckboxLabel = styled(Typography)((_props) => ({
  display: 'inline-flex',
  flexDirection: 'row-reverse',
  cursor: 'pointer',
}))

const FormCheckbox = React.forwardRef<HTMLDivElement, FormCheckboxProps & FormInputProps>((props, ref) => {
  const {
    name,
    control,
    checked,
    label: labelProps,
    type,
    color = "primary",
    variant = 'normal',
    ...other
  } = props

  return (
    <FormCheckboxRoot ref={ref} {...other}>
      <FormCheckboxLabel component='label'>
        {labelProps}

        <CheckboxInput
          checked={checked}
          control={control}
          name={name}
          type='checkbox'
          {...other}
        />

        <CheckboxWrapper
          checked={checked}
          color={color}
          variant={variant}
        >
          <CheckboxIcon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </CheckboxIcon>
        </CheckboxWrapper>
      </FormCheckboxLabel>

    </FormCheckboxRoot>
  )
})

export default FormCheckbox