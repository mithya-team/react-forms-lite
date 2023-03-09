import React from "react";
import { FieldItemProps } from "../Types";
import "./index.module.scss";
import { FieldProps } from "../..";
interface HelperTextProps extends FieldProps {
    fieldProps?: FieldItemProps;
}
export declare const HelperText: React.FC<HelperTextProps>;
export {};
