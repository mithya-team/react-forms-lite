import React from "react";
import "./index.module.scss";
import { get, isEmpty, map } from "lodash";
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
      {label && <span className="checkbox-label">{label}</span>}
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
                  name={name}
                  value={item.value}
                  checked={fieldValue?.includes(item.value)}
                  onChange={formikProps.handleChange}
                  disabled={disabled}
                  {...nativeProps}
                />
                {item.name}
              </div>
            );
          })
        ) : (
          <div className="checkbox-name">
            <input
              className="checkbox-input"
              type="checkbox"
              name={name}
              value="false"
              checked={booleanValue || false}
              onBlur={formikProps.handleBlur}
              onChange={formikProps.handleChange}
              disabled={disabled}
              {...nativeProps}
            />
            {booleanLabel}
          </div>
        )}
      </div>

      <HelperText fieldProps={fieldProps} formikProps={formikProps} />
    </div>
  );
};
