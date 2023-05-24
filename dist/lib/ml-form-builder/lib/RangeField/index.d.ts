import React from "react";
import "./index.module.scss";
import { FieldItemProps } from "../Types";
import { FieldProps } from "../..";
export interface RangeProps extends FieldItemProps {
    min?: number;
    max?: number;
    step?: number;
    value?: number;
}
interface RangesProps extends FieldProps {
    fieldProps?: RangeProps;
}
export declare const RangeField: React.FC<RangesProps>;
export {};
