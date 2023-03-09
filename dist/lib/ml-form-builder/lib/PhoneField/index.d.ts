import React from "react";
import { FieldItemProps } from "../Types";
import "./index.module.scss";
import { CountryCodeFormat } from "../Constants/CountryList";
import { FieldProps } from "../..";
export interface PhoneFieldProps extends FieldItemProps {
    countryCodeLabel?: string;
    phoneLabel?: string;
    emptyItem?: string | boolean;
    emptyItemText?: string;
    placeholder?: string;
    renderOption?: (country: CountryCodeFormat, index?: number) => JSX.Element;
}
export interface PhoneFieldsProps extends FieldProps {
    fieldProps?: PhoneFieldProps;
}
export declare const PhoneField: React.FC<PhoneFieldsProps>;
