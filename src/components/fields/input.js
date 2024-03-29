import { ErrorMessage, Field } from "formik";
import { classNames } from "src/utils";
import React, { useEffect, useState } from "react";

export default function Component({
  name,
  label,
  helpText,
  extraClasses = "bg-gray-100",
  altLink,
  required,
  format,
  placeHolder,
  icon,
  showError = true,
  rightIcon,
  error,
  ...props
}) {
  const [exError, setShowExError] = useState(error);

  useEffect(() => {
    const timeout = setTimeout(() => setShowExError(error), 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);
  return (
    <Field name={name}>
      {({ field: { onChange, onBlur, value }, meta: { touched, error } }) => {
        const formatValue = (val) => (format ? format(val) : val);
        return (
          <fieldset className="space-y-1">
            {label && (
              <div className="flex justify-between items-center mt-3 ">
                {label ? (
                  <label htmlFor={name} className=" text-sm text-gray-900">
                    {label}
                    {required && <span className=" text-red-500 ml-1">*</span>}
                  </label>
                ) : (
                  <span />
                )}

                {altLink && <span className="items-end">{altLink}</span>}
              </div>
            )}
            <div className="relative">
              {icon && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  {icon}
                </div>
              )}
              <input
                {...props}
                id={name}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeHolder}
                value={formatValue(value)}
                className={classNames(
                  icon ? "pl-12" : "pl-4",
                  rightIcon ? "pr-12" : "pr-4",
                  touched && error ? "border-red-500" : "border-gray-200",
                  "border border-gray-200 block  font-small w-full py-3 placeholder-gray-300  rounded focus:ring-primary focus:border-primary  focus:shadow-none sm:text-sm caret-primary disabled:bg-gray-100",
                  extraClasses
                )}
              />
              {rightIcon && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  {rightIcon}
                </div>
              )}
            </div>
            {helpText && <p className="text-xs text-gray-400">{helpText}</p>}
            {showError && (
              <ErrorMessage name={name}>
                {(msg) => (
                  <div className="text-xs flex items-center text-red-500 opacity-80">
                    {/*<Icons className="w-3 mr-1" type="redStatus" />*/}
                    {msg}
                  </div>
                )}
              </ErrorMessage>
            )}
            {exError && (
              <div className="text-xs flex items-center text-red-500 opacity-80">
                {/*<Icons className="w-3 mr-1" type="redStatus" />*/}
                {exError}
              </div>
            )}
          </fieldset>
        );
      }}
    </Field>
  );
}
