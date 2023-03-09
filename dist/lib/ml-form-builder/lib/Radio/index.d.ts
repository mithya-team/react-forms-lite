import React from "react";
import "./index.module.scss";
import { FieldItemProps, Option } from "../Types";
import { FieldProps } from "../..";
export interface RadioFieldProps extends FieldItemProps {
    options?: Option[];
    isColumn?: boolean;
}
interface RadioProps extends FieldProps {
    fieldProps?: RadioFieldProps;
}
export declare const Radio: React.FC<RadioProps>;
export {};
