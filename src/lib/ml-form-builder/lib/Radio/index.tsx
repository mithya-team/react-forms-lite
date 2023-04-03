import React, { useState } from "react";
import get from "lodash/get";
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
  const [checkedValue, setCheckedValue] = useState(
    options.find((option) => option.defaultChecked)?.value || ""
  );
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(event.target.value);
    formikProps.handleChange(event);
  };
  const fieldValue: string = get(formikProps, `values.${name}`) || checkedValue;
  return (
    <div className={clsx("radio-field", classNames)}>
      {label && <label className="radio-label">{label}</label>}
      <div
        className={clsx("radio-container", isColumn ? "isColumn" : undefined)}
      >
        {options.map((item: Option) => (
          <span key={item.value} className="radio-name">
            <input
              className="radio-input"
              type="radio"
              name={name}
              id={`${item.name}-${item.value}`}
              value={item.value}
              checked={fieldValue === item.value}
              onChange={handleRadioChange}
              disabled={disabled}
              {...nativeProps}
            />
            <label htmlFor={`${item.name}-${item.value}`}> {item.name}</label>
          </span>
        ))}
      </div>
      <HelperText fieldProps={fieldProps} formikProps={formikProps} />
    </div>
  );
};
