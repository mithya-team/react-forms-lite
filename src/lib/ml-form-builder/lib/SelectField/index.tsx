import React from "react";
import { FieldItemProps, Option } from "../Types";
import isString from "lodash/isString";
import "./index.module.scss";
import { FormikProps } from "formik";
import clsx from "clsx";
import { HelperText } from "../HelperText";
import { FieldProps } from "../..";
export interface SelectFProps extends FieldItemProps {
  options?: Option[];
  emptyItem?: string | boolean;
}
interface SelectFieldProps extends FieldProps {
  fieldProps?: SelectFProps;
}

export const SelectField: React.FC<SelectFieldProps> = (props) => {
  const {
    formikProps = {} as FormikProps<unknown>,
    fieldProps = {} as SelectFProps,
  } = props;
  const {
    name = "",
    label,
    options = [],
    emptyItem,
    nativeProps,
    classNames,
    disabled,
  } = fieldProps;

  const emptyItemText = isString(emptyItem) ? emptyItem : "No option selected";

  const optionList = emptyItem
    ? [{ value: "", name: emptyItemText }, ...options]
    : options;

  return (
    <div className={clsx("select-field", classNames)}>
      {label && <label className="select-field-label">{label}</label>}
      <div className="select-container">
        <select
          id={name}
          onChange={formikProps.handleChange}
          className="select-option"
          disabled={disabled}
          {...nativeProps}
        >
          {optionList.map((it) => {
            return (
              <option key={it.value} value={it.value} {...nativeProps}>
                {it.name}
              </option>
            );
          })}
        </select>
      </div>
      <HelperText fieldProps={fieldProps} formikProps={formikProps} />
    </div>
  );
};
