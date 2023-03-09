import { FormikProps } from "formik";
import React from "react";
import { FieldItemProps } from "./lib/Types";
import "./index.module.scss";
import { TFieldConditions } from "./lib/ConditionalOperations";
export interface ReadOnlyProps {
    renderer: (props: FieldProps) => React.ReactNode;
}
export interface FormConfig extends FieldItemProps {
    type: string;
    valueKey: string;
    flex?: number | string;
    fieldProps?: object;
    styles?: object;
    condition?: TFieldConditions;
    readOnlyProps?: ReadOnlyProps;
}
interface RowSettingsProps {
    horizontalSpacing?: number;
    verticalSpacing?: number;
    columnHorizontalPadding?: number;
}
export interface BuilderSettingsProps extends RowSettingsProps {
    isReadOnly?: boolean;
}
export type RowSchema = Array<FormConfig> | FormConfig | {
    columns: Array<FormConfig>;
    settings?: RowSettingsProps;
};
export interface FormRowProps<T = any> {
    schema: RowSchema;
    rowId: string;
    formikProps?: FormikProps<T>;
    settings?: BuilderSettingsProps;
}
type submitButtonLayout = "right" | "center" | "fullWidth";
export interface FormActionProps {
    submitButtonText?: string;
    submitButtonLayout?: submitButtonLayout;
    actionContent?: JSX.Element;
    containerClassNames?: string | string[];
    displayActions?: boolean;
}
export interface BuilderProps<T = any> {
    schema: Array<RowSchema>;
    formId: string;
    formikProps?: FormikProps<T>;
    actionConfig?: FormActionProps;
    settings?: BuilderSettingsProps;
    isInProgress?: boolean;
}
export interface FieldProps<T = any> {
    formikProps?: FormikProps<T>;
    fieldConfig?: FormConfig;
    isReadOnly?: boolean;
}
export declare const attachField: (type: Array<string> | string, component: JSX.Element, props?: object) => void;
export declare const setDefaultProps: (type: Array<string> | string, props: object) => void;
export declare const BuildFormRow: React.FC<FormRowProps>;
export declare const MLFormContent: React.FC<BuilderProps>;
export declare const MLFormAction: React.FC<FormActionProps & Pick<BuilderProps, "formId" | "formikProps">>;
export declare const MLFormBuilder: React.FC<BuilderProps>;
export default MLFormBuilder;
