// Adornet effect
// https://github.com/mui/material-ui/blob/renovate/mui-x/packages/mui-material/src/TextField/TextField.js
// https://github.com/mui/material-ui/blob/renovate/mui-x/packages/mui-material/src/FormControl/FormControl.js
// https://mui.com/components/text-fields/

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
    Controller,
    ControllerRenderProps,
} from 'react-hook-form'

import { FormInputProps } from '../types'

import { StyledFormInput } from './styles'

const FormInput: React.FC<FormInputProps> = (props) => {
    const {
        name,
        control,
        required,
        onChange: onChangeProps,
        rules,
        ...inputProps
    } = props

    const renderInput = (field: ControllerRenderProps<any, string>) => (
        <StyledFormInput
            required={required}
            onChange={(event) => {
                if (onChangeProps && typeof onChangeProps === "function") {
                    onChangeProps(event)
                }

                return field.onChange(event)
            }}
            {...inputProps}
        />
    )

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => renderInput(field)}
            rules={{ ...rules }}
        />
    )
}

export default FormInput
