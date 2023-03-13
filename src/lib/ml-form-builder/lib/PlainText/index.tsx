import React from "react";
import { FieldItemProps } from "../Types";
import clsx from "clsx";
import { FieldProps } from "../..";

export interface PlainTextFieldProps extends FieldItemProps {
  isTextHtmlString?: boolean;
  text: string | JSX.Element;
}
export interface PlainTextProps extends FieldProps {
  fieldProps?: PlainTextFieldProps;
}
export const PlainText: React.FC<PlainTextProps> = (props) => {
  const { fieldProps = {} as PlainTextFieldProps } = props;
  const {
    isTextHtmlString = false,
    text = "",
    classNames,
    nativeProps,
  } = fieldProps;
  return (
    <div className={clsx("plain-text-field", classNames)}>
      {isTextHtmlString && typeof text === "string" ? (
        <div
          className="plaintext-string"
          dangerouslySetInnerHTML={{ __html: text }}
          {...nativeProps}
        />
      ) : (
        <div className="plaintext">{text}</div>
      )}
    </div>
  );
};
