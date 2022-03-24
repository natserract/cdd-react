/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
    Controller,
    Control,
    RegisterOptions,
    ControllerRenderProps,
} from 'react-hook-form'

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
        <input
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
