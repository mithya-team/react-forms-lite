import React from "react";
import { FieldItemProps } from "../Types";
import "./index.module.scss";
import { get } from "lodash";
import { FormikProps } from "formik";
import clsx from "clsx";
import { HelperText } from "../HelperText";
import { FieldProps } from "../..";

export interface SwitchFieldProps extends FieldItemProps {
  label?: string;
}

interface SwitchProps extends FieldProps {
  fieldProps?: SwitchFieldProps & FieldItemProps;
}

export const Switch: React.FC<SwitchProps> = (props) => {
  const {
    formikProps = {} as FormikProps<unknown>,
    fieldProps = {} as SwitchFieldProps,
  } = props;
  const { label, name = "", classNames, nativeProps, disabled } = fieldProps;

  const fieldValue = get(formikProps, `values.${name}`);
  const handleOnChange = () => {
    formikProps.setFieldValue(`${name}`, !fieldValue);
  };
  return (
    <div className={clsx("switch-field", classNames)}>
      {label && <span className="switch-label">{label}</span>}
      <label className="switch-container">
        <input
          className="slider"
          type="checkbox"
          checked={!!fieldValue}
          value={fieldValue}
          onChange={handleOnChange}
          disabled={disabled}
          {...nativeProps}
        />
        <span className="slider round"></span>
      </label>

      <HelperText fieldProps={fieldProps} formikProps={formikProps} />
    </div>
  );
};
