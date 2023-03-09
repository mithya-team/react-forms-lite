import React, { useEffect, useState } from "react";
import { FieldItemProps } from "../Types";
import "./index.module.scss";
import { CountryCodeFormat, COUNTRY_LIST } from "../Constants/CountryList";
import { get } from "lodash";
import { FormikProps } from "formik";
import clsx from "clsx";
import { HelperText } from "../HelperText";
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

export const PhoneField: React.FC<PhoneFieldsProps> = (props) => {
  const {
    fieldProps = {} as PhoneFieldProps,
    formikProps = {} as FormikProps<unknown>,
  } = props;
  const [code, setCode] = useState<string>("");

  const handleRenderOption = (country: CountryCodeFormat, index: number) => {
    if (!country.dial_code) return null;
    return (
      <option key={index} value={country.dial_code}>
        {`${country.name} (${country.dial_code})`}
      </option>
    );
  };

  const {
    label,
    name = "",
    emptyItem,
    emptyItemText,
    countryCodeLabel,
    classNames,
    nativeProps,
    placeholder,
    disabled,
    renderOption = handleRenderOption,
  } = fieldProps;

  const value = (get(formikProps, `values.${name}`) || "") as string;

  useEffect(() => {
    if (value) {
      setCode(value.split("-")[0] || "");
    }
  }, [name]);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    const number = event.target.value.replace("-", "");
    formikProps.setFieldValue(`${name}`, `${code}-${number}`);
  };

  const handleCodeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const number = value.split("-");
    formikProps.setFieldValue(
      `${name}`,
      `${e.target.value as string}-${number[1] || ""}`
    );
    setCode(e.target.value as string);
  };

  return (
    <div className={clsx("phone-field", classNames)}>
      <label className="phone-field-label" id={name}>
        {countryCodeLabel || "Country Code"} {label}
      </label>

      <div className="phone-field-container">
        <div className="phone-field-box">
          <select
            className="phone-field-select"
            id={name}
            value={code}
            onChange={handleCodeChange}
            disabled={disabled}
          >
            {emptyItem && <option value="">{emptyItemText}</option>}
            {(COUNTRY_LIST as unknown as CountryCodeFormat[]).map(renderOption)}
          </select>
        </div>
        <input
          type="tel"
          className="phone-field-input"
          placeholder={`${placeholder || ""}`}
          name={name}
          onBlur={formikProps.handleBlur}
          autoComplete="nope"
          value={value.split("-")[1] || ""}
          onChange={onChange}
          disabled={disabled}
          {...nativeProps}
        />
      </div>

      <HelperText fieldProps={fieldProps} formikProps={formikProps} />
    </div>
  );
};
