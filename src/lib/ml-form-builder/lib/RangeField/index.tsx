import get from "lodash/get";
import React from "react";
import "./index.module.scss";
import clsx from "clsx";
import { FieldItemProps } from "../Types";
import { FormikProps } from "formik";
import { FieldProps } from "../..";

export interface RangeProps extends FieldItemProps {
  min?: number;
  max?: number;
  step?: number;
}

interface RangesProps extends FieldProps {
  fieldProps?: RangeProps;
}

export const RangeField: React.FC<RangesProps> = (props) => {
  const {
    fieldProps = {} as RangeProps,
    formikProps = {} as FormikProps<unknown>,
  } = props;

  const {
    min,
    max,
    step,
    label,
    name = "",
    classNames,
    nativeProps,
    disabled,
  } = fieldProps;

  const fieldValue = get(formikProps, `values.${name}`);

  return (
    <div className={clsx("range-field", classNames)}>
      {label && <label className="range-label">{label}</label>}
      <div className={clsx("range-field-box")}>
        <input
          className={clsx("input-box")}
          type={"range"}
          id={name}
          name={name}
          value={fieldValue || 50}
          onBlur={formikProps.handleBlur}
          onChange={formikProps.handleChange}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          {...nativeProps}
        />
      </div>
    </div>
  );
};
