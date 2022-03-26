import {
    Control,
    RegisterOptions,
} from 'react-hook-form'
import { Any } from 'src/types/share';

type BaseProps = {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    rules: Omit<
        RegisterOptions<Any, Any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >;
    required: boolean;
}

type OptionalProps = Partial<React.InputHTMLAttributes<HTMLElement>> & Partial<BaseProps>

export type FormInputProps = OptionalProps & {
    name: string;
    control: Control<Any, Any>
}