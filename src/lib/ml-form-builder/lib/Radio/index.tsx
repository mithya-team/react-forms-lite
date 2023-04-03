import get from "lodash/get";
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
      {label && <label className="radio-label">{label}</label>}
      <div
        className={clsx("radio-container", isColumn ? "isColumn" : undefined)}
      >
        {options.map((item) => (
          <span key={item.value} className="radio-name">
            <label htmlFor={name}>
              {item.name}
              <input
                className="radio-input"
                type="radio"
                name={`${name}-${item}`} // Append the ID to the name attribute
                id={`${name}-${item}`}
                value={item.value}
                checked={fieldValue === item.value}
                onChange={formikProps.handleChange}
                disabled={disabled}
                {...nativeProps}
              />
            </label>
          </span>
        ))}
      </div>
      <HelperText fieldProps={fieldProps} formikProps={formikProps} />
    </div>
  );
};
