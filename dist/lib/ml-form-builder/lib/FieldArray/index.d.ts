import React from "react";
import "./index.module.scss";
import { FieldItemProps, FieldProps } from "../Types";
export interface FieldArrayProps extends FieldItemProps {
    itemType: string;
    addButtonText?: string;
    addButton?: JSX.Element;
    removeButton?: JSX.Element;
    onAddButtonClick?: () => Promise<any | undefined>;
    onRemoveButtonClick?: (index: number) => Promise<boolean>;
    arrayItemFieldProps?: object;
    defaultItemValue?: any;
    fieldArrayLabel?: string;
}
interface FieldsArrayProps extends FieldProps {
    fieldProps?: FieldArrayProps;
}
export declare const ArrayField: React.FC<FieldsArrayProps>;
export {};
