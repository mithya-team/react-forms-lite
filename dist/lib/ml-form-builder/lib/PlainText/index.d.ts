import React from "react";
import { FieldItemProps } from "../Types";
import { FieldProps } from "../..";
export interface PlainTextFieldProps extends FieldItemProps {
    isTextHtmlString?: boolean;
    text: string | JSX.Element;
}
export interface PlainTextProps extends FieldProps {
    fieldProps?: PlainTextFieldProps;
}
export declare const PlainText: React.FC<PlainTextProps>;
