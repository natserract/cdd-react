import React from 'react';
import {
    Control,
    RegisterOptions,
} from 'react-hook-form'
import { Any } from 'src/types/share';

type BaseProps = {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    rules: Omit<
        RegisterOptions<Any, Any>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >;
    required: boolean;
}

export type OptionalProps =
    Partial<React.InputHTMLAttributes<HTMLElement>> & Partial<BaseProps> & Partial<React.RefAttributes<HTMLInputElement>>

export type InputBaseProps = OptionalProps & {
    // React hook form
    name: string;
    control: Control<Any, Any>;

    // Base
    color?: "primary" | "secondary" | "success" | "error" | "info"
    variant?: "outlined" | "filled" | "standard"
    sx?: React.CSSProperties

    // Errors
    isError?: boolean
    errors?: { [x: string]: Any }
    errorMessage?: string;

    // Icon
    activeIconOnChange?: boolean;
}