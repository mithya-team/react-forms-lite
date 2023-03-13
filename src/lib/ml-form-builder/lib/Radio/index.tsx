import { get } from "lodash";
import React from "react";
import "./index.module.scss";
import clsx from "clsx";
import { FieldItemProps, Option } from "../Types";
import { FormikProps } from "formik";
import { HelperText } from "../HelperText";
import { FieldProps } from "../..";

export interface RadioFieldProps extends FieldItemProps {
  options?: Option[];
  isColumn?: boolean;
}
interface RadioProps extends FieldProps {
  fieldProps?: RadioFieldProps;
}

export const Radio: React.FC<RadioProps> = (props) => {
  const {
    formikProps = {} as FormikProps<unknown>,
    fieldProps = {} as RadioFieldProps,
  } = props;
  const {
    options = [],
    name = "",
    label,
    isColumn,
    classNames,
    nativeProps,
    disabled,
  } = fieldProps;

  const fieldValue: string = get(formikProps, `values.${name}`) || "";

  return (
    <div className={clsx("radio-field", classNames)}>
      {label && <span className="radio-label">{label}</span>}
      <div
        className={clsx("radio-container", isColumn ? "isColumn" : undefined)}
      >
        {options.map((it) => (
          <span key={it.value} className="radio-name">
            <input
              className="radio-input"
              type="radio"
              name={name}
              value={it.value}
              checked={fieldValue === it.value}
              onChange={formikProps.handleChange}
              disabled={disabled}
              {...nativeProps}
            />
            {it.name}
          </span>
        ))}
      </div>
      <HelperText fieldProps={fieldProps} formikProps={formikProps} />
    </div>
  );
};
