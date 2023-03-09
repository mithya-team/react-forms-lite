import clsx from "clsx";
import { FormikProps } from "formik";
import React from "react";
import { FieldItemProps } from "../Types";
import { getFieldError } from "../../Utils";
import "./index.module.scss";
import { FieldProps } from "../..";

interface HelperTextProps extends FieldProps {
  fieldProps?: FieldItemProps;
}
export const HelperText: React.FC<HelperTextProps> = (props) => {
  const {
    fieldProps = {} as FieldItemProps,
    formikProps = {} as FormikProps<unknown>,
  } = props;

  const { name, helperText, classNames } = fieldProps;
  const fieldError = getFieldError(name || "", formikProps);
  return (
    <div className={clsx("text-error-helper-field", classNames, name)}>
      {(fieldError || helperText) && (
        <div className="label-error">
          {fieldError ? (
            <span className="error-text error">{fieldError}</span>
          ) : (
            <span className="helper-text">{helperText} </span>
          )}
        </div>
      )}
    </div>
  );
};
