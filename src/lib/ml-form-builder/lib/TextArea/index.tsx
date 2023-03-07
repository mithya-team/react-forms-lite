import { get } from "lodash";
import React from "react";
import "./index.module.scss";
import clsx from "clsx";
import { FieldItemProps, FieldProps } from "../Types";
import {HelperText} from "../HelperText";
import { FormikProps } from "formik";
export interface TextAreaProps extends FieldItemProps {
  type?: string;
  placeholder?: string;
}
interface TextFieldsProps extends FieldProps {
  fieldProps?: TextAreaProps;
}
export const TextArea: React.FC<TextFieldsProps> = (props) => {
  const {
    fieldProps = {} as TextAreaProps,
    formikProps = {} as FormikProps<unknown>,
  } = props;
  const {
    label,
    name = "",
    classNames,
    placeholder,
    nativeProps,
    disabled,
  } = fieldProps;
  const fieldValue = get(formikProps, `values.${name}`) as string;
  return (
    <div className={clsx("textarea-field", classNames, name)}>
      {label && <label className="textarea-label">{label}</label>}
      <div className={clsx("textarea-field-box")}>
        <textarea
          className={clsx("textarea-box", )}
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