import get from "lodash/get";
import React from "react";
import "./index.module.scss";
import clsx from "clsx";
import { FieldItemProps } from "../Types";
import { HelperText } from "../HelperText";
import { FormikProps } from "formik";
import { FieldProps } from "../..";
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
    <div className={clsx("textarea-field", classNames)}>
      {label && <label className="textarea-label">{label}</label>}
      <div className={clsx("textarea-field-box")}>
        <textarea
          className={clsx("textarea-box")}
          placeholder={`${placeholder || ""}`}
          name={name}
          id={name}
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
