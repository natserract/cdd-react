
import React from 'react'
import {
    Controller,
    ControllerRenderProps,
} from 'react-hook-form'
import { Any } from 'src/types/share';
import styled from "styled-components";

import { InputBaseProps } from './types'

const InputBaseRoot = styled.input.withConfig<Omit<InputBaseProps, 'name' | 'control'>>({
    displayName: 'InputBase'
})(() => ({
    padding: '20px 14px',
    fontSize: '1rem',
}))

const InputBase = React.forwardRef<
    HTMLInputElement | HTMLTextAreaElement,
    InputBaseProps
>((props, ref) => {
    const {
        name,
        control,
        required,
        onChange: onChangeProps,
        rules,
        inputComponent = 'input',
        multiline,

        ...inputProps
    } = props

    let InputComponent = inputComponent;

    if (multiline && InputComponent === 'input') {
        InputComponent = 'textarea';
    }

    const mergeOnChange = (event: React.ChangeEvent<HTMLInputElement>, fn) => {
        if (onChangeProps && typeof onChangeProps === "function") {
            onChangeProps(event)
        }

        return fn
    }

    const renderInput = (field: ControllerRenderProps<Any, string>) => (
        <InputBaseRoot
            ref={ref}
            as={InputComponent as Any}
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
})

export default InputBase
