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
import styled from "styled-components";

import { InputBaseProps } from './types'

const InputBaseRoot = styled.input``

const InputBase: React.FC<InputBaseProps> = (props) => {
    const {
        name,
        control,
        required,
        onChange: onChangeProps,
        rules,
        ...inputProps
    } = props

    const mergeOnChange = (event: React.ChangeEvent<HTMLInputElement>, fn) => {
        if (onChangeProps && typeof onChangeProps === "function") {
            onChangeProps(event)
        }

        return fn
    }


    const renderInput = (field: ControllerRenderProps<any, string>) => (
        <InputBaseRoot
            required={required}
            onChange={(e) => mergeOnChange(e, field.onChange(e))}
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

export default InputBase
