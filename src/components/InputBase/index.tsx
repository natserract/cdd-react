
import React from 'react'
import {
    Controller,
    ControllerRenderProps,
} from 'react-hook-form'
import { Any } from 'src/types/share';
import styled from "styled-components";

import { InputBaseProps } from './types'

const InputBaseRoot = styled.input.withConfig<Omit<InputBaseProps, 'name' | 'control' | 'shouldUnregister'>>({
    displayName: 'InputBase'
})(({ disabled }) => ({
    padding: '20px 14px',
    fontSize: '1rem',

    ...(disabled && {
        fontSize: 0,
    })
}))

const InputBase = React.forwardRef<
    HTMLInputElement | HTMLTextAreaElement,
    InputBaseProps
>((props, _ref) => {
    const {
        name,
        control,
        required,
        onChange: onChangeProps,
        rules,
        inputComponent = 'input',
        multiline,
        shouldUnregister,
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
            ref={field.ref}
            as={InputComponent as Any}
            name={field.name}
            required={required}
            value={field.value ?? ''}
            onChange={(e) => mergeOnChange(e, field.onChange(e))}
            {...inputProps}
        />
    )

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => renderInput(field)}
            rules={{
                required,
                ...rules
            }}
            shouldUnregister={shouldUnregister}
        />
    )
})

export default InputBase
