import { get } from "lodash";
import React from "react";
import "./index.scss";
import clsx from "clsx";
import { FieldItemProps, FieldProps } from "../Types";
import {HelperText} from "../HelperText";
import { FormikProps } from "formik";

export interface TextFieldProps extends FieldItemProps {
  type?: string;
  placeholder?: string;
}

interface TextFieldsProps extends FieldProps {
  fieldProps?: TextFieldProps;
}

export const TextField: React.FC<TextFieldsProps> = (props) => {
  const {
    fieldProps = {} as TextFieldProps,
    formikProps = {} as FormikProps<unknown>,
  } = props;

  const {
    label,
    name = "",
    type = "",
    classNames,
    placeholder,
    nativeProps,
    disabled,
  } = fieldProps;

  const fieldValue = get(formikProps, `values.${name}`) as string;

  return (
    <div className={clsx("text-field", classNames, name)}>
      {label && <label className="text-label">{label}</label>}
      <div className={clsx("text-field-box")}>
        <input
          className={clsx("input-box", )}
          type={type}
          placeholder={`${placeholder || ""}`}
          name={name}
          value={fieldValue || ""}
          onBlur={formikProps.handleBlur}
          onChange={formikProps.handleChange}
          disabled={disabled}
          {...nativeProps}
        />
      </div>

      <HelperText fieldProps={fieldProps} formikProps={formikProps} />
    </div>
  );
};


