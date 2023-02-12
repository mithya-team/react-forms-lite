import React from "react";
import { get } from "lodash";
import "./styles.scss";
import { FieldArray, FieldArrayRenderProps, FormikProps } from "formik";
import { FieldProps, getComponentConfig } from "../../index";
import clsx from "clsx";
import { FieldItemProps } from "../Types";

export interface FieldArrayProps extends FieldItemProps {
  itemType: string;
  addButtonText?: string;
  addButton?: JSX.Element;
  removeButton?: JSX.Element;
  onAddButtonClick?: () => Promise<any | undefined>;
  onRemoveButtonClick?: (index: number) => Promise<boolean>;
  arrayItemFieldProps?: object;
  defaultItemValue?: any;
  fieldArrayLabel?:string;
}

interface FieldsArrayProps extends FieldProps {
  fieldProps?: FieldArrayProps;
}

export const ArrayField: React.FC<FieldsArrayProps> = (props) => {
  const {
    fieldProps = {} as FieldArrayProps,
    formikProps = {} as FormikProps<unknown>,
  } = props;

  const {
    addButtonText = "Add",
    label,
    name = "",
    itemType,
    addButton,
    removeButton ,
    onAddButtonClick,
    onRemoveButtonClick,
    arrayItemFieldProps = {},
    defaultItemValue = "",
    classNames,
    nativeProps,
    disabled,
    fieldArrayLabel,
  } = fieldProps;

  const values = get(formikProps, `values.${name}`);

  const itemComponentConfig = getComponentConfig(itemType);

  const handleElementAdd = async (arrayHelpers: FieldArrayRenderProps) => {
    if (!onAddButtonClick) {
      arrayHelpers.push(defaultItemValue);
      return;
    }
    const res = await onAddButtonClick();
    if (res) {
      arrayHelpers.push(res ?? {});
    }
  };

  const handleElementRemove = async (
    arrayHelpers: FieldArrayRenderProps,
    index: number
  ) => {
    if (!onRemoveButtonClick) {
      arrayHelpers.remove(index);
      return;
    }
    const isRemoved = await onRemoveButtonClick(index);
    if (isRemoved) arrayHelpers.remove(index);
  };

  return (
    

    <div className={clsx("array-field", classNames)}>
      {fieldArrayLabel && <label className="field-array-container-label">{fieldArrayLabel}</label>}

      {label && (
        <label className="field-array-label">{label}</label>
      )}
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <div>

            {(values || []).map((value: any, index: number) => (
                <div
                key={`${fieldProps.name}-${index}`}
                className="field-array-box"
              >

                {React.cloneElement(itemComponentConfig.component, {
                  name: fieldProps.name,
                  key: `${fieldProps.name}-${index}`,
                  itemIndex: index,
                  arrayHelpers,
                  formikProps,
                  fieldProps: {
                    ...arrayItemFieldProps,
                    name: `${name}[${index}]`,
                  },
                  ...itemComponentConfig.props,
                  ...nativeProps,
                  
                })}
                {removeButton ? (                   
                  removeButton
                ) : (
                  <button
                    className="array-remove-icon"
                    onClick={() => handleElementRemove(arrayHelpers, index)}
                  >
                    {/* - */}
                    {<p style={{ fontSize: "8px" }}>❌</p>}
                  </button>
                )}
              </div>
              
            ))}
            {addButton ? (
              addButton
            ) : (
              <button
                type="button"
                className="array-add-icon"
                onClick={() => handleElementAdd(arrayHelpers)}
              >
                {addButtonText}
              </button>
            )}
          </div>
        )}
      />
    </div>
  );
};

