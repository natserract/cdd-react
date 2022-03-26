
import React from 'react'
import {
    Controller,
    ControllerRenderProps,
} from 'react-hook-form'
import { Any } from 'src/types/share';
import styled from "styled-components";

import { InputBaseProps } from './types'

const InputBaseRoot = styled.input`
  padding: 16.5px 14px;
  font-size: 1rem;
`

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


    const renderInput = (field: ControllerRenderProps<Any, string>) => (
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
