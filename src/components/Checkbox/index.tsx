import React from 'react'
import styled from 'styled-components'
import Typography from 'src/components/Typography'
import { defaultTheme } from "src/themes/default";

import InputBase from '../InputBase'
import { InputBaseProps } from '../InputBase/types'

type CheckboxProps = {
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

const CheckboxInput = styled(InputBase).attrs({ type: 'checkbox' })`
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
const CheckboxWrapper = styled('div')<CheckboxProps>(({ variant, checked, color }) => ({
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
  marginRight: '7px',


  [`${CheckboxIcon}`]: {
    visibility: checked ? 'visible' : 'hidden',

    ...(variant === 'outlined' && {
      stroke: defaultTheme.palette[color].main,
    }),
  }
}))

const CheckboxRoot = styled('div').withConfig({
  displayName: "FormCheckbox"
})(() => ({
  display: 'inline-block',
  verticalAlign: 'middle',
  cursor: 'pointer'
}))

const CheckboxLabel = styled(Typography)((_props) => ({
  display: 'inline-flex',
  alignItems: 'center',
  flexDirection: 'row-reverse',
  cursor: 'pointer',
}))

const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps & InputBaseProps>((props, ref) => {
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
    <CheckboxRoot ref={ref} {...other}>
      <CheckboxLabel component='label'>
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
      </CheckboxLabel>
    </CheckboxRoot>
  )
})

export default Checkbox