import { ErrorMessage, Field } from "formik";
import { classNames } from "src/utils";
import React, { useEffect, useState } from "react";
import { useToggle } from "src/hooks";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

export default function Component({
  name,
  label,
  helpText,
  extraClasses = "",
  altLink,
  format,
  placeHolder,
  icon,
  showError = true,
  rightIcon,
  error,
  ...props
}) {
  const [open, toggle] = useToggle();
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
          <fieldset className="space-y-2">
            {label && (
              <div className="flex justify-between items-center mt-3 mb-2">
                {label ? (
                  <label
                    htmlFor={name}
                    className=" tracking-wider text-sm text-gray-900"
                  >
                    {label}
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
                type={open ? "text" : "password"}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeHolder}
                value={formatValue(value)}
                className={classNames(
                  icon ? "pl-12" : "pl-4",
                  rightIcon ? "pr-12" : "pr-4",
                  touched && error ? "border-red-500" : "border-gray-400",
                  extraClasses,
                  "border border-gray-400 block  mb-3 font-medium w-full py-3 placeholder-gray-300 rounded focus:ring-primary focus:border-primary focus:shadow-none sm:text-sm caret-primary disabled:bg-gray-100"
                )}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                {open ? (
                  <span
                    className=" text-gray-600 cursor-pointer"
                    onClick={toggle}
                  >
                    <EyeOutlined />
                  </span>
                ) : (
                  <span
                    className=" text-gray-600 cursor-pointer"
                    onClick={toggle}
                  >
                    <EyeInvisibleOutlined />
                  </span>
                )}
                {/* {open ? (
                  <Icons
                    type="eye"
                    onClick={toggle}
                    // className="text-gray-600"
                  />
                ) : (
                  <Icons
                    type="eyeSlash"
                    onClick={toggle}
                    // className="text-gray-600"
                  />
                )} */}
              </div>
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
