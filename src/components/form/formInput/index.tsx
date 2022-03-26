// Adornet effect
// https://github.com/mui/material-ui/blob/renovate/mui-x/packages/mui-material/src/TextField/TextField.js
// https://github.com/mui/material-ui/blob/renovate/mui-x/packages/mui-material/src/FormControl/FormControl.js
// https://mui.com/components/text-fields/

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
    Controller,
    Control,
    RegisterOptions,
    ControllerRenderProps,
} from 'react-hook-form'

import { StyledFormInput } from './styles'

type BaseProps = {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    rules: Omit<
        RegisterOptions<any, any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >;
    required: boolean;
}

type OptionalProps = Partial<React.InputHTMLAttributes<HTMLElement>> & Partial<BaseProps>

type FormInputProps = OptionalProps & {
    name: string;
    control: Control<any, any>
}

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
