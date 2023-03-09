import React from "react";
import "./index.module.scss";
import { FieldItemProps } from "../Types";
import { FieldProps } from "../..";
export interface TextAreaProps extends FieldItemProps {
    type?: string;
    placeholder?: string;
}
interface TextFieldsProps extends FieldProps {
    fieldProps?: TextAreaProps;
}
export declare const TextArea: React.FC<TextFieldsProps>;
export {};
