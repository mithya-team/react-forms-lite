import React from "react";
import "./index.module.scss";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";

import clsx from "clsx";
import { FieldItemProps, Option } from "../Types";
import { FormikProps } from "formik";
import { HelperText } from "../HelperText";
import { FieldProps } from "../..";

export interface CheckboxFieldProps extends FieldItemProps {
  options?: Option[];
  isColumn?: boolean;
  booleanLabel?: string;
}
interface CheckBoxProps extends FieldProps {
  fieldProps?: CheckboxFieldProps;
}

export const CheckBox: React.FC<CheckBoxProps> = (props) => {
  const {
    formikProps = {} as FormikProps<unknown>,
    fieldProps = {} as CheckboxFieldProps,
  } = props;

  const {
    options = [],
    name = "",
    label,
    isColumn = false,
    classNames,
    nativeProps,
    disabled,
    booleanLabel,
  } = fieldProps;

  const fieldValue: string[] = get(formikProps, `values.${name}`) || [];
  const booleanValue = get(formikProps, `values.${name}`) || "";

  return (
    <div className={clsx("checkbox-field ", classNames)}>
      {label && <label className="checkbox-label">{label}</label>}
      <div
        className={clsx(
          "checkbox-container",
          isColumn ? "isColumn" : undefined
        )}
      >
        {!isEmpty(options) ? (
          map(options, (item: any, index) => {
            return (
              <div key={`${item.value}-${index}`} className="checkbox-name">
                <input
                  className="checkbox-input"
                  type="checkbox"
                  name={item.name}
                  id={`${item.name}-${index}`}
                  value={item.value}
                  checked={fieldValue?.includes(item.value)}
                  onChange={formikProps.handleChange}
                  disabled={disabled}
                  {...nativeProps}
                />
                <label htmlFor={`${item.name}-${index}`}>{item.name}</label>
              </div>
            );
          })
        ) : (
          <div className="checkbox-name">
            <input
              className="checkbox-input"
              type="checkbox"
              name={name}
              id={booleanLabel}
              value="false"
              checked={booleanValue || false}
              onBlur={formikProps.handleBlur}
              onChange={formikProps.handleChange}
              disabled={disabled}
              {...nativeProps}
            />
            <label htmlFor={booleanLabel}> {booleanLabel}</label>
          </div>
        )}
      </div>

      <HelperText fieldProps={fieldProps} formikProps={formikProps} />
    </div>
  );
};
