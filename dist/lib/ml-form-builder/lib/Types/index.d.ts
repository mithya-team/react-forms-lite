/// <reference types="react" />
export interface FieldItemProps {
    name?: string;
    id?: string;
    label?: React.ReactNode;
    disabled?: boolean;
    classNames?: string | Array<string>;
    helperText?: string;
    nativeProps?: React.InputHTMLAttributes<object>;
}
export interface Option {
    name: string;
    value: string;
    defaultChecked?: boolean;
}
