import React from "react";
import "./index.module.scss";
import { FieldItemProps } from "../Types";
import { FieldProps } from "../../";
export interface TextFieldProps extends FieldItemProps {
    type?: string;
    placeholder?: string;
}
interface TextFieldsProps extends FieldProps {
    fieldProps?: TextFieldProps;
}
export declare const TextField: React.FC<TextFieldsProps>;
export {};
