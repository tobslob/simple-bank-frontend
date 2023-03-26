import { ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";

export default function Component({
  name,
  label,
  helpText,
  extraClasses = "mx-auto w-[50%]",
  altLink,
  format,
  placeHolder,
  icon,
  showError = true,
  rightIcon,
  error,
  numInputs = 6,
  className = "p-2 border-gray-200 !w-12 mx-4 rounded text-gray-800 ",
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
      {({
        field: { value },
        meta: { touched, error },
        form: { setFieldValue },
      }) => {
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
            {helpText && <p className="text-xs text-gray-400">{helpText}</p>}

            <div className="relative">
              <OtpInput
                value={formatValue(value)}
                onChange={(e, d) => {
                  setFieldValue(name, e);
                }}
                numInputs={numInputs}
                containerStyle={extraClasses}
                inputStyle={className}
              />
              {/*<input*/}
              {/*  {...props}*/}
              {/*  id={name}*/}
              {/*  onBlur={onBlur}*/}
              {/*  placeholder={placeHolder}*/}
              {/*  value={formatValue(value)}*/}
              {/*  className={classNames(*/}
              {/*    icon ? 'pl-12' : 'pl-4',*/}
              {/*    rightIcon ? 'pr-12' : 'pr-4',*/}
              {/*    touched && error ? 'border-red-500' : 'border-gray-400',*/}
              {/*    extraClasses,*/}
              {/*    'border border-gray-400 block  font-medium w-full py-3 placeholder-gray-300 rounded focus:ring-primary focus:border-primary focus:shadow-none sm:text-sm caret-primary disabled:bg-gray-100'*/}
              {/*  )}*/}
              {/*/>*/}
            </div>
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
